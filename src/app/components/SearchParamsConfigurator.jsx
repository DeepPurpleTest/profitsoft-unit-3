import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import languages, { DEFAULT_LANGUAGE } from 'misc/constants/languages';

const paramsSearch = {
  lang: 'lang',
  page: 'page',
  name: 'name',
  description: 'description',
};

export const DEFAULT_LOCATION_SEARCH = {
  [paramsSearch.lang]: DEFAULT_LANGUAGE,
};

function SearchParamsConfigurator() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let isSearchParamsUpdated = false;
    let updatedParams = new URLSearchParams(searchParams);

    if (!updatedParams.has(paramsSearch.lang)
      || !Object.values(languages)
        .includes(updatedParams.get(paramsSearch.lang) || '')
    ) {
      updatedParams.set(paramsSearch.lang, DEFAULT_LANGUAGE);
      isSearchParamsUpdated = true;
    }

    if (!updatedParams.has(paramsSearch.page)) {
      updatedParams.set(paramsSearch.page, '0');
      isSearchParamsUpdated = true;
    }

    if (!updatedParams.has(paramsSearch.name)) {
      updatedParams.set(paramsSearch.name, '');
      isSearchParamsUpdated = true;
    }

    if (!updatedParams.has(paramsSearch.description)) {
      updatedParams.set(paramsSearch.description, '');
      isSearchParamsUpdated = true;
    }

    if (isSearchParamsUpdated) {
      setSearchParams(updatedParams, { replace: true });
    }
  }, [searchParams]);
}

export default SearchParamsConfigurator;
