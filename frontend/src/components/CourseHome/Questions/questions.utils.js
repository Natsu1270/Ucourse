import React from 'react'
import { parseHtml } from "../../../utils/text.utils";


export const columns = [
    {
        title: '#',
        dataIndex: 'stt',
        key: 'stt',
        render: stt => <span>{stt}</span>,
    },
    {
        title: 'Tên câu hỏi',
        dataIndex: 'name',
        key: 'name',
        render: (name, record) => <p className="text--sub__bigger b-500 text-black">{name}</p>
    },
    {
        title: 'Nội dung',
        dataIndex: 'content',
        key: 'content',
        render: (content, record) => <p className="text--sub__bigger text-black">{parseHtml(content)}</p>
    },
]