<?php

/**
 * Content of example.settings.local.php.
 */

// Assertions.
assert_options(ASSERT_ACTIVE, TRUE);
\Drupal\Component\Assertion\Handle::register();

// Enable local development services.
$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/development.services.yml';

// Show all error messages, with backtrace information.
$config['system.logging']['error_level'] = 'verbose';

// Disable CSS and JS aggregation.
$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;

// Disable the render cache (this includes the page cache).
$settings['cache']['bins']['render'] = 'cache.backend.null';

// Disable Dynamic Page Cache.
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';

// Allow test modules and themes to be installed.
$settings['extension_discovery_scan_tests'] = TRUE;

// Enable access to rebuild.php.
$settings['rebuild_access'] = TRUE;

/**
 * Site specific development settings.
 */
