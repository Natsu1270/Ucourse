import React from 'react'
import {parseHtml} from "../../utils/text.utils";

const ProgramDetailPrequire = ({prequire}) => {

    return (
        <section className="mt-10 section-course-prequire" id="cs-course-prequire">
            <h2 className="text--main section-header">
                    Pre-requisites
                </h2>

            <div className="section-course-prequire__body">
                <span>
                    {parseHtml(prequire)}
                </span>
            </div>

        </section>
    )
}

export default ProgramDetailPrequire