<?php

namespace Drupal\card_gallery\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\image\Plugin\Field\FieldFormatter\ImageFormatter;
use Drupal\Core\Form\FormStateInterface;
use Drupal\image\Entity\ImageStyle;

/**
 * Plugin implementation of the 'card_gallery' formatter.
 *
 * @FieldFormatter(
 *   id = "card_gallery",
 *   label = @Translation("Card Gallery"),
 *   field_types = {
 *     "image"
 *   }
 * )
 */
class CardGalleryFormatter extends ImageFormatter {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $elements = parent::viewElements($items, $langcode);

    $style_small = ImageStyle::load('card_gallery_small');
    $style_medium = ImageStyle::load('card_gallery_medium');
    $style_large = ImageStyle::load('card_gallery_large');

    if (empty($style_small) || empty($style_medium) || empty($style_large)) {
      // Bail out if we don't have what we're here for.
      return;
    }

    // The pattern of image styles we gonna use. We know there is
    // exactly 5 elements in the card gallery.
    $image_styles = [
      'card_gallery_small',
      'card_gallery_medium',
      'card_gallery_large',
      'card_gallery_medium',
      'card_gallery_small',
    ];

    // Apply image style to images.
    foreach ($elements as $delta => &$element) {
      $element['#image_style'] = $image_styles[$delta];
    }

    return [
      '#theme' => 'card_gallery_formatter',
      '#items' => $elements,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
    // We leave this method empty. This way we override the parent
    // settingsform and leave without options.
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary = [];
    $summary[] = $this->t('Uses card_gallery_small, card_gallery_medium and card_gallery_large');
    return $summary;
  }

}

