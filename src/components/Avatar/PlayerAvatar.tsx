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
import { Avatar } from "./Avatar";
import { uiClassToRaceIdx } from "./util";
import { Race } from "./avatar_list";
import * as player_cache from "@/lib/player_cache";

export interface PlayerAvatarInterface {
    user_id: number;
}

export function PlayerAvatar({ user_id }: PlayerAvatarInterface): JSX.Element {
    const [race, setRace] = React.useState<string>(null);
    const [idx, setIdx] = React.useState<number>();

    React.useEffect(() => {
        if (user_id) {
            // First try to get data from localStorage if it's the current user, since player_cache isn't properly updating, while the local storage value is
            // Without this block, there was a bug where once we chose our avatar, then navigated to the game page and challenged a robot, it would show us the wrong avatar, until we refreshed the page
            const localUser = JSON.parse(localStorage.getItem("ogs.user"));
            if (localUser && localUser.id === user_id) {
                const [r, i] = uiClassToRaceIdx(localUser.ui_class);
                setRace(r);
                setIdx(i);
                return;
            }

            // This block is needed to fetch the computer's avatar, this player_cache contains the user's previous avatar
            setRace(null);
            setIdx(null);
            player_cache
                .fetch(user_id, ["ui_class"])
                .then((user) => {
                    const [r, i] = uiClassToRaceIdx(user.ui_class);
                    setRace(r);
                    setIdx(i);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [user_id]);

    if (!race || !user_id) {
        return null;
    }

    return <Avatar race={race as Race} idx={idx} />;
}
