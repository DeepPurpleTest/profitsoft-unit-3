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

const getProject = async (id) => {
  const { PROJECTS_SERVICE } = config;
  return axios.get(`${PROJECTS_SERVICE}/api/projects/` + id, {
    withCredentials: true,
    timeout: 1000 });
};

const putProject = (project) => {
  const { PROJECTS_SERVICE } = config;
  return axios.put(`${PROJECTS_SERVICE}/api/projects/` + project.id, project, {
    withCredentials: true,
    timeout: 1000,
  });
};

const postProject = (project) => {
  const { PROJECTS_SERVICE } = config;

  console.log(project);
  return axios.post(`${PROJECTS_SERVICE}/api/projects`, project, {
    withCredentials: true,
    timeout: 1000 });
};

const fetchProject = (id) => (dispatch) => {
  console.log('fetchProject with id', id);
  dispatch(requestProject());
  return getProject(id)
    .catch((err) => {
      console.log('getProject(id) catch(err)');

      return Promise.reject(new Error('Error while fetching project with id ' + id));
    })
    .then((project) => {
      console.log('getProject(id) then(project) ', project);

      dispatch(receiveProject(project));
    });
};

const fetchUpdate = (project) => (dispatch) => {
  console.log('fetchUpdate(project) ', project)

  dispatch(requestProjectUpdate(project));
  return putProject(project)
    .catch((err) => {
      console.log('fetchUpdate(project) catch(err) Project ', project)
      console.log('fetchUpdate(project) catch(err) Error ', err)

      return Promise.reject(new Error('Error while updating project with id ' + project.id));
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
      return Promise.reject(new Error('Error while creating project'));
    })
    .then((id) => {
      console.log('ID', id);


      console.log('PROJECT BEFORE dispatch', project);
      dispatch(receiveCreate(project));

      dispatch(requestProject());
      project = getProject(id);
      console.log('PROJECT AFTER dispatch', project);

      return project;
    })
    .then((project) => {
      console.log('RECEIVE PROJECT ', project);
      dispatch(receiveProject(project));
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
