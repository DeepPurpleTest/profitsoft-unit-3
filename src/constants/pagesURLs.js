import * as pages from './pages';
import config from 'config';

const result = {
  [pages.defaultPage]: `${config.UI_URL_PREFIX}/${pages.defaultPage}`,
  [pages.login]: `${config.UI_URL_PREFIX}/${pages.login}`,
  [pages.secretPage]: `${config.UI_URL_PREFIX}/${pages.secretPage}`,
  [pages.projectsPage]: `${config.UI_URL_PREFIX}/${pages.projectsPage}`,
  [pages.projectPage]: `${config.UI_URL_PREFIX}/${pages.projectPage}`,
};

export default result;
