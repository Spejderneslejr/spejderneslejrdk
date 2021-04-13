<?php
// Add any shared configuration here.
$config_directories = array(
  CONFIG_SYNC_DIRECTORY => __DIR__ . '/../../../config/drupal_cmi_sync',
);

// Disable the production tag-manager container in all environment and let
// master enable it itself via platformsh.env.master.settings.php.
$config['google_tag.container.production']['status'] = false;
