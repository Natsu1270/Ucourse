import React, { useEffect, useState } from 'react'
import { Popconfirm, message, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showRLModal, toggleAbilityTestModal } from "../../redux/UI/ui.actions";
import { genAbilityTestStart } from "../../redux/AbilityTest/abilityTest.actions";
import { tokenSelector } from "../../redux/Auth/auth.selects";
import { useHistory } from 'react-router-dom';
import { isLoadingSelector, myCourseHomesSelector } from "../../redux/CourseHome/course-home.selects";
import Constants from "../../constants";

const CourseDetailTab = ({ course, isOwn, isProgram, handleRegister }) => {

    const [tabStick, setTabStick] = useState(false);

    const history = useHistory();
    const dispatch = useDispatch();
    const token = useSelector(state => tokenSelector(state));
    const myCourses = useSelector(state => myCourseHomesSelector(state));
    const isRegistering = useSelector(state => isLoadingSelector(state));

    const isMyCourse = () => {
        return myCourses.find(c => c.id === course.id)
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
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
            // dispatch(genAbilityTestStart({ token, ability_test: course.ability_test }))
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
                            className="course-tab__address--link">Tổng quan</a>
                    </li>
                    <li className="course-tab__address" id="tab-components">
                        <a href="#cs-course-components"
                            className="course-tab__address--link">Chương trình</a>
                    </li>

                    {
                        !isProgram ? <li className="course-tab__address" id="tab-components">
                            <a href="#cs-course-classes"
                                className="course-tab__address--link">Đăng ký lớp</a>
                        </li> : null
                    }
                </ul>
                <div className="course-tab__btn">
                    <Popconfirm
                        placement={tabStick ? "bottomRight" : "topRight"}
                        title="Bạn có chắc muốn làm bài test kiểm tra năng lực?"
                        onConfirm={confirm}
                        okText="Xác nhận"
                        cancelText="Hủy">
                        <Button
                            type="primary"
                            className="ml-3 cs-btn-tab">Kiểm tra năng lực</Button>
                    </Popconfirm>

                </div>
            </div>
        </section>
    )
};

export default CourseDetailTab