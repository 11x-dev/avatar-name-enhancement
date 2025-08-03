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
import * as data from "@/lib/data";
import cached from "@/lib/cached";
import { post } from "@/lib/requests";
import { useUser } from "@/lib/hooks";
import { reload_page } from "@kidsgo/lib/reload_page";

export function SignIn(): JSX.Element {
    const user = useUser();
    const [code, setCode] = React.useState("");

    return (
        <div id="SignIn">
            Your sign in code: <b>{(user as any).kidsgo_signin_code}</b>
            <div className="small">This code will save your current avatar</div>
            <div className="small">
                Don’t forget this code, or you will have to make a new avatar
            </div>
            <hr />
            <input
                type="text"
                placeholder="Sign in code"
                value={code}
                onChange={(ev) => setCode(ev.target.value)}
            />
            <button
                onClick={() => {
                    post("/api/v0/kidsgo/signin", { code })
                        .then((config) => {
                            data.set(cached.config, config);
                            console.log("should be ", config.user);
                            reload_page();
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                }}
            >
                Sign In
            </button>
            <div className="small">
                If you saved an avatar before, enter your code to pull it up
            </div>
        </div>
    );
}
