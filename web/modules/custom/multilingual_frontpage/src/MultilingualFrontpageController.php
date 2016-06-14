<?php

namespace Drupal\multilingual_frontpage;

use Drupal\Core\Controller\ControllerBase;
use Drupal\node\Entity\Node;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Renders the correct node for this path determined by language.
 */
class MultilingualFrontpageController extends ControllerBase {

  /**
   * Views a node based on the current language.
   *
   * @return array|\Symfony\Component\HttpFoundation\Response
   *   The response.
   */
  public function content() {
    // Get our settings.
    $config = $this->config('multilingual_frontpage.settings');
    $nids = $config->get('nids');

    // Get the current active language.
    $active_language = $this->languageManager()->getCurrentLanguage()->getId();

    // 404 if we're missing configuration.
    if (empty($nids) || !is_array($nids)) {
      $nids = [];
    }

    /** @var Node[] $nodes */
    $nodes = Node::loadMultiple(array_filter($nids, 'is_numeric'));

    // A node with a matching language.
    /** @var Node $selected_node */
    $selected_node = NULL;

    // The first configured node - we will fall back to this if we cannot find
    // a match.
    /** @var Node $selected_node */
    $first_node = reset($nodes);
    foreach ($nodes as $node) {
      if ($node->language()->getId() == $active_language) {
        $selected_node = $node;
        break;
      }
    }

    // We never had any nodes - redirect to 404.
    if (empty($first_node)) {
      throw new NotFoundHttpException('No configured nodes.');
    }

    // No match, fall back to the first node.
    if (empty($selected_node)) {
      // Fall back to the first node if we never got a match.
      $selected_node = $first_node;
    }

    // Render the node and return.
    $render_controller = $this->entityTypeManager()->getViewBuilder(
      $selected_node->getEntityTypeId()
    );
    return $render_controller->view($selected_node, 'frontpage');
  }

}
