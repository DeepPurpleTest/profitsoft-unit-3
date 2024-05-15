export const projects = [
  {
    id: 1,
    description: 'Creating a house that spins upside down to live on the ceiling',
    members: ['John Smith', 'Emily Johnson'],
    name: 'Upside-Down Living Project'
  },
  {
    id: 2,
    description: 'Developing a device for automatically pinching oneself to stay awake at work',
    members: ['Michael Brown', 'Sarah Clark'],
    name: 'Stay-Awake Gadget Project'
  },
  {
    id: 3,
    description: 'Researching the feasibility of teaching fish to ride bicycles',
    members: ['Andrew Taylor', 'Sophia Anderson'],
    name: 'Fish Cycling Initiative'
  },
  {
    id: 4,
    description: 'Creating a device to translate thoughts into music',
    members: ['David Wilson', 'Emma Roberts'],
    name: 'Mind-Music Translator Project'
  },
  {
    id: 5,
    description: 'Developing a spring-loaded suit for rapid upward movement on stairs',
    members: ['Oliver White', 'Isabella Green'],
    name: 'Staircase Cheetah Project'
  }
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
