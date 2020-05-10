import React, {useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getExamStart, getStudentExamsStart} from '../../redux/Exam/exam.actions'
import {createStructuredSelector} from 'reselect'

import {
    studentExamsSelector,
    isProcessingSelector, examDetailSelector
} from '../../redux/Exam/exam.selects'
import {Skeleton, Button, Drawer, Empty} from 'antd'
import {secondToTime} from "../../utils/text.utils";
import ExamDetail from "./exam-detail.component";
import ExamHistoryTable from "./exam-history-table.component";

const PrivateExamList = ({token}) => {

    const {exam_id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const [showExam, setShowExam] = useState(false)

    const {studentExams, examDetail, isProcessing} = useSelector(createStructuredSelector({
        studentExams: studentExamsSelector,
        isProcessing: isProcessingSelector,
        examDetail: examDetailSelector
    }))


    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getStudentExamsStart(
            {token, exam_id: parseInt(exam_id)}
        ))
        dispatch(getExamStart({token, exam_id}))
    }, [])
    return (
        <section className="section-5 page-2 exam-list">
            <div className="exam-list--title">
                {
                    isProcessing ? <Skeleton active/> :
                        <h3 className="text--main">
                            {examDetail.name}
                        </h3>

                }
            </div>
            {
                isProcessing ? <Skeleton active/> :
                    <div className="exam-list--items">
                        <h2 className="exam-list--items__title theme-color mb-5">
                            Lịch sử làm bài
                        </h2>
                        {studentExams.length ?
                            <ExamHistoryTable exams={studentExams} />
                            : <Empty description="Không có lịch sử làm bài"/>}
                    </div>
            }
            <Button type="primary" onClick={() => setShowExam(true)}>Làm bài</Button>

            <Drawer
                className="exam_drawer"
                title={examDetail.name}
                placement="right"
                onClose={() => setShowExam(false)}
                visible={showExam}
                footer={
                    <div>
                        <Button onClick={() => setShowExam(false)} type="danger">
                            Đóng
                        </Button>
                    </div>
                }
            >
                <ExamDetail exam={examDetail} token={token} />
            </Drawer>

        </section>
    )
}

export default PrivateExamList