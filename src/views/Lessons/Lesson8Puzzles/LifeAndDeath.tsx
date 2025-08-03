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
        return [<p>Life and death 1</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "e3f3g3g4g5g6g7f7e7d8c8b7b6b5c4d4",
                white: "e4f4f5f6e6d7c7c6d5",
            },

            move_tree: this.makePuzzleMoveTree(["c5d3d6"], [""], 9, 9),
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

class Puzzle2 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Life and death 2</p>];
    }

    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "b9b8b7d8c6d6e6f6f7g7g8g9",
                white: "c9c8c7d7e8f8f9",
            },

            move_tree: this.makePuzzleMoveTree(["d9e7e9"], ["e7d9"], 9, 9),
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

class Puzzle3 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Life and death 3</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "a7b7c7d7e8f8g8",
                white: "a8b8b9c8d8e9",
            },

            move_tree: this.makePuzzleMoveTree(["d9c9f9d9a9"], ["f9d9", "c9d9"], 9, 9),
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

class Puzzle4 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Life and death 4</p>];
    }
    config(): PuzzleConfig {
        const initialState = {
            black: "d9d8e8e7f7g7g8h8h9",
            white: "c9c8c7d7d6e6f6g6h6h7j7j8j9",
        };

        // The block below is used to generate all remaining valid moves (not including the ones in the movetree -> e9, f9, g9 and f8)
        // on the Go board so that white can respond with f9 to any of those moves, press the hint button to see the red squares
        const occupiedPositions = new Set();

        for (let i = 0; i < initialState.black.length; i += 2) {
            occupiedPositions.add(initialState.black.substring(i, i + 2));
        }

        for (let i = 0; i < initialState.white.length; i += 2) {
            occupiedPositions.add(initialState.white.substring(i, i + 2));
        }

        const otherMoves = [];
        const letters = "abcdefghj";
        const excludedMoves = ["e9", "f9", "g9", "f8"];

        for (const letter of letters) {
            for (let num = 1; num <= 9; num++) {
                const move = letter + num;
                if (!occupiedPositions.has(move) && !excludedMoves.includes(move)) {
                    otherMoves.push(move + "f9");
                }
            }
        }

        return {
            initial_state: initialState,
            move_tree: this.makePuzzleMoveTree(
                ["f9"],
                [
                    "f8f9e9g9",
                    "f8f9g9e9",
                    "e9f9f8g9",
                    "e9f9g9f8",
                    "g9f9f8e9",
                    "g9f9e9f8",
                    ...otherMoves,
                ],
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

class Puzzle5 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Life and death 5</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "j3h3g3f3d3e4e5d6f6f7f8g8j7",
                white: "j4h4g4f4f5h5j5g6h6g7h8h9j9",
            },

            move_tree: this.makePuzzleMoveTree(
                ["h7j6g5"],
                ["j8h7", "j6h7", "g9h7", "h7j6g9j8"],
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

class Puzzle6 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Life and death 6</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "a9b9a7b7c7c6d6e6f7f8f9",
                white: "a8b8c8d7e7e8e9",
            },

            move_tree: this.makePuzzleMoveTree(["d9d8c9"], ["c9d9", "d8d9"], 9, 9),
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

class Puzzle7 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Life and death 7</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "j7h7h6j5h5g5g4",
                white: "j8h8g8g7f6f5f4f3g3g2g1h4j4",
            },

            move_tree: this.makePuzzleMoveTree(["h3h2j3", "h3h2j2j3h3"], ["j3h3j2g6"], 9, 9),
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

class Puzzle8 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Life and death 8</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "g1f2f3e2d2d3d4e4",
                white: "c1c2c3c4c5d5e5f5f4g4g3g2h2e1",
            },

            move_tree: this.makePuzzleMoveTree(["d1h1f1"], ["f1d1", "h1d1"], 9, 9),
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

class Puzzle9 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Life and death 9</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "c9c8d8d7e7f7g8",
                white: "b9b8b7c7d6e6f6g7h7h8h9e8",
            },

            move_tree: this.makePuzzleMoveTree(
                ["e9f8f9g9f8"],
                ["e9f8g9d9", "e9f8f9g9e8f8", "f8e9", "g9f8e9d9", "g9f8f9d9", "g9f8d9e9"],
                //  [
                //     "e9f8g9d9",
                //     "e9f8f9g9e8f8",
                //     "f8e9f9g9d9e8e9e8",
                //     "f8e9g9f9d9e9f9e8",
                //     "f8e9g9f9d9e9e8f9",
                //     "g9f8e9d9",
                //     "g9f8f9d9",
                //     "g9f8d9e9",
                // ],
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

class Puzzle10 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Life and death 10</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "g9f8h8f7g6h6g5",
                white: "f9e9e8e7f6f5f4g4h3h5j5j6",
            },

            move_tree: this.makePuzzleMoveTree(
                ["h7j7j8"],
                ["j7g7h7g8", "j7g7g8h7", "g7j7j8h7", "j8g7g8h7", "j8g7h7g8"],
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

export const LifeAndDeath: Array<typeof Content> = [
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
    // Puzzle11,
];
