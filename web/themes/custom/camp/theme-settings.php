<?php
/**
 * @file
 * Custom settings for the camp theme.
 */

use Drupal\Core\Form\FormState;
use Drupal\Core\Form\FormStateInterface;
use Drupal\file\Entity\File;

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function camp_form_system_theme_settings_alter(&$form, FormStateInterface &$form_state, $form_id = NULL) {
  // Work-around for a core bug affecting admin themes. See issue #943212.
  if (isset($form_id)) {
    return;
  }

  // Add a default-images section.
  $form['default_image'] = array(
    '#type' => 'details',
    '#title' => t('Default teaser-image'),
    '#open' => TRUE,
  );

  // Settings for a default teaser-image.
  $form['default_image']['teaser'] = array(
    '#type' => 'container',
  );
  $form['default_image']['teaser']['default_teaser_image_path'] = array(
    '#type' => 'textfield',
    '#title' => t('Path to custom image'),
    '#default_value' => theme_get_setting('default_teaser_image_path', 'camp'),
  );
  $form['default_image']['teaser']['default_teaser_image'] = array(
    '#type' => 'file',
    '#title' => t('Upload image image'),
    '#maxlength' => 40,
    '#description' => t(
      "If you don't have direct file access to the server, use this field to upload your image."
    ),
    '#element_validate' => array('camp_default_teaser_image_validate'),
  );

  // Add a default-images section.
  $form['countdown'] = array(
    '#type' => 'details',
    '#title' => t('Countdown clock'),
    '#open' => TRUE,
  );

  $form['countdown']['countdown_enabled'] = [
    '#type' => 'checkbox',
    '#title' => t('Show countdown'),
    '#default_value' => theme_get_setting('countdown_enabled', 'camp'),
  ];

  // Settings for a default teaser-image.
  $form['countdown']['settings'] = array(
    '#type' => 'container',
    '#states' => [
      // Hide the favicon settings when using the default favicon.
      'invisible' => [
        'input[name="countdown_enabled"]' => ['checked' => FALSE],
      ],
    ],
  );
  $form['countdown']['settings']['countdown_date'] = array(
    '#type' => 'textfield',
    '#title' => t('Javascript-parsable countdown date'),
    '#default_value' => theme_get_setting('countdown_date', 'camp'),
  );
  $form['countdown']['settings']['countdown_date_text'] = array(
    '#type' => 'textfield',
    '#title' => t('Text displayed over the countdown clock'),
    '#default_value' => theme_get_setting('countdown_date_text', 'camp'),
  );

}

/**
 * Finalizes upload of default teaser-image.
 *
 * @param array $element
 *   The form-element to be validated.
 * @param FormState $form_state
 *   Current state of the form.
 */
function camp_default_teaser_image_validate(array $element, FormState &$form_state) {
  $validators = array('file_validate_is_image' => array());

  /** @var File $file */
  $file = file_save_upload('default_teaser_image', $validators, "public://", NULL, FILE_EXISTS_REPLACE);
  if (!empty($file)) {
    $uri = $file[0]->getFileUri();
    $form_state->setValue('default_teaser_image_path', $uri);
  }
}
