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
import { Puzzles } from "./Puzzles";
import { useParams } from "react-router-dom";
import { puzzleSectionMap } from "./PuzzleSections";
import { sectionKeys } from "./PuzzleSections";
import { PageNotFound } from "@kidsgo/components/PageNotFound/PageNotFound";

export function PuzzlesRouter(): JSX.Element {
    const params = useParams();
    const sectionName = params.section || "capturing"; // Default to capturing
    let puzzleNumber = parseInt(params.puzzleNumber || "1") - 1;

    // If section in url is invaild, show a "PageNotFound" message
    if (!sectionKeys.includes(sectionName as any)) {
        return <PageNotFound />;
    }

    const sectionKey = sectionName.toLowerCase();
    const puzzles = puzzleSectionMap[sectionKey] || puzzleSectionMap["capturing"];

    if (puzzleNumber < 0 || puzzleNumber >= puzzles.length) {
        puzzleNumber = 0;
    }

    console.log("Resolved to sectionKey:", sectionKey, "puzzle number index:", puzzleNumber);

    return (
        <div>
            <Puzzles puzzles={puzzles} sectionName={sectionKey} puzzleNumber={puzzleNumber} />
        </div>
    );
}
