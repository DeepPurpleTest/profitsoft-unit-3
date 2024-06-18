import {
  DROP_ERRORS,
  ERROR_DELETE,
  REQUEST_DELETE,
  REQUEST_PROJECTS,
  SUCCESS_DELETE,
  SUCCESS_RECEIVE,
} from '../constants/actionType';
import { DROP_SUCCESS } from '../../project/constants/actionType';

const initialState = {
  errorWhileDelete: '',
  errors: [],
  isFailedDelete: false,
  isFetchingProjects: false,
  isSuccessDelete: false,
  projects: [],
  totalPages: 1,
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case ERROR_DELETE: {
      return {
        ...state,
        errorWhileDelete: action.payload,
        isFailedDelete: true,
      };
    }

    case DROP_ERRORS: {
      return {
        ...state,
        errorWhileDelete: '',
        errors: [],
        isFailedDelete: false,
      };
    }

    case DROP_SUCCESS: {
      return {
        ...state,
        isSuccessDelete: false,
      };
    }

    case SUCCESS_RECEIVE: {
      const response = action.payload;

      return {
        ...state,
        isFetchingProjects: false,
        projects: response.projects || initialState.projects,
        totalPages: response.total_pages || initialState.totalPages,
      };
    }

    case SUCCESS_DELETE: {
      const projects = action.payload;
      return {
        ...state,
        isFetchingProjects: false,
        isSuccessDelete: true,
        projects: projects.projects || initialState.projects,
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
