<?php

namespace Drupal\multilingual_frontpage;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\node\Entity\Node;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\HttpKernelInterface;

/**
 * Class FrontpageController
 *
 * Renderes the correct node for this path determined by language.
 *
 * @package Drupal\multilingual_frontpage
 */
class FrontpageController extends ControllerBase implements ContainerInjectionInterface {

  /**
   * @var HttpKernelInterface
   */
  protected $httpKernel;

  public function __construct(HttpKernelInterface $http_kernel) {
    $this->httpKernel = $http_kernel;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('http_kernel')
    );
  }

  /**
   * Views a node based on the current language.
   *
   * @return array|\Symfony\Component\HttpFoundation\Response
   */
  public function content() {
    // Get our settings.
    $config = $this->config('multilingual_frontpage.settings');
    $paths = $config->get('paths');

    // Get the current active language.
    $active_language = $this->languageManager()->getCurrentLanguage()->getId();

    // 404 if we're missing configuration.
    if (empty($paths) || !is_array($paths)) {
      $paths = [];
    }

    // Load all nodes.
    /**
     * @var Node[] $nodes
     */
    $nodes = Node::loadMultiple(array_filter($paths, 'is_numeric'));

    /**
     * @var Node $selected_node
     *   A node with a matching language.
     */
    $selected_node = NULL;

    /**
     * @var Node $selected_node
     *   The first configured node - we will fall back to this if we cannot find
     *   a match.
     */
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
