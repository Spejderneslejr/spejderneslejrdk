<?php

namespace Drupal\jamden_base\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Access\AccessResult;

/**
 * Provides a simple block.
 *
 * @Block(
 *   id = "footer_block",
 *   admin_label = @Translation("Global Footer"),
 *   category = @Translation("Footer")
 * )
 */
class FooterBlock extends BlockBase {

  /**
   * Coulmns in the footer.
   *
   * @var array
   */
  protected $columns = [
    'footer_column_1',
    'footer_column_2',
    'footer_column_3',
    'footer_column_4',
  ];

   /**
   * {@inheritdoc}
   */
  public function build() {
    // Get the custom block config.
    $config = $this->getConfiguration();

    foreach ($this->columns as $delta => $column) {
      $build[$column] = array(
        '#markup' => isset($config[$column]) ? $config[$column]['value'] : '',
      );
    }

    return $build;
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    $form = parent::blockForm($form, $form_state);
    $config = $this->getConfiguration();
    $count = 1;

    foreach ($this->columns as $delta => $column) {
      $form[$column] = [
        '#type' => 'text_format',
        '#format' => 'full_html',
        '#base_type' => 'textarea',
        '#title' => $this->t('Block ' . $count),
        '#default_value' => isset($config[$column]) ? $config[$column]['value'] : '',
      ];

      $count++;
    }

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    foreach ($this->columns as $delta => $column) {
      $this->setConfigurationValue($column, $form_state->getValue($column));
    }
  }
}
