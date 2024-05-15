import React from 'react';
import ProjectsPage from 'pages/projects';


import PageContainer from './components/PageContainer';

const Projects = (props) => {
    return (
        <PageContainer>
            <ProjectsPage {...props} />
        </PageContainer>
    );
};

export default Projects;