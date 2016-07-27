<?php

namespace Drupal\filetype_formatter\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Link;
use Drupal\file_entity\Plugin\Field\FieldFormatter\FileDownloadLinkFormatter;

/**
 * Plugin implementation of the 'filetype_formatter' formatter.
 *
 * @FieldFormatter(
 *   id = "filetype_formatter",
 *   label = @Translation("Downloadlinks with types"),
 *   field_types = {
 *     "file"
 *   }
 * )
 */
class FiletypeFormatter extends FileDownloadLinkFormatter {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    // Get descriptions from the reference-field.
    $delta = 0;
    $descriptions = [];
    foreach ($items as $item) {
      if (!empty($item->target_id)) {
        $descriptions[$item->target_id] = empty($item->description) ? NULL : $item->description;
      }
      $delta++;
    }
    $elements = parent::viewElements($items, $langcode);

    $delta = 0;
    foreach ($elements as &$element) {
      if (empty($element['#file'])) {
        continue;
      }
      $file = $element['#file'];
      $mime_type = $file->getMimeType();
      $link_text = empty($descriptions[$file->id()]) ? $file->getFilename() : $descriptions[$file->id()];
      $download_url = $file->downloadUrl(array('attributes' => array('type' => $mime_type . '; length=' . $file->getSize())));
      $element['#theme'] = 'file_entity_file_type_download_link';
      $element['#download_link'] = Link::fromTextAndUrl($link_text, $download_url);
      $element['#mimetype'] = $mime_type;

      $mapped = $this->mapMimeType($mime_type);
      if (!empty($mapped)) {
        // There are only 9 possible values here, so passing in a variable to
        // to t should be ok.
        // @codingStandardsIgnoreStart
        $mapped = $this->t($mapped);
        // @codingStandardsIgnoreEnd
      }
      $element['#mimetype_mapped'] = $mapped;

      $delta++;
    }

    return $elements;
  }

  /**
   * Attemps to map a mimetype to a human-readable string.
   *
   * @param string $mime_type
   *   The mimetype.
   *
   * @return null|string
   *   NULL or the mapped name.
   */
  protected function mapMimeType($mime_type) {
    // First use file.modules mapping of general mimetypes.
    // Search for a group with the files MIME type.
    $generic_mime = (string) file_icon_map($mime_type);
    if (!empty($generic_mime)) {
      // Then map them further on to something that we can translate.
      switch ($generic_mime) {
        // Word document types.
        case 'x-office-document':
          return 'Word document';

        // Spreadsheet document types.
        case 'x-office-spreadsheet':
          return 'Spreadsheet';

        // Presentation document types.
        case 'x-office-presentation':
          return 'Presentation';

        // Compressed archive types.
        case 'package-x-generic':
          return 'Archive';

        // Acrobat types.
        case 'application-pdf':
          return 'PDF';
      }

      // We got a generic mime-type - but a case we don't want to handle (eg.
      // executables) - just bail out.
      return NULL;
    }

    // No generic match, attempt to match media-types.
    foreach (array('audio', 'image', 'text', 'video') as $category) {
      if (strpos($mime_type, $category) === 0) {
        return ucfirst($category);
      }
    }

    // No general match and no media-match, bail out.
    return NULL;
  }

}
