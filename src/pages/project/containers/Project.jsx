import {useIntl} from 'react-intl';
import React, {useEffect, useState} from 'react';
import Typography from 'components/Typography';
import {useParams} from "react-router-dom";
import Button from "../../../components/Button";
import {useDispatch, useSelector} from "react-redux";
import actionsProject from "../actions/project";
import Link from "../../../components/Link";
import pagesURLs from "../../../constants/pagesURLs";
import pageURLs from "../../../constants/pagesURLs";
import * as pages from "../../../constants/pages";
import {toast} from "react-toastify";
import ProjectForm from "../components/ProjectForm";
import useChangePage from "../../../misc/hooks/useChangePage";
import IconButton from "../../../components/IconButton";
import Edit from "../../../components/icons/Edit";


const link = `${pagesURLs[pages.projectsPage]}`;

function Project() {
    const dispatch = useDispatch();
    let {projectId} = useParams();
    const {formatMessage} = useIntl();
    const changePage = useChangePage();
    const [editMode, setEditMode] = useState(false);

    const {
        id,
        name,
        description,
        members,
        error,
        errors,
        isFailedUpdate,
        isFailedCreate,
        isSuccessCreate,
        isSuccessUpdate,
    } = useSelector(({project}) => project);


    const notifyError = (message, action) => {
        if (action) {
            action();
        }

        toast.error(message, {
            position: 'bottom-right',
        });
    }

    const notifySuccess = (message, action) => {
        if (action) {
            action();
        }

        toast.success(message, {
            position: 'bottom-right',
        });
    };

    useEffect(() => {
        if (projectId) {
            dispatch(actionsProject.fetchProject(projectId))
        } else {
            setEditMode(true);
        }

        return () => {
            dispatch(actionsProject.clearData());
        }
    }, []);

    return (
        <Typography>
            {!editMode && <div>{formatMessage({id: 'title.details'})}</div>}
            {editMode && <div>{formatMessage({id: 'title.editing'})}</div>}

            {isFailedUpdate && notifyError(error.message, () => {
                dispatch(actionsProject.dropErrors())
            })}

            {isFailedCreate && notifyError(error.message, () => {
                dispatch(actionsProject.dropErrors())
            })}

            {isSuccessCreate && notifySuccess('Project created!', () => {
                setEditMode(false);
                changePage({
                    pathname: `${pageURLs[pages.projectPage]}/` + id},
                )
                dispatch(actionsProject.dropSuccess())

            })}

            {isSuccessUpdate && notifySuccess('Project updated!', () => {
                setEditMode(false)
                dispatch(actionsProject.dropSuccess())
            })}

            {!!projectId && (editMode ? (<ProjectForm isFailedCreate={isFailedCreate} errors={errors} cancelUpdate={() => setEditMode(false)}/>) : (
                    <>
                        <div>
                            <p>{formatMessage({id: 'project.name'}) + ': ' + name}</p>
                            <p>{formatMessage({id: 'project.description'}) + ': ' + description}</p>
                            <p>{formatMessage({id: 'project.members'}) + ': ' + members.join(', ')}</p>
                        </div>
                        <IconButton onClick={() => {
                            setEditMode(true);
                        }}><Edit/></IconButton>
                        <Link to={{
                            pathname: link,
                        }}>
                            <Button>{formatMessage({id: 'btn.back'})}</Button>
                        </Link>
                    </>)
            )}

            {!projectId && (<ProjectForm name={name} description={description}/>)}

        </Typography>
    );
}

export default Project;
