
import React from 'react'
import videoAvatar from '../../../assets/streaming.png'
import youtubeAvatar from '../../../assets/file.png';
import documentAvatar from '../../../assets/word.png';
import Constants from '../../../constants';

export const assetAvatar = (icon, type) => {
    if (type == Constants.VIDEO_FILE_TYPE) {
        return videoAvatar
    }
    if (type == Constants.YOUTUBE) {
        return youtubeAvatar
    }

    return documentAvatar

}