import UserActionTypes from "./user.types";

const initState = {
    currentUser: null,
    errorMessage: null
}


const userReducer = (state=initState, action)=> {
    switch (action.type) {
        case UserActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload
            }
        case UserActionTypes.LOGIN_FAIL:
            return {
                ...state,
                errorMessage: action.payload
            }
    }
}