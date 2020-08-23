// import {css} from "@emotion/core";
import React from 'react'
import { Button, Result, Spin } from 'antd'
import { LoadingOutlined } from "@ant-design/icons";

// const override = css`
//         display: block;
//         margin: 5rem auto;
//         border-color: red;
//     `;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const antIconWhite = <LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />;
const spin = <Spin indicator={antIcon} />;
const spinWhite = <Spin indicator={antIconWhite} />;

const ckeditorConfigs = {
    toolbar: ["heading", "|", "selectAll", "undo", "redo", "highlight", "fontFamily", "bold", "italic", "link",
        "blockQuote", "ckfinder", "imageTextAlternative", "imageUpload", "imageStyle:full",
        "imageStyle:side", "indent", "outdent", "numberedList", "bulletedList", "mediaEmbed",
        "insertTable", "tableColumn", "tableRow", "mergeTableCells"
    ],
    heading: {
        options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' }
        ]
    }
}
const emptyData = <Result className="white-bg"
    title="Chưa có lớp mở thuộc khóa học này"
/>

const levelTypes = {
    Beginner: "Cơ bản",
    Intermediate: "Trung cấp",
    Advanced: "Nâng cao"
}


const Constants = {
    DATE_FORMAT: 'YYYY/MM/DD',
    YYYY_MM_DD: 'YYYY-MM-DD',
    DEFAULT_BIRTHDAY_PICK: '1996/01/01',
    // SPINNER_STYLE: override,
    MMM_Do_YYYY: 'MMM Do YY',
    MMM_Do__YY__TIME: 'Do-MMM-YY HH:mm',
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
    CKEDITOR_CONFIGS: ckeditorConfigs,
    EMPTY_CLASS_RESULT: emptyData,
    COURSE_LEVEL_TYPES: levelTypes,
    UN_AUTHORIZATION_ERROR: "Bạn phải đăng nhập để thực hiện chức năng này",
    EXAM_GET_BEST: 'best',
    EXAM_GET_AVERAGE: 'average',
    EXAM_GET_LAST: 'last',
    RESULT_TYPE_NODATA: 'no_data'
};

export default Constants