import React from 'react'
import {Tag} from "antd";
import {CommentOutlined, FieldTimeOutlined, UserOutlined} from "@ant-design/icons";
import {formatDate} from "../../utils/text.utils";
import Constants from "../../constants";

const ForumItem = ({item}) => (
    <div className="forum-item">
        <div className="dis-flex-col">
            <div className="dis-flex-between  mb-4">
                <span className="forum-item--title">{item.name}</span>
                <Tag className="forum--tag" color="magenta"><CommentOutlined/> {item.reply_count} phản hồi</Tag>
            </div>
            <div className="forum-item--text dis-flex-start forum-item--subtext">
                <Tag color="green" className="forum--tag">
                    <UserOutlined/> {item.created_by.user_profile.fullname}</Tag>
                <span className="b-500 mr-4">
                        <FieldTimeOutlined/> {formatDate(item.created_date, Constants.MMM_Do__YY__TIME)}
                    </span>
                {
                    item.last_reply ?
                        <span className="mr-4">
                                Phản hồi cuối cùng : <a href="#">{item.last_reply.created_by.user_profile.fullname}</a>
                            </span> : null
                }
                {
                    item.last_reply ?
                        <span>
                                lúc: {formatDate(item.last_reply.timestamp, Constants.MMM_Do__YY__TIME)}
                            </span> : null
                }


            </div>
        </div>

    </div>
)

export default ForumItem