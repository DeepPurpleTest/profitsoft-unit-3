import {
    DROP_ERRORS,
    ERROR_DELETE,
    REQUEST_DELETE,
    REQUEST_PROJECTS,
    SUCCESS_DELETE,
    SUCCESS_RECEIVE
} from "../constants/actionType";
import {DROP_SUCCESS} from "../../project/constants/actionType";

const initialState = {
    projects: [],
    errorWhileDelete: '',
    errors: [],
    isFetchingProjects: false,
    isFailedDelete: false,
    isSuccessDelete: false,
};

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case ERROR_DELETE: {
            console.log('case ERROR_DELETE:')
            return {
                ...state,
                errorWhileDelete: action.payload,
                isFailedDelete: true,
            };
        }

        case DROP_ERRORS: {
            return {
                ...state,
                errors: [],
                errorWhileDelete: '',
                isFailedDelete: false,
            }
        }

        case DROP_SUCCESS: {
            return {
                ...state,
                isSuccessDelete: false,
            }
        }

        case SUCCESS_RECEIVE: {
            const projects = action.payload;
            console.log('SUCCESS_RECEIVE', projects)

            return {
                ...state,
                projects: projects.projects || initialState.projects,
                isFetchingProjects: false,
            };
        }

        case SUCCESS_DELETE: {
            const projects = action.payload;
            console.log('SUCCESS_DELETE', projects)

            return {
                ...state,
                projects: projects.projects || initialState.projects,
                isFetchingProjects: false,
                isSuccessDelete: true,
            };
        }

        case REQUEST_DELETE:
        case REQUEST_PROJECTS: {
            return {
                ...state,
                isFetchingProjects: true,
            };
        }

        default: {
            return state;
        }
    }
}
