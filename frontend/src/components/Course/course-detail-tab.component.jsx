import React, { useEffect, useState } from 'react'
import { Popconfirm, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showRLModal, toggleAbilityTestModal } from "../../redux/UI/ui.actions";
import { genAbilityTestStart } from "../../redux/AbilityTest/abilityTest.actions";
import { tokenSelector } from "../../redux/Auth/auth.selects";

const CourseDetailTab = ({ course, isProgram }) => {

    const [tabStick, setTabStick] = useState(false);

    const dispatch = useDispatch();
    const token = useSelector(state => tokenSelector(state));

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', () => handleScroll)
        }
    }, []);

    const handleScroll = () => {
        setTabStick(window.pageYOffset > 400)
    };

    const confirm = (e) => {
        if (token) {
            dispatch(toggleAbilityTestModal());
            dispatch(genAbilityTestStart({ token, ability_test: course.ability_test }))
        } else {
            message.error('Bạn phải đăng nhập để thực hiện chức năng này!',
                1.5,
                () => dispatch(showRLModal()))
        }

    };





    return (
        <section
            className={`pd-5 section-course-tab ${tabStick ? 'section-course-tab__fixed' : ''}`}
            id="cs-course-tab">
            <div className="course-tab">
                <ul className="course-tab__items">
                    <li className="course-tab__address" id="tab-overview">
                        <a href="#cs-course-overview"
                            className="course-tab__address--link">Overview</a>
                    </li>
                    <li className="course-tab__address" id="tab-components">
                        <a href="#cs-course-components"
                            className="course-tab__address--link">Components</a>
                    </li>
                    {
                        isProgram ? <span /> : <li className="course-tab__address" id="tab-tutors">
                            <a href="#cs-course-tutors"
                                className="course-tab__address--link">Instructors</a>
                        </li>
                    }
                    <li className="course-tab__address" id="tab-review">
                        <a href="#cs-course-review"
                            className="course-tab__address--link">Reviews</a>
                    </li>
                    {
                        isProgram ? <span /> : <li className="course-tab__address" id="tab-tutors">
                            <a href="#cs-course-tutors"
                                className="course-tab__address--link">Instructors</a>
                        </li>
                    }
                </ul>
                <div className="course-tab__btn">
                    <a href="#" className="cs-btn cs-btn--animated">Đăng ký ngay</a>
                    <Popconfirm
                        placement={tabStick ? "bottomRight" : "topRight"}
                        title="Bạn có chắc muốn làm bài test kiểm tra năng lực?"
                        onConfirm={confirm}
                        okText="Xác nhận"
                        cancelText="Hủy">
                        <a href="#"
                            className="cs-btn cs-btn--animated"> Test năng lực</a>
                    </Popconfirm>

                </div>
            </div>
        </section>
    )
};

export default CourseDetailTab