import {css} from "@emotion/core";
import React from 'react'
import {Spin} from 'antd'
import {LoadingOutlined} from "@ant-design/icons";

const override = css`
        display: block;
        margin: 5rem auto;
        border-color: red;
    `;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const antIconWhite = <LoadingOutlined style={{ fontSize: 24, color:'white' }} spin />;
const spin = <Spin indicator={antIcon} />;
const spinWhite = <Spin indicator={antIconWhite}/>;
const Constants = {
    DATE_FORMAT: 'YYYY/MM/DD',
    DEFAULT_BIRTHDAY_PICK: '1996/01/01',
    SPINNER_STYLE: override,
    MMM_Do_YYYY: 'MMM Do YY',
    MMM_Do__YY__TIME: 'MMM Do YY HH:mm',
    DD_MM_YYYY: 'DD-MM-YYYY',
    FIELD: 'field',
    LEVEL: 'level',
    RATING: 'rating',
    TEACHER: 'teacher',
    SPIN_ICON: spin,
    SPIN_ICON_WHITE: spinWhite,
};

export default Constants