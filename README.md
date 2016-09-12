# job-mapper

#### Hack Reactor Greenfield Project - Job Mapper

### Description
Maps job by precise location using a combination of the Indeed API and Google Places API.

[![Stories in Ready](https://badge.waffle.io/Atomic-Cicada/job-mapper.svg?label=ready&title=Ready)](http://waffle.io/Atomic-Cicada/job-mapper)

### Team
  - __Product Owner__: [Aljosha Novakovic](https://github.com/ollynov)
  - __Scrum Master__: [Andrew Kim](https://github.com/andrewk17)
  - __Development Team Member__: [Kevin Brosamle](https://github.com/kevinbrosamle)

## Tech Stack
M - MongoDB
E - Express
R - React
N - Node

### Server
  - __Node__ - v6.4.0
  - __Mongoose__ - ^4.6.0
  - __Express__ - ^4.14.0


### Client
  - __React__ - ^15.3.1

### Development tools
  - __webpack__ - ^1.13.2


## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
  1. [Installing Dependencies](#installing-dependencies)
  2. [Tasks](#tasks)

4. [Suggested Improvements](#suggested-improvements)
5. [Contributing](#contributing)

## Usage

## Requirements
- Node 6.4.0

## Development
```
npm run dev
npm run nodemon
```

### Installing Dependencies
```
npm install
```

### Tasks

```
npm run dbworker
```
Runs worker to populate database with new jobs

## Suggested Improvements

Client Side:
- Add City to Search
- Have search filters (date added, etc)
- Return additional results
- Include User Profile page (saved jobs, user settings, etc.)

UX:
- Check for already registered username before the user plugs in password

Performance:
- Refactor components so that only top-level components utilize state. (Ex. all 3 UserSideBar components can be refactored for only 1 top level component to hold state)
- Save query + city to database whenever user searches a city/query combo that has never been searched before

Fun Ideas:
- Historical listings (see all listings in SF in 2000 vs 2016 )
- Heatmaps
- Recommended jobs section (according to the previous jobs the user has saved)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
