import UIActionTypes from './ui.types'

export const toggleRLModal = () => {
    return {
        type: UIActionTypes.TOGGLE_RL_MODAL
    }
}

export const switchRLForm = () => {
    return {
        type: UIActionTypes.SWITCH_RL_FORM
    }
}