<?php
/**
 * @file
 * gsb_feature_idea_story_ct.ds.inc
 */

/**
 * Implements hook_ds_field_settings_info().
 */
function gsb_feature_idea_story_ct_ds_field_settings_info() {
  $export = array();

  $ds_fieldsetting = new stdClass();
  $ds_fieldsetting->api_version = 1;
  $ds_fieldsetting->id = 'node|idea_story|default';
  $ds_fieldsetting->entity_type = 'node';
  $ds_fieldsetting->bundle = 'idea_story';
  $ds_fieldsetting->view_mode = 'default';
  $ds_fieldsetting->settings = array(
    'media_icon' => array(
      'weight' => '36',
      'label' => 'hidden',
      'format' => 'default',
      'formatter_settings' => array(
        'ft' => array(
          'func' => 'theme_ds_field_expert',
        ),
        'conditions' => array(),
      ),
    ),
    'title' => array(
      'weight' => '37',
      'label' => 'hidden',
      'format' => 'default',
      'formatter_settings' => array(
        'link' => '0',
        'wrapper' => 'h1',
        'class' => '',
        'ft' => array(
          'func' => 'theme_ds_field_expert',
          'ow' => TRUE,
          'ow-el' => 'div',
          'ow-cl' => '',
          'ow-def-cl' => TRUE,
          'ow-at' => '',
          'ow-def-at' => FALSE,
        ),
        'conditions' => array(),
      ),
    ),
    'field_academic_area_unlimited' => array(
      'formatter_settings' => array(
        'ft' => array(
          'func' => 'theme_ds_field_expert',
          'ow' => TRUE,
          'ow-el' => 'span',
          'ow-cl' => 'taxonomy-category',
          'ow-def-cl' => TRUE,
          'ow-at' => '',
          'ow-def-at' => FALSE,
        ),
      ),
    ),
    'field_authors' => array(
      'formatter_settings' => array(
        'ft' => array(
          'func' => 'theme_ds_field_expert',
          'lb' => 'by',
          'lb-el' => 'span',
          'lb-col' => TRUE,
          'prefix' => '|',
          'ow' => TRUE,
          'ow-el' => 'span',
          'ow-cl' => '',
          'ow-def-cl' => TRUE,
          'ow-at' => '',
          'ow-def-at' => FALSE,
        ),
      ),
    ),
    'field_body' => array(
      'formatter_settings' => array(
        'ft' => array(
          'func' => 'theme_ds_field_expert',
          'ow' => TRUE,
          'ow-el' => 'div',
          'ow-cl' => '',
          'ow-def-cl' => TRUE,
          'ow-at' => '',
          'ow-def-at' => FALSE,
        ),
      ),
    ),
    'field_business_insight_topic' => array(
      'formatter_settings' => array(
        'ft' => array(
          'func' => 'theme_ds_field_expert',
          'ow' => TRUE,
          'ow-el' => 'span',
          'ow-cl' => 'taxonomy-category',
          'ow-def-cl' => FALSE,
          'ow-at' => '',
          'ow-def-at' => FALSE,
        ),
      ),
    ),
    'field_date' => array(
      'formatter_settings' => array(
        'ft' => array(
          'func' => 'theme_ds_field_expert',
          'ow' => TRUE,
          'ow-el' => 'span',
          'ow-cl' => '',
          'ow-def-cl' => TRUE,
          'ow-at' => '',
          'ow-def-at' => FALSE,
        ),
      ),
    ),
    'field_editorial_summary' => array(
      'formatter_settings' => array(
        'ft' => array(
          'func' => 'theme_ds_field_expert',
          'ow' => TRUE,
          'ow-el' => 'div',
          'ow-cl' => '',
          'ow-def-cl' => TRUE,
          'ow-at' => '',
          'ow-def-at' => FALSE,
        ),
      ),
    ),
    'field_tag' => array(
      'formatter_settings' => array(
        'ft' => array(
          'func' => 'theme_ds_field_expert',
        ),
      ),
    ),
    'field_key_taxonomy' => array(
      'formatter_settings' => array(
        'ft' => array(
          'func' => 'theme_ds_field_expert',
          'ow' => TRUE,
          'ow-el' => 'div',
          'ow-cl' => '',
          'ow-def-cl' => TRUE,
          'ow-at' => '',
          'ow-def-at' => FALSE,
        ),
      ),
    ),
    'field_region_of_interest' => array(
      'formatter_settings' => array(
        'ft' => array(
          'func' => 'theme_ds_field_expert',
          'ow' => TRUE,
          'ow-el' => 'span',
          'ow-cl' => 'taxonomy-category',
          'ow-def-cl' => FALSE,
          'ow-at' => '',
          'ow-def-at' => FALSE,
        ),
      ),
    ),
  );
  $export['node|idea_story|default'] = $ds_fieldsetting;

  return $export;
}

/**
 * Implements hook_ds_custom_fields_info().
 */
function gsb_feature_idea_story_ct_ds_custom_fields_info() {
  $export = array();

  $ds_field = new stdClass();
  $ds_field->api_version = 1;
  $ds_field->field = 'media_icon';
  $ds_field->label = 'Media icon';
  $ds_field->field_type = 5;
  $ds_field->entities = array(
    'node' => 'node',
  );
  $ds_field->ui_limit = 'idea_story|*';
  $ds_field->properties = array(
    'code' => array(
      'value' => '<span class="media-icon [node:field-icon]"><span class="element-invisible">[node:field-icon]</span></span>',
      'format' => 'gsb_html_text',
    ),
    'use_token' => 1,
  );
  $export['media_icon'] = $ds_field;

  return $export;
}

/**
 * Implements hook_ds_layout_settings_info().
 */
function gsb_feature_idea_story_ct_ds_layout_settings_info() {
  $export = array();

  $ds_layout = new stdClass();
  $ds_layout->api_version = 1;
  $ds_layout->id = 'node|idea_story|default';
  $ds_layout->entity_type = 'node';
  $ds_layout->bundle = 'idea_story';
  $ds_layout->view_mode = 'default';
  $ds_layout->layout = 'ds_2col';
  $ds_layout->settings = array(
    'regions' => array(
      'left' => array(
        0 => 'group_wrapper_header',
        1 => 'field_key_taxonomy',
        2 => 'field_date',
        3 => 'field_editorial_summary',
        4 => 'group_wrapper_byline',
        5 => 'field_authors',
        6 => 'field_body',
        7 => 'group_wrapper_taxonomy',
        8 => 'field_academic_area_unlimited',
        9 => 'field_business_insight_topic',
        10 => 'field_region_of_interest',
        11 => 'field_tag',
        12 => 'media_icon',
        13 => 'title',
      ),
    ),
    'fields' => array(
      'group_wrapper_header' => 'left',
      'field_key_taxonomy' => 'left',
      'field_date' => 'left',
      'field_editorial_summary' => 'left',
      'group_wrapper_byline' => 'left',
      'field_authors' => 'left',
      'field_body' => 'left',
      'group_wrapper_taxonomy' => 'left',
      'field_academic_area_unlimited' => 'left',
      'field_business_insight_topic' => 'left',
      'field_region_of_interest' => 'left',
      'field_tag' => 'left',
      'media_icon' => 'left',
      'title' => 'left',
    ),
    'classes' => array(),
    'wrappers' => array(
      'left' => 'div',
      'right' => 'div',
    ),
    'layout_wrapper' => 'div',
    'layout_attributes' => '',
    'layout_attributes_merge' => 1,
    'layout_link_attribute' => '',
    'layout_link_custom' => '',
  );
  $export['node|idea_story|default'] = $ds_layout;

  return $export;
}