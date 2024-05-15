import {
  CLEAR_DATA,
  DROP_ERRORS,
  DROP_SUCCESS,
  ERROR_UPDATE,
  REQUEST_CREATE,
  REQUEST_PROJECT,
  REQUEST_UPDATE,
  SUCCESS_CREATE,
  SUCCESS_RECEIVE,
  SUCCESS_UPDATE,
} from '../constants/actionType';

const initialState = {
  description: '',
  error: '',
  id: null,
  isFailedCreate: false,
  isFailedUpdate: false,
  isFetchingProject: false,
  isSuccessCreate: false,
  isSuccessUpdate: false,
  members: [],
  name: '',
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case ERROR_UPDATE: {
      return {
        ...state,
        error: action.payload,
        isFailedUpdate: true,
      };
    }

    case DROP_ERRORS: {
      return {
        ...state,
        error: '',
        isFailedCreate: false,
        isFailedUpdate: false,
        isFetchingProject: false,
      };
    }

    case DROP_SUCCESS: {
      return {
        ...state,
        isSuccessCreate: false,
        isSuccessUpdate: false,
      };
    }

    case SUCCESS_RECEIVE: {
      const project = action.payload;
      return {
        ...state,
        description: project.description || initialState.description,
        id: project.id,
        isFetchingProject: false,
        members: project.members || initialState.members,
        name: project.name || initialState.name,
      };
    }

    case SUCCESS_UPDATE: {
      const project = action.payload;
      return {
        ...state,
        description: project.description || initialState.description,
        id: project.id,
        isSuccessUpdate: true,
        members: project.members || initialState.members,
        name: project.name || initialState.name,
      };
    }

    case SUCCESS_CREATE: {
      const project = action.payload;
      return {
        ...state,
        description: project.description || initialState.description,
        id: project.id,
        isSuccessCreate: true,
        members: project.members || initialState.members,
        name: project.name || initialState.name,
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
