import axios from 'misc/requests';
import config from 'config';
import {deleteById, filterProjects} from "../data";
import {
    DROP_ERRORS,
    ERROR_DELETE,
    REQUEST_DELETE,
    REQUEST_PROJECTS,
    SUCCESS_DELETE,
    SUCCESS_RECEIVE
} from "../constants/actionType";
import {DROP_SUCCESS} from "../../project/constants/actionType";

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
})

const dropErrors = () => ({
    type: DROP_ERRORS,
})

const dropSuccess = () => ({
    type: DROP_SUCCESS,
})

const getProjects = () => {
    const {
        PROJECTS_SERVICE,
    } = config;
    return axios.get(`${PROJECTS_SERVICE}/projects`, {timeout: 500});
};

const deleteProjectById = (id) => {
    const {
        PROJECTS_SERVICE,
    } = config;
    return axios.delete(`${PROJECTS_SERVICE}/projects` + id, {timeout: 10});
};

const fetchFilterProjects = (filter) => (dispatch) => {
    dispatch(requestProjects());
    return getProjects()
        .catch((err) => {
            const filteredProjects = filterProjects(filter);
            return {
                projects: filteredProjects,
                page: filter.page,
                isFiltering: filter.isFiltering,
            };
        })
        .then(projects => {
            dispatch(receiveProjects(projects))
        });
};

const fetchDeleteProject = (id, filter) => (dispatch) => {
    dispatch(requestProjectDelete());
    return deleteProjectById()
        .catch((err) => {
            deleteById(id);
            const filteredProjects = filterProjects(filter);

            return {
                projects: filteredProjects,
                page: filter.page,
                isFiltering: filter.isFiltering,
            };
            // return Promise.reject(new Error('Error while delete project with id ' + id));
        })
        .then(projects => {
            dispatch(receiveDelete(projects))
        })
        .catch((error) => {
            dispatch(errorDeleteProject(error));
        })
};

const exportFunctions = {
    fetchDeleteProject,
    fetchFilterProjects,
    dropErrors,
    dropSuccess,
};

export default exportFunctions;
