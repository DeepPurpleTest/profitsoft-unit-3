export const projects = [
  {
    id: 1,
    name: 'Project 1',
    description: 'Project 1 description',
    members: ['Moksem', 'Vodem'],
  },
  {
    id: 2,
    name: 'Project 2',
    description: 'Project 2 description',
    members: ['Maus', 'Denchik'],
  },
  {
    id: 3,
    name: 'Project 3',
    description: 'Project 3 description',
    members: ['Moksem', 'Denchik'],
  },
  {
    id: 4,
    name: 'Project 4',
    description: 'Project 4 description',
    members: ['Maus', 'Vodem'],
  },
  {
    id: 5,
    name: 'Project 5',
    description: 'Project 5 description',
    members: ['Maus', 'Vodem'],
  },
]

export const projectsResponse = {
  projects: projects,
  page: 0,
  totalPages: 5,
}

export function updateProjectById(id, updatedProject) {
  console.log('id', id)
  console.log('updatedProject.id', updatedProject.id)

  const index = projects.findIndex(project => project.id === id);
  console.log(index)
  if (index !== -1) {
    projects[index] = { ...projects[index], ...updatedProject };
    console.log('updateProjectById in if', projects)
  }

  console.log('updateProjectById after if', projects)

}

export function findProjectById(id) {
  return projects.find(project => project.id === id);
}

export function deleteById(id) {
  const index = projects.findIndex(project => project.id === id);
  if (index !== -1) {
    projects.splice(index, 1);
  }
}

export function addProject(project) {
  const projectId = +Date.now();
  const projectWithId = { ...project, id: projectId };
  projects.push(projectWithId);
  return projectWithId;
}

export function filterProjects(filter) {
  console.log('FILTER PAGE', filter.page)
  console.log('FILTER NAME', filter.name)
  console.log('FILTER DESCRIPTION', filter.description)
  const startIndex = filter.page * filter.projectsPerPage;
  const endIndex = startIndex + filter.projectsPerPage;

    console.log('START_INDEX', startIndex)
    console.log('END_INDEX', endIndex)

  const filteredProjects = getFilteredProjects(filter);

  const projectsForPage = filteredProjects.slice(startIndex, endIndex);

  console.log('PROJECTS_FOR_PAGE', projectsForPage)

  return projectsForPage;
}

export function getFilteredProjects(filter) {
  console.log('FILTER', filter)
  return projects.filter(project =>
      project.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      project.description.toLowerCase().includes(filter.description.toLowerCase())
  );
}

export function getTotalPages(projectsPerPage) {
  return Math.ceil(projects.length / projectsPerPage);
}

export function getTotalFilteredPages(projectsPerPage, filter) {
  return Math.ceil(getFilteredProjects(filter).length / projectsPerPage);
}

