import React from 'react'
import {parseHtml} from "../../utils/text.utils";

const ThreadDescription = ({threadDetail}) => (
        <div className="thread--description">
            <span className="thread--description__content">
                {parseHtml(threadDetail.content)}
            </span>
        </div>
)

export default ThreadDescription