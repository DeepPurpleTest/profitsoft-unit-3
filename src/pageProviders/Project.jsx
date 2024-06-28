import React from 'react';
import ProjectPage from 'pages/project';


import PageContainer from './components/PageContainer';
import * as authorities from "../constants/authorities";
import PageAccessValidator from "./components/PageAccessValidator";

const Project = (props) => {
    return (
        <PageAccessValidator
            neededAuthorities={[authorities.ENABLE_SEE_PROJECTS_PAGE]}
        >
            <PageContainer>
                <ProjectPage {...props} />
            </PageContainer>
        </PageAccessValidator>
    );
};

export default Project;