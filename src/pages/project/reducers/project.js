import {
    CLEAR_DATA, DROP_ERRORS, DROP_SUCCESS, ERROR_UPDATE,
    REQUEST_CREATE,
    REQUEST_PROJECT,
    REQUEST_UPDATE, SUCCESS_CREATE,
    SUCCESS_RECEIVE, SUCCESS_UPDATE
} from "../constants/actionType";

const initialState = {
    id: null,
    name: '',
    description: '',
    members: [],
    error: '',
    isFetchingProject: false,
    isFailedUpdate: false,
    isFailedCreate: false,
    isSuccessCreate: false,
    isSuccessUpdate: false,
};

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case ERROR_UPDATE: {
            return {
                ...state,
                error: action.payload,
                isFailedUpdate: true,
            }
        }

        case DROP_ERRORS: {
            return {
                ...state,
                error: '',
                isFetchingProject: false,
                isFailedUpdate: false,
                isFailedCreate: false,
            }
        }

        case DROP_SUCCESS: {
            return {
                ...state,
                isSuccessCreate: false,
                isSuccessUpdate: false,
            }
        }

        case SUCCESS_RECEIVE: {
            const project = action.payload;
            return {
                ...state,
                id: project.id,
                name: project.name || initialState.name,
                description: project.description || initialState.description,
                members: project.members || initialState.members,
                isFetchingProject: false,
            };
        }

        case SUCCESS_UPDATE: {
            const project = action.payload;
            return {
                ...state,
                id: project.id,
                name: project.name || initialState.name,
                description: project.description || initialState.description,
                members: project.members || initialState.members,
                isSuccessUpdate: true,
            };
        }

        case SUCCESS_CREATE: {
            const project = action.payload;
            return {
                ...state,
                id: project.id,
                name: project.name || initialState.name,
                description: project.description || initialState.description,
                members: project.members || initialState.members,
                isSuccessCreate: true,
            };
        }

        case REQUEST_CREATE:
        case REQUEST_UPDATE:
        case REQUEST_PROJECT: {
            return {
                ...state,
                isFetchingProjects: true,
            };
        }

        case CLEAR_DATA: {
            return initialState;
        }

        default: {
            return state;
        }
    }
}
