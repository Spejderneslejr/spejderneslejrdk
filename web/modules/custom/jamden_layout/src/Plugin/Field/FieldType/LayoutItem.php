<?php

namespace Drupal\jamden_layout\Plugin\Field\FieldType;

use Drupal\Core\Field\FieldItemBase;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\TypedData\DataDefinition;

/**
 * Plugin implementation of the 'layout' field type.
 *
 * @FieldType(
 *   id = "layout",
 *   label = @Translation("Layout"),
 *   description = @Translation("Stores the settings for the layout."),
 *   default_widget = "layout",
 *   default_formatter = "layout_hidden"
 * )
 */
class LayoutItem extends FieldItemBase {

  /**
   * {@inheritdoc}
   */
  public static function schema(FieldStorageDefinitionInterface $field_definition) {
    return [
      'columns' => [
        'width' => [
          'description' => 'Width of layout.',
          'type' => 'text',
          'not null' => FALSE,
          'size' => 'tiny',
        ],
        'clear' => [
          'description' => 'Show layout on a new line',
          'type' => 'int',
          'unsigned' => TRUE,
          'size' => 'tiny',
        ],
        'float' => [
          'description' => 'Align element to the right',
          'type' => 'int',
          'unsigned' => TRUE,
          'size' => 'tiny',
        ],
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public static function propertyDefinitions(FieldStorageDefinitionInterface $field_definition) {

    $properties = [];

    $properties['width'] = DataDefinition::create('string')
                           ->setLabel(t('Width'));

    $properties['clear'] = DataDefinition::create('boolean')
                        ->setLabel(t('Clear'));

    $properties['float'] = DataDefinition::create('boolean')
                        ->setLabel(t('Float'));

    return $properties;
  }

  /**
   * {@inheritdoc}
   */
  public static function mainPropertyName() {
    return 'columns';
  }

}
