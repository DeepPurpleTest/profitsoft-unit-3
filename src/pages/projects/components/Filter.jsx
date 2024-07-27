import Button from 'components/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import actionsProjects from '../actions/projects';
import { useSearchParams } from 'react-router-dom';
import { filterSearch } from '../constants/filterSearch';
import TextField from 'components/TextField';
import { useIntl } from 'react-intl';

function Filter({ projectsPerPage }) {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const [filterParams, setFilterParams] = useSearchParams();
  const [filter, setFilter] = useState({
    name: filterParams.get(filterSearch.name),
    page: 0,
    projectsPerPage: projectsPerPage,
  });

  function handleNameChange(event) {
    setFilter({
      ...filter,
      name: event.target.value,
    });
  }

  function handleFiltrate() {
    dispatch(actionsProjects.fetchFilterProjects(filter));

    const updatedParams = new URLSearchParams(filterParams);
    updatedParams.set(filterSearch.page, filter.page);
    updatedParams.set(filterSearch.name, filter.name);
    setFilterParams(updatedParams, { replace: true });
  }

  return (
    <div>
      <TextField
        onChange={handleNameChange}
        value={filter.name}
        label={formatMessage({ id: 'filter.name' })}
      />
      <Button onClick={handleFiltrate}>
        {formatMessage({ id: 'btn.filtrate' })}
      </Button>
    </div>
  );
}

export default Filter;
