const fakeTeamHome = [
  {
    id: 16,
    teamName: 'São Paulo',
    teamHome: [
      {
        id: 1,
        homeTeam: 16,
        homeTeamGoals: 4,
        awayTeam: 8,
        awayTeamGoals: 2,
        inProgress: false,
      },
      {
        id: 28,
        homeTeam: 16,
        homeTeamGoals: 3,
        awayTeam: 7,
        awayTeamGoals: 0,
        inProgress: false,
      },
    ],
  },
  {
    id: 9,
    teamName: 'Internacional',
    teamHome: [
      {
        id: 2,
        homeTeam: 9,
        homeTeamGoals: 1,
        awayTeam: 14,
        awayTeamGoals: 1,
        inProgress: false,
      },
      {
        id: 29,
        homeTeam: 9,
        homeTeamGoals: 0,
        awayTeam: 4,
        awayTeamGoals: 4,
        inProgress: false,
      },
      {
        id: 34,
        homeTeam: 9,
        homeTeamGoals: 3,
        awayTeam: 6,
        awayTeamGoals: 1,
        inProgress: false,
      },
    ],
  }];

const fakeTeamAway = [
  {
    id: 8,
    teamName: 'Grêmio',
    teamAway: [
      {
        id: 1,
        homeTeam: 16,
        homeTeamGoals: 4,
        awayTeam: 8,
        awayTeamGoals: 2,
        inProgress: false,
      },
      {
        id: 17,
        homeTeam: 1,
        homeTeamGoals: 2,
        awayTeam: 8,
        awayTeamGoals: 3,
        inProgress: false,
      },
      {
        id: 40,
        homeTeam: 12,
        homeTeamGoals: 4,
        awayTeam: 8,
        awayTeamGoals: 1,
        inProgress: false,
      },
    ],
  },
  {
    id: 14,
    teamName: 'Santos',
    teamAway: [
      {
        id: 2,
        homeTeam: 9,
        homeTeamGoals: 1,
        awayTeam: 14,
        awayTeamGoals: 1,
        inProgress: false,
      },
      {
        id: 24,
        homeTeam: 10,
        homeTeamGoals: 2,
        awayTeam: 14,
        awayTeamGoals: 2,
        inProgress: false,
      },
    ],
  }];

const fakeLeaderboardHome = [{
  name: 'São Paulo',
  totalPoints: 6,
  totalGames: 2,
  totalVictories: 2,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 7,
  goalsOwn: 2,
  goalsBalance: 5,
  efficiency: '100.00',
}, {
  name: 'Internacional',
  totalPoints: 4,
  totalGames: 3,
  totalVictories: 1,
  totalDraws: 1,
  totalLosses: 1,
  goalsFavor: 4,
  goalsOwn: 6,
  goalsBalance: -2,
  efficiency: '44.44',
}];

const fakeLeaderboardAway = [{
  name: 'Grêmio',
  totalPoints: 6,
  totalGames: 3,
  totalVictories: 2,
  totalDraws: 0,
  totalLosses: 1,
  goalsFavor: 10,
  goalsOwn: 6,
  goalsBalance: 4,
  efficiency: '66.67',
}, {
  name: 'Santos',
  totalPoints: 2,
  totalGames: 2,
  totalVictories: 0,
  totalDraws: 2,
  totalLosses: 0,
  goalsFavor: 3,
  goalsOwn: 3,
  goalsBalance: 0,
  efficiency: '33.33',
}];

export { fakeTeamHome, fakeLeaderboardHome, fakeTeamAway, fakeLeaderboardAway };
