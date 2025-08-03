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
        return [<p>Random 1</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "f8f7e6d6d9c6c8b7b6",
                white: "h8g6g9f6e7e8e9d7c7b8",
            },

            move_tree: this.makePuzzleMoveTree(["f9g8d8"], ["d8c9", "b9f9", "f9g8g7h7"], 9, 9),
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
        return [<p>Random 2</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "c6d4d7d8e9f8f7f6g7h7h6",
                white: "b4c3d3d6e6e7e8f3f5g3g6g5g6h5",
            },

            move_tree: this.makePuzzleMoveTree(["e5d5c5"], ["d5e5", "e5d5e4c5"], 9, 9),
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
        return [<p>Random 3</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "j5h4h7h8g4g7f4f6e5e6",
                white: "j3j6j7h3h6g3g5g6f3f5e3e4",
            },

            move_tree: this.makePuzzleMoveTree(["j8j4h5"], ["h5j4", "j4h5"], 9, 9),
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
        return [<p>Random 4</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "j4j6j7j8h8g8g7g4g3f6e6e5",
                white: "h7h6h3h2g6g2f8f7f5f4f3f2d8d7",
            },

            move_tree: this.makePuzzleMoveTree(["g5h5h4j3j5"], ["h5g5", "g5h5j5h4"], 9, 9),
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
        return [<p>Random 5</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "g7g8f7e8e9d7d8c8c9",
                white: "h5h7h8h9g5f6f8e6e7d6c5c7b7b8b9",
            },

            move_tree: this.makePuzzleMoveTree(["g9g6f9"], ["f9g9g6h6f8d9"], 9, 9),
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
        return [<p>Random 6</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "a8b8c8d8e9",
                white: "a7b7c7d7d9e7f8f9",
            },

            move_tree: this.makePuzzleMoveTree(["e8c9b9"], ["c9e8d9b9a9b9"], 9, 9),
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
        return [<p>Random 7</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "h4h5h6g6f7e7e8e4d5d7c8c7c6b6",
                white: "h2h7h8g3g7g9g4g5f6f8f4e3e6d3d6c4c5",
            },

            move_tree: this.makePuzzleMoveTree(["f5e5f5"], ["e5f5"], 9, 9),
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
        return [<p>Random 8</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "b7b9c7d8d9",
                white: "a6b6b8c6d7e6e8e9",
            },

            move_tree: this.makePuzzleMoveTree(["a8c8c9"], ["c8a8a7c9"], 9, 9),
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
        return [<p>Random 9</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "c3d3e4d5g4e3f2h5f2",
                white: "d4c4b7c7f7g7b2c2d2e2a2b1h7",
            },

            move_tree: this.makePuzzleMoveTree(
                ["b4c5c6b5b6a5a4a6a7", "b4c5c6b5b6a5a6a4a3"],
                [
                    "c5b4b3a3b5a4",
                    "c5b4b3a3a4a5",
                    "b4c5c6b5a5b6",
                    "b4c5c6b5b6a5a6a4b3a3",
                    "b4c5c6b5b6a5a4a6d6a7",
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
        return [<p>Random 10</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "a3b4b6c3c7d3d4d6e5",
                white: "a5b2b3b5c2c4c5c6d5",
            },

            move_tree: this.makePuzzleMoveTree(["a6a4b4"], ["a4a2", "a6a4a2a1"], 9, 9),
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

class Puzzle11 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Random 11</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "j7j4j1h7h4h1g1g4g5g6f2f4e2e3c2",
                white: "j3j6h3h6h8g3g7f3f5f6f7e4e5c4",
            },

            move_tree: this.makePuzzleMoveTree(
                [
                    "g2j8h2h5j2",
                    "g2j8j2h5h2",
                    "h2j8g2h5j2",
                    "h2j8j2h5g2",
                    "j2j8h2h5g2",
                    "j2j8g2h5h2",
                ],
                [
                    "h5j5",
                    "j5h5",
                    "j8j9",
                    "g2j8h5j5",
                    "g2j8j5h5",
                    "h2j8h5j5",
                    "h2j8j5h5",
                    "j2j8h5j5",
                    "j2j8j5h5",
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

class Puzzle12 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Random 12</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "j6j7h6g5f5f8e5e6e7d8c9c7",
                white: "j8h7h9h8g8g9f6f7e8e9",
            },

            move_tree: this.makePuzzleMoveTree(
                ["g7f9g6f8d9d6j9"],
                ["d9f9g6g7", "g6g7d9f9", "d9f9g7g6"],
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

class Puzzle13 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Random 13</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "j5j6j7j8h8h9f7f8e9d8c8b7b6b5b4c3c2",
                white: "j4h4h5h6h7g6g7g8f6f3e7e8d6d3d2c6c4",
            },

            move_tree: this.makePuzzleMoveTree(["g9f9f8"], ["f9g9d9j9", "g9f9d9j9"], 9, 9),
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

class Puzzle14 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Random 14</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "f4f5f6f7e3e7d7d6b4",
                white: "a2a4b5e6e5e4c5c6c7",
            },

            move_tree: this.makePuzzleMoveTree(
                ["d5d4c4d3d2c3b3c2b2c1b1e2d1", "d5d4c4d3d2c3b3c2b2c1d1a3b1"],
                [
                    "d5d4c4d3d2c3b3c2b2c1b1e2f3d1",
                    "d5d4c4d3d2c3b3c2b2c1d1a3a1b1",
                    "d5d4c4d3d2c3c2b3",
                    "d4d5",
                    "d5d4d3c4",
                    "d5d4c4d3d2c3b3c2c1b2",
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

class Puzzle15 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Random 15</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "h4g2g4f3f5e2d3c3c5",
                white: "g5g6f4f7e3e4d4d7",
            },

            move_tree: this.makePuzzleMoveTree(
                ["e5d5d6e6c4"],
                [
                    "d5e5e6f6",
                    "d5e5f6e6",
                    "d5e5c4e6",
                    "c4e5e6f6",
                    "c4e5f6e6",
                    "c4e5d5e6",
                    "e5d5d6e6c6f6",
                    "e6e5f6d6d5e7",
                    "e6e5d5f6",
                    "e6e5c4f6",
                    "e6e5f6d6e7e8",
                    "e6e5f6d6c4e7",
                    "e5d5c4d6",
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

class Puzzle16 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Random 16</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "b4b5c5c6d7e7f8f4g6g7h6",
                white: "b3c3c4d2d5d6e5f3f6f7g3g4h5h4",
            },

            move_tree: this.makePuzzleMoveTree(
                ["f5e6d4e4e3"],
                ["e6f5", "f5e6e4d4g5e3", "f5e6e4d4e3g5", "f5e6d4e4g5d3", "f5e6d4e4d3g5"],
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

class Puzzle17 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Random 17</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "j3j7h3h4h5h6h7g4g6g8f4f6e2e3e4e6e7e8c1c2c3c4c5c6c7c8c9",
                white: "j2j4j6j8h2h8h9g1g3g5g7f1f2f3f5f7f8f9e5b1b2b3b4b5b6b7b8b9",
            },

            move_tree: this.makePuzzleMoveTree(["e9g9e1"], ["e1e9d9g9"], 9, 9),
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

class Puzzle18 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Random 18</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "b6c2c6d2e2f2g2c3c4d4",
                white: "c7b7d3d6e7f7g6e3f3h5",
            },

            move_tree: this.makePuzzleMoveTree(
                ["g4f5f4e4e5d5g3"],
                [
                    "g4f5e4f4",
                    "e4g4f4g3",
                    "e4g4g3f4",
                    "g3f4g4f5",
                    "g3f4f5g4g5e5h4f6",
                    "g3f4f5g4g5e5e4f6",
                    "f4g3g4h3h4j4",
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

class Puzzle19 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Random 19</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "a2b1c2d1",
                white: "a3a4b5c3c4d3e3f1f2",
            },

            move_tree: this.makePuzzleMoveTree(["d2b3b2"], ["b2d2", "b3d2"], 9, 9),
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

class Puzzle20 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Random 20</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "g3g5g6g8f3f7f8e6e8d6",
                white: "j6h7h8h9g7f4f5f6c5c7d7e7",
            },

            move_tree: this.makePuzzleMoveTree(
                ["e4e5d5d4g4"],
                [
                    "e4e5d5d4e3c6",
                    "e4e5d5d4c6b6",
                    "e4e5g4d5c6b6",
                    "e5e4e3d5d4c6",
                    "e5e4e3d5g4c6",
                    "e5e4d4d5e3c6",
                    "e5e4d4d5g4c6",
                    "g4e4e3d4",
                    "g4e4d4d5e5c6",
                    "g4e4d4d5e3e5",
                    "g4e4d5d4c4c6d3e5",
                    "d4d5e5e4e3c6",
                    "d4d5e5e4g4c6",
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

class Puzzle21 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Random 21</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "h5h6h7h9g5g8f8e5d5d6d7c5",
                white: "j5j8h4h8g4g6g7f5e4e6d4c4",
            },

            move_tree: this.makePuzzleMoveTree(
                ["f6f7e7f6f4"],
                ["j7j6", "j6j7", "j9g9", "f7f6e7f4", "f7f6f4f3e7f4", "e7f6f7f4", "e7f6f4f3f7f4"],
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

class Puzzle22 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Random 22</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "h7h8g6f6e5e7c3d7d9c7c8",
                white: "h5h6g4g7g8f7f9e3e8d8",
            },

            move_tree: this.makePuzzleMoveTree(
                ["h9g9c9j7e9j8f8"],
                [
                    "h9g9j7j6c9j8j9j8",
                    "h9g9j7j6c9j8e9j9",
                    "h9g9j7j6e9c9",
                    "h9g9j8j6c9j7e9j9",
                    "h9g9j8j6e9c9",
                    "h9g9e9c9",
                    "c9h9e9j8f8j7",
                    "c9h9e9j8j7j6",
                    "c9h9j8j6j9j7",
                    "c9h9j7j6j8j9",
                    "c9h9j7j6e9j8",
                    "c9h9j8j6e9j7f8j9",
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

class Puzzle23 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Random 23</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "e8e9d8c8b9g3",
                white: "h8f9f8f7e7d7d9c7b6a6c3",
            },

            move_tree: this.makePuzzleMoveTree(
                ["a8b7b8"],
                [
                    "b8a8b7a7",
                    "b7a8a7b8",
                    "b7a8b8a7",
                    "a8b7a7b8a9c9",
                    "c9a8b8a7",
                    "c9a8b7a7",
                    "c9a8b8a7",
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

class Puzzle24 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Random 24</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "j2g2g3g4f2f5e3e6d3d7d8c2c4c6c7b4b7a7",
                white: "h1h2h3h4h5g5g6f4f7e4e7e8d9c8b2b3b8a8",
            },

            move_tree: this.makePuzzleMoveTree(
                ["f6e5d6g1f1"],
                ["g1e5f6d6", "g1e5d6f6", "e5g1f1f6"],
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

class Puzzle25 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Random 25</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "g1g2g7f1f3e2e3d3",
                white: "h1h2h3g3g4f4e4d4c4c3c7b2b1",
            },

            move_tree: this.makePuzzleMoveTree(
                ["d1c2d2"],
                ["d2d1c2c1e1f2", "d1c2c1d2e1f2", "d2d1c1c2e1f2", "c2d1c1d2e1f2", "c2d1d2c1e1f2"],
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

class Puzzle26 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Random 26</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "j7j8h8h9g5g8f8f9e1e6d2d8d9c2c6c7b3b4b5b8",
                white: "j6h3h7g3g7f1f2f4f7e2e3e5e7e8e9d3d6d7c3c4c5",
            },

            move_tree: this.makePuzzleMoveTree(
                ["h6j5j4h5h4"],
                [
                    "h6j5j4h5g6h4",
                    "h6j5h5j4h4j3",
                    "h6j5h5j4j3h4",
                    "d1b2c1b1",
                    "d1b2b1c1",
                    "d1b2a2c1",
                    "j5h6",
                    "b2h6d1",
                    "f6g6f5h5g4h4",
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

class Puzzle27 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Random 27</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "j4h4h1g3g5f3e3d3d2d1",
                white: "j1j2g1g2f2e2e1",
            },

            move_tree: this.makePuzzleMoveTree(
                ["h2h3h2h1j3h2f1"],
                ["j3h2", "h3h2", "h2h3j3h2", "h2h3h1h2"],
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

class Puzzle28 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Random 28</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "f6f7e6e8d6b7",
                white: "g6g7g8f5f8e5e7d7b5",
            },

            move_tree: this.makePuzzleMoveTree(
                [
                    "d8c7c6c8b8c9b9e9d9",
                    "d8c7c6c8c9b8a8b9a9",
                    "d8c7c6c8c9b8b9a8a7b6a9",
                    "d8c7c6c8c9b8b9a8a7b6a9",
                ],
                [
                    "d8c7c6c8c9b8b9a8a7b6a6a5",
                    "c7d8c8e9",
                    "c7d8d9e9",
                    "c7d8e9d9c8f9",
                    "d8c7c8c6d5d4c5c4",
                    "d8c7c6c8b8c9d9e9",
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

class Puzzle29 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Random 29</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "j2j3h1h3g2e4e5e8d5d7d8c3c5c7b3b5b7",
                white: "j4h4h6g4g7f4f5f6f8e3e6e7d4c4c8b8",
            },

            move_tree: this.makePuzzleMoveTree(["f3g3f2"], ["d3f3"], 9, 9),
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

class Puzzle30 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Random 30</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "d1d2c2c3c5b4b5j8h8g8f8h9e9b7",
                white: "g2f4e3d4c1c4b1b2b3a4j7h7g7f7e7d8d9",
            },

            move_tree: this.makePuzzleMoveTree(
                ["a2e2a3a1a3a2a3"],
                ["a5e2a3e1a2d3", "a3a2a5e2a3e8f9a4", "a3a2a5e2a3e8a1f9g9j9"],
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

export const Random: Array<typeof Content> = [
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
    Puzzle11,
    Puzzle12,
    Puzzle13,
    Puzzle14,
    Puzzle15,
    Puzzle16,
    Puzzle17,
    Puzzle18,
    Puzzle19,
    Puzzle20,
    Puzzle21,
    Puzzle22,
    Puzzle23,
    Puzzle24,
    Puzzle25,
    Puzzle26,
    Puzzle27,
    Puzzle28,
    Puzzle29,
    Puzzle30,
];
