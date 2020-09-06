
import React from 'react'
import videoAvatar from '../../../assets/file.png';
import documentAvatar from '../../../assets/word.png';
import Constants from '../../../constants';

export const assetAvatar = (icon, type) => {
    return icon ? icon : type === Constants.VIDEO_FILE_TYPE ? videoAvatar : documentAvatar

}