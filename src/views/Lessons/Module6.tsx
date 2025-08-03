/*
 * Copyright (C) 2012-2020  Online-Go.com
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
import { Content } from "./Content";
import { PuzzleConfig, Goban, JGOFNumericPlayerColor } from "goban";
import { Axol } from "./Axol";
import { openPopup } from "@kidsgo/components/PopupDialog";

const POPUP_TIMEOUT = 1500;

class Module6 extends Content {
    constructor(audioUrl: string, shouldPlayAudio?: boolean) {
        super();
        this.audioUrl = audioUrl;

        if (shouldPlayAudio !== undefined) {
            this.shouldPlayAudio = shouldPlayAudio;
        }
    }
}

class Page1 extends Module6 {
    constructor() {
        super("no_audio_here");
    }

    text(): JSX.Element | Array<JSX.Element> {
        return [
            <p>Audio coming soon!</p>,
            <p>
                The best way to keep your stones safe is to connect them. These stones cannot be
                cut.
            </p>,
            <p>
                These moves are good for walls and for defense, but are pretty slow at securing
                territory.
            </p>,
        ];
    }

    config(): PuzzleConfig {
        return {
            puzzle_player_move_mode: "fixed",
            width: 9,
            height: 9,
            initial_state: {
                black: "e5e6",
                white: "",
            },
        };
    }
}

class Page2 extends Module6 {
    constructor() {
        super("no_audio_here");
    }

    text(): JSX.Element | Array<JSX.Element> {
        return [
            <p>Other shapes can stretch out and still connect.</p>,
            <p>
                The diagonal at B, the one space jump at C, the knight's move at D, and the two
                space jump at E.
            </p>,
            <p>These basic connecting moves will help you avoid getting captured!</p>,
        ];
    }
    config(): PuzzleConfig {
        return {
            puzzle_player_move_mode: "fixed",
            width: 9,
            height: 9,
            initial_state: {
                black: "e5e6",
                white: "",
            },
        };
    }
    onSetGoban(goban: Goban): void {
        goban.setMarkByPrettyCoordinates("e6", "A");

        this.delay(() => {
            goban.placeByPrettyCoordinates("b7");
            goban.setMarkByPrettyCoordinates("e6", "A");
        });
        this.delay(() => {
            goban.editPlaceByPrettyCoordinates("c8", JGOFNumericPlayerColor.BLACK);
            goban.setMarkByPrettyCoordinates("e6", "A");
            goban.setMarkByPrettyCoordinates("c8", "B");
        });
        this.delay(() => {
            goban.editPlaceByPrettyCoordinates("h6", JGOFNumericPlayerColor.BLACK);
            goban.setMarkByPrettyCoordinates("e6", "A");
            goban.setMarkByPrettyCoordinates("c8", "B");
        });
        this.delay(() => {
            goban.editPlaceByPrettyCoordinates("h8", JGOFNumericPlayerColor.BLACK);
            goban.setMarkByPrettyCoordinates("e6", "A");
            goban.setMarkByPrettyCoordinates("c8", "B");
            goban.setMarkByPrettyCoordinates("h8", "C");
        });
        this.delay(() => {
            goban.editPlaceByPrettyCoordinates("f2", JGOFNumericPlayerColor.BLACK);
            goban.setMarkByPrettyCoordinates("e6", "A");
            goban.setMarkByPrettyCoordinates("c8", "B");
            goban.setMarkByPrettyCoordinates("h8", "C");
        });
        this.delay(() => {
            goban.editPlaceByPrettyCoordinates("h3", JGOFNumericPlayerColor.BLACK);
            goban.setMarkByPrettyCoordinates("e6", "A");
            goban.setMarkByPrettyCoordinates("c8", "B");
            goban.setMarkByPrettyCoordinates("h8", "C");
            goban.setMarkByPrettyCoordinates("h3", "D");
        });
        this.delay(() => {
            goban.editPlaceByPrettyCoordinates("b5", JGOFNumericPlayerColor.BLACK);
            goban.setMarkByPrettyCoordinates("e6", "A");
            goban.setMarkByPrettyCoordinates("c8", "B");
            goban.setMarkByPrettyCoordinates("h8", "C");
            goban.setMarkByPrettyCoordinates("h3", "D");
        });
        this.delay(() => {
            goban.editPlaceByPrettyCoordinates("b2", JGOFNumericPlayerColor.BLACK);
            goban.setMarkByPrettyCoordinates("e6", "A");
            goban.setMarkByPrettyCoordinates("c8", "B");
            goban.setMarkByPrettyCoordinates("h8", "C");
            goban.setMarkByPrettyCoordinates("h3", "D");
            goban.setMarkByPrettyCoordinates("b2", "E");
        });
    }
}

class Page3 extends Module6 {
    constructor() {
        super("no_audio_here");
    }

    text(): JSX.Element | Array<JSX.Element> {
        return [
            <p>
                Next, let's look at the diagonal connection. This only stays connected if you defend
                it.
            </p>,
            <p>
                If White tries to cut with A, Blue would play at B to connect. If White tries to cut
                with B, Blue would play at A to connect.
            </p>,
            <p>
                Sometimes there may be more important moves you could play, but in this lesson we
                are only concerned about connecting.
            </p>,
        ];
    }
    config(): PuzzleConfig {
        return {
            puzzle_player_move_mode: "fixed",
            width: 9,
            height: 9,
            initial_state: {
                black: "d4e5",
                white: "",
            },
        };
    }
    onSetGoban(goban: Goban): void {
        goban.setMarkByPrettyCoordinates("d5", "A");
        goban.setMarkByPrettyCoordinates("e4", "B");

        this.delay(() => {
            goban.editPlaceByPrettyCoordinates("d5", JGOFNumericPlayerColor.WHITE);
            goban.setMarkByPrettyCoordinates("d5", "A");
            goban.setMarkByPrettyCoordinates("e4", "B");
        });
        this.delay(() => {
            goban.editPlaceByPrettyCoordinates("e4", JGOFNumericPlayerColor.BLACK);
            goban.setMarkByPrettyCoordinates("d5", "A");
            goban.setMarkByPrettyCoordinates("e4", "B");
        });
        // Clear stones here so we can animate white trying to cut with B instead
        this.delay(() => {
            goban.editPlaceByPrettyCoordinates("d5", 0);
            goban.editPlaceByPrettyCoordinates("e4", 0);
            goban.setMarkByPrettyCoordinates("d5", "A");
            goban.setMarkByPrettyCoordinates("e4", "B");
        }, 1500);
        this.delay(() => {
            goban.editPlaceByPrettyCoordinates("e4", JGOFNumericPlayerColor.WHITE);
            goban.setMarkByPrettyCoordinates("d5", "A");
            goban.setMarkByPrettyCoordinates("e4", "B");
        }, 1500);
        this.delay(() => {
            goban.editPlaceByPrettyCoordinates("d5", JGOFNumericPlayerColor.BLACK);
            goban.setMarkByPrettyCoordinates("d5", "A");
            goban.setMarkByPrettyCoordinates("e4", "B");
        });
    }
}

class Page4 extends Module6 {
    constructor() {
        super("no_audio_here");
    }

    text(): JSX.Element | Array<JSX.Element> {
        return [
            <p>Now let's look at the one space jump.</p>,
            <p>
                This is a strong shape because it's faster at surrounding territory compared to
                connecting one by one in a straight line.
            </p>,
        ];
    }

    config(): PuzzleConfig {
        return {
            puzzle_player_move_mode: "fixed",
            width: 9,
            height: 9,
            initial_state: {
                black: "h4h6",
                white: "",
            },
        };
    }
}

class Page5 extends Module6 {
    constructor() {
        super("no_audio_here");
    }

    text(): JSX.Element | Array<JSX.Element> {
        return [
            <p>
                Trying to separate the stones will be a lopsided fight, White will only have two
                liberties. As long as Blue plays at 1, pushing White towards the edge of the board,
                it will be okay.
            </p>,
        ];
    }

    config(): PuzzleConfig {
        return {
            puzzle_player_move_mode: "fixed",
            width: 9,
            height: 9,
            initial_state: {
                black: "h4h6g5",
                white: "h5",
            },
        };
    }
    onSetGoban(goban: Goban): void {
        goban.setMarkByPrettyCoordinates("g5", "1");
    }
}

class Page6 extends Module6 {
    constructor() {
        super("no_audio_here");
    }

    text(): JSX.Element | Array<JSX.Element> {
        return [
            <p>
                Even if White adds stones here, they will all be captured. If you are in atari on
                the second line and you extend, you will just lose more stones.
            </p>,
        ];
    }

    config(): PuzzleConfig {
        return {
            puzzle_player_move_mode: "fixed",
            width: 9,
            height: 9,
            initial_state: {
                black: "h4h6",
                white: "h5",
            },
        };
    }
    onSetGoban(goban: Goban): void {
        this.delay(() => {
            goban.placeByPrettyCoordinates("g5");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("j5");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("j6");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("j4");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("j3");
        });
    }
}

class Page7 extends Module6 {
    constructor() {
        super("no_audio_here");
    }
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Be careful, if you try the atari from this side, it will end in a disaster.</p>];
    }
    config(): PuzzleConfig {
        return {
            puzzle_player_move_mode: "fixed",
            width: 9,
            height: 9,
            initial_state: {
                black: "h4h6j5",
                white: "h5",
            },
        };
    }
    onSetGoban(goban: Goban): void {
        goban.setMarkByPrettyCoordinates("j5", "1");
    }
}
class Page8 extends Module6 {
    constructor() {
        super("no_audio_here");
    }
    text(): JSX.Element | Array<JSX.Element> {
        return [
            <p>When White extends out, the group will have three liberties and can escape. </p>,
        ];
    }
    config(): PuzzleConfig {
        return {
            puzzle_player_move_mode: "fixed",
            width: 9,
            height: 9,
            initial_state: {
                black: "h4h6j5",
                white: "h5g5",
            },
        };
    }
    onSetGoban(goban: Goban): void {
        goban.setMarkByPrettyCoordinates("j5", "1");
        goban.setMarkByPrettyCoordinates("g5", "2");
        goban.setMarkByPrettyCoordinates("g4", "triangle");
        goban.setMarkByPrettyCoordinates("f5", "triangle");
        goban.setMarkByPrettyCoordinates("g6", "triangle");
    }
}

class Page9 extends Module6 {
    constructor() {
        super("no_audio_here");
    }
    text(): JSX.Element | Array<JSX.Element> {
        return [
            <p>
                A one space jump on the third line has more trouble connecting. If you atari at 1
                and White extends at 2, then turns at 4, and extends at 6, White will run into the
                edge of the board and be captured.
            </p>,
            <p>But... the Blue stones aren't well connected. White has other choices.</p>,
        ];
    }
    config(): PuzzleConfig {
        return {
            puzzle_player_move_mode: "fixed",
            width: 9,
            height: 9,
            initial_state: {
                black: "g4g6",
                white: "g5",
            },
        };
    }
    onSetGoban(goban: Goban): void {
        this.delay(() => {
            goban.placeByPrettyCoordinates("f5");
            goban.setMarkByPrettyCoordinates("f5", "1");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("h5");
            goban.setMarkByPrettyCoordinates("f5", "1");
            goban.setMarkByPrettyCoordinates("h5", "2");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("h6");
            goban.setMarkByPrettyCoordinates("f5", "1");
            goban.setMarkByPrettyCoordinates("h5", "2");
            goban.setMarkByPrettyCoordinates("h6", "3");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("h4");
            goban.setMarkByPrettyCoordinates("f5", "1");
            goban.setMarkByPrettyCoordinates("h5", "2");
            goban.setMarkByPrettyCoordinates("h6", "3");
            goban.setMarkByPrettyCoordinates("h4", "4");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("h3");
            goban.setMarkByPrettyCoordinates("f5", "1");
            goban.setMarkByPrettyCoordinates("h5", "2");
            goban.setMarkByPrettyCoordinates("h6", "3");
            goban.setMarkByPrettyCoordinates("h4", "4");
            goban.setMarkByPrettyCoordinates("h3", "5");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("j5");
            goban.setMarkByPrettyCoordinates("f5", "1");
            goban.setMarkByPrettyCoordinates("h5", "2");
            goban.setMarkByPrettyCoordinates("h6", "3");
            goban.setMarkByPrettyCoordinates("h4", "4");
            goban.setMarkByPrettyCoordinates("h3", "5");
            goban.setMarkByPrettyCoordinates("j5", "6");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("j6");
            goban.setMarkByPrettyCoordinates("f5", "1");
            goban.setMarkByPrettyCoordinates("h5", "2");
            goban.setMarkByPrettyCoordinates("h6", "3");
            goban.setMarkByPrettyCoordinates("h4", "4");
            goban.setMarkByPrettyCoordinates("h3", "5");
            goban.setMarkByPrettyCoordinates("j5", "6");
            goban.setMarkByPrettyCoordinates("j6", "7");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("j4");
            goban.setMarkByPrettyCoordinates("f5", "1");
            goban.setMarkByPrettyCoordinates("h5", "2");
            goban.setMarkByPrettyCoordinates("h6", "3");
            goban.setMarkByPrettyCoordinates("h4", "4");
            goban.setMarkByPrettyCoordinates("h3", "5");
            goban.setMarkByPrettyCoordinates("j5", "6");
            goban.setMarkByPrettyCoordinates("j6", "7");
            goban.setMarkByPrettyCoordinates("j4", "8");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("j3");
            goban.setMarkByPrettyCoordinates("f5", "1");
            goban.setMarkByPrettyCoordinates("h5", "2");
            goban.setMarkByPrettyCoordinates("h6", "3");
            goban.setMarkByPrettyCoordinates("h4", "4");
            goban.setMarkByPrettyCoordinates("h3", "5");
            goban.setMarkByPrettyCoordinates("j5", "6");
            goban.setMarkByPrettyCoordinates("j6", "7");
            goban.setMarkByPrettyCoordinates("j4", "8");
            goban.setMarkByPrettyCoordinates("j3", "9");
        });
    }
}

class Page10 extends Module6 {
    constructor() {
        super("no_audio_here");
    }
    text(): JSX.Element | Array<JSX.Element> {
        return [
            <p>
                Of the five Blue stones, only two of them are actually connected to each other. So
                White can turn the tables by playing atari at 1. If Blue connects at 2, White 3 can
                atari again. If Black ataris with 4, White adds a stone at 5. If Blue next tries to
                capture with 6, White captures first at 7.
            </p>,
            // <p>
            //     Don't just run away when you are in a fight and don't attack without watching your
            //     own connections. Count the liberties in yoru groups and in those surrounding you.
            // </p>,
        ];
    }
    config(): PuzzleConfig {
        return {
            puzzle_player_move_mode: "fixed",
            width: 9,
            height: 9,
            initial_state: {
                black: "h3g4f5g6h6",
                white: "h4h5g5",
            },
        };
    }
    onSetGoban(goban: Goban): void {
        this.delay(() => {
            goban.editPlaceByPrettyCoordinates("g3", JGOFNumericPlayerColor.WHITE);
            goban.setMarkByPrettyCoordinates("g3", "1");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("f4");
            goban.setMarkByPrettyCoordinates("g3", "1");
            goban.setMarkByPrettyCoordinates("f4", "2");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("h2");
            goban.setMarkByPrettyCoordinates("g3", "1");
            goban.setMarkByPrettyCoordinates("f4", "2");
            goban.setMarkByPrettyCoordinates("h2", "3");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("f3");
            goban.setMarkByPrettyCoordinates("g3", "1");
            goban.setMarkByPrettyCoordinates("f4", "2");
            goban.setMarkByPrettyCoordinates("h2", "3");
            goban.setMarkByPrettyCoordinates("f3", "4");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("g2");
            goban.setMarkByPrettyCoordinates("g3", "1");
            goban.setMarkByPrettyCoordinates("f4", "2");
            goban.setMarkByPrettyCoordinates("h2", "3");
            goban.setMarkByPrettyCoordinates("f3", "4");
            goban.setMarkByPrettyCoordinates("g2", "5");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("j5");
            goban.setMarkByPrettyCoordinates("g3", "1");
            goban.setMarkByPrettyCoordinates("f4", "2");
            goban.setMarkByPrettyCoordinates("h2", "3");
            goban.setMarkByPrettyCoordinates("f3", "4");
            goban.setMarkByPrettyCoordinates("g2", "5");
            goban.setMarkByPrettyCoordinates("j5", "6");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("j3");
            goban.setMarkByPrettyCoordinates("g3", "1");
            goban.setMarkByPrettyCoordinates("f4", "2");
            goban.setMarkByPrettyCoordinates("h2", "3");
            goban.setMarkByPrettyCoordinates("f3", "4");
            goban.setMarkByPrettyCoordinates("g2", "5");
            goban.setMarkByPrettyCoordinates("j5", "6");
            goban.setMarkByPrettyCoordinates("j3", "7");
        });
    }
}

class Page11 extends Module6 {
    constructor() {
        super("no_audio_here");
    }
    text(): JSX.Element | Array<JSX.Element> {
        return [
            <p>
                The one space jump is still a good connection if Blue plays atari on the second line
                and, when White extends out, connects at 3. White could try cutting at 4, but would
                be pushed into the edge by 5 and caught.
            </p>,
        ];
    }
    config(): PuzzleConfig {
        return {
            puzzle_player_move_mode: "fixed",
            width: 9,
            height: 9,
            initial_state: {
                black: "g4g6",
                white: "g5",
            },
        };
    }
    onSetGoban(goban: Goban): void {
        this.delay(() => {
            goban.placeByPrettyCoordinates("h5");
            goban.setMarkByPrettyCoordinates("h5", "1");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("f5");
            goban.setMarkByPrettyCoordinates("h5", "1");
            goban.setMarkByPrettyCoordinates("f5", "2");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("h4");
            goban.setMarkByPrettyCoordinates("h5", "1");
            goban.setMarkByPrettyCoordinates("f5", "2");
            goban.setMarkByPrettyCoordinates("h4", "3");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("h6");
            goban.setMarkByPrettyCoordinates("h5", "1");
            goban.setMarkByPrettyCoordinates("f5", "2");
            goban.setMarkByPrettyCoordinates("h4", "3");
            goban.setMarkByPrettyCoordinates("h6", "4");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("h7");
            goban.setMarkByPrettyCoordinates("h5", "1");
            goban.setMarkByPrettyCoordinates("f5", "2");
            goban.setMarkByPrettyCoordinates("h4", "3");
            goban.setMarkByPrettyCoordinates("h6", "4");
            goban.setMarkByPrettyCoordinates("h7", "5");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("j6");
            goban.setMarkByPrettyCoordinates("h5", "1");
            goban.setMarkByPrettyCoordinates("f5", "2");
            goban.setMarkByPrettyCoordinates("h4", "3");
            goban.setMarkByPrettyCoordinates("h6", "4");
            goban.setMarkByPrettyCoordinates("h7", "5");
            goban.setMarkByPrettyCoordinates("j6", "6");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("j7");
            goban.setMarkByPrettyCoordinates("h5", "1");
            goban.setMarkByPrettyCoordinates("f5", "2");
            goban.setMarkByPrettyCoordinates("h4", "3");
            goban.setMarkByPrettyCoordinates("h6", "4");
            goban.setMarkByPrettyCoordinates("h7", "5");
            goban.setMarkByPrettyCoordinates("j6", "6");
            goban.setMarkByPrettyCoordinates("j7", "7");
        });
    }
}

class Page12 extends Module6 {
    constructor() {
        super("no_audio_here");
    }
    text(): JSX.Element | Array<JSX.Element> {
        return [
            <p>
                Let's look at the knight's move. It has the same shape as a knight's move in chess.
            </p>,
            <p>
                This move is good because you can usually capture your opponent if they try to cut.
            </p>,
        ];
    }
    config(): PuzzleConfig {
        return {
            puzzle_player_move_mode: "fixed",
            width: 9,
            height: 9,
            initial_state: {
                black: "g4h6",
                white: "",
            },
        };
    }
}

class Page13 extends Module6 {
    constructor() {
        super("no_audio_here");
    }
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>If White tries to cut here, capturing the group is easy.</p>];
    }
    config(): PuzzleConfig {
        return {
            puzzle_player_move_mode: "fixed",
            width: 9,
            height: 9,
            initial_state: {
                black: "g4h6",
                white: "",
            },
        };
    }
    onSetGoban(goban: Goban): void {
        this.delay(() => {
            goban.editPlaceByPrettyCoordinates("h5", JGOFNumericPlayerColor.WHITE);
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("g5");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("h4");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("h3");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("j3");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("j5");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("j4");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("j2");
        });
    }
}

class Page14 extends Module6 {
    constructor() {
        super("no_audio_here");
    }
    text(): JSX.Element | Array<JSX.Element> {
        return [
            <p>
                Trying to cut here also fails. The stone in atari on the second line can't escape
                capture (as we saw earlier).
            </p>,
        ];
    }
    config(): PuzzleConfig {
        return {
            puzzle_player_move_mode: "fixed",
            width: 9,
            height: 9,
            initial_state: {
                black: "g4h6",
                white: "",
            },
        };
    }
    onSetGoban(goban: Goban): void {
        this.delay(() => {
            goban.editPlaceByPrettyCoordinates("h5", JGOFNumericPlayerColor.WHITE);
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("g5");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("g6");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("h4");
        });
    }
}

class Page15 extends Module6 {
    constructor() {
        super("no_audio_here");
    }
    text(): JSX.Element | Array<JSX.Element> {
        return [
            <p>
                If the knights move is away from the side, Blue can capture a cutting stone with a
                pattern we call a ladder.
            </p>,
        ];
    }
    config(): PuzzleConfig {
        return {
            puzzle_player_move_mode: "fixed",
            width: 9,
            height: 9,
            initial_state: {
                black: "f4g6",
                white: "",
            },
        };
    }
    onSetGoban(goban: Goban): void {
        this.delay(() => {
            goban.editPlaceByPrettyCoordinates("g5", JGOFNumericPlayerColor.WHITE);
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("f5");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("f6");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("h5");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("g4");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("g3");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("h4");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("j4");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("h3");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("h2");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("j3");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("j2");
        });
    }
}

class Page16 extends Module6 {
    constructor() {
        super("no_audio_here");
    }
    text(): JSX.Element | Array<JSX.Element> {
        return [
            <p>
                The two space jump is a looser connection, but it still works here. If White tries
                to cut, the cutting stones can be captured quickly.
            </p>,
        ];
    }
    config(): PuzzleConfig {
        return {
            puzzle_player_move_mode: "fixed",
            width: 9,
            height: 9,
            initial_state: {
                black: "h3h6",
                white: "",
            },
        };
    }
    onSetGoban(goban: Goban): void {
        this.delay(() => {
            goban.editPlaceByPrettyCoordinates("h5", JGOFNumericPlayerColor.WHITE);
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("g5");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("h4");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("g4");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("j6");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("j4");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("j5");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("j7");
        });
    }
}

class Page17 extends Module6 {
    constructor() {
        super("no_audio_here");
    }
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Trying to cut this way also fails, as long as you play atari at A.</p>];
    }
    config(): PuzzleConfig {
        return {
            puzzle_player_move_mode: "fixed",
            width: 9,
            height: 9,
            initial_state: {
                black: "h3h6",
                white: "",
            },
        };
    }
    onSetGoban(goban: Goban): void {
        this.delay(() => {
            goban.editPlaceByPrettyCoordinates("h4", JGOFNumericPlayerColor.WHITE);
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("g4");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("g3");
        });
        this.delay(() => {
            goban.placeByPrettyCoordinates("h5");
            goban.setMarkByPrettyCoordinates("h5", "A");
        });
    }
}

class Page18 extends Module6 {
    constructor() {
        super("no_audio_here");
    }
    text(): JSX.Element | Array<JSX.Element> {
        return [
            <p>
                If the two space jump is on the third line, or anywhere further from the edge, it
                can be cut.
            </p>,
            <p>
                It's more complicated, but the fight will usually favor Blue because Blue has more
                stones nearby.
            </p>,
        ];
    }
    config(): PuzzleConfig {
        return {
            puzzle_player_move_mode: "fixed",
            width: 9,
            height: 9,
            initial_state: {
                black: "c3f3",
                white: "d3",
            },
        };
    }
}

class Page19 extends Module6 {
    constructor() {
        super("no_audio_here");
    }

    text(): JSX.Element | Array<JSX.Element> {
        return [
            <p>
                There are many other common shapes in Go. The tiger's mouth, the large knights move,
                the horse's neck, the elephant's eye, the bamboo joint, and many others.
            </p>,
            <p>Learning about shapes and patterns and how they work in Go is fun!</p>,
        ];
    }
    config(): PuzzleConfig {
        return {
            puzzle_player_move_mode: "fixed",
            width: 9,
            height: 9,
            initial_state: {
                black: "",
                white: "",
            },
        };
    }
    onSetGoban(goban: Goban): void {
        this.delay(() => {
            goban.editPlaceByPrettyCoordinates("f8", JGOFNumericPlayerColor.BLACK);
            goban.editPlaceByPrettyCoordinates("g9", JGOFNumericPlayerColor.BLACK);
            goban.editPlaceByPrettyCoordinates("h8", JGOFNumericPlayerColor.BLACK);
            goban.setMarkByPrettyCoordinates("f8", "triangle");
            goban.setMarkByPrettyCoordinates("g9", "triangle");
            goban.setMarkByPrettyCoordinates("h8", "triangle");
        }, 1000);

        this.delay(() => {
            goban.editPlaceByPrettyCoordinates("e3", JGOFNumericPlayerColor.BLACK);
            goban.editPlaceByPrettyCoordinates("h2", JGOFNumericPlayerColor.BLACK);
            goban.setMarkByPrettyCoordinates("e3", "triangle");
            goban.setMarkByPrettyCoordinates("h2", "triangle");
        }, 3000);

        this.delay(() => {
            goban.editPlaceByPrettyCoordinates("b8", JGOFNumericPlayerColor.BLACK);
            goban.editPlaceByPrettyCoordinates("b6", JGOFNumericPlayerColor.BLACK);
            goban.editPlaceByPrettyCoordinates("d7", JGOFNumericPlayerColor.BLACK);
            goban.setMarkByPrettyCoordinates("b8", "triangle");
            goban.setMarkByPrettyCoordinates("b6", "triangle");
            goban.setMarkByPrettyCoordinates("d7", "triangle");
        }, 3000);

        this.delay(() => {
            goban.editPlaceByPrettyCoordinates("f6", JGOFNumericPlayerColor.BLACK);
            goban.editPlaceByPrettyCoordinates("h4", JGOFNumericPlayerColor.BLACK);
            goban.setMarkByPrettyCoordinates("f6", "triangle");
            goban.setMarkByPrettyCoordinates("h4", "triangle");
        }, 3000);

        this.delay(() => {
            goban.editPlaceByPrettyCoordinates("b2", JGOFNumericPlayerColor.BLACK);
            goban.editPlaceByPrettyCoordinates("c2", JGOFNumericPlayerColor.BLACK);
            goban.editPlaceByPrettyCoordinates("b4", JGOFNumericPlayerColor.BLACK);
            goban.editPlaceByPrettyCoordinates("c4", JGOFNumericPlayerColor.BLACK);
            goban.setMarkByPrettyCoordinates("b2", "triangle");
            goban.setMarkByPrettyCoordinates("c2", "triangle");
            goban.setMarkByPrettyCoordinates("b4", "triangle");
            goban.setMarkByPrettyCoordinates("c4", "triangle");
        }, 3000);

        // Clear triangle markings on the bamboo joint shape after the animation
        this.delay(() => {
            const coords = ["b2", "c2", "b4", "c4"];
            for (const coord of coords) {
                for (const mv of goban.engine.decodeMoves(coord)) {
                    delete goban.getMarks(mv.x, mv.y)["triangle"];
                }
            }
        }, 3000);
    }
}

export const module6: Array<typeof Content> = [
    Page1,
    Page2,
    Page3,
    Page4,
    Page5,
    Page6,
    Page7,
    Page8,
    Page9,
    Page10,
    Page11,
    Page12,
    Page13,
    Page14,
    Page15,
    Page16,
    Page17,
    Page18,
    Page19,
];
