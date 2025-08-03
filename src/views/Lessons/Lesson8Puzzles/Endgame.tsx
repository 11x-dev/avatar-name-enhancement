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
import { Content } from "../Content";
import { PuzzleConfig, Goban } from "goban";
import { Axol } from "../Axol";
import { openPopup } from "../../../components/PopupDialog";

const POPUP_TIMEOUT = 1500;

class Puzzle1 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Endgame 1</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "a5b5c5c4d4e4e3f3g3h3j3j4j5j6",
                white: "a6b6c6d6d7e6f5f6g4g5h4h5h6h7j7",
            },

            move_tree: this.makePuzzleMoveTree(["d5e5f4", "e5d5f4", "f4d5e5"], [""], 9, 9),
        };
    }
    onSetGoban(goban: Goban): void {
        goban.on("puzzle-correct-answer", () => {
            new Promise<void>((resolve) => {
                setTimeout(resolve, 1000);
            })
                .then(() => {
                    return openPopup({
                        text: <Axol>Solved!</Axol>,
                        no_accept: true,
                        no_cancel: true,
                        timeout: POPUP_TIMEOUT,
                    });
                })
                .then(() => {
                    this.gotoNext();
                })
                .catch(() => 0);
        });
        goban.on("puzzle-wrong-answer", () => {
            new Promise<void>((resolve) => {
                setTimeout(resolve, 1000);
            })
                .then(() => {
                    return openPopup({
                        text: <Axol>Try again!</Axol>,
                        no_accept: true,
                        no_cancel: true,
                        timeout: POPUP_TIMEOUT,
                    });
                })
                .then(() => {
                    this.resetGoban?.();
                })
                .catch(() => 0);
        });
    }
}

class Puzzle2 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Endgame 2</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "a5b5c5c4d4e4e3f3g3h3j3j4j5j6",
                white: "a6b6c6d6d5e6f4f6g4g5h4h5h6h7j7",
            },

            move_tree: this.makePuzzleMoveTree(["e5f5"], ["f5e5"], 9, 9),
        };
    }
    onSetGoban(goban: Goban): void {
        goban.on("puzzle-correct-answer", () => {
            new Promise<void>((resolve) => {
                setTimeout(resolve, 1000);
            })
                .then(() => {
                    return openPopup({
                        text: <Axol>Solved!</Axol>,
                        no_accept: true,
                        no_cancel: true,
                        timeout: POPUP_TIMEOUT,
                    });
                })
                .then(() => {
                    this.gotoNext();
                })
                .catch(() => 0);
        });
        goban.on("puzzle-wrong-answer", () => {
            new Promise<void>((resolve) => {
                setTimeout(resolve, 1000);
            })
                .then(() => {
                    return openPopup({
                        text: <Axol>Try again!</Axol>,
                        no_accept: true,
                        no_cancel: true,
                        timeout: POPUP_TIMEOUT,
                    });
                })
                .then(() => {
                    this.resetGoban?.();
                })
                .catch(() => 0);
        });
    }
}

class Puzzle3 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Endgame 3</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "a5b5c5c4d4e4e3f3g3h3",
                white: "a6b6c6d6d5e5f4g4g5h4h6j4",
            },

            move_tree: this.makePuzzleMoveTree(["j3"], [""], 9, 9),
        };
    }
    onSetGoban(goban: Goban): void {
        goban.on("puzzle-correct-answer", () => {
            new Promise<void>((resolve) => {
                setTimeout(resolve, 1000);
            })
                .then(() => {
                    return openPopup({
                        text: <Axol>Solved!</Axol>,
                        no_accept: true,
                        no_cancel: true,
                        timeout: POPUP_TIMEOUT,
                    });
                })
                .then(() => {
                    this.gotoNext();
                })
                .catch(() => 0);
        });
        goban.on("puzzle-wrong-answer", () => {
            new Promise<void>((resolve) => {
                setTimeout(resolve, 1000);
            })
                .then(() => {
                    return openPopup({
                        text: <Axol>Try again!</Axol>,
                        no_accept: true,
                        no_cancel: true,
                        timeout: POPUP_TIMEOUT,
                    });
                })
                .then(() => {
                    this.resetGoban?.();
                })
                .catch(() => 0);
        });
    }
}

class Puzzle4 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Endgame 4</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "a5b5c8c5c4d5e5d4e4e3f3g3h3j3j4j5j6",
                white: "a6b6c6c7d8d7e7e6f6f5f4g6h5h6h7j7",
            },

            move_tree: this.makePuzzleMoveTree(["g4g5h4d6", "g4g5d6h4"], ["h4g4", "d6g4"], 9, 9),
        };
    }
    onSetGoban(goban: Goban): void {
        goban.on("puzzle-correct-answer", () => {
            new Promise<void>((resolve) => {
                setTimeout(resolve, 1000);
            })
                .then(() => {
                    return openPopup({
                        text: <Axol>Solved!</Axol>,
                        no_accept: true,
                        no_cancel: true,
                        timeout: POPUP_TIMEOUT,
                    });
                })
                .then(() => {
                    this.gotoNext();
                })
                .catch(() => 0);
        });
        goban.on("puzzle-wrong-answer", () => {
            new Promise<void>((resolve) => {
                setTimeout(resolve, 1000);
            })
                .then(() => {
                    return openPopup({
                        text: <Axol>Try again!</Axol>,
                        no_accept: true,
                        no_cancel: true,
                        timeout: POPUP_TIMEOUT,
                    });
                })
                .then(() => {
                    this.resetGoban?.();
                })
                .catch(() => 0);
        });
    }
}

class Puzzle5 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Endgame 5</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "a5b5c8c5c4d5e5d4e4e3f3g3h3j3j4j5j6",
                white: "a6b6c6d8d7e7e6f6f5g5h5h6h7j7",
            },

            move_tree: this.makePuzzleMoveTree(
                ["d6c7f4g4h4", "d6c7g4f4h4", "d6c7h4f4g4"],
                ["f4d6", "g4d6", "h4d6"],
                9,
                9,
            ),
        };
    }

    onSetGoban(goban: Goban): void {
        goban.on("puzzle-correct-answer", () => {
            new Promise<void>((resolve) => {
                setTimeout(resolve, 1000);
            })
                .then(() => {
                    return openPopup({
                        text: <Axol>Solved!</Axol>,
                        no_accept: true,
                        no_cancel: true,
                        timeout: POPUP_TIMEOUT,
                    });
                })
                .then(() => {
                    this.gotoNext();
                })
                .catch(() => 0);
        });
        goban.on("puzzle-wrong-answer", () => {
            new Promise<void>((resolve) => {
                setTimeout(resolve, 1000);
            })
                .then(() => {
                    return openPopup({
                        text: <Axol>Try again!</Axol>,
                        no_accept: true,
                        no_cancel: true,
                        timeout: POPUP_TIMEOUT,
                    });
                })
                .then(() => {
                    this.resetGoban?.();
                })
                .catch(() => 0);
        });
    }
}

class Puzzle6 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Endgame 6</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "a5b5c5c3d4e4f5g5h5h4j3",
                white: "a6b6c6d5d6e5e7f6g6h6j6j5j4",
            },

            move_tree: this.makePuzzleMoveTree(
                ["h3", "h2", "g3"],
                ["f4h3j2h2j1h1", "f3h3j2h2j1h1"],
                9,
                9,
            ),
        };
    }
    onSetGoban(goban: Goban): void {
        goban.on("puzzle-correct-answer", () => {
            new Promise<void>((resolve) => {
                setTimeout(resolve, 1000);
            })
                .then(() => {
                    return openPopup({
                        text: <Axol>Solved!</Axol>,
                        no_accept: true,
                        no_cancel: true,
                        timeout: POPUP_TIMEOUT,
                    });
                })
                .then(() => {
                    this.gotoNext();
                })
                .catch(() => 0);
        });
        goban.on("puzzle-wrong-answer", () => {
            new Promise<void>((resolve) => {
                setTimeout(resolve, 1000);
            })
                .then(() => {
                    return openPopup({
                        text: <Axol>Try again!</Axol>,
                        no_accept: true,
                        no_cancel: true,
                        timeout: POPUP_TIMEOUT,
                    });
                })
                .then(() => {
                    this.resetGoban?.();
                })
                .catch(() => 0);
        });
    }
}

class Puzzle7 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Endgame 7</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "a4a5a6b4b5c5d3d5d6d7e4f4f5f6g3g4h1h2",
                white: "a7b6b8c6c7d8e5e6e7f7g7g6g5h4h3j2",
            },

            move_tree: this.makePuzzleMoveTree(
                ["g2j3j1h5", "f2j3j1h5"],
                ["j1g2j3g1j2j4", "j1g2j3g1f2j2", "j1g2j3g1h5j2", "j1g2g1f1", "j1g2f2g1"],
                9,
                9,
            ),
        };
    }
    onSetGoban(goban: Goban): void {
        goban.on("puzzle-correct-answer", () => {
            new Promise<void>((resolve) => {
                setTimeout(resolve, 1000);
            })
                .then(() => {
                    return openPopup({
                        text: <Axol>Solved!</Axol>,
                        no_accept: true,
                        no_cancel: true,
                        timeout: POPUP_TIMEOUT,
                    });
                })
                .then(() => {
                    this.gotoNext();
                })
                .catch(() => 0);
        });
        goban.on("puzzle-wrong-answer", () => {
            new Promise<void>((resolve) => {
                setTimeout(resolve, 1000);
            })
                .then(() => {
                    return openPopup({
                        text: <Axol>Try again!</Axol>,
                        no_accept: true,
                        no_cancel: true,
                        timeout: POPUP_TIMEOUT,
                    });
                })
                .then(() => {
                    this.resetGoban?.();
                })
                .catch(() => 0);
        });
    }
}

class Puzzle8 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Endgame 8</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "a5a6b4b5c3c4d3e2f2f3f4g5h3h5h6j6",
                white: "a7b7b6c6c5d4d5d7e3e4e7e8f8f5g6g8h7j7",
            },

            move_tree: this.makePuzzleMoveTree(["f6g7e5e6f5f7"], ["e5e6", "g7f7", "g4f6"], 9, 9),
        };
    }
    onSetGoban(goban: Goban): void {
        goban.on("puzzle-correct-answer", () => {
            new Promise<void>((resolve) => {
                setTimeout(resolve, 1000);
            })
                .then(() => {
                    return openPopup({
                        text: <Axol>Solved!</Axol>,
                        no_accept: true,
                        no_cancel: true,
                        timeout: POPUP_TIMEOUT,
                    });
                })
                .then(() => {
                    this.gotoNext();
                })
                .catch(() => 0);
        });

        goban.on("puzzle-wrong-answer", () => {
            new Promise<void>((resolve) => {
                setTimeout(resolve, 1000);
            })
                .then(() => {
                    return openPopup({
                        text: <Axol>Try again!</Axol>,
                        no_accept: true,
                        no_cancel: true,
                        timeout: POPUP_TIMEOUT,
                    });
                })
                .then(() => {
                    this.resetGoban?.();
                })
                .catch(() => 0);
        });
    }
}
class Puzzle9 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Endgame 9</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "a5a6b4b5c3c4d3d6e2f2f3f4g3g5h3h4h5h6j6",
                white: "a7b7b6c2c6c5d2d4d5d7e3e4f5f6g6g8h7j7",
            },

            move_tree: this.makePuzzleMoveTree(["b2b3a3"], ["d1b3", "e6b3"], 9, 9),
        };
    }
    onSetGoban(goban: Goban): void {
        goban.on("puzzle-correct-answer", () => {
            this.captureDelay(() => {
                openPopup({
                    text: <Axol>Solved!</Axol>,
                    no_accept: true,
                    no_cancel: true,
                    timeout: POPUP_TIMEOUT,
                })
                    .then(() => {
                        this.gotoNext();
                    })
                    .catch(() => 0);
            });
        });
        goban.on("puzzle-wrong-answer", () => {
            new Promise<void>((resolve) => {
                setTimeout(resolve, 1000);
            })
                .then(() => {
                    return openPopup({
                        text: <Axol>Try again!</Axol>,
                        no_accept: true,
                        no_cancel: true,
                        timeout: POPUP_TIMEOUT,
                    });
                })
                .then(() => {
                    this.resetGoban?.();
                })
                .catch(() => 0);
        });
    }
}
class Puzzle10 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Endgame 10</p>];
    }

    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "a4b4c4d3e3e4e5f3f5g6h6h7h8h9",
                white: "a5b5c3c5d4d5d6e6f6g7g8g9",
            },
            move_tree: this.makePuzzleMoveTree(
                ["b3c2b2b1d2c1d1a2a1", "b3c2b2b1d2c1a2a1d1", "b3c2b2b1a2c1d2a1d1"],
                ["c2b3b2a3", "c2b3a3a2", "b3c2d2b2a3a2"],
                9,
                9,
            ),
        };
    }
    onSetGoban(goban: Goban): void {
        goban.on("puzzle-correct-answer", () => {
            this.captureDelay(() => {
                openPopup({
                    text: <Axol>Solved!</Axol>,
                    no_accept: true,
                    no_cancel: true,
                    timeout: POPUP_TIMEOUT,
                })
                    .then(() => {
                        this.gotoNext();
                    })
                    .catch(() => 0);
            });
        });
        goban.on("puzzle-wrong-answer", () => {
            new Promise<void>((resolve) => {
                setTimeout(resolve, 1000);
            })
                .then(() => {
                    return openPopup({
                        text: <Axol>Try again!</Axol>,
                        no_accept: true,
                        no_cancel: true,
                        timeout: POPUP_TIMEOUT,
                    });
                })
                .then(() => {
                    this.resetGoban?.();
                })
                .catch(() => 0);
        });
    }
}

export const Endgame: Array<typeof Content> = [
    Puzzle1,
    Puzzle2,
    Puzzle3,
    Puzzle4,
    Puzzle5,
    Puzzle6,
    Puzzle7,
    Puzzle8,
    Puzzle9,
    Puzzle10,
];
