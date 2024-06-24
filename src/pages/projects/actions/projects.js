import axios from 'misc/requests';
import config from 'config';
import { deleteById, filterProjects } from '../data';
import {
  DROP_ERRORS,
  ERROR_DELETE, ERROR_FETCH,
  REQUEST_DELETE,
  REQUEST_PROJECTS,
  SUCCESS_DELETE,
  SUCCESS_RECEIVE,
} from '../constants/actionType';
import { DROP_SUCCESS } from '../../project/constants/actionType';

const receiveProjects = (projects) => ({
  payload: projects,
  type: SUCCESS_RECEIVE,
});

const receiveDelete = (projects) => ({
  payload: projects,
  type: SUCCESS_DELETE,
});

const requestProjects = () => ({
  type: REQUEST_PROJECTS,
});

const requestProjectDelete = () => ({
  type: REQUEST_DELETE,
});

const errorDeleteProject = (errors) => ({
  payload: errors,
  type: ERROR_DELETE,
});

const errorFetchProjects = (errors) => ({
  payload: errors,
  type: ERROR_FETCH,
})

const dropErrors = () => ({
  type: DROP_ERRORS,
});

const dropSuccess = () => ({
  type: DROP_SUCCESS,
});

const getProjects = (filter) => {
  const postData = {
    offset: filter.page * filter.projectsPerPage,
    pageSize: filter.projectsPerPage,
  };

  if (filter.name !== undefined && filter.name !== null && filter.name !== '') {
    postData.project_name = filter.name;
  }

  const { PROJECTS_SERVICE } = config;
  return axios.post(`${PROJECTS_SERVICE}/api/projects/_list`, postData, {
    withCredentials: true,
    timeout: 2000,
  });
};

const deleteProjectById = (id) => {
  const { PROJECTS_SERVICE } = config;
  return axios.delete(`${PROJECTS_SERVICE}/projects` + id, { timeout: 10 });
};

const fetchFilterProjects = (filter) => (dispatch) => {
  dispatch(requestProjects());
  return getProjects(filter)
    .catch((err) => {
      return Promise.reject(new Error('Error while fetching projects ' + err));
    })
    .then((projects) => {
      dispatch(receiveProjects(projects));
    })
    .catch((error) => {
      dispatch(errorFetchProjects(error));
    });

};

const fetchDeleteProject = (id, filter) => (dispatch) => {
  dispatch(requestProjectDelete());
  return deleteProjectById()
    .catch((err) => {
      return Promise.reject(new Error('Error while delete project with id ' + id));
    })
    .then((projects) => {
      dispatch(receiveDelete(projects));
    })
    .catch((error) => {
      dispatch(errorDeleteProject(error));
    });
};

const exportFunctions = {
  dropErrors,
  dropSuccess,
  fetchDeleteProject,
  fetchFilterProjects,
};

export default exportFunctions;
