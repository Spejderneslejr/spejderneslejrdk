# spejderneslejr.dk

This is the main website for Spejdernes Lejr 2017

The project structure is based on [`drupal-composer/drupal-project`](https://github.com/drupal-composer/drupal-project).

## Development dependencies

Required

- Git
- Docker, Docker Compose and (on Mac/Windows) preferable Docker for Mac/Windows
- [Task](https://taskfile.dev/#/installation) as a task-runener.
- [Yarn](https://yarnpkg.com/getting-started/install) We use a project-installed
  Yarn 2 but you can keep your global Yarn on version 1 if you wish.
- [Node 14](https://nodejs.org/en/download/), and/or [NVM](https://github.com/nvm-sh/nvm) for administering the versions (we have .nvmrc files in the Drupal theme and API-server)
- [Composer](https://getcomposer.org/download/) for local php development you
  probably want a locally installed Composer
- The [Platform.sh cli](https://docs.platform.sh/development/cli.html#installation)

Optional

- Some kind of development proxy that makes it easier to access your sites, [dory](https://github.com/FreedomBen/dory)
  is recommended.

## Initial setup

1. Clone this repository and enter it.
2. Authenticate against platform.sh: `platform login`
3. Verify that you have access: `platform info`

## Development workflow
We use Docker/docker-compose for running the development-instance of the site. Whenever available, you should always use `task` over "raw" docker/docker-compose commands.

## Web
1. Branch off the master branch to prepare for development: `git checkout -b feature/myfeature`
2. Fetch a fresh database dump to ensure you are in sync with production: `task drupal:getdb`
3. Reset your local environment, this will give you a fresh site that should be very close to production: `task drupal:reset`
4. Access your site, on eg [spejderneslejr.docker]() if you're using Dory, or use `docker-compose port web 80` to get the random port-mapping for the site.
5. Develop your feature

Notice: A reset will throw away your current database, so make sure to persist eg. any config with `drush cex` before resetting.

## API development workflow
1. Branch off the master branch to prepare for development: `git checkout -b feature/myfeature`
2. (initial use) copy `api/dist.env` to `api/.env` and update it with credentials.
3. Reset and start the api-server `task api:reset`
4. Develop your feature

## Continuous Integration

The site is hosted on platform.sh, and all pull-request will create a temporary
test-environment where the change can be verified. The environment is destroyed
on merge.
