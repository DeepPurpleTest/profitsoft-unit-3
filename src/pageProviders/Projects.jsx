import React from 'react';
import ProjectsPage from 'pages/projects';


import PageContainer from './components/PageContainer';
import * as authorities from "../constants/authorities";
import PageAccessValidator from "./components/PageAccessValidator";

const Projects = (props) => {
    return (
        <PageAccessValidator
            neededAuthorities={[authorities.ENABLE_SEE_PROJECTS_PAGE]}
        >
            <PageContainer>
                <ProjectsPage {...props} />
            </PageContainer>
        </PageAccessValidator>
    );
};

export default Projects;