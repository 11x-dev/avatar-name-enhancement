/*
 * Copyright (C) 2012-2019  Online-Go.com
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
import * as data from 'data';
import { _ } from 'translate';

declare var Raven;
declare var ogs_current_language;
declare var ogs_version;

export class ErrorBoundary extends React.Component<{}, any> {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            info: null
        };
    }

    componentDidCatch(error, info) {
        this.setState({
            hasError: true,
            error: error,
            info: info,
        });

        try {
            console.error(error.message);
            console.error(info.componentStack);
        } catch (e) {
            console.error(e);
        }

        try {
            if (!Raven.isSetup()) {
                console.info("Dev system detected, not reporting error to sentry.io");
            } else {
                let user = data.get('user') || {id:0, username: 'guest'};
                try {
                    Raven.setTagsContext({
                        'version': ogs_version || 'dev'
                    });
                } catch (e) {
                    console.error(e);
                }
                try {
                    Raven.setUserContext({
                        'id': data.get('user').id,
                        'username': data.get('user').username,
                    });
                } catch (e) {
                    console.error(e);
                    try {
                        Raven.setUserContext();
                    } catch (e) {
                        console.error(e);
                    }
                }
                try {
                    Raven.setExtraContext(Object.assign({
                        'language': ogs_current_language || 'unknown',
                        'version': ogs_version || 'dev'
                    }, info));
                } catch (e) {
                    console.error(e);
                }

                Raven.captureException(error);

                /* clear out the info stuff */
                Raven.setExtraContext({
                    'language': ogs_current_language || 'unknown',
                    'version': ogs_version || 'dev'
                });
            }
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className='ErrorBoundary'  onClick={() => Raven.lastEventId() && Raven.showReportDialog()}>
                    <h3>{_("Congratulations, you found a bug!")}</h3>
                    <div>
                        {_("Our team has been notified of the bug, however if you have more details you'd like to provide, please click here to fill out a report.")}
                    </div>
                    <hr/>
                    <h5>{this.state.error.message}</h5>
                    <pre>{this.state.info.componentStack}</pre>
                </div>
            );
        }
        return this.props.children;
    }
}

window['test_raven'] = () => {
    try {
        throw new Error('RAVEN TEST');
    } catch (e) {
        console.log(Raven.captureException(e));
    }
};
