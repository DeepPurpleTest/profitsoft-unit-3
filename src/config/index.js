const config = {
  // Services
  USERS_SERVICE: 'http://localhost:3000',

  PROJECTS_SERVICE: `${process.env.REACT_APP_BACKEND_API}` || '',

  UI_URL_PREFIX: process.env.REACT_APP_UI_URL_PREFIX || '',
};

export default config;
