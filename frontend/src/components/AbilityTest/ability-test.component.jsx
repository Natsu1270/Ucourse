import React, { useEffect } from 'react'
import { Modal, Skeleton } from "antd";
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

const AbilityTest = () => {

    const {
        isModalActive,
        generatedAbilityTest,
        isGenerating,
        duration,
        questions,
        uATid,
    } = useSelector(createStructuredSelector({
        isModalActive: isAbilityTestModalActiveSelector,
        generatedAbilityTest: generatedAbilityTestSelector,
        isGenerating: isGeneratingAbilityTestSelector,
        duration: atDurationSelector,
        questions: atQuestionsSelector,
        uATid: uatIdSelector,
    }));

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
                isGenerating ? <Skeleton active /> : <AbilityTestForm
                    duration={duration}
                    questions={questions}
                    uATId={uATid}
                />
            }
        </Modal>
    )
};

export default AbilityTest