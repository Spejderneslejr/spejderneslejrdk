<?php

namespace Drupal\jamden_layout\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
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
      '0' => t('Full width'),
      '4' => t('1/3 width'),
      '6'  => t('1/2 width'),
      '8' => t('2/3 width'),
    ];

    $element += array(
      '#type' => 'details',
      '#title' => t('Layout manager'),
    );

    $element['width'] = [
      '#type' => 'select',
      '#title' => t('Width'),
      '#options' => $options,
      '#default_value' => $items[$delta]->width,
      '#description' => t('Width of layout.'),
    ];

    $element['clear'] = [
      '#type' => 'checkbox',
      '#title' => t('Start a new row'),
      '#default_value' => $items[$delta]->clear,
      '#description' => t('Place the element on a new row.'),
    ];

    $element['float'] = [
      '#type' => 'select',
      '#title' => t('Position'),
      '#options' => [
        'left' => 'left',
        'right' => 'right',
      ],
      '#default_value' => $items[$delta]->float,
      '#description' => t('Alignment of item.'),
    ];

    return $element;
  }

}
