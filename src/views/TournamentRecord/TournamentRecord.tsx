/*
 * Copyright (C) 2012-2019  Online-Go.com
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

import * as React from "react";
import * as ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import {browserHistory} from "ogsHistory";
import {_, pgettext, interpolate} from "translate";
import {abort_requests_in_flight, del, put, post, get} from "requests";
import {Markdown} from "Markdown";
import {Player} from "Player";
import * as moment from "moment";
import * as data from "data";
import {ignore, errorAlerter, dup} from "misc";


window['dup'] = dup;

declare var swal;

interface TournamentRecordProperties {
    match: {
        params: any
    };
}

export class TournamentRecord extends React.PureComponent<TournamentRecordProperties, any> {
    loaded_state:any = {};


    constructor(props) {
        super(props);

        let tournament_record_id = parseInt(this.props.match.params.tournament_record_id) || 0;

        this.state = {
            editing: false,
            tournament_record_id: tournament_record_id,
            loading: true,
            name: "",
            new_round_name: "",
            rounds: [],
        };
    }

    componentDidMount() {
        if (this.state.tournament_record_id) {
            this.resolve(this.state.tournament_record_id);
        }
    }

    componentWillUnmount() {
        this.abort_requests();
    }

    abort_requests() {
        abort_requests_in_flight(`tournament_records/${this.state.tournament_record_id}`);
    }

    resolve(tournament_record_id: number) {
        this.abort_requests();

        get(`tournament_records/${this.state.tournament_record_id}`)
        .then(res => {
            res.loading = false;
            res.editing = false;
            this.loaded_state = dup(res);
            this.setState(res);
        })
        .catch(errorAlerter);
    }

    startEditing = () => {
        this.setState({editing: true});
    }

    save = () => {
        this.loaded_state.editing = false;
        this.loaded_state.name = this.state.name;
        this.loaded_state.description = this.state.description;
        this.setState({editing: false});
        put(`tournament_records/${this.state.tournament_record_id}`, {
            'name': this.state.name,
            'description': this.state.description,
            'location': this.state.location,
        })
        .then(ignore)
        .catch(errorAlerter);
    }

    cancel = () => {
        this.setState({editing: false});
    }

    setName = (ev) => {
        this.setState({name: ev.target.value});
    }
    setDescription = (ev) => {
        this.setState({description: ev.target.value});
    }
    setNewRoundName = (ev) => {
        this.setState({new_round_name: ev.target.value});
    }

    addRound = (ev) => {
        if (this.state.new_round_name.trim().length < 2) {
            $(".round-name-editor").focus();
            return;
        }

        console.log("asdf");
        post(`tournament_records/${this.state.tournament_record_id}/rounds`, {
            name: this.state.new_round_name,
            notes: '',
        })
        .then((res) => {
            let rounds = dup(this.state.rounds);
            rounds.unshift(res);
            this.setState({rounds});
        })
        .catch(errorAlerter);
    }

    addPlayer = (ev) => {
        swal("Still working on this")
        .then(ignore)
        .catch(ignore);
    }

    deleteEntry(round, entry) {
        swal({
            text: "Are you sure you wish to delete this entry? The original game or review content will not be affected, but the entry will be removed from this list of game in this round.",
            showCancelButton: true,
        })
        .then(() => {
            for (let i = 0; i < round.entries.length; ++i) {
                if (round.entries[i].id === entry.id) {
                    round.entries.splice(i, 1);
                    break;
                }
            }
            this.forceUpdate();

            del(`tournament_records/${this.state.tournament_record_id}/rounds/${round.id}/${entry.id}`)
            .then(ignore)
            .catch(errorAlerter);
        })
        .catch(errorAlerter);
    }

    deleteRound(round) {
        swal({
            title: _("Are you sure you wish to delete this round?"),
            text: round.name,
            showCancelButton: true,
        })
        .then((url) => {
            del(`tournament_records/${this.state.tournament_record_id}/round/${round.id}/`)
            .then(() => {
                for (let i = 0; i < this.state.rounds.length; ++i) {
                    if (this.state.rounds[i].id === round.id) {
                        this.state.rounds.splice(i, 1);
                        break;
                    }
                }
                this.forceUpdate();
            })
            .catch(errorAlerter);
        })
        .cach(ignore);
    }

    linkGame(round) {
        swal({
            text: _("Please provide the link to the game, review, or demo board"),
            input: "text",
            showCancelButton: true,
        })
        .then((url) => {
            console.log(url);

            if (!url) {
                return;
            }

            post(`tournament_records/${this.state.tournament_record_id}/round/${round.id}/`, { url, notes: '' })
            .then((res) => {
                round.entries.unshift(res);
                this.forceUpdate();
            })
            .catch(errorAlerter);
        })
        .catch(ignore);
    }

    render() {
        let user = data.get('user');
        let editing = this.state.editing;
        let editable = this.state.editable_by_current_user || null;

        if (this.state.loading) {
            return (
                <div id='TournamentRecord'>
                    {_("Loading...")}
                </div>
            );
        }

        return (
            <div id='TournamentRecord'>
                <div className='space-between center'>
                    {editing
                        ? <input type='text' className='name-editor'
                            onChange={this.setName} placeholder={_("Name")} value={this.state.name} />
                        : <h1 className='name'>{this.state.name}</h1>
                    }


                    {((!editing && editable) || null)
                        && <button onClick={this.startEditing} className='danger xs'>{_("Edit")}</button>
                    }
                    {((editing && editable) || null)
                        && <div>
                               <button onClick={this.save} className='primary xs'>{_("Save")}</button>
                               <button onClick={this.cancel} className='default xs'>{_("Cancel")}</button>
                           </div>
                    }
                </div>

                <div className='space-between'>
                    {editing
                        ? <textarea className='description-editor' rows={15}
                            onChange={this.setDescription} placeholder={_("Description")} value={this.state.description}/>
                        : <Markdown source={this.state.description} />
                    }

                    <div>
                        <div className='space-between center'>
                            <h3>{_("Players")}</h3>
                            {editable
                                && <button onClick={this.addPlayer} className='default xs'>{_("Add player")}</button>
                            }
                        </div>
                    </div>
                </div>


                <div className='hr' />

                <h1>{_("Rounds")}</h1>

                {editable
                    && <div className='round-line'>
                          <input type='text' className='round-name-editor'
                              onChange={this.setNewRoundName} placeholder={_("Round name")} value={this.state.new_round_name} />
                          <button onClick={this.addRound} className='default xs'>{_("Add round")}</button>
                       </div>
                }
                {this.state.rounds.map((round, idx) => (
                    <div key={round.id} className='round'>
                        <div className='space-between center round-name'>
                            <h3>{round.name}</h3>

                            {editable &&
                                <div>
                                    <button onClick={() => this.linkGame(round)} className='default xs'>{_("Link game")}</button>
                                    <button onClick={() => this.deleteRound(round)} className='default xs'>{_("Remove round")}</button>
                                </div>
                            }
                        </div>
                        <Markdown source={round.notes} />

                        <table className='round-entries'>
                            <tbody>
                                {round.entries.map((entry, idx) => (
                                    <tr key={entry.id} className='round-entry'>
                                        {editable && <td><i className='fa fa-trash' onClick={() => this.deleteEntry(round, entry)} /></td>}
                                        <td><a className='name' href={entry.url}>{entry.name}</a></td>
                                        <td><Player user={entry.black} disable-cache-update /></td>
                                        <td><Player user={entry.white} disable-cache-update /></td>
                                        <td>
                                            {(entry.game_id || null)
                                                && <a href={`/api/v1/games/${entry.game_id}/sgf`}>{_("SGF")}</a>
                                            }
                                            {(entry.review_id || null)
                                                && <a href={`/api/v1/reviews/${entry.review_id}/sgf`}>{_("SGF")}</a>
                                            }
                                        </td>
                                        <td>
                                            {(entry.game_id || null)
                                                && <a href={`/api/v1/games/${entry.game_id}/sgf?comments=0`}>{_("SGF without comments")}</a>
                                            }
                                            {(entry.review_id || null)
                                                && <a href={`/api/v1/reviews/${entry.review_id}/sgf?comments=0`}>{_("SGF without comments")}</a>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        );
    }
}
