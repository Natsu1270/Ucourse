import { Alert, Button, message, Modal, Skeleton } from "antd";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { generateAbilityTestAPI } from '../../api/abilityTest.services';
import { toggleAbilityTestModal } from "../../redux/UI/ui.actions";
import { isAbilityTestModalActiveSelector } from "../../redux/UI/ui.selects";
import AbilityTestForm from './ability-test-form.component';


const AbilityTest = ({ abilityTestId, token }) => {

    const {
        isModalActive
    } = useSelector(createStructuredSelector({
        isModalActive: isAbilityTestModalActiveSelector,
    }));

    const [loading, setLoading] = useState(true)
    const [test, setTest] = useState({})

    const generateTest = async () => {
        setLoading(true)
        try {
            if (abilityTestId == undefined) {
                message.info('Chưa có bài kiểm tra năng lực cho khóa học này')
                setLoading(false)
                return
            }
            const { data } = await generateAbilityTestAPI({ token, ability_test: abilityTestId })
            setTest(data.data.user_ability_test)
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (token && isModalActive) {
            generateTest()
        }
    }, [token, abilityTestId, isModalActive])

    const dispatch = useDispatch();

    const close = (e) => dispatch(toggleAbilityTestModal());

    const bodyStyle = {
        backgroundColor: '#f8f8f9',
    }

    const style = {
        backgroundColor: '#ffffff',
        paddingBottom: 0,
        top: 20,
        maxHeight: '90vh',

    };

    return (
        <Modal
            destroyOnClose={true}
            className="ability-test-model"
            title="Bài kiểm tra năng lực"
            visible={isModalActive}
            closable={true}
            onOk={close}
            onCancel={close}
            footer={[
                <Button key={1} type="danger" onClick={close}>
                    Hủy
                </Button>,
            ]}
            style={style}
            width={800}
            bodyStyle={bodyStyle}
        >
            {
                abilityTestId ? <Skeleton active loading={loading}>
                <AbilityTestForm
                    duration={test.duration}
                    questions={test.questions}
                    uATId={test.id}
                />
            </Skeleton> : <Alert showIcon type="info" message="Không có bài kiểm tra năng lực cho khóa học này" />
            }
        </Modal>
    )
};

export default AbilityTest