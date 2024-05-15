import React from 'react';
import ProjectPage from 'pages/project';


import PageContainer from './components/PageContainer';

const Project = (props) => {
    return (
        <PageContainer>
            <ProjectPage {...props} />
        </PageContainer>
    );
};

export default Project;