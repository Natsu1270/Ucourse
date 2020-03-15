import UIActionTypes from './ui.types'

export const showRLModal = () => {
    return {
        type: UIActionTypes.SHOW_RL_MODAL
    }
}

export const hideRLModal = () => {
    return {
        type: UIActionTypes.HIDE_RL_MODAL
    }
}
export const switchRLForm = () => {
    return {
        type: UIActionTypes.SWITCH_RL_FORM
    }
}