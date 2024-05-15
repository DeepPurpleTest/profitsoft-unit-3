import axios from 'misc/requests';
import config from 'config';
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
import {
  addProject,
  findProjectById,
  updateProjectById,
} from '../../projects/data';

const receiveProject = (project) => ({
  payload: project,
  type: SUCCESS_RECEIVE,
});

const receiveUpdate = (project) => ({
  payload: project,
  type: SUCCESS_UPDATE,
});

const receiveCreate = (project) => ({
  payload: project,
  type: SUCCESS_CREATE,
});

const requestProject = () => ({
  type: REQUEST_PROJECT,
});

const requestProjectUpdate = (project) => ({
  payload: project,
  type: REQUEST_UPDATE,
});

const requestProjectCreate = (project) => ({
  payload: project,
  type: REQUEST_CREATE,
});

const errorUpdateProject = (error) => ({
  payload: error,
  type: ERROR_UPDATE,
});

const errorCreateProject = (error) => ({
  payload: error,
  type: ERROR_UPDATE,
});

const dropErrors = () => ({
  type: DROP_ERRORS,
});

const dropSuccess = () => ({
  type: DROP_SUCCESS,
});

const clearReduxData = () => ({
  type: CLEAR_DATA,
});

const getProject = (id) => {
  const { PROJECTS_SERVICE } = config;
  return axios.get(`${PROJECTS_SERVICE}/projects/` + id, { timeout: 1 });
};

const putProject = (project) => {
  const { PROJECTS_SERVICE } = config;
  return axios.put(`${PROJECTS_SERVICE}/projects/` + project.id, null, {
    timeout: 1,
  });
};

const postProject = (project) => {
  const { PROJECTS_SERVICE } = config;
  return axios.post(`${PROJECTS_SERVICE}/projects`, project, { timeout: 10 });
};

const fetchProject = (id) => (dispatch) => {
  dispatch(requestProject());
  return getProject()
    .catch((err) => {
      const parsedId = parseInt(id);
      return findProjectById(parsedId);
    })
    .then((project) => {
      dispatch(receiveProject(project));
    });
};

const fetchUpdate = (project) => (dispatch) => {
  dispatch(requestProjectUpdate(project));
  return putProject(project)
    .catch((err) => {
      updateProjectById(project.id, project);
      return project;

      // Uncomment if need produce server exception
      // return Promise.reject(new Error('Error while updating project with id ' + project.id));
    })
    .then((project) => {
      dispatch(receiveUpdate(project));
    })
    .catch((error) => {
      dispatch(errorUpdateProject(error));
    });
};

const fetchCreate = (project) => (dispatch) => {
  dispatch(requestProjectCreate(project));
  return postProject(project)
    .catch((err) => {
      const createdProject = addProject(project);
      return createdProject;

      // Uncomment if need produce server exception
      // return Promise.reject(new Error('Error while creating project'));
    })
    .then((project) => {
      dispatch(receiveCreate(project));
    })
    .catch((error) => {
      dispatch(errorCreateProject(error));
    });
};

const clearData = () => (dispatch) => {
  dispatch(clearReduxData());
};

const exportFunctions = {
  clearData,
  dropErrors,
  dropSuccess,
  fetchCreate,
  fetchProject,
  fetchUpdate,
};

export default exportFunctions;
