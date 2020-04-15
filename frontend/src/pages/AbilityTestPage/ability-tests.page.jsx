import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {createStructuredSelector} from "reselect";
import {abilityTestsSelector, isGeneratingAbilityTestSelector} from "../../redux/AbilityTest/abilityTest.selects";
import {getAbilityTestStart} from "../../redux/AbilityTest/abilityTest.actions";
import {tokenSelector} from "../../redux/Auth/auth.selects";
import {Skeleton} from "antd";

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
        <div className="ability-test-page">
            FUCK
            {
                isFetching ? <Skeleton active /> : abilityTests.map(test=>
                    <p>{test.ability_test} {test.result}</p>
                )
            }
        </div>
    )
}

export default AbilityTestPage