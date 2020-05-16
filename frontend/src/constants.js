// import {css} from "@emotion/core";
import React from 'react'
import {Spin} from 'antd'
import {LoadingOutlined} from "@ant-design/icons";

// const override = css`
//         display: block;
//         margin: 5rem auto;
//         border-color: red;
//     `;

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;
const antIconWhite = <LoadingOutlined style={{fontSize: 24, color: 'white'}} spin/>;
const spin = <Spin indicator={antIcon}/>;
const spinWhite = <Spin indicator={antIconWhite}/>;

const ckeditorConfigs = {
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
            ]
        }
}
const Constants = {
    DATE_FORMAT: 'YYYY/MM/DD',
    DEFAULT_BIRTHDAY_PICK: '1996/01/01',
    // SPINNER_STYLE: override,
    MMM_Do_YYYY: 'MMM Do YY',
    MMM_Do__YY__TIME: 'MMM-Do-YY HH:mm',
    DD_MM_YYYY: 'DD-MM-YYYY',
    FIELD: 'field',
    LEVEL: 'level',
    RATING: 'rating',
    TEACHER: 'teacher',
    SPIN_ICON: spin,
    SPIN_ICON_WHITE: spinWhite,
    COURSE_HOME_LINK: '/learn',
    VIDEO_FILE_TYPE: 'video',
    DOCUMENT_FILE_TYPE: 'document',
    COURSES_DETAIL_LINK: '/courses',
    CKEDITOR_CONFIGS: ckeditorConfigs
};

export default Constants