import React from 'react'
import {Tag} from "antd";
import {FieldTimeOutlined} from "@ant-design/icons";
import {timeDiff} from "../../utils/text.utils";

const ThreadTitle = ({threadDetail}) => (
        <div className="thread--header">
            <h3 className="text--main thread--header__title">{threadDetail.name}</h3>
            <div className="thread--header__info">
                <Tag color="green">{threadDetail.created_by ? threadDetail.created_by.user_profile.fullname : ''}</Tag>
                <span className="text-info-sub"><FieldTimeOutlined/> {timeDiff(threadDetail.created_date)}</span>
            </div>
        </div>
)

export default ThreadTitle