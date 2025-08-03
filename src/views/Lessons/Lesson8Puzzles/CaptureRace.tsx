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
        return [<p>Capture Race 1</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "c4c5c6d4d6e3e7f3f4f6f7",
                white: "b4b6c3c7d3d7e4e5e6",
            },

            move_tree: this.makePuzzleMoveTree(["f5b5d5"], ["d5b5"], 9, 9),
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
        return [<p>Capture Race 2</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "c1c2c3d3e4f4f3g2",
                white: "b3b5c4d4d1e1e2e3",
            },

            move_tree: this.makePuzzleMoveTree(
                ["f1b2f2b1d2", "f2b2f1b1d2"],
                ["d2b2f2b1", "d2b2f1b1", "f1b2d2b1", "f2b2d2b1"],
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
        return [<p>Capture Race 3</p>];
    }
    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "b4b5b6b7c8d8e7e6e5",
                white: "a8b8c7c5d7d5d3e8e9",
            },

            move_tree: this.makePuzzleMoveTree(
                ["d6c6d4c4c3", "c6d6d4c4c3"],
                ["a7c9", "b9d9a7c9", "b9d9c9a9", "c9b9a7d9"],
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

class Puzzle4 extends Content {
    text(): JSX.Element | Array<JSX.Element> {
        return [<p>Capture Race 4</p>];
    }

    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "a4b5c1c2c4c5d2d3",
                white: "a2b1b2b3b4c3d4e4f2f3",
            },

            move_tree: this.makePuzzleMoveTree(["a5e2a3e3a1"], ["a3a5"], 9, 9),
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
        return [<p>Capture Race 5</p>];
    }

    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "b2b3c2d3e3f3f4f5g2g6h2h5h6",
                white: "b4c3c4c6d2e1e2e5e6f2f6g3g4g5",
            },

            move_tree: this.makePuzzleMoveTree(["h3d4h4", "h4d43"], ["d1c1", "f1g1", "d4d5"], 9, 9),
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
        return [<p>Capture Race 6</p>];
    }

    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "c7d6e6e7f8g7",
                white: "b6c6d7d8e8",
            },

            move_tree: this.makePuzzleMoveTree(
                ["c8b8d9b7e9", "c8b8e9b7d9", "c8b8c9b7e9b9d9", "c8b8c9b7d9b9e9"],
                ["b7b8c8c9", "b8c8b7b9"],
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
        return [<p>Capture Race 7</p>];
    }

    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "c2d2e2f3f4g4h4h2",
                white: "b1b2b3c3e1e3e4f2g2g3",
            },

            move_tree: this.makePuzzleMoveTree(
                ["h3d1g1f1c1", "g1d3h3d1f1", "f1g1h1d1h3f1c1"],
                ["d1d3f1c1e1g1", "d1d3f1c1g1e1", "d1d3f1c1h3e1"],
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
        return [<p>Capture Race 8</p>];
    }

    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "j7j8h5h6g5e5e6e8d4d7d8",
                white: "c8c7c6d6e7f7f6g6g8h8h7",
            },

            move_tree: this.makePuzzleMoveTree(
                ["f8d9f5g7g9e9h9", "f8d9f5g7h9f9g9"],
                ["f8d9f5g7g9e9f9h9", "f5f8f9d9e9g9", "f5f8h9e9d9c9"],
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
        return [<p>Capture Race 9</p>];
    }

    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "j6h6g6f6e7e8e9g9h9",
                white: "j7h7g7f7f8f9e6d6c7b8",
            },

            move_tree: this.makePuzzleMoveTree(
                ["j8d7h8d8g8", "j8d7g8d8h8"],
                ["g8j8h8j9", "g8j8j9h8", "h8j8g8j9", "h8j8j9g8h9d7"],
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
        return [<p>Capture Race 10</p>];
    }

    config(): PuzzleConfig {
        return {
            initial_state: {
                black: "b7c7d7e6e5d4c3",
                white: "b8c8d8e7f7d6d5c5",
            },

            move_tree: this.makePuzzleMoveTree(
                ["b5b6c4c6a6", "b5b6a6b4c6"],
                ["a5b6c6a7", "b6b5b4a6c4a7", "b6b5c4a6b4a7", "c6b6", "c4b5b4a6a7a8"],
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

export const CaptureRace: Array<typeof Content> = [
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
