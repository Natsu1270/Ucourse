import React, { useState, useEffect } from 'react'
import { Calendar, Badge } from 'antd';

const CourseHomeCalendar = ({ courseHome }) => {

    function getListData(value) {
        let listData;
        switch (value.date()) {
            case 8:
                listData = [
                    { type: 'warning', content: 'Bài kiểm tra chương 1' },

                ];
                break;
            case 10:
                listData = [
                    { type: 'warning', content: 'Bài assignment 1' },

                ];
                break;
            case 25:
                listData = [
                    { type: 'warning', content: 'Hạn nộp bài assignment 1' },
                ];
                break;
            default:
        }
        return listData || [];
    }

    function dateCellRender(value) {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map(item => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    }

    function getMonthData(value) {
        if (value.month() === 8) {
            return 1394;
        }
    }

    function monthCellRender(value) {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    }


    return (
        <section className="section-5 page-2">
            <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
        </section>
    )
}

export default CourseHomeCalendar