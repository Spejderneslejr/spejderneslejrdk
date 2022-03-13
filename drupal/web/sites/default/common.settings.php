<?php
// Add any shared configuration here.
$settings['config_sync_directory'] = __DIR__ . '/../../../config/drupal_cmi_sync';

// Disable the production tag-manager container in all environment and let
// master enable it itself via platformsh.env.master.settings.php.
$config['google_tag.container.production']['status'] = false;

$settings['config_exclude_modules'] = ['twig_xdebug'];
