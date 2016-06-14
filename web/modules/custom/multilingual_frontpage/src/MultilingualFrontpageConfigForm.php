<?php


namespace Drupal\multilingual_frontpage;


use Drupal\Core\Config\ConfigFactory;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

class MultilingualFrontpageConfigForm extends ConfigFormBase {
  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'multilingual_frontpage_admin_settings';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'multilingual_frontpage.settings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('multilingual_frontpage.settings');

    $paths = "";
    if (is_array($config->get('paths'))) {
      $paths = implode("\n", $config->get('paths'));
    }

    $form['paths'] = array(
      '#type' => 'textarea',
      '#title' => $this->t('Node IDs'),
      '#default_value' => $paths,
      '#description' => $this->t('Newline terminated list of nodes to use as frontpages. The nodes must have a language, if a match cannot be resolved the first node will be used.'),
    );

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {

    if (!empty($form_state->getValue('paths'))) {
      $paths = explode("\n", $form_state->getValue('paths'));
      $paths = array_map('trim', $paths);
      $this->config('multilingual_frontpage.settings')->set('paths', $paths)->save();
    }

    parent::submitForm($form, $form_state);
  }
}
