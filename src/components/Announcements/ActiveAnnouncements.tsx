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
import {Link} from "react-router-dom";
import {interpolate, _} from "translate";
import {Card, PopupMenu, PopupMenuItem} from 'material';

import {active_announcements, announcement_event_emitter, Announcement} from './Announcements';
import { getBlocks, setIgnoreAnnounce } from "../BlockPlayer";

import * as data from 'data';

declare var swal;

interface ActiveAnnouncementsProperties {

}

// Holds the expirations dates of cleared announcements
let hard_cleared_announcements: {[id: number]: number} = data.get("announcements.hard_cleared", {});
for (let k in hard_cleared_announcements) {
    if (hard_cleared_announcements[k] < Date.now()) {
        delete hard_cleared_announcements[k];
    }
}
data.set("announcements.cleared", hard_cleared_announcements);

export class ActiveAnnouncements extends React.PureComponent<ActiveAnnouncementsProperties, any> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        announcement_event_emitter.on('announcement', this.update);
    }
    componentWillUnmount() {
        announcement_event_emitter.off('announcement', this.update);
    }

    update = () => {
        this.forceUpdate();
    }

    render() {
        let lst: Announcement[] = [];

        for (let announcement_id in active_announcements) {
            console.log(announcement_id, typeof(announcement_id));
            let announcement = active_announcements[announcement_id];
            let is_hidden = announcement_id in hard_cleared_announcements;
            let creator_blocked = getBlocks(announcement.creator.id).block_announcements;
            if (announcement.type !== "tournament" && !is_hidden && !creator_blocked) {
                lst.push(announcement);
            }
        }

        if (lst.length === 0) {
            return null;
        }



        return (
            <Card className="ActiveAnnouncements">
                {lst.map((announcement, idx) => {
                    let announcement_actions: PopupMenuItem[] = [
                        {title: _('Hide this announcement'), onClick: () => {
                            swal({
                                "text": _("Are you sure you want to hide this announement? This action cannot be undone."),
                                "showCancelButton": true,
                                "confirmButtonText": _("Hide"),
                                "cancelButtonText": _("Cancel"),
                            })
                            .then(() => {
                                hard_cleared_announcements[announcement.id] = Date.now() + 30 * 24 * 3600 * 1000;
                                this.forceUpdate;
                            })
                            .catch(() => 0);
                            return;
                        }},
                        {title: 'Hide all from ' + announcement.creator.username, onClick: () => {
                            swal({
                                "text": interpolate(_("Are you sure you want to block communications from {{name}}?"),
                                             {name: announcement.creator.username}),
                                "showCancelButton": true,
                                "confirmButtonText": _("Block user"),
                                "cancelButtonText": _("Cancel"),
                            })
                            .then(() => {
                                setIgnoreAnnounce(announcement.creator.id, true);
                                this.forceUpdate();
                            })
                            .catch(() => 0);
                            return;
                        }}
                    ];

                    return (
                    <div className="announcement" key={idx}>
                        {announcement.link
                            ? (announcement.link.indexOf("://") > 0
                                ? <a href={announcement.link} target="_blank">{announcement.text}</a>
                                : <Link to={announcement.link}>{announcement.text}</Link>
                              )
                            : <span>{announcement.text}</span>
                        }
                        <PopupMenu list={announcement_actions}></PopupMenu>
                    </div>
                    );
                })}
            </Card>
        );
    }
}
