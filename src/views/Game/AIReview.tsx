
/*
 * Copyright (C) 2012-2017  Online-Go.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import * as d3 from "d3";
import * as moment from "moment";
import * as React from "react";
import * as data from "data";
import {UIPush} from "UIPush";
import {deepCompare, dup} from 'misc';
import {get, post} from 'requests';
import {Link} from "react-router-dom";
import {termination_socket} from 'sockets';
import {_, pgettext, interpolate} from "translate";
import {PersistentElement} from 'PersistentElement';
import {Game} from './Game';
import {GoMath, MoveTree} from 'ogs-goban';
import Select from 'react-select';
import {close_all_popovers, popover} from "popover";

declare var swal;

export class AIReviewEntry {
    move: number;
    fast_prediction: number;
    full_prediction: number;

    constructor(obj) {
        this.move = parseInt(obj.move);
        this.fast_prediction = parseFloat(obj.fast_prediction);
        this.full_prediction = parseFloat(obj.full_prediction);
    }
}

interface AIReviewChartProperties {
    entries     : Array<AIReviewEntry>;
    updatecount : number;
    move        : number;
    setmove     : (move_number:number) => void;
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const bisector = d3.bisector((d:AIReviewEntry) => { return d.move; }).left;
let svgWidth = 600;
let svgHeight = 100;
let margin = { top: 15, right: 20, bottom: 30, left: 50 };
let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

export class AIReviewChart extends React.Component<AIReviewChartProperties, any> {
    container = null;
    chart_div;
    svg;
    destroyed = false;
    chart;
    graph;
    resize_debounce;
    prediction_graph;
    fast_chart;
    full_chart;
    width;
    height;
    fast_line;
    full_line;
    x_axis;
    mouse;
    mouse_rect;
    move_crosshair;
    cursor_crosshair;
    full_crosshair;
    fast_crosshair;
    x;
    y;


    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            nodata: false,
            hovered_date: null,
            hovered_month: null,
            date_extents: [],
        };
        this.chart_div = $("<div>")[0];
    }
    componentDidMount() {
        this.initialize();
    }
    componentDidUpdate(prevProps, prevState) {
        this.move_crosshair.attr('transform', 'translate(' + this.x(this.props.move) + ', 0)');
        this.resize();
    }
    componentWillUnmount() {
        this.deinitialize();
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !deepCompare(nextProps.entries, this.props.entries) || this.props.move !== nextProps.move;
    }

    initialize() {
        let self = this;

        this.width = 600;
        this.svg = d3.select(this.chart_div)
            .append('svg')
            .attr('class', 'chart')
            .attr('width', this.width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom + 0);

        this.prediction_graph = this.svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        this.fast_chart = this.prediction_graph.append('path')
            .attr('class', 'fast-prediction line');
        this.full_chart = this.prediction_graph.append('path')
            .attr('class', 'full-prediction line');

        this.x = d3.scaleLinear().rangeRound([0, width]);
        this.y = d3.scaleLinear().rangeRound([height, 0]);

        this.fast_line = d3.line()
             .x(d => this.x((d as any) .move))
             .y(d => this.y((d as any) .fast_prediction * 100.0));
        this.full_line = d3.line()
             .x(d => this.x((d as any) .move))
             .y(d => this.y((d as any) .full_prediction * 100.0));
        this.y.domain(d3.extent([0.0, 100.0]));

        this.x_axis = this.prediction_graph.append("g");

        this.x_axis
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(this.x))
            .select(".domain")
            .remove();

        let g = this.prediction_graph.append("g");

        g.call(d3.axisLeft(this.y).ticks(3))
           .append("text")
           .attr("fill", "#000")
           .attr("transform", "rotate(-90)")
           .attr("y", 6)
           .attr("dy", "0.71em")
           .attr("text-anchor", "end")
           .text(_("Black")) ;

        g.call(d3.axisLeft(this.y).ticks(3))
           .append("text")
           .attr("fill", "#000")
           .attr("transform", "rotate(-90)")
           .attr("x", - height)
           .attr("y", 6)
           .attr("dy", "0.71em")
           .attr("text-anchor", "start")
           .text(_("White"));

        this.move_crosshair = this.prediction_graph.append('g')
            .attr('class', 'move crosshairs')
            .append('line')
            .attr('x0', 0)
            .attr('y0', 0)
            .attr('x1', 0)
            .attr('y1', height);

        this.move_crosshair.attr('transform', 'translate(' + this.x(this.props.move) + ', 0)');

        this.cursor_crosshair = this.prediction_graph.append('g')
            .attr('class', 'cursor crosshairs')
            .append('line')
            .style('display', 'none')
            .attr('x0', 0)
            .attr('y0', 0)
            .attr('x1', 0)
            .attr('y1', height);

        this.fast_crosshair = this.prediction_graph.append('g')
            .attr('class', 'fast crosshairs')
            .append('line')
            .style('display', 'none')
            .attr('x0', 0)
            .attr('y0', 0)
            .attr('y1', 0)
            .attr('x1', width);

        this.full_crosshair = this.prediction_graph.append('g')
            .attr('class', 'full crosshairs')
            .append('line')
            .style('display', 'none')
            .attr('x0', 0)
            .attr('y0', 0)
            .attr('y1', 0)
            .attr('x1', width);

        let mouse_down = false;
        let last_move = -1;
        this.mouse_rect = this.svg.append('g').append('rect');
        this.mouse_rect
            .attr('class', 'overlay')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .attr('width', width)
            .attr('height', height)
            .on('mouseover', () => {
                this.cursor_crosshair.style('display', null);
                this.full_crosshair.style('display', null);
                this.fast_crosshair.style('display', null);
            })
            .on('mouseout', () => {
                mouse_down = false;
                this.cursor_crosshair.style('display', 'none');
                this.full_crosshair.style('display', 'none');
                this.fast_crosshair.style('display', 'none');
            })
            .on('mousemove', function() {
                /* tslint:disable */
                let x0 = self.x.invert(d3.mouse(this as d3.ContainerElement)[0]);
                /* tslint:enable */

                let i = bisector(self.props.entries, x0, 1);
                let d0 = self.props.entries[i - 1];
                let d1 = self.props.entries[i];

                if (!d0 || !d1) {
                    return;
                }

                let d = x0 - d0.move > d1.move - x0 ? d1 : d0;
                self.cursor_crosshair.attr('transform', 'translate(' + self.x(d.move) + ', 0)');
                self.fast_crosshair.attr('transform', 'translate(0, ' + self.y(d.fast_prediction * 100.0) + ')');
                self.full_crosshair.attr('transform', 'translate(0, ' + self.y(d.full_prediction * 100.0) + ')');

                if (mouse_down) {
                    if (d.move !== last_move) {
                        last_move = d.move;
                        self.props.setmove(d.move);
                    }
                }
            })
            .on('mousedown', function() {
                mouse_down = true;
                last_move = -1;

                /* tslint:disable */
                let x0 = self.x.invert(d3.mouse(this as d3.ContainerElement)[0]);
                /* tslint:enable */

                let i = bisector(self.props.entries, x0, 1);
                let d0 = self.props.entries[i - 1];
                let d1 = self.props.entries[i];

                if (!d0 || !d1) {
                    return;
                }

                let d = x0 - d0.move > d1.move - x0 ? d1 : d0;
                last_move = d.move;
                self.props.setmove(d.move);
            })
            .on('mouseup', () => {
                mouse_down = false;
            })
        ;

        this.plot();

        $(window).on("resize", this.resize as () => void);
        this.resize();
    }
    plot() {
        if (this.props.entries.length <= 0) {
            this.setState({
                nodata: true,
            });
            return;
        } else {
            this.setState({
                nodata: false,
            });
        }

        this.x.domain(d3.extent([1, this.props.entries[this.props.entries.length - 1].move]));
        this.y.domain(d3.extent([0.0, 100.0]));

        this.fast_chart
            .datum(this.props.entries)
            .attr('d', this.fast_line as any);
        this.full_chart
            .datum(this.props.entries)
            .attr('d', this.full_line as any);
    }
    deinitialize() {
        this.destroyed = true;
        $(window).off("resize", this.resize as () => void);
        if (this.resize_debounce) {
            clearTimeout(this.resize_debounce);
            this.resize_debounce = null;
        }
        this.svg.remove();
        this.container = null;
    }
    resize = (no_debounce:boolean = false) => {
        if (this.destroyed) {
            return;
        }

        if (this.resize_debounce) {
            clearTimeout(this.resize_debounce);
            this.resize_debounce = null;
        }

        if (!no_debounce) {
            this.resize_debounce = setTimeout(() => this.resize(true), 10);
            return;
        }

        this.width = Math.max(100, $(this.container).width()  - margin.left - margin.right);

        this.svg.attr('width', this.width + margin.left + margin.right);

        this.x.range([0, this.width]);
        this.fast_chart
            .datum(this.props.entries)
            .attr('d', this.fast_line as any);
        this.full_chart
            .datum(this.props.entries)
            .attr('d', this.full_line as any);

        this.x_axis
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(this.x))
            .select(".domain")
            .remove();

        this.mouse_rect
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .attr('width', this.width);

        this.fast_crosshair.attr('x1', this.width);
        this.full_crosshair.attr('x1', this.width);

    }
    setContainer = (e) => {
        let need_resize = this.container === null;
        this.container = e;
        if (need_resize) {
            this.resize();
        }
    }
    render() {
        return (
            <div ref={this.setContainer} className="AIReviewChart">
                <PersistentElement elt={this.chart_div}/>
            </div>
        );
    }
}

interface AIReviewProperties {
    game: Game;
    move: MoveTree;
}

export class AIReview extends React.Component<AIReviewProperties, any> {
    ai_review;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            reviewing: false,
            ai_reviews: [],
            selected_ai_review: null,
            full: null,
            fast: null,
            update_count: 0,
        };
    }

    componentDidMount() {
        this.getAIReviewList();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.getGameId() !== this.getGameId(prevProps)) {
            this.getAIReviewList();
        }
    }

    componentWillUnmount() {
    }

    getGameId(props?) {
        if (!props) {
            props = this.props;
        }

        if (props.game) {
            if (props.game.game_id) {
                return props.game.game_id;
            }
        }
        return null;
    }

    getAIReviewList() {
        let game_id = this.getGameId();
        if (!game_id) {
            return;
        }

        //get(`/termination-api/ai_review/${game_id}`)
        get(`games/${game_id}/ai_reviews`)
        .then(lst => {
            this.setState({
                loading: false,
                ai_reviews: lst,
            });

            if (lst.length) {
                /* Select the best AI review */
                lst = lst.sort((a, b) => {
                    if (a.full && !b.full) {
                        return -1;
                    }
                    if (b.full && !a.full) {
                        return 1;
                    }

                    if (a.playouts - b.playouts !== 0) {
                        return a.playouts - b.playouts;
                    }

                    if (a.visits - b.visits !== 0) {
                        return a.visits - b.visits;
                    }

                    if (a.finished && !b.finished) {
                        return -1;
                    }
                    if (b.finished && !a.finished) {
                        return 1;
                    }

                    if (a.finished && b.finished) {
                        return (new Date(a.finished)).getTime() - (new Date(b.finished)).getTime();
                    }

                    return (new Date(a.created)).getTime() - (new Date(b.created)).getTime();
                });
                console.log("List: ", lst);
                this.setSelectedAIReview(lst[0]);
            } else {
                post(`games/${game_id}/ai_reviews`, {
                    'engine': 'leela_zero',
                    'type': 'fast',
                })
                .then(res => {
                    if (res.id) {
                        this.setState({reviewing: true});
                    }
                })
                .catch(err => console.error(err));
            }
        })
        .catch(err => console.error(err));
    }

    getAIReview(ai_review_id:string) {
        let game_id = this.getGameId();
        if (!game_id) {
            return;
        }

        this.ai_review = null;
        this.syncAIReview();

        get(`/termination-api/game/${game_id}/ai_review/${ai_review_id}`)
        .then(ai_review => {
            this.ai_review = ai_review;
            this.syncAIReview();
        })
        .catch(err => console.error(err));
    }

    handicapOffset():number {
        if (this.props.game
            && this.props.game.goban
            && this.props.game.goban.engine
            && this.props.game.goban.engine.free_handicap_placement
            && this.props.game.goban.engine.handicap > 0
        ) {
            return this.props.game.goban.engine.handicap;
        }
        return 0;
    }

    syncAIReview() {
        if (!this.ai_review || !this.state.selected_ai_review) {
            this.setState({
                loading: true,
                full: null,
                fast: null,
                updatecount: this.state.updatecount + 1,
            });
            return;
        }

        let ai_review = this.ai_review;

        console.log(ai_review);

        if ('full-network-fastmap' in ai_review) {
            let data:Array<AIReviewEntry> = [];
            let last_full_prediction = 0.5;
            data = ai_review['full-network-fastmap'].map(d => {
                let full_prediction = last_full_prediction;

                if (`full-${d.move}` in ai_review) {
                    if (ai_review[`full-${d.move}`].variations.length) {
                        full_prediction = ai_review[`full-${d.move}`].prediction;
                    }
                }

                last_full_prediction = full_prediction;

                return new AIReviewEntry({
                    move: d.move + this.handicapOffset(),
                    fast_prediction: d.prediction,
                    full_prediction: full_prediction
                });
            });

            this.setState({
                loading: false,
                full: data,
                fast: null,
                updatecount: this.state.updatecount + 1,
            });
        }
        else if ('key-moves' in ai_review) {
            for (let mv of ai_review['key-moves']) {
                ai_review[`full-${mv.move}`] = mv;
            }
            this.setState({
                loading: false,
                full: null,
                fast: ai_review['key-moves'],
                updatecount: this.state.updatecount + 1,
            });
        }
        else {
            this.setState({
                loading: false,
                full: null,
                fast: null,
                queue_position: this.state.selected_ai_review.queue.position,
                queue_pending: this.state.selected_ai_review.queue.pending,
                updatecount: this.state.updatecount + 1,
            });
        }
    }

    clearAIReview() {
        this.props.game.goban.setMode("play");
        this.setState({
            full: null,
            fast: null,
            updatecount: this.state.updatecount + 1,
        });
    }

    setSelectedAIReview = (ai_review) => {
        close_all_popovers();
        this.setState({
            selected_ai_review: ai_review,
        });
        if (ai_review) {
            this.getAIReview(ai_review.id);
        } else {
            this.clearAIReview();
        }
    }

    normalizeHeatmap(heatmap:Array<Array<number>>):Array<Array<number>> {
        let m = 0;
        let ret:Array<Array<number>> = [];
        for (let row of heatmap) {
            let r = [];
            for (let v of row) {
                m = Math.max(m, v);
                r.push(v);
            }
            ret.push(r);
        }

        for (let row of ret) {
            for (let i = 0; i < row.length; ++i) {
                row[i] /= m;
            }
        }

        return ret;
    }

    ai_review_update = (data) => {
        if ('ai_review_id' in data) {
            this.getAIReview(data.ai_review_id);
        }
        if ('refresh' in data) {
            this.getAIReviewList();
        }
    }
    ai_review_update_key = (data) => {
        if (this.ai_review) {
            this.ai_review[data.key] = data.body;
            this.setState({
                updatecount: this.state.updatecount + 1,
            });
            this.syncAIReview();
        }
    }


    openAIReviewList = (ev) => {
        close_all_popovers();
        popover({
            elt: (<div className='ai-review-list' >
                    {this.state.ai_reviews.map((ai_review, idx) => {
                        let params = {
                            strength: ai_review.playouts,
                            num_moves: ai_review.total_moves_to_analyze,
                        };
                        return (
                            <div className={'ai-review-item ' +
                                    (ai_review.id === this.state.selected_ai_review.id ? 'selected' : '')}
                                key={idx}
                                title={moment(ai_review.created).format('LL')}
                                onClick={() => this.setSelectedAIReview(ai_review)}>
                                { ai_review.full
                                    ? interpolate(_("Full review by Leela Zero: strength {{strength}}"), params)
                                    : interpolate(_("Top {{num_moves}} moves according to Leela Zero"), params)
                                }
                            </div>
                       );
                    })}
                  </div>
                 ),
            below: ev.target,
            minWidth: 240,
            minHeight: 250,
        });
    }

    showMoreInfo = (ev) => {
        close_all_popovers();
        popover({
            elt: (
                <div className='ai-review-more-info' >
                    <table>
                        <tbody>
                            <tr>
                                <th>{_("Date")}</th>
                                <td>{moment(this.state.selected_ai_review.modified).format('LL')}</td>
                            </tr>
                            <tr>
                                <th>{pgettext("AI Review Engine", "Engine")}</th>
                                <td>{"Leela Zero"}</td>
                            </tr>
                            <tr>
                                <th>{pgettext("AI Review engine version", "Version")}</th>
                                <td>{this.state.selected_ai_review.version}</td>
                            </tr>
                            <tr>
                                <th>{pgettext("AI Review engine network used", "Network")}</th>
                                <td title={this.state.selected_ai_review.network}>{this.state.selected_ai_review.network.substr(0, 8)}</td>
                            </tr>
                            <tr>
                                <th>{pgettext("AI review engine playouts (strength)", "Playouts")}</th>
                                <td>{this.state.selected_ai_review.playouts}</td>
                            </tr>
                            <tr>
                                <th>{pgettext("AI review engine node visits (strength)", "Visits")}</th>
                                <td>{this.state.selected_ai_review.visits}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ),
            below: ev.target,
            minWidth: 300,
            minHeight: 250,
        });
    }



    render() {
        if (this.state.loading) {
            return null;
        }

        if (!this.props.game || !this.props.game.goban || !this.props.game.goban.engine) {
            return null;
        }

        if (!this.props.move) {
            return null;
        }

        if (!this.ai_review) {
            return (
                <div className='AIReview'>
                    <UIPush event="ai-review" channel={`game-${this.props.game.game_id}`} action={this.ai_review_update} />
                    <UIPush event="ai-review-key" channel={`game-${this.props.game.game_id}`} action={this.ai_review_update_key} />
                    { ((this.state.ai_reviews.length === 0 && this.state.reviewing) || null) &&
                        <div className='reviewing'>
                            {_("Queing AI review")}
                            <i className='fa fa-desktop slowstrobe'></i>
                        </div>
                    }
                </div>
            );
        }

        let move_ai_review = null;
        let win_rate = 0.0;
        let next_prediction = -1.0;
        let next_move = null;
        let next_move_pretty_coords = "";
        let move_relative_delta = null;
        let cur_move = this.props.move;
        let trunk_move = cur_move.getBranchPoint();
        let move_number = trunk_move.move_number;

        if ( `full-${move_number - this.handicapOffset()}` in this.ai_review) {
            move_ai_review = this.ai_review[`full-${move_number - this.handicapOffset()}`];
        }

        if (move_ai_review) {
            win_rate = move_ai_review.win_rate * 100;
            next_prediction = move_ai_review.next_prediction;
            if (`full-${move_number + 1 - this.handicapOffset()}` in this.ai_review) {
                next_prediction = this.ai_review[`full-${move_number + 1 - this.handicapOffset()}`].win_rate;
            }
            next_prediction *= 100.0;
        }

        let marks = {};
        let heatmap = null;
        try {
            if (cur_move.trunk) {
                next_move = cur_move.trunk_next;
                if (next_move) {
                    next_move_pretty_coords = this.props.game.goban.engine.prettyCoords(next_move.x, next_move.y);
                }

                if (move_ai_review) {
                    let variations = move_ai_review.variations.slice(0, 6);
                    for (let i = 0 ; i < variations.length; ++i) {
                        let letter = alphabet[i];
                        marks[letter] = variations[i].move;
                    }
                    if (next_move) {
                        marks["triangle"] = GoMath.encodeMove(next_move.x, next_move.y);
                    }
                    heatmap = this.normalizeHeatmap(move_ai_review.heatmap);
                }
            }
            else { // !cur_move.trunk
                if (move_ai_review) {
                    let trunk_move_string = trunk_move.getMoveStringToThisPoint();
                    let cur_move_string = cur_move.getMoveStringToThisPoint();
                    let next_moves = null;

                    for (let v of move_ai_review.variations) {
                        if ((trunk_move_string + v.moves).startsWith(cur_move_string)) {
                            next_moves = (trunk_move_string + v.moves).slice(cur_move_string.length, Infinity);
                            break;
                        }
                    }

                    if (next_moves) {
                        let decoded_moves = this.props.game.goban.engine.decodeMoves(next_moves);
                        let black = "";
                        let white = "";

                        for (let i = 0; i < decoded_moves.length; ++i) {
                            let mv = decoded_moves[i];
                            let encoded_mv = GoMath.encodeMove(mv.x, mv.y);
                            marks[i + cur_move.getDistance(trunk_move) + 1] = encoded_mv;
                            if (((this.props.game.goban.engine.player - 1) + i) % 2 === 1) {
                                white += encoded_mv;
                            } else {
                                black += encoded_mv;
                            }
                        }
                        if (black) {
                            marks["black"] = black;
                        }
                        if (white) {
                            marks["white"] = white;
                        }
                    }
                }
            }
        } catch (e) {
            console.error(e);
        }

        try {
            this.props.game.goban.setMarks(marks, true);
            this.props.game.goban.setHeatmap(heatmap);
        } catch (e) {
            // ignore
        }

        if (next_prediction >= 0) {
            move_relative_delta = next_prediction - win_rate;
            if (this.props.game.goban.engine.colorToMove() === "white") {
                move_relative_delta = -move_relative_delta;
            }
        }

        return (
            <div className='AIReview'>
                <UIPush event="ai-review" channel={`game-${this.props.game.game_id}`} action={this.ai_review_update} />
                <UIPush event="ai-review-key" channel={`game-${this.props.game.game_id}`} action={this.ai_review_update_key} />

                { false && (this.state.ai_reviews.length > 1 || null) &&
                    <Select
                        value={this.state.selected_ai_review}
                        options={this.state.ai_reviews}
                        onChange={this.setSelectedAIReview}
                        clearable={true}
                        autoBlur={true}
                        placeholder={_("Select AI AIReview")}
                        noResultsText={_("No results found")}
                        optionRenderer={(A) => <span className='ai_review-option'>{A.engine} {A.engine_version}</span>}
                        valueRenderer={(A) => <span className='ai_review-option'>{A.engine} {A.engine_version}</span>}
                        />
                }

                <div className='prediction'>
                    <div className='ai-review-list-container'>
                        <span className='btn xs' onClick={this.openAIReviewList}>
                            <i className='fa fa-list-ul' />
                        </span>
                    </div>
                    {(this.state.selected_ai_review || null) &&
                        <div className='ai-review-more-info-container'>
                            <span className='btn xs' onClick={this.showMoreInfo}>
                                <i className='fa fa-info' />
                            </span>
                        </div>
                    }
                    <div className={"progress " + (!move_ai_review ? "invisible" : "")}>
                        <div className="progress-bar black-background" style={{width: win_rate + "%"}}>{win_rate.toFixed(1)}%</div>
                        <div className="progress-bar white-background" style={{width: (100.0 - win_rate) + "%"}}>{(100 - win_rate).toFixed(1)}%</div>
                    </div>
                </div>

                {((this.state.full && this.state.full.length > 0) || null) &&
                    <AIReviewChart
                        entries={this.state.full}
                        updatecount={this.state.updatecount}
                        move={this.props.move.move_number}
                        setmove={this.props.game.nav_goto_move} />
                }

                {((this.state.fast && this.state.fast.length > 0) || null) &&
                    <div className='key-moves'>
                        <div>{_("Top game changing moves")}</div>

                        {this.state.fast.map((move, idx) =>
                            <span key={move.move} className='key-move clickable' onClick={(ev) => this.props.game.nav_goto_move(move.move + this.handicapOffset())}>
                                {move.move + 1 + this.handicapOffset()}
                            </span>
                        )}

                        <span className='full-ai-review clickable' onClick={this.performFullAIReview}>
                            {_("Full AI Review")}
                        </span>
                    </div>
                }

                {((!this.state.full && !this.state.fast) || null) &&
                    <div className='pending'>
                        {interpolate(_("AI review has been queued for processing. Current queue position: {{queue_position}} out of {{queue_pending}}"),
                            {queue_position: this.state.queue_position + 1, queue_pending: this.state.queue_pending})}
                        <i className='fa fa-desktop slowstrobe'></i>
                    </div>
                }


                {move_ai_review && next_move && move_relative_delta !== null &&
                    <div className='next-move-delta-container'>
                        <span className={"next-move-coordinates " +
                            (this.props.game.goban.engine.colorToMove() === "white" ? "white-background" : "black-background")}>
                            <i className="ogs-label-triangle"></i> {next_move_pretty_coords}
                        </span>
                        <span className="next-move-delta">
                            {move_relative_delta.toFixed(1)}%
                        </span>
                    </div>
                }


            </div>
        );
    }

    orig_move: any;
    orig_marks: any;
    stashed_pen_marks: any;
    stashed_heatmap: any;

    leaveVariation() {
        let game = this.props.game;
        let goban = this.props.game.goban;

        if (game.in_pushed_analysis) {
            game.in_pushed_analysis = false;
            game.leave_pushed_analysis = null;
            goban.engine.jumpTo(this.orig_move);
            this.orig_move.marks = this.orig_marks;
            goban.pen_marks = this.stashed_pen_marks;
            if (goban.pen_marks.length === 0) {
                goban.detachPenCanvas();
            }
            goban.setHeatmap(this.stashed_heatmap);
            this.stashed_heatmap = null;
        }
    }
    enterVariation(move_number, v) {
        let game = this.props.game;
        let goban = this.props.game.goban;

        game.in_pushed_analysis = true;
        game.leave_pushed_analysis = () => this.leaveVariation();

        this.orig_move = goban.engine.cur_move;
        if (this.orig_move) {
            this.orig_marks = this.orig_move.marks;
            this.orig_move.clearMarks();
        } else {
            this.orig_marks = null;
        }
        goban.engine.followPath(move_number, v.moves);

        this.stashed_pen_marks = goban.pen_marks;
        goban.pen_marks = [];

        this.stashed_heatmap = goban.setHeatmap(null);
    }
    performFullAIReview = () => {
        this.props.game.force_ai_review("full");
    }
}

function winRateDelta(start_or_delta, end?) {
    let delta = end ? end - start_or_delta : start_or_delta;
    if (delta > 0) {
        return <span className='increased-win-rate'>+{Math.round(delta * 100)}</span>;
    } else {
        return <span className='decreased-win-rate'>{Math.round(delta * 100)}</span>;
    }
}


