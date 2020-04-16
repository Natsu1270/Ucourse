import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {createStructuredSelector} from "reselect";
import {abilityTestsSelector, isGeneratingAbilityTestSelector} from "../../redux/AbilityTest/abilityTest.selects";
import {getAbilityTestStart} from "../../redux/AbilityTest/abilityTest.actions";
import {tokenSelector} from "../../redux/Auth/auth.selects";
import {Skeleton, Timeline} from "antd";
import AbilityTestCard from "../../components/AbilityTest/ability-test-card.component";

const AbilityTestPage = () => {
    const dispatch = useDispatch()
    const {isFetching, abilityTests, token} = useSelector(createStructuredSelector({
        isFetching: isGeneratingAbilityTestSelector,
        abilityTests: abilityTestsSelector,
        token: tokenSelector
    }))

    useEffect(() => {
        dispatch(getAbilityTestStart(token))
    }, [])

    return (
        <div className="ability-test-page page section-10">
            <h3 className="text--main text-center">
                Các bài thi kiểm tra năng lực đã thực hiện
            </h3>
            {
                isFetching ? <Skeleton avatar paragraph={{rows:8}} active/> :
                    <Timeline>
                        {
                            abilityTests.map((test, index) =>
                                <Timeline.Item key={test.id}>
                                    <AbilityTestCard
                                        index={index+1}
                                        date={test.date_taken}
                                        icon={test.course.icon}
                                        result={test.result}
                                        name={test.course.title}/>
                                </Timeline.Item>)
                        }
                    </Timeline>
            }
        </div>
    )
}

export default AbilityTestPage