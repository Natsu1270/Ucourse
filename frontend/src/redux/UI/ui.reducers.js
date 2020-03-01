import UIActionTypes from './ui.types'

const initState = {
    isRLModalActive: false,
    isSignupPanelActive: false
}

const uiReducer = (state = initState, action) => {
    switch (action.type) {
        case UIActionTypes.TOGGLE_RL_MODAL:
            return {
                ...state,
                isRLModalActive: !state.isRLModalActive
            }
        case UIActionTypes.SWITCH_RL_FORM:
            return {
                ...state,
                isSignupPanelActive: !state.isSignupPanelActive
            }

        default:
            return state
    }
}

export default uiReducer