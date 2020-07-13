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
import * as data from "data";
import * as moment from "moment";
import { Card } from "material";
import { Link } from "react-router-dom";
import { comm_socket } from "sockets";
import { _, pgettext, interpolate } from "translate";
import { useEffect, useState, useRef, useCallback } from "react";
import { Timeout, errorLogger } from "misc";
//import { ChatChannelProxy, global_channels, group_channels, tournament_channels } from 'chat_manager';
import { chat_manager, global_channels, ChatChannelProxy, ChatMessage, TopicMessage } from 'chat_manager';
import { ChatLine } from './ChatLine';
import { TabCompleteInput } from "TabCompleteInput";
import { Markdown } from "Markdown";
import { ChannelInformation, resolveChannelInformation } from "./resolveChannelInformation";

declare let swal;

interface ChatLogState {
    chat_log: Array<ChatMessage>;
    show_say_hi_placeholder: boolean;
}

interface ChatLogProperties {
    channel: string;
    autoFocus?: boolean;
    updateTitle?: boolean;
}

let deferred_chat_update:Timeout = null;

export function ChatLog(props:ChatLogProperties):JSX.Element {
    return (
        <div className='ChatLog'>
            <ChannelTopic {...props} />
            <ChatLines {...props} />
            <ChatInput {...props} />
        </div>
    );
}


function ChannelTopic({channel}:ChatLogProperties):JSX.Element {
    let user = data.get('user');

    let [expanded, set_expanded]:[boolean, (tf:boolean) => void] = useState(false as boolean);
    let [topic, set_topic]:[string, (tf:string) => void] = useState("");
    let [topic_updated, set_topic_updated]:[boolean, (tf:boolean) => void] = useState(false as boolean);
    let [name, set_name]:[string, (tf:string) => void] = useState(channel);
    let [group_id, set_group_id]:[number | null, (tf:number) => void] = useState(null);
    let [tournament_id, set_tournament_id]:[number | null, (tf:number) => void] = useState(null);
    let [description, set_description]:[string, (s:string) => void] = useState("");
    let [banner, set_banner]:[string, (s:string) => void] = useState("");
    let [proxy, setProxy]:[ChatChannelProxy | null, (x:ChatChannelProxy) => void] = useState(null);
    let [title_hover, set_title_hover]:[string, (s:string) => void] = useState("");

    const topic_editable = true;

    useEffect(() => {
        set_description("");
        set_group_id(null);
        set_tournament_id(null);
        set_name("");
        set_topic("");
        set_title_hover("");
        set_banner("");

        resolveChannelInformation(channel)
        .then((info:ChannelInformation) => {
            set_name(info.name);
            if (info.group_id) {
                set_group_id(info.group_id);
                set_description(info.description);
                set_banner(info.banner);
            }
            if (info.tournament_id) {
                set_tournament_id(info.tournament_id);
            }
        })
        .catch(errorLogger);
    }, [channel]);

    useEffect(() => {
        let proxy = chat_manager.join(channel);
        setProxy(proxy);
        set_topic(proxy.channel?.topic?.topic || "");
        set_title_hover(getTitleHover(proxy.channel?.topic));
        proxy.on("topic", (topic) => {
            set_topic(proxy.channel?.topic?.topic || "");
            set_title_hover(getTitleHover(proxy.channel?.topic));
        });

        function getTitleHover(topic:TopicMessage | null):string {
            if (topic && topic.username && topic.timestamp) {
                return topic.username + " - " + moment(new Date(topic.timestamp)).format('LL');
            }
            console.log("crap", topic);

            return "";
        }
    }, [channel]);

    const updateTopic = useCallback((ev:React.ChangeEvent<HTMLInputElement>) => {
        set_topic(ev.target.value);
        set_topic_updated(true);
    }, [channel]);

    const closeExpanded = useCallback(() => {
        if (topic_updated) {
            proxy.channel.setTopic(topic);
        }
        set_topic_updated(false);
        set_expanded(false);
    }, [proxy, topic, topic_updated]);


    return (
        <div className={'ChatHeader' + (expanded ? ' expanded' : '')}
                style={banner ? {'backgroundImage': `url("${banner}")`} : {}}
            >

            {(expanded && topic_editable)
                ?  <input
                        value={topic}
                        className="channel-topic-edit"
                        placeholder={pgettext("Set channel topic", "Topic")}
                        onChange={updateTopic}
                        autoFocus={true}
                    />
                : <div className='channel-topic' title={title_hover}>
                      <div className='backdrop' />
                      <Markdown source={topic.trim() || name} className='topic' />
                  </div>
            }

            {expanded
                ? <i className='fa fa-chevron-up' onClick={closeExpanded} />
                : <i className='fa fa-chevron-down' onClick={() => set_expanded(true)} />
            }

            {expanded &&
                <div className='expanded-area'>
                    <div className='header'>
                        <div className='left'>
                            {group_id &&
                                <h3>
                                    {pgettext("Go to the main page for this group.", "Group Page")}: <Link to={`/group/${group_id}`}>{name}</Link>
                                </h3>
                            }

                            {tournament_id &&
                                <h3>
                                    {pgettext("Go to the main page for this tournament.", "Tournament Page")}: <Link to={`/tournament/${tournament_id}`}>{name}</Link>
                                </h3>
                            }

                            {(!tournament_id && !group_id) &&
                                <h3>
                                    {name}
                                </h3>
                            }
                        </div>

                        <div className='buttons'>
                            <button className='danger leave-channel' onClick={() => console.log("SHould be leaving ", channel)}>
                                {pgettext("Leave the selected channel.", "Leave Channel")}
                            </button>
                        </div>
                    </div>

                    <Markdown source={description} className='description' />
                </div>
            }
        </div>
    );
}


/*
  let group_text = pgettext("Go to the main page for this group.", "Group Page");
  let tournament_text = pgettext("Go to the main page for this tournament.", "Tournament Page");
  let leave_text =
*/


let scrolled_to_bottom:boolean = true;
function ChatLines({channel, autoFocus, updateTitle}:ChatLogProperties):JSX.Element {
    const user = data.get("user");
    const rtl_mode = channel in global_channels && !!global_channels[channel].rtl;
    let chat_log_div = useRef(null);
    let [, refresh]:[number, (n:number) => void] = useState(0);
    let [proxy, setProxy]:[ChatChannelProxy | null, (x:ChatChannelProxy) => void] = useState(null);


    useEffect(() => {
        let proxy = chat_manager.join(channel);
        setProxy(proxy);
        proxy.on("chat", onChatMessage);
        proxy.on("chat-removed", onChatMessageRemoved);
        //chan.on("join", onChatJoin);
        //chan.on("part", onChatPart);
        syncStateSoon();

        return () => {
            //console.log("parting", channel);
            proxy.part();
            if (deferred_chat_update) {
                clearTimeout(deferred_chat_update);
                deferred_chat_update = null;
            }
        };

        function onChatMessageRemoved() {
            syncStateSoon();
        }

        function onChatMessage(obj) {
            if (proxy) {
                proxy.channel.markAsRead();
            }

            syncStateSoon();

            if (updateTitle) {
                if (document.hasFocus() || !proxy?.channel.unread_ct) {
                    window.document.title = _("Chat");
                } else {
                    window.document.title = `(${proxy?.channel.unread_ct}) ` + _("Chat");
                }
            }
        }

        function syncStateSoon() {
            if (!deferred_chat_update) {
                deferred_chat_update = setTimeout(() => {
                    deferred_chat_update = null;
                    proxy?.channel.markAsRead();
                    refresh(Math.random());
                }, 20);
            }
        }
    }, [channel]);

    const focusInput = useCallback(():void => {
        //input.current.focus();
        document.getElementById("chat-input")?.focus();
    }, [channel]);

    useEffect(() => {
        scrolled_to_bottom = true;
    }, [channel]);

    const onScroll = useCallback((event: React.UIEvent<HTMLDivElement>):void => {
        let div = chat_log_div.current;
        if (!div) {
            return;
        }

        let tf = div.scrollHeight - div.scrollTop - 10 < div.offsetHeight;
        if (tf !== scrolled_to_bottom) {
            scrolled_to_bottom  = tf;
            div.className = (rtl_mode ? "rtl chat-lines " : "chat-lines ") + (tf ? "autoscrolling" : "");
        }
        scrolled_to_bottom = div.scrollHeight - div.scrollTop - 10 < div.offsetHeight;
    }, [channel]);

    window.requestAnimationFrame(() => {
        let div = chat_log_div.current;
        if (!div) {
            return;
        }

        if (scrolled_to_bottom) {
            div.scrollTop = div.scrollHeight;
            setTimeout(() => {
                try {
                    div.scrollTop = div.scrollHeight;
                } catch (e) {
                }
            } , 100);
        }
    });

    let last_line:ChatMessage;

    return (
        <div
            className={rtl_mode ? "rtl chat-lines" : "chat-lines"}
            ref={chat_log_div}
            onScroll={onScroll}
            onClick={focusInput}
            >
            {proxy?.channel.chat_log.map((line, idx) => {
                let ll = last_line;
                last_line = line;
                return <ChatLine key={line.message.i || `system-${idx}`} line={line} lastline={ll} />;
            })}
        </div>
    );
}


function ChatInput({channel, autoFocus}:ChatLogProperties):JSX.Element {
    const user = data.get("user");
    const rtl_mode = channel in global_channels && !!global_channels[channel].rtl;
    let input = useRef(null);
    let [proxy, setProxy]:[ChatChannelProxy | null, (x:ChatChannelProxy) => void] = useState(null);
    let [show_say_hi_placeholder, set_show_say_hi_placeholder] = useState(true);

    useEffect(() => {
        let proxy = chat_manager.join(channel);
        setProxy(proxy);
    }, [channel]);

    const onKeyPress = useCallback((event: React.KeyboardEvent<HTMLInputElement>):boolean => {
        if (event.charCode === 13) {
            let input = event.target as HTMLInputElement;
            if (!comm_socket.connected) {
                swal(_("Connection to server lost"));
                return false;
            }

            if (proxy) {
                proxy.channel.send(input.value);
                if (show_say_hi_placeholder) {
                    set_show_say_hi_placeholder(false);
                }
                input.value = "";
            }
            return false;
        }

        return;
    }, [channel, proxy]);

    return (
        <TabCompleteInput ref={input} id="chat-input" className={rtl_mode ? "rtl" : ""}
            autoFocus={autoFocus}
            placeholder={
                !user.email_validated ? _("Chat will be enabled once your email address has been validated") :
                show_say_hi_placeholder ? _("Say hi!") : ""
            }
            disabled={user.anonymous || !data.get('user').email_validated}
            onKeyPress={onKeyPress}
        />
    );
}


export function EmbeddedChatCard(props:ChatLogProperties):JSX.Element {
    return (
        <Card className="Card EmbeddedChatCard">
            <ChatLog key={props.channel} {...props} />
        </Card>
    );
}
