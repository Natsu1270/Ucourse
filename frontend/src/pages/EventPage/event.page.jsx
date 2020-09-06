import React, { useState, useEffect } from 'react'
import { message, Tabs, Table } from 'antd'
import Constants from '../../constants'
import { getEventListAPI } from '../../api/event.services'
import { formatDate } from '../../utils/text.utils'
import { Link } from 'react-router-dom'
const { TabPane } = Tabs


const EventPage = () => {
    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState([])

    const getEventList = async () => {
        setLoading(true)
        try {
            const { data } = getEventListAPI()
            setEvents(data.data)
        } catch (err) {
            message.error('Có lỗi xảy ra')
        }
        setLoading(false)
    }


    useEffect(() => {
        getEventList()
    }, [])
    const columns = [
        {
            title: '#',
            dataIndex: 'stt',
            key: 'stt',
            render: stt => <span>{stt}</span>,
        },
        {
            title: 'Chủ đề',
            dataIndex: 'title',
            key: 'title',
            render: (title, event) => <Link to={`event/${event.stt}`}>{title}</Link >
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
            render: content => <span>{content}</span>
        },
        {
            title: 'Áp dụng',
            dataIndex: 'location',
            key: 'location',
            render: location => <span>{location}</span>
        },
        {
            title: 'Thời gian',
            dataIndex: 'date',
            key: 'date',
            render: date => <span>{formatDate(date, Constants.MMM_Do__YY__TIME)}</span>
        }

    ];

    const eventData = events.map((event, index) => ({
        stt: index + 1,
        title: event.title,
        content: event.content,
        date: event.created_date
    }))

    return (
        <section className="section-10 page section--about cs-about">
            <h2 className="title--big text-center">Sự Kiện</h2>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Danh sách sự kiện" key="">
                    <Table dataSource={eventData} columns={columns} />
                </TabPane>
            </Tabs>
        </section>
    )
}

export default EventPage