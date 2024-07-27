import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actionsProject from '../actions/project';
import Link from 'components/Link';
import pagesURLs from 'constants/pagesURLs';
import * as pages from 'constants/pages';
import Button from 'components/Button';
import TextField from 'components/TextField';
import { useIntl } from 'react-intl';
import CardContent from 'components/CardContent';
import { createUseStyles } from 'react-jss';
import useTheme from 'misc/hooks/useTheme';

const link = `${pagesURLs[pages.projectsPage]}`;

const getClasses = createUseStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${theme.spacing(2)}px`,
  },
  create: {
    textAlign: 'center',
    width: '100% !important',
  },
}));

const errorTypes = {
  EMPTY_DESCRIPTION: 'EMPTY_CREATE_DESCRIPTION',
  EMPTY_NAME: 'EMPTY_CREATE_NAME',
};

function ProjectForm({ cancelUpdate }) {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const { theme } = useTheme();
  const classes = getClasses({ theme });

  const project = useSelector(({ project }) => project);
  const [state, setState] = useState({
    description: project.description,
    id: project.id,
    isFailedCreate: false,
    name: project.name,
    validationErrors: [],
  });

  const getValidationErrors = () => {
    const errors = [];
    if (!state.name) {
      errors.push(errorTypes.EMPTY_NAME);
    }
    if (!state.description) {
      errors.push(errorTypes.EMPTY_DESCRIPTION);
    }

    return errors;
  };

  function handleNameChange(event) {
    setState((prev) => ({
      ...prev,
      name: event.target.value,
    }));
  }

  function handleDescriptionChange(event) {
    setState((prev) => ({
      ...prev,
      description: event.target.value,
    }));
  }

  return (
    <CardContent>
      <div className={classes.content}>
        <TextField
          helperText={
            state.validationErrors.includes(errorTypes.EMPTY_NAME) &&
            formatMessage({ id: `create.error.${errorTypes.EMPTY_NAME}` })
          }
          isError={state.validationErrors.includes(errorTypes.EMPTY_NAME)}
          label={formatMessage({ id: 'project.name' })}
          id="name"
          value={state?.name}
          required
          onChange={handleNameChange}
        />

        <TextField
          helperText={
            state.validationErrors.includes(errorTypes.EMPTY_DESCRIPTION) &&
            formatMessage({
              id: `create.error.${errorTypes.EMPTY_DESCRIPTION}`,
            })
          }
          isError={state.validationErrors.includes(
            errorTypes.EMPTY_DESCRIPTION
          )}
          label={formatMessage({ id: 'project.description' })}
          id="description"
          value={state?.description}
          required
          onChange={handleDescriptionChange}
        />

        {project.id && (
          <Button
            onClick={() => {
              const validationErrors = getValidationErrors();
              if (!validationErrors.length) {
                dispatch(actionsProject.fetchUpdate(state));
              }

              setState({
                ...state,
                validationErrors: validationErrors,
              });
            }}
          >
            {formatMessage({ id: 'btn.save' })}
          </Button>
        )}
        {!project.id && (
          <Button
            onClick={() => {
              const validationErrors = getValidationErrors();
              if (!validationErrors.length) {
                dispatch(actionsProject.fetchCreate(state));
              }

              setState({
                ...state,
                validationErrors: validationErrors,
              });
            }}
          >
            {formatMessage({ id: 'btn.create' })}
          </Button>
        )}
        {project.id && (
          <Button
            onClick={() => {
              cancelUpdate();
            }}
          >
            {formatMessage({ id: 'btn.cancel' })}
          </Button>
        )}

        {!project.id && (
          <div className={classes.create}>
            <Link
              to={{
                pathname: link,
              }}
            >
              <Button>{formatMessage({ id: 'btn.cancel' })}</Button>
            </Link>
          </div>
        )}
      </div>
    </CardContent>
  );
}

export default ProjectForm;
