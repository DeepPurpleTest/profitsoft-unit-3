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
  },
  {
    id: 6,
    description: 'Developing a device to translate dolphin clicks into human language',
    members: ['Max Johnson', 'Eva Smith'],
    name: 'Dolphin Translator Project'
  },
  {
    id: 7,
    description: 'Creating a machine for automatically folding origami',
    members: ['Liam Brown', 'Aria Garcia'],
    name: 'Origami Folding Automation'
  },
  {
    id: 8,
    description: 'Designing a device for translating bird songs into human stories',
    members: ['Ethan Smith', 'Isabella Jones'],
    name: 'Birdsong Narrator'
  },
  {
    id: 9,
    description: 'Developing a gadget for translating squirrel chatters into jokes',
    members: ['Aiden Johnson', 'Sophia Brown'],
    name: 'Squirrel Comedy Translator'
  },
  {
    id: 10,
    description: 'Creating a machine for automatically sorting LEGO bricks by color and size',
    members: ['Olivia Smith', 'Noah Brown'],
    name: 'LEGO Sorting Robot'
  },
  {
    id: 11,
    description: 'Designing a device for translating whale sounds into musical compositions',
    members: ['Ava Garcia', 'William Johnson'],
    name: 'Whale Symphony Composer'
  },
  {
    id: 12,
    description: 'Developing a gadget for translating bee dances into navigation instructions',
    members: ['Harper Brown', 'Logan Smith'],
    name: 'Bee Dance Navigation System'
  },
  {
    id: 13,
    description: 'Creating a device for translating cat purrs into relaxation melodies',
    members: ['Ella Johnson', 'Jack Brown'],
    name: 'Cat Purrs Relaxation Device'
  },
  {
    id: 14,
    description: 'Designing a machine for automatically petting cats when they approach',
    members: ['Mia Smith', 'Ethan Jones'],
    name: 'Cat Petting Automation'
  },
  {
    id: 15,
    description: 'Developing a gadget for translating dog tail wags into emotional expressions',
    members: ['Charlotte Johnson', 'Mason Brown'],
    name: 'Dog Tail Wag Emotion Decoder'
  },
  {
    id: 16,
    description: 'Creating a device for translating parrot squawks into jokes',
    members: ['Amelia Smith', 'Benjamin Johnson'],
    name: 'Parrot Joke Translator'
  },
  {
    id: 17,
    description: 'Designing a machine for automatically watering plants based on soil moisture levels',
    members: ['Ethan Brown', 'Sophia Smith'],
    name: 'Automated Plant Watering System'
  },
  {
    id: 18,
    description: 'Developing a gadget for translating baby gurgles into baby talk',
    members: ['Olivia Johnson', 'James Brown'],
    name: 'Baby Gurgles Language Converter'
  },
  {
    id: 19,
    description: 'Creating a machine for automatically peeling bananas',
    members: ['Ava Smith', 'William Brown'],
    name: 'Banana Peeling Automation'
  },
  {
    id: 20,
    description: 'Designing a device for translating frog croaks into poetry',
    members: ['Sophia Johnson', 'Ethan Smith'],
    name: 'Frog Poetry Translator'
  },
  {
    id: 21,
    description: 'Developing a gadget for translating baby babbling into parental advice',
    members: ['Emma Brown', 'Lucas Johnson'],
    name: 'Baby Babble Advice Translator'
  },
  {
    id: 22,
    description: 'Creating a machine for automatically folding clothes',
    members: ['Isabella Smith', 'Ethan Johnson'],
    name: 'Clothes Folding Automation'
  },
  {
    id: 23,
    description: 'Designing a device for translating cow moos into jokes',
    members: ['Oliver Brown', 'Ava Johnson'],
    name: 'Cow Joke Translator'
  },
  {
    id: 24,
    description: 'Developing a gadget for translating sheep baas into relaxation sounds',
    members: ['Charlotte Smith', 'Liam Johnson'],
    name: 'Sheep Baa Relaxation Device'
  },
  {
    id: 25,
    description: 'Creating a machine for automatically shuffling cards',
    members: ['Ella Brown', 'Noah Johnson'],
    name: 'Card Shuffling Automation'
  },
  {
    id: 26,
    description: 'Designing a device for translating bird calls into musical compositions',
    members: ['Ethan Johnson', 'Sophia Smith'],
    name: 'Birdsong Symphony Composer'
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
