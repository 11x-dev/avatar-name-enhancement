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
import * as ReactDOM from "react-dom/client";
import { KBShortcut } from "KBShortcut";

interface PopupDialogProps {
    text: string | React.ReactNode;
    onAccept?: () => void;
    onCancel?: () => void;
}

export function PopupDialog(props: PopupDialogProps): JSX.Element {
    return (
        <div className="PopupDialog-container">
            <KBShortcut shortcut="esc" action={props.onCancel || props.onAccept || (() => 0)} />
            <div className="PopupDialog">
                <div className="PopupDialog-text">{props.text}</div>
                <div className="PopupDialog-buttons">
                    {(props.onAccept || null) && (
                        <span className="green-check" onClick={props.onAccept} />
                    )}
                    {(props.onCancel || null) && (
                        <span className="red-x" onClick={props.onCancel} />
                    )}
                </div>
            </div>
        </div>
    );
}

interface OpenPopupProps {
    text: string | React.ReactNode;
    no_accept?: boolean;
    no_cancel?: boolean;
}

let root: ReactDOM.Root;

export function openPopup(props: OpenPopupProps): Promise<void> {
    const container = document.createElement("DIV");
    document.body.append(container);

    root = ReactDOM.createRoot(container);

    let onaccept: () => void;
    let oncancel: () => void;

    const promise = new Promise<void>((resolve, reject) => {
        onaccept = () => {
            root.unmount();
            root = null;
            resolve();
        };
        oncancel = () => {
            root.unmount();
            root = null;
            reject();
        };
    });

    root.render(
        <React.StrictMode>
            <PopupDialog
                text={props.text}
                onAccept={props.no_accept ? undefined : onaccept}
                onCancel={props.no_cancel ? undefined : oncancel}
            />
        </React.StrictMode>,
    );

    return promise;
}

export function closePopup(): void {
    if (root) {
        root.unmount();
    }
}
