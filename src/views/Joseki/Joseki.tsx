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

/* A page for looking up and playing against josekis */

import * as React from "react";
import {_, pgettext, interpolate} from "translate";
import {KBShortcut} from "KBShortcut";
import {PersistentElement} from "PersistentElement";
import {errorAlerter, dup, ignore} from "misc";
import {Goban, GoMath} from "goban";
import {Resizable} from "Resizable";
import { getSectionPageCompleted } from "../LearningHub/util";

enum PageMode {
    Explore, Play, Edit
}

enum EditState {
    UpdatePosition, FinalizeMove
}

export class Joseki extends React.Component<{}, any> {
    refs: {
        goban_container;
    };

    goban: Goban;
    goban_div: any;
    goban_opts: any = {};

    next_moves: Array<any> = []; // these are the moves that the server has told us are available as joseki moves from the current board position

    constructor(props) {
        super(props);

        this.state = {
            move_string: "",  // This is used for making sure we know what the current move is.
            position_title: "",
            position_description: "",
            current_move_category: "",
            mode: PageMode.Explore,
        };

        this.goban_div = $("<div className='Goban'>");

        this.initializeGoban();
    }

    initializeGoban = () => {
        // this can be called at any time to reset the board
        if (this.goban != null) {
            this.goban.destroy();
        }

        let opts = {
            "board_div": this.goban_div,
            "interactive": true,
            "mode": "puzzle",
            "player_id": 0,
            "server_socket": null,
            "square_size": 20
        };

        this.goban_opts = opts;
        this.goban = new Goban(opts);
        this.goban.setMode("puzzle");
        this.goban.on("update", () => this.onBoardUpdate());
        window["global_goban"] = this.goban;
    }

    componentDidMount = () => {
        $(window).on("resize", this.onResize as () => void);
        this.onResize();  // make Goban size itself properly after the DOM is rendered

        this.resetJosekiSequence(); // initialise joseki playing sequence with server
    }

    resetJosekiSequence = () => {
        /* Initiate joseki playing sequence with the root from the server */
        const serverRootPosition = "http://localhost:8081/position/?id=root";
        this.fetchNextMovesFor(serverRootPosition);
    }

    onResize = () => {
        this.goban.setSquareSizeBasedOnDisplayWidth(
            Math.min(this.refs.goban_container.offsetWidth, this.refs.goban_container.offsetHeight)
        );
    }

    fetchNextMovesFor = (placementUrl) => {
        fetch(placementUrl, {mode: 'cors'})
        .then(response => response.json()) // wait for the body of the response
        .then(body => {
            console.log("Server response:", body);
            this.processNewJosekiPosition(body);
        } );
    }

    processNewJosekiPosition = (position) => {
        this.setState({
            position_title: position.title,
            position_description: position.description
        });
        this.next_moves = position._embedded.moves;
        this.renderJosekiPosition(this.next_moves);
    }

    // Draw all the positions that are joseki moves that we know about from the server (array of moves from the server)
    renderJosekiPosition = (next_moves:  Array<any>) => {
        this.goban.engine.cur_move.clearMarks();  // these usually get removed when the person clicks ... but just in case.
        next_moves.forEach((option, index) => {
            const id = GoMath.num2char(index).toUpperCase();
            let mark = {};
            mark[id] = GoMath.encodePrettyCoord(option["placement"], this.goban.height);
            this.goban.setMarks(mark);
        });
    }

    /* This is called every time a move is played on the Goban or anything else changes about the state of the board */
    onBoardUpdate = () => {
        let mvs = GoMath.decodeMoves(
            this.goban.engine.cur_move.getMoveStringToThisPoint(),
            this.goban.width,
            this.goban.height);
        let move_string = mvs.map((p) => GoMath.prettyCoords(p.x, p.y, this.goban.height)).join(",");
        if (move_string !== this.state.move_string) {
            console.log("Move placed: ", mvs[mvs.length - 1]);
            this.setState({ move_string });
            this.processPlacement(mvs[mvs.length - 1]);
        }
    }

    processPlacement(move: any) {
        /* They've clicked a stone onto the board in a new position */
        const placement = GoMath.prettyCoords(move.x, move.y, this.goban.height);
        console.log("Processing placement at:", placement);

        const chosen_move = this.next_moves.find(move => move.placement === placement);

        if (chosen_move !== undefined) {
            /* The database already knows about this move, so we just get and display the new position information */
            this.fetchNextMovesFor(chosen_move._links.self.href);
            this.setState({current_move_category: chosen_move.category});
        } else {
            /* This isn't in the database */
            if (this.state.mode === PageMode.Edit) {
                this.setState({
                    position_title: "tbd",
                    position_description: "tbd",
                    current_move_category : "Proposed Position"
                });
                this.finalizeNewMove();
            } else {
                this.setState({
                    position_title: "",
                    position_description: "",
                    current_move_category : "Experiment"
                });
            }
        }
    }

    finalizeNewMove = () => {
        /* They plonked a stone on the board that might be a new move proposal.  Find out, and save it if so... */
        this.setState({edit_state: EditState.FinalizeMove});
    }

    setExploreMode = () => {
        if (this.state.mode !== PageMode.Edit) { // If they were editing, they want to continue from the same place
            this.resetBoard();
            this.resetJosekiSequence();  // This triggers the joseki display machinery
        }
        this.setState({
            mode: PageMode.Explore,
        });
    }

    setPlayMode = () => {
        this.setState({
            mode: PageMode.Play,
        });
        this.resetBoard();
        // ... tbd - do playing with joseki :)
    }

    setEditMode = () => {
        // If they clicked in new moves before going into edit mode, let them add them now
        const new_edit_state: EditState = (this.state.current_move_category === "Experiment") ?
            EditState.FinalizeMove : EditState.UpdatePosition;

        this.setState({
            mode: PageMode.Edit,
            edit_state: new_edit_state
        });
       /* (We don't reset the board here, they want to edit from this position!) */
    }

    resetBoard = () => {
        this.next_moves = [];
        this.setState({move_string: ""});
        this.initializeGoban();
        this.onResize();
    }

    render() {
        return (
            <div className={"Joseki"}>
                <div className={"left-col"}>
                    <div ref="goban_container" className="goban-container">
                        <PersistentElement className="Goban" elt={this.goban_div}/>
                    </div>
                </div>
                <div className="right-col">
                    <div className = "top-stuff">
                        {this.renderModeControl()}
                        {this.renderModePane()}
                    </div>
                    <div className="status-info">
                        <div className="move-category">
                            {this.state.current_move_category === "" ? "" :
                            "Last move: " + this.state.current_move_category}
                        </div>
                        {"Moves made: " + (this.state.move_string !== "" ? this.state.move_string : "(none)")}
                    </div>
                </div>
            </div>
        );
    }

    renderModeControl = () => (
        <div className="mode-control">
            <button className="btn s primary" onClick={this.setExploreMode}>
                 {_("Explore")}
            </button>
            <button className="btn s primary" onClick={this.setPlayMode}>
                {_("Play")}
            </button>
            <button className="btn s primary" onClick={this.setEditMode}>
                {_("Edit")}
            </button>
        </div>
    )

    renderModePane = () => {
        switch (this.state.mode) {
            case (PageMode.Explore) :
                return (
                    <ExplorePane title={this.state.position_title} description={this.state.position_description}/>
                );
            case (PageMode.Edit) :
                return (
                    <EditPane edit_state={this.state.edit_state} save_new_move={this.saveNewMove}/>
                );
            default :
                return (
                    <div> (not implemented yet!)</div>
                );
        }
    }

    saveNewMove = () => {}
}

interface EditProps {
    edit_state: EditState;
    save_new_move: () => void;
}

class EditPane extends React.Component<EditProps> {
    setType = () => {};

    default_tmp: string = "Ideal";

    render = () => {
        if (this.props.edit_state === EditState.FinalizeMove) {
            return (
                <div className="move-type-selection">
                    <span>{_("This move is: ")}</span>
                    <select value={this.default_tmp} onChange={this.setType} >
                        <option value='Ideal'>{_("Ideal")}</option>
                        <option value='Good'>{_("Good")}</option>
                    </select>
                    <button className="btn xs primary" onClick={this.props.save_new_move}>
                        {_("Save")}
                    </button>
                </div>
            );
        } else {
            return ("(edit mode)")
        }
    }
}

interface ExploreProps {
    title: string;
    description: string;
}

class ExplorePane extends React.Component<ExploreProps> {
    render = () => (
        <React.Fragment>
            <div className="position-header">
                <h2>{this.props.title}</h2>
            </div>
            <div className="position-description">
                {this.props.description}
            </div>
        </React.Fragment>
    )
}


