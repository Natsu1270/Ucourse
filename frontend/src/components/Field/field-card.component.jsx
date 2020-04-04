import React from 'react'

const FieldCard = ({name,icon,handleClick}) => {

    return (
        <div className="field-card" onClick={handleClick}>
            <div className="field-card__body" style={
                {backgroundImage:`url(${icon})`}
            }>
                <p className="field-card__body--title">
                    {name}
                </p>
            </div>
        </div>
    )
};

export default FieldCard