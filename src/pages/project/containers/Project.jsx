import { useIntl } from 'react-intl';
import React, { useEffect, useState } from 'react';
import Typography from 'components/Typography';
import { useParams } from 'react-router-dom';
import Button from 'components/Button';
import { useDispatch, useSelector } from 'react-redux';
import actionsProject from '../actions/project';
import Link from 'components/Link';
import pagesURLs from 'constants/pagesURLs';
import * as pages from 'constants/pages';
import { toast } from 'react-toastify';
import ProjectForm from '../components/ProjectForm';
import useChangePage from 'misc/hooks/useChangePage';
import IconButton from 'components/IconButton';
import Edit from 'components/icons/Edit';
import { createUseStyles } from 'react-jss';
import useTheme from 'misc/hooks/useTheme';

const link = `${pagesURLs[pages.projectsPage]}`;
const getClasses = createUseStyles((theme) => ({
  back: {
    marginTop: '20px',
    textAlign: 'center',
  },
  details: {
    border: '2px solid #ccc',
    borderRadius: '15px',
    margin: '0 auto',
    position: 'relative',
    textAlign: 'center',
    width: '50%',
  },
  edit: {
    position: 'absolute',
    right: '0px',
    top: '0px',
  },
  title: {
    marginBottom: '35px',
  },
}));

function Project() {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const classes = getClasses({ theme });
  let { projectId } = useParams();
  const { formatMessage } = useIntl();
  const changePage = useChangePage();
  const [editMode, setEditMode] = useState(false);

  const {
    id,
    name,
    description,
    members,
    error,
    isFailedUpdate,
    isFailedCreate,
    isSuccessCreate,
    isSuccessUpdate,
  } = useSelector(({ project }) => project);

  const notifyError = (message, action) => {
    if (action) {
      action();
    }

    toast.error(message, {
      position: 'bottom-right',
    });
  };

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
      console.log('useEffect projectId', projectId)

      dispatch(actionsProject.fetchProject(projectId));
    } else {
      console.log('useEffect else')

      setEditMode(true);
    }

    return () => {
      dispatch(actionsProject.clearData());
    };
  }, []);

  return (
    <Typography>
      <div className={classes.title}>
        <h2>
          {!editMode && formatMessage({ id: 'title.details' })}
          {editMode && formatMessage({ id: 'title.editing' })}
        </h2>
      </div>

      {isFailedUpdate &&
        notifyError(error.message, () => {
          dispatch(actionsProject.dropErrors());
        })}

      {isFailedCreate &&
        notifyError(error.message, () => {
          dispatch(actionsProject.dropErrors());
        })}

      {isSuccessCreate &&
        notifySuccess(formatMessage({id: 'success.created'}), () => {
          setEditMode(false);
          changePage({
            pathname: `${pagesURLs[pages.projectPage]}/` + id,
          });
          dispatch(actionsProject.dropSuccess());
        })}

      {isSuccessUpdate &&
        notifySuccess(formatMessage({id: 'success.updated'}), () => {
          setEditMode(false);
          dispatch(actionsProject.dropSuccess());
        })}

      {!!projectId &&
        (editMode ? (
          <ProjectForm cancelUpdate={() => setEditMode(false)} />
        ) : (
          <div>
            <div className={classes.details}>
              <p>{formatMessage({ id: 'project.name' }) + ': ' + name}</p>
              <p>
                {formatMessage({ id: 'project.description' }) +
                  ': ' +
                  description}
              </p>
              <p>
                {formatMessage({ id: 'project.members' }) +
                  ': ' +
                  members.join(', ')}
              </p>

              <div className={classes.edit}>
                <IconButton
                  onClick={() => {
                    setEditMode(true);
                  }}
                >
                  <Edit />
                </IconButton>
              </div>
            </div>

            <div className={classes.back}>
              <Link
                to={{
                  pathname: link,
                }}
              >
                <Button>{formatMessage({ id: 'btn.back' })}</Button>
              </Link>
            </div>
          </div>
        ))}

      {!projectId && <ProjectForm name={name} description={description} />}
    </Typography>
  );
}

export default Project;
