import ProgramActionTypes from './program.types'

export const fetchProgramsStart = () => ({
    type: ProgramActionTypes.FETCH_PROGRAMS_START
});

export const fetchProgramsSuccess = (programs) => ({
    type: ProgramActionTypes.FETCH_PROGRAMS_SUCCESS,
    payload: programs
});

export const fetchProgramsFail = (err) => ({
    type: ProgramActionTypes.FETCH_PROGRAMS_FAIL,
    payload: err.response
});


export const fetchProgramDetailStart = (slug) => ({
    type: ProgramActionTypes.FETCH_PROGRAM_DETAIL_START,
    payload: slug
});

export const fetchProgramDetailSuccess = (program) => ({
    type: ProgramActionTypes.FETCH_PROGRAM_DETAIL_SUCCESS,
    payload: program
});

export const fetchProgramDetailFail = (err) => ({
    type: ProgramActionTypes.FETCH_PROGRAM_DETAIL_FAIL,
    payload: err.response
});