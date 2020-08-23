import React, { useEffect, useState } from 'react'
import { Modal, Skeleton, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { isAbilityTestModalActiveSelector } from "../../redux/UI/ui.selects";
import {
    generatedAbilityTestSelector,
    isGeneratingAbilityTestSelector,
    atDurationSelector,
    atQuestionsSelector, uatIdSelector
} from "../../redux/AbilityTest/abilityTest.selects";
import { toggleAbilityTestModal } from "../../redux/UI/ui.actions";
import AbilityTestForm from './ability-test-form.component';

import { Button } from 'antd'
import { generateAbilityTestAPI } from '../../api/abilityTest.services';

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
                <Skeleton active loading={loading}>
                    <AbilityTestForm
                        duration={test.duration}
                        questions={test.questions}
                        uATId={test.id}
                    />
                </Skeleton>
            }
        </Modal>
    )
};

export default AbilityTest