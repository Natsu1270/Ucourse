 import React from 'react';
import Constants from "../../constants";
import { formatDate } from "../../utils/text.utils";

const AbilityTestCard = ({date, result, icon, name, index}) => {


    return (
        <div className={`ability-test-card dis-flex-between ${index%2===0?'': ' odd-card'}`}>
            <div className="ability-test-card__date">
                <span>Ngày thực hiện: {formatDate(date, Constants.MMM_Do__YY__TIME)}</span>
            </div>
            <div className="ability-test-card__name">
                <span>Khóa: {name}</span>
            </div>
            <div className="ability-test-card__result">
                <span>Kết quả: {result}</span>
            </div>
        </div>
    )
};

export default AbilityTestCard