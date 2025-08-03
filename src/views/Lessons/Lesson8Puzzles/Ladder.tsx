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
        return [<p>Ladder 1</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "e7e6e5f5g5g6c4d4d3",
                white: "d8d7d6d5e4f4g4h5f6f7",
            },

            move_tree: this.makePuzzleMoveTree(
                [
                    "f8g7h7g8h8g9h9f9e9",
                    "f8g7h7g8h8g9f9e8h9",
                    "f8g7h7g8g9h8j8h9j9",
                    "f8g7h7g8g9h8h9j8j7h6j9",
                    "f8g7h7g8h8g9e8h6h9f9e9",
                ],
                [
                    "f8g7h7g8g9h8h9j8j9f9",
                    "f8g7h7g8h8g9h6e8",
                    "f8g7g8h7h6e8",
                    "f8g7g8h7e8h6",
                    "g7f8e8e9g8f9g9d9",
                    "g7f8g8e8",
                ],
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

class Puzzle2 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Ladder 2</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "e4d3c3c4c5",
                white: "b3b4b5b6c8c7d4d5",
            },

            move_tree: this.makePuzzleMoveTree(
                [
                    "d6e5f5e6e7f6g6f7f8g7h7g8h8g9h9g5f9",
                    "d6e5f5e6e7f6g6f7f8g7h7g8h8g9f9g5h9",
                    "d6e5f5e6e7f6g6f7f8g7h7g8g9h8j8g5h9",
                    "d6e5f5e6e7f6g6f7f8g7h7g8g9h8h9j8j7g5j9",
                ],
                [
                    "e5d6",
                    "d6e5f5e6e7f6g6f7f8g7h7g8g9h8h9j8j9f9",
                    "d6e5f5e6e7f6g6f7f8g7h7g8g9h8h9j8j7g5h6f4",
                    "d6e5f5e6e7f6g6f7f8g7h7g8g9h8h9j8j7g5f4h6",
                    "d6e5f5e6e7f6g6f7f8g7h7g8g9h8j8g5f4h6",
                    "d6e5f5e6e7f6g6f7f8g7h7g8g9h8j8g5h6f4",
                    "d6e5f5e6e7f6g6f7f8g7h7g8h8g9f9g5f4h6",
                    "d6e5f5e6e7f6g6f7f8g7h7g8h8g9f9g5h6f4",
                    "d6e5f5e6e7f6g6f7f8g7h7g8h8g9h9g5h6f4",
                    "d6e5f5e6e7f6g6f7f8g7h7g8h8g9h9g5f4h6",
                ],
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

class Puzzle3 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Ladder 3</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "e8e7d6d5b3c3d2",
                white: "g7d8c8d7b7c6c4e6b4",
            },

            move_tree: this.makePuzzleMoveTree(
                [
                    "f6e5e4f5g5f4f3g4h4g3g2h3h2j3j2e3j4",
                    "f6e5e4f5g5f4f3g4h4g3g2h3h2j3j4e3j2",
                    "f6e5e4f5g5f4f3g4h4g3g2h3j3h2j2h1g1e3j1",
                    "f6e5e4f5g5f4f3g4h4g3g2h3j3h2h1e3j2",
                ],
                [
                    "e5f6",
                    "f6e5e4f5g5f4f3g4h4g3g2h3h2j3j2e3d4f2",
                    "f6e5e4f5g5f4f3g4h4g3g2h3h2j3j2e3f2d4",
                    "f6e5e4f5g5f4f3g4h4g3g2h3h2j3j4e3d4f2",
                    "f6e5e4f5g5f4f3g4h4g3g2h3h2j3j4e3f2d4",
                    "f6e5e4f5g5f4f3g4h4g3g2h3j3h2j2h1j1j4",
                    "f6e5e4f5g5f4f3g4h4g3g2h3j3h2j2h1g1e3d4f2",
                    "f6e5e4f5g5f4f3g4h4g3g2h3j3h2j2h1g1e3f2d4",
                    "f6e5e4f5g5f4f3g4h4g3g2h3j3h2h1e3d4f2",
                    "f6e5e4f5g5f4f3g4h4g3g2h3j3h2h1e3f2d4",
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

class Puzzle4 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Ladder 4</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "c3e3f3g4g5h5e6h7b3",
                white: "b4c6d7e5f4f6f7g3f2h3h4h2",
            },

            move_tree: this.makePuzzleMoveTree(
                ["f5e4d5d4c4d3d2"],
                ["e4f5", "f5e4d4d5c5d6", "f5e4d4d5d6e7", "f5e4d5d4d3c4"],
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

class Puzzle5 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Ladder 5</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "e8e7d6d5d4b3c2a2b1",
                white: "g7d8d7c5c6c4c3e6b7c8",
            },
            move_tree: this.makePuzzleMoveTree(
                [
                    "f6e5e4f5g5f4f3g4h4g3g2h3h2j3j2e3j4",
                    "f6e5e4f5g5f4f3g4h4g3g2h3h2j3j4e3j2",
                    "f6e5e4f5g5f4f3g4h4g3g2h3j3h2j2h1g1e3j1",
                    "f6e5e4f5g5f4f3g4h4g3g2h3j3h2h1e3j2",
                ],
                [
                    "e5f6",
                    "f6e5f5e4e3d3",
                    "f6e5f5e4f4d3",
                    "f6e5f5e4d3f4",
                    "f6e5e4f5g5f4f3g4h4g3g2h3h2j3j2e3d3d2",
                    "f6e5e4f5g5f4f3g4h4g3g2h3h2j3j2e3f2d3",
                    "f6e5e4f5g5f4f3g4h4g3g2h3h2j3j4e3d3d2",
                    "f6e5e4f5g5f4f3g4h4g3g2h3h2j3j4e3f2d3",
                    "f6e5e4f5g5f4f3g4h4g3g2h3j3h2j2h1j1j4",
                    "f6e5e4f5g5f4f3g4h4g3g2h3j3h2j2h1g1e3d3d2",
                    "f6e5e4f5g5f4f3g4h4g3g2h3j3h2j2h1g1e3f2d3",
                    "f6e5e4f5g5f4f3g4h4g3g2h3j3h2h1e3d3d2",
                    "f6e5e4f5g5f4f3g4h4g3g2h3j3h2h1e3f2d3",
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

class Puzzle6 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Ladder 6</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "e8e7d6d5d4d3f2h2c2b2b3f8",
                white: "f7g7d8c8d7b7c5c6c4c3e6h6h4g8",
            },

            move_tree: this.makePuzzleMoveTree(
                ["f6e5f5e4e3f4g4e9f3"],
                [
                    "e5f6",
                    "f6e5e4f5g5g6",
                    "f6e5e4f5f4g6",
                    "f6e5f5e4e3f4g4e9f9g9",
                    "f6e5f5e4f4e3d2e9f3f9",
                    "f6e5f5e4f4e3d2e9e2f9",
                    "f6e5f5e4f4e3f3d2",
                    "f6e5f5e4f4e3e2d2",
                ],
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

class Puzzle7 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Ladder 7</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "f3e2d3d4e6e7",
                white: "h3e3e4g5g6f6f7f8",
            },

            move_tree: this.makePuzzleMoveTree(
                [
                    "f4e5f5d5c5d6d7c6b6c7c8b7b8a7a8b5a6",
                    "f4e5f5d5c5d6d7c6b6c7c8b7b8a7a6b5a8",
                    "f4e5f5d5c5d6d7c6b6c7c8b7a7b8a8b9c9b5a9",
                    "f4e5f5d5c5d6d7c6b6c7c8b7a7b8b9b5a8",
                ],
                [
                    "e5f4f5g4",
                    "e5f4g4f5",
                    "f4e5f5d5c5d6d7c6b6c7c8b7a7b8a8b9a9a6",
                    "f4e5f5d5c5d6c6d7d8e8",
                    "f4e5f5d5c5d6c6d7c7e8",
                    "f4e5f5d5c5d6c6d7e8d8e9d9f9g9",
                    "f4e5f5d5c5d6d7c6b6c7c8b7a7b8b9b5a6c4",
                    "f4e5f5d5c5d6d7c6b6c7c8b7a7b8b9b5c4a6",
                    "f4e5f5d5c5d6d7c6b6c7c8b7b8a7a8b5c4a6",
                    "f4e5f5d5c5d6d7c6b6c7c8b7b8a7a8b5a6c4",
                    "f4e5f5d5c5d6d7c6b6c7c8b7b8a7a6b5a5a4",
                    "f4e5f5d5c5d6d7c6b6c7c8b7b8a7a6b5c4a5",
                ],
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

class Puzzle8 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Ladder 8</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "g7g4g3f2e3d4d6d7",
                white: "h6f3f4e4c4c5c6c7c8f8e8g8",
            },

            move_tree: this.makePuzzleMoveTree(
                ["e5f5f6g5h5g6h7j6j7h4j5", "e5f5f6g5h5g6h7j6j5h4j7"],
                [
                    "f5e5d5e6e7f6f7g6",
                    "f5e5e6d5",
                    "f5e5d5e6f6e7",
                    "e5f5g5f6",
                    "e5f5f6g5g6h5",
                    "e5f5f6g5h5g6h7j6j5h4j4j3",
                ],
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
class Puzzle9 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Ladder 9</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "b5b6c6d5d7e3e7f3g5h3h4",
                white: "b2c7c8d2d4d6e2e6f2f7g2g7h7b7",
            },

            move_tree: this.makePuzzleMoveTree(
                ["f6e5e4c5f5d5d3c4c3b4b3a4a3a5a6"],
                [
                    "e5f6",
                    "f6e5f5e4",
                    "f6e5c5e8d8d9",
                    "f6e5c5e8e4d8",
                    "f6e5c5e8f5d8",
                    "f6e5e4c5f5d5c4d3",
                    "f6e5e4c5f5d5d3c4b4c3b3c2",
                    "f6e5e4c5f5d5d3c4b4c3c2c1",
                    "f6e5e4c5f5d5d3c4c3b4b3a4a5a6",
                ],
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

class Puzzle10 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Ladder 10</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "b7b6c7c8d9e8d3d4d5g3g4h5g6g7h7",
                white: "b3b5c2c5c6d2d7d8e3e4f6g2g8h2h5h6h8j3j4j7",
            },

            move_tree: this.makePuzzleMoveTree(
                ["d6e7f7e6e5f5g5f4e2f3f2"],
                [
                    "e7d6",
                    "d6e7e6f7f8g5",
                    "d6e7e6f7f5g5",
                    "d6e7f7e6f5e5",
                    "d6e7f7e6e5f5f4g5",
                    "d6e7f7e6e5f5g5f4f3e2",
                ],
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

export const Ladder: Array<typeof Content> = [
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
