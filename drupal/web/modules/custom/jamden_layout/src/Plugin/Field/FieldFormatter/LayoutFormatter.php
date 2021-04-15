<?php

namespace Drupal\jamden_layout\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;

/**
 * Plugin implementation of the 'layout_hidden' formatter.
 *
 * @FieldFormatter(
 *   id = "layout_hidden",
 *   label = @Translation("Hidden"),
 *   field_types = {
 *     "layoute"
 *   }
 * )
 */
class LayoutFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    return [];
  }

}
