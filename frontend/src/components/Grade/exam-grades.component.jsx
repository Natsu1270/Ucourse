import React from 'react'
import { Menu, Table, Space, Avatar, Tag } from 'antd';
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
        },
        {
            title: 'Đạt yêu cầu',
            dataIndex: 'isPass',
            key: 'isPass',
            filters: [
                {
                    text: 'Đạt',
                    value: true,
                },
                {
                    text: 'Không đạt',
                    value: false,
                },
            ],
            onFilter: (value, record) => record.isPass === value,
            render: (isPass, record) => <span>{record.mandatory ? isPass ? <Tag color="#63ace5">Đạt</Tag> : <Tag color="#f50">Không đạt</Tag> : null}</span>,
        },
    ];

    const ExamTable = ({ exams, examDetail }) => {
        const examData = exams.map((exam, index) => ({
            stt: index + 1,
            username: exam.student.username,
            avatar: exam.student.user_profile.avatar,
            fullname: exam.student.user_profile.fullname,
            date: exam.last_update,
            result: exam.final_result,
            mandatory: examDetail.mandatory,
            isPass: exam.is_pass
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
                        <ExamTable exams={exams[key][1]} examDetail={exams[key][0]} key={key} />
                    </SubMenu>
                )

            }
        </Menu>
    )
}

export default ExamGrades