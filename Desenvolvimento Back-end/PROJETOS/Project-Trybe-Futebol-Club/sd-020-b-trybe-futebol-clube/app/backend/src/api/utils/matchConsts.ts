const fakeMatches = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'São Paulo',
    },
    teamAway: {
      teamName: 'Grêmio',
    },
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'Internacional',
    },
    teamAway: {
      teamName: 'Santos',
    },
  },
  {
    id: 3,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: 'São Paulo',
    },
    teamAway: {
      teamName: 'Internacional',
    },
  },
];

const fakeMatchToCreate = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 2,
  awayTeam: 8,
  awayTeamGoals: 2,
  inProgress: true,
};

const fakeScore = {
  homeTeamGoals: 4,
  awayTeamGoals: 2,
};

const fakeUpdatedScore = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 2,
  awayTeam: 8,
  awayTeamGoals: 2,
  inProgress: true,
};

export { fakeMatches, fakeMatchToCreate, fakeUpdatedScore, fakeScore };
