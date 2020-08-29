import React from 'react'
import { Menu, Table, Space, Avatar } from 'antd';
import Constants from '../../constants';
import { formatDate } from '../../utils/text.utils';

const { SubMenu } = Menu


const ExamGrades = ({ exams }) => {

    const columns = [
        {
            title: '#',
            dataIndex: 'stt',
            key: 'stt',
            render: stt => <span>{stt}</span>,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: (name, record) => <Space><Avatar src={record.avatar} /><span>{name}</span></Space>
        },
        {
            title: 'Họ tên',
            dataIndex: 'fullname',
            key: 'fullname',
            render: (name, record) => <span>{name}</span>
        },
        {
            title: 'Thời gian',
            dataIndex: 'date',
            key: 'date',
            render: date => <span>{formatDate(date, Constants.MMM_Do__YY__TIME)}</span>
        },
        {
            title: 'Điểm',
            dataIndex: 'result',
            key: 'result',
            render: result => <span>{result}</span>
        }
    ];

    const ExamTable = ({ exams }) => {
        const examData = exams.map((exam, index) => ({
            stt: index + 1,
            username: exam.student.username,
            avatar: exam.student.user_profile.avatar,
            fullname: exam.student.user_profile.fullname,
            date: exam.last_update,
            result: exam.final_result
        }))

        return (
            < Table
                dataSource={examData}
                columns={columns}
            />
        )
    }

    return (
        <Menu
            style={
                { borderRight: 'none', fontSize: '1.7rem', fontWeight: '500', paddingLeft: '0' }
            }
            mode="inline" width="100%">
            {
                Object.keys(exams).map((key, index) =>
                    <SubMenu key={key} title={<div>
                        {index + 1 + '. ' + key} - <small>{exams[key][0].percentage}%</small>
                    </div>}>
                        <ExamTable exams={exams[key][1]} key={key} />
                    </SubMenu>
                )

            }
        </Menu>
    )
}

export default ExamGrades