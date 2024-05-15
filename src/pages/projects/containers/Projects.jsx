import React, {useEffect, useState} from 'react';
import Typography from 'components/Typography';
import Button from "../../../components/Button";
import {useDispatch, useSelector} from "react-redux";
import actionsProjects from "../actions/projects";
import pagesURLs from "../../../constants/pagesURLs";
import * as pages from "../../../constants/pages";
import Link from "../../../components/Link";
import Filter from "../components/Filter";
import {getTotalFilteredPages, getTotalPages} from "../data";
import {useSearchParams} from "react-router-dom";
import {filterSearch} from "../constants/filterSearch";
import {Box} from "@mui/material";
import Dialog from "../../../components/Dialog";
import Card from "../../../components/Card";
import {toast} from "react-toastify";
import {useIntl} from "react-intl";
import IconButton from "../../../components/IconButton";
import PageDown from "../../../components/icons/PageDown";
import PageUp from "../../../components/icons/PageUp";
import Delete from "../../../components/icons/Delete";
import {createUseStyles} from "react-jss";
import useTheme from "../../../misc/hooks/useTheme";

const projectsPerPage = 5;
const getClasses = createUseStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
    },
    projectBox: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '4px',
        marginBottom: '4px',
        width: '100%',
    },
    project: {
        paddingLeft: '10px',
        textAlign: 'left',
        width: '300px',
    },
    deleteIcon: {
        position: 'absolute !important',
        right: '5px !important',
        transition: 'opacity 0.3s ease',
    },
    filter: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    create: {
        textAlign: 'right',
    },
    dialog: {
        textAlign: 'center',
    }
}));

const link = `${pagesURLs[pages.projectPage]}`;

function Projects() {
    const dispatch = useDispatch();
    const {formatMessage} = useIntl();
    const {theme} = useTheme();
    const classes = getClasses({theme});
    const [filterParams, setFilterParams] = useSearchParams();
    const [isHovered, setIsHovered] = useState({
        projectHoverId: null,
    });
    const [state, setState] = useState({
        projectActionId: null,
    });

    const currentPage = parseInt(filterParams.get(filterSearch.page) || '0', 10);
    const filter = {
        name: filterParams.get(filterSearch.name) || '',
        description: filterParams.get(filterSearch.description) || '',
        page: filterParams.get(filterSearch.page),
        projectsPerPage,
        totalPages: getTotalPages(projectsPerPage),
    }

    const {
        projects,
        errorWhileDelete,
        isFetchingProjects,
        isFailedDelete,
        isSuccessDelete,
    } = useSelector(({projects}) => projects);

    const notifySuccess = (message, action) => {
        if (action) {
            action();
        }

        toast.success(message, {
            position: 'bottom-right',
        });
    };

    useEffect(() => {
        dispatch(actionsProjects.fetchFilterProjects(filter));

    }, [currentPage])

    return (
        <Typography>
            <div className={classes.container}>
                <div className={classes.filter}>
                    <div>
                    <Filter projectsPerPage={projectsPerPage}/>
                    </div>
                    <div className={classes.create}>
                        <Link to={{
                            pathname: link,
                        }}>
                            <Button>{formatMessage({id: 'btn.create'})}</Button>
                        </Link>
                    </div>
                </div>
                {isFetchingProjects && <div>Loading....</div>}
                {!isFetchingProjects && (

                    <section>
                        {isSuccessDelete && notifySuccess(formatMessage({id: 'delete.success'}) + state.projectActionId, () => {
                            dispatch(actionsProjects.dropSuccess());
                        })}

                        <ul>
                            {projects?.map(project =>
                                (
                                    <div
                                        key={project.id}
                                        className={classes.projectBox}
                                        onMouseEnter={() => setIsHovered({
                                            projectHoverId: project.id
                                        })}
                                        onMouseLeave={() => setIsHovered({
                                            projectHoverId: null
                                        })}>
                                        <Link
                                            className={classes.projectLink}
                                            to={{
                                                pathname: link + '/' + project.id
                                            }}>
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <div className={classes.project}>
                                                    <h2>
                                                        {project.name}
                                                    </h2>
                                                    <p>{project.description}</p>
                                                </div>
                                            </Box>
                                        </Link>
                                        <Dialog
                                            open={state.projectActionId === project.id}
                                            onClose={() => {
                                            setState({
                                                projectActionId: null,
                                            });
                                            dispatch(actionsProjects.dropErrors())
                                        }}>
                                            <div className={classes.dialog}>
                                                <Card>
                                                    <p>
                                                        {isFailedDelete ? errorWhileDelete.message : formatMessage({id: 'dialog.text'})}
                                                    </p>
                                                </Card>
                                            </div>
                                            <Button onClick={() => {
                                                dispatch(actionsProjects.fetchDeleteProject(state.projectActionId, {
                                                    name: filterParams.get(filterSearch.name),
                                                    description: filterParams.get(filterSearch.description),
                                                    projectsPerPage: projectsPerPage,
                                                    page: 0,
                                                }));
                                                setFilterParams((prev) => ({
                                                    ...prev,
                                                    page: 0,
                                                }))
                                            }}>Delete</Button>
                                        </Dialog>
                                        {isHovered.projectHoverId === project.id && (
                                            <div className={classes.deleteIcon}>
                                                <IconButton
                                                    onClick={() => {
                                                        setState({
                                                            projectActionId: project.id
                                                        })
                                                    }}><Delete/></IconButton>
                                            </div>)
                                        }
                                    </div>
                                )
                            )}
                        </ul>
                    </section>
                )}
                <div>
                    <IconButton onClick={() => {
                        if (currentPage <= 0) {
                            return;
                        }
                        setFilterParams((prev) => ({
                            ...prev,
                            page: currentPage - 1,
                        }))
                    }}><PageDown/></IconButton>
                    <IconButton onClick={() => {
                        let maxPages = getTotalPages(projectsPerPage);
                        if (filter.name || filter.description) {
                            maxPages = getTotalFilteredPages(projectsPerPage, filter);
                        }

                        if (currentPage >= maxPages - 1) {
                            return;
                        }

                        setFilterParams((prev) => ({
                            ...prev,
                            page: currentPage + 1,
                        }))
                    }}><PageUp/></IconButton>
                </div>
            </div>
        </Typography>
    );
}

export default Projects;
