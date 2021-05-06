<?php

namespace Drupal\jamden_base\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Render\Markup;

/**
 * An example controller.
 */
class JamDenBaseController extends ControllerBase {

  /**
   * Returns a render-able array for a test page.
   */
  public function content() {
    $content = file_get_contents("../apps/jobs/dist/embed.html");
    $build = [
      '#markup' =>  Markup::create($content),
    ];
    return $build;
  }

}
