<?php
/**
 * @file
 * gsb_feature_idea_story_ct.features.metatag.inc
 */

/**
 * Implements hook_metatag_export_default().
 */
function gsb_feature_idea_story_ct_metatag_export_default() {
  $config = array();

  // Exported Metatag config instance: node:idea_story.
  $config['node:idea_story'] = array(
    'instance' => 'node:idea_story',
    'disabled' => FALSE,
    'config' => array(
      'og:description' => array(
        'value' => '[node:field-editorial-summary]',
      ),
      'og:image' => array(
        'value' => '[node:field_image_key_image]',
      ),
      'og:image:secure_url' => array(
        'value' => '[node:field_image_key_image]',
      ),
      'og:audio' => array(
        'value' => '[node:field-link-key-audio:url]',
      ),
      'og:audio:secure_url' => array(
        'value' => '[node:field-link-key-audio:url]',
      ),
      'og:video:secure_url' => array(
        'value' => '[node:field-link-key-video:url]',
      ),
      'twitter:card' => array(
        'value' => 'summary_large_image',
      ),
      'twitter:creator' => array(
        'value' => '@stanfordgsb',
      ),
      'twitter:player' => array(
        'value' => '[node:field-link-key-video:url]',
      ),
      'twitter:player:stream' => array(
        'value' => '[node:field-link-key-video:url]',
      ),
      'og:video:url' => array(
        'value' => '[node:field-link-key-video:url]',
      ),
      'twitter:image' => array(
        'value' => '[node:field_image_key_image]',
      ),
    ),
  );

  return $config;
}
