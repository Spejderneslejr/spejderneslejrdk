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
      '0' => $this->t('Full width'),
      '4' => $this->t('1/3 width'),
      '6'  => $this->t('1/2 width'),
      '8' => $this->t('2/3 width'),
    ];

    // Texts used as label for the collapsible details elements.
    $summaries = [];

    // Setup a collapsible html5 details element for the layout options.
    $element += array(
      '#type' => 'details',
      '#title' => $this->t('Layout manager'),
    );

    $width_default = isset($items[$delta]->width) ? $items[$delta]->width : 0;
    $element['width'] = [
      '#type' => 'select',
      '#title' => $this->t('Width'),
      '#options' => $options,
      '#default_value' => $width_default,
      '#description' => $this->t('Width of layout.'),
    ];
    $summaries[] = $options[$width_default];

    $float_default = in_array((string)$items[$delta]->float, ['left', 'right']) ? $items[$delta]->float : 'left';
    $element['float'] = [
      '#type' => 'select',
      '#title' => $this->t('Position'),
      '#options' => [
        'left' => 'left',
        'right' => 'right',
      ],
      '#default_value' => $float_default,
      '#description' => $this->t('Alignment of item.'),
    ];
    $summaries[] = $this->t('@alignment aligned', ['@alignment' => $float_default]);

    $element['clear'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Start a new row'),
      '#default_value' => $items[$delta]->clear,
      '#description' => $this->t('Place the element on a new row.'),
    ];
    if (!empty($items[$delta]->clear)) {
      $summaries[] = $this->t('New row');
    }

    $element['#title'] = $this->t('Layout (@summary)', ['@summary' => implode(' - ', $summaries)]);
    return $element;
  }

}
