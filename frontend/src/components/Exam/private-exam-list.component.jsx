import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getExamStart, getStudentExamsStart } from '../../redux/Exam/exam.actions'
import { createStructuredSelector } from 'reselect'

import {
    studentExamsSelector,
    isProcessingSelector, examDetailSelector
} from '../../redux/Exam/exam.selects'
import { Skeleton, Button, Drawer, Empty } from 'antd'
import ExamDetail from "./exam-detail.component";
import ExamHistoryTable from "./exam-history-table.component";
import { isTimeBefore, formatDate, secondToTime } from '../../utils/text.utils'
import Constants from '../../constants'

const PrivateExamList = ({ token }) => {

    const { exam_id } = useParams()
    const dispatch = useDispatch()

    const [showExam, setShowExam] = useState(false)
    const [expired, setExpired] = useState(false)

    const { studentExams, examDetail, isProcessing } = useSelector(createStructuredSelector({
        studentExams: studentExamsSelector,
        isProcessing: isProcessingSelector,
        examDetail: examDetailSelector
    }))


    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getStudentExamsStart(
            { token, exam_id: parseInt(exam_id) }
        ))
        dispatch(getExamStart({ token, exam_id }))
    }, [dispatch])


    useEffect(() => {
        if (!isProcessing && examDetail.id !== undefined) {
            setExpired(isTimeBefore(examDetail.expired_date))
        }
    }, [isProcessing, examDetail])


    return (
        <section className="section-5 page-2 exam-list">
            <div className="exam-list--title">
                {
                    <Skeleton loading={isProcessing} active>
                        <h3 className="text--main">
                            {examDetail.name}
                        </h3>

                    </Skeleton>



                }
            </div>
            <div class="text-center">
                {
                    expired ?
                        <p className="text--sub__bigger text-red">
                            Bài kiểm tra đã kết thúc vào: {formatDate(examDetail.expired_date, Constants.MMM_Do__YY__TIME)}</p> :
                        null
                }
                <p class="text--sub__bigger">Thời gian làm bài: {secondToTime(examDetail.duration)}</p>
                <p class="text--sub__bigger">Số lần làm bài cho phép: {examDetail.max_try}</p>
                <p class="text--sub__bigger">Hình thức chấm điểm: {
                    examDetail.get_result_type === "best" ? "Lấy kết quả cao nhất" :
                        examDetail.get_result_type === "last" ? "Lấy kết quả cuối cùng" : "Lấy kết quả trung bình"
                }</p>

                <Skeleton loading={isProcessing} active>
                    {expired ? null : <Button type="primary" onClick={() => setShowExam(true)}>Làm bài</Button>}
                </Skeleton>
            </div>
            {
                <Skeleton loading={isProcessing} active>

                    <div className="exam-list--items">
                        <h2 className="exam-list--items__title theme-color mb-5">
                            Lịch sử làm bài
                        </h2>
                        {studentExams.length ?
                            <ExamHistoryTable exams={studentExams} />
                            : <Empty description="Không có lịch sử làm bài" />}
                    </div>
                </Skeleton>
            }

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