import React from 'react'
import {
    Chart,
    Interval,
    Tooltip,
    Axis,
    Coordinate
} from 'bizcharts';

const UserPercentage = ({ adminCount, teacherCount, taCount, studentCount }) => {

    const total = adminCount + teacherCount + taCount + studentCount

    const data = [
        { item: 'Admin', count: adminCount, percent: adminCount / total },
        { item: 'Teacher', count: teacherCount, percent: teacherCount / total },
        { item: 'TA', count: taCount, percent: taCount / total },
        { item: 'Student', count: studentCount, percent: studentCount / total },
    ];

    const cols = {
        percent: {
            formatter: val => {
                val = val * 100 + '%';
                return val;
            },
        },
    };

    return (
        <Chart height={300} data={data} scale={cols} autoFit>
            <Coordinate type="theta" radius={0.75} />
            <Tooltip showTitle={false} />
            <Axis visible={false} />
            <Interval
                position="percent"
                adjust="stack"
                color="item"
                style={{
                    lineWidth: 1,
                    stroke: '#fff',
                }}
                label={['*', {
                    content: (data) => {
                        const per = data.percent * 100
                        return `${data.item}: ${per.toFixed(2)}%`;
                    },
                }]}
            />
        </Chart>
    )
}

export default UserPercentage