export const projects = [
  {
    description: 'Project 1 description',
    id: 1,
    members: ['Moksem', 'Vodem'],
    name: 'Project 1',
  },
  {
    description: 'Project 2 description',
    id: 2,
    members: ['Maus', 'Denchik'],
    name: 'Project 2',
  },
  {
    description: 'Project 3 description',
    id: 3,
    members: ['Moksem', 'Denchik'],
    name: 'Project 3',
  },
  {
    description: 'Project 4 description',
    id: 4,
    members: ['Maus', 'Vodem'],
    name: 'Project 4',
  },
  {
    description: 'Project 5 description',
    id: 5,
    members: ['Maus', 'Vodem'],
    name: 'Project 5',
  },
];

export const projectsResponse = {
  page: 0,
  projects: projects,
  totalPages: 5,
};

export function updateProjectById(id, updatedProject) {
  const index = projects.findIndex((project) => project.id === id);
  if (index !== -1) {
    projects[index] = { ...projects[index], ...updatedProject };
  }
}

export function findProjectById(id) {
  return projects.find((project) => project.id === Number(id));
}

export function deleteById(id) {
  const index = projects.findIndex((project) => project.id === id);
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
  const startIndex = filter.page * filter.projectsPerPage;
  const endIndex = startIndex + filter.projectsPerPage;
  const filteredProjects = getFilteredProjects(filter);
  const projectsForPage = filteredProjects.slice(startIndex, endIndex);

  return projectsForPage;
}

export function getFilteredProjects(filter) {
  return projects.filter(
    (project) =>
      project.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      project.description
        .toLowerCase()
        .includes(filter.description.toLowerCase())
  );
}

export function getTotalPages(projectsPerPage) {
  return Math.ceil(projects.length / projectsPerPage);
}

export function getTotalFilteredPages(projectsPerPage, filter) {
  return Math.ceil(getFilteredProjects(filter).length / projectsPerPage);
}
