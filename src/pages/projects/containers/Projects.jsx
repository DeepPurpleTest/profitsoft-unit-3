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
        width: '400px',
    },
    project: {
        width: '100%',
    },
    deleteIcon: {
        position: 'absolute',
        top: '5px',
        right: '5px',
        transition: 'opacity 0.3s ease',
    },
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
                <Link to={{
                    pathname: link,
                }}>
                    <Button>{formatMessage({id: 'btn.create'})}</Button>
                </Link>
                <Filter projectsPerPage={projectsPerPage}/>
                {isFetchingProjects && <div>Loading....</div>}
                {!isFetchingProjects && (
                    <section>
                        {isSuccessDelete && notifySuccess(formatMessage({id: 'delete.success'}) + state.projectActionId, () => {
                            dispatch(actionsProjects.dropSuccess());
                        })}

                        <ul>
                            {projects?.map(project =>
                                (
                                    <Box
                                        className={classes.projectBox}
                                        key={project.id} onMouseEnter={() => setIsHovered({
                                        projectHoverId: project.id
                                    })}
                                        onMouseLeave={() => setIsHovered({
                                            projectHoverId: null
                                        })} sx={{display: 'flex', alignItems: 'center'}}>
                                        <Link to={{
                                            pathname: link + '/' + project.id
                                        }}>
                                            <div className={classes.project}>
                                                <h2>
                                                    {project.name}
                                                </h2>
                                                <p>{project.description}</p>
                                            </div>
                                        </Link>

                                        <Dialog open={state.projectActionId === project.id} onClose={() => {
                                            setState({
                                                projectActionId: null,
                                            });
                                            dispatch(actionsProjects.dropErrors())
                                        }}>
                                            <Card>
                                                <p>
                                                    {isFailedDelete ? errorWhileDelete.message : formatMessage({id: 'dialog.text'})}
                                                </p>
                                            </Card>
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

                                        <Box sx={{maxHeight: '50px'}}>
                                            {isHovered.projectHoverId === project.id && (
                                                <IconButton className={classes.deleteIcon} onClick={() => {
                                                    setState({
                                                        projectActionId: project.id
                                                    })
                                                }}><Delete/></IconButton>)}
                                        </Box>
                                    </Box>
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
