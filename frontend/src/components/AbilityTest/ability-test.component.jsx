import React, { useEffect } from 'react'
import { Modal, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { isAbilityTestModalActiveSelector } from "../../redux/UI/ui.selects";
import {
    generatedAbilityTestSelector,
    isGeneratingAbilityTestSelector,
    atDurationSelector,
    atQuestionsSelector
} from "../../redux/AbilityTest/abilityTest.selects";
import { toggleAbilityTestModal } from "../../redux/UI/ui.actions";
import AbilityTestForm from './ability-test-form.component';

const AbilityTest = () => {

    const {
        isModalActive,
        generatedAbilityTest,
        isGenerating,
        duration,
        questions,
    } = useSelector(createStructuredSelector({
        isModalActive: isAbilityTestModalActiveSelector,
        generatedAbilityTest: generatedAbilityTestSelector,
        isGenerating: isGeneratingAbilityTestSelector,
        duration: atDurationSelector,
        questions: atQuestionsSelector,
    }));

    const dispatch = useDispatch();

    const close = (e) => dispatch(toggleAbilityTestModal());

    const bodyStyle = {
        backgroundColor: '#f8f8f9'
    }

    const style = {
        backgroundColor: '#ffffff',
        paddingBottom: 0,
    }

    return (
        <Modal
            title="Bài kiểm tra năng lực"
            visible={isModalActive}
            onCancel={close}
            style={style}
            width={800}
            bodyStyle={bodyStyle}
        >
            {
                isGenerating ? <Skeleton active /> : <AbilityTestForm
                    duration={duration}
                    questions={questions} />
            }
        </Modal>
    )
};

export default AbilityTest