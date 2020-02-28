# spejderneslejr.dk

This is the main website for Spejdernes Lejr 2017

The project structure is based on [`drupal-composer/drupal-project`](https://github.com/drupal-composer/drupal-project).

## Development dependencies

* Docker and Docker Compose
* Composer

## Installation instructions

1. Clone this repository
2. From the root of the cloned repository:
  1. Run `docker-compose run php composer install`
  2. Run `docker-compose build`
  3. Run `docker-compose up`
  4. Run `docker-compose run php drush cim -y`
3. Profit!

## Continuous Integration

* We use Scrutinizer to analyze the code for code standards, debugging code and general mistakes.
  * Codesniffer runs with Drupal standards.
  * The ESLint file (`.eslintrc`) in the root of the project is a duplicate of Drupal 8's `.eslintrc` file. This is needed because Scrutinizer assumes that the ESLint config file is placed in the root.
