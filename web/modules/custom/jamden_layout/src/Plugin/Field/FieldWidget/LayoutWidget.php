<?php

/**
 * @file
 * Contains \Drupal\jamden_layout\Plugin\Field\FieldWidget\LayoutWidget.
 */

namespace Drupal\jamden_layout\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Field\WidgetInterface;
use Drupal\Core\Form\FormStateInterface;

/**
 * Plugin implementation of the 'layout' widget.
 *
 * @FieldWidget(
 *   id = "layout",
 *   label = @Translation("Layout"),
 *   field_types = {
 *     "layout"
 *   }
 * )
 */
class LayoutWidget extends WidgetBase {
  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {

    // Prepare the options for the layout.
    $options = [
      '0' => t('Default'),
      '4' => t('1/3 width'),
      '6'  => t('1/2 width'),
      '8' => t('2/3 width'),
    ];

    // $element['fieldset'] = [
    //   '#type' => 'details',
    //   '#title' => t('Layout'),
    //   '#description' => t('Layout settings for this element'),
    // ];

    $element['width'] = [
      '#type' => 'select',
      '#title' => t('Width'),
      '#options' => $options,
      '#default_value' => $items[$delta]->width,
      '#description' => t('Width of layout.'),
    ];

    $element['clear'] = [
      '#type' => 'checkbox',
      '#title' => t('Clear'),
      '#default_value' => $items[$delta]->clear,
      '#description' => t('Start a new row.'),
    ];

    $element['float'] = [
      '#type' => 'checkbox',
      '#title' => t('Align to right'),
      '#default_value' => $items[$delta]->float,
      '#description' => t('Alignment of item. Check if item should align to the
        right. Default behavior is align to the left.'),
    ];

    return $element;
  }
}
