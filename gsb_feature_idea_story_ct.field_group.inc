<?php
/**
 * @file
 * gsb_feature_idea_story_ct.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function gsb_feature_idea_story_ct_field_group_info() {
  $export = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_academic_area|node|idea_story|form';
  $field_group->group_name = 'group_academic_area';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'idea_story';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_taxonomy';
  $field_group->data = array(
    'label' => 'Academic Area',
    'weight' => '14',
    'children' => array(
      0 => 'field_academic_area_unlimited',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_academic_area|node|idea_story|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_additional_topics|node|idea_story|form';
  $field_group->group_name = 'group_additional_topics';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'idea_story';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_taxonomy';
  $field_group->data = array(
    'label' => 'Additional Topics',
    'weight' => '15',
    'children' => array(
      0 => 'field_business_insight_topic',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_additional_topics|node|idea_story|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_centers|node|idea_story|form';
  $field_group->group_name = 'group_centers';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'idea_story';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_taxonomy';
  $field_group->data = array(
    'label' => 'Centers',
    'weight' => '17',
    'children' => array(
      0 => 'field_centers_research_programs',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_centers|node|idea_story|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_regions_of_interest|node|idea_story|form';
  $field_group->group_name = 'group_regions_of_interest';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'idea_story';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_taxonomy';
  $field_group->data = array(
    'label' => 'Regions of Interest',
    'weight' => '16',
    'children' => array(
      0 => 'field_region_of_interest',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_regions_of_interest|node|idea_story|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_related_content|node|idea_story|form';
  $field_group->group_name = 'group_related_content';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'idea_story';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Related Content',
    'weight' => '9',
    'children' => array(
      0 => 'field_link_unlimited',
      1 => 'field_person_fac_ref',
      2 => 'field_related_events',
      3 => 'field_related_idea_story',
      4 => 'field_related_other_content',
      5 => 'field_related_other_unlimited',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_related_content|node|idea_story|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_tags|node|idea_story|form';
  $field_group->group_name = 'group_tags';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'idea_story';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_taxonomy';
  $field_group->data = array(
    'label' => 'Tags',
    'weight' => '18',
    'children' => array(
      0 => 'field_tag',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_tags|node|idea_story|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_taxonomy|node|idea_story|form';
  $field_group->group_name = 'group_taxonomy';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'idea_story';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Tagging',
    'weight' => '11',
    'children' => array(
      0 => 'group_academic_area',
      1 => 'group_additional_topics',
      2 => 'group_centers',
      3 => 'group_regions_of_interest',
      4 => 'group_tags',
    ),
    'format_type' => 'tabs',
    'format_settings' => array(
      'formatter' => '',
      'instance_settings' => array(
        'classes' => '',
      ),
    ),
  );
  $export['group_taxonomy|node|idea_story|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_wrapper_byline|node|idea_story|default';
  $field_group->group_name = 'group_wrapper_byline';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'idea_story';
  $field_group->mode = 'default';
  $field_group->parent_name = 'group_wrapper_header';
  $field_group->data = array(
    'label' => 'Byline wrapper',
    'weight' => '5',
    'children' => array(
      0 => 'field_authors',
      1 => 'field_date',
    ),
    'format_type' => 'div',
    'format_settings' => array(
      'label' => 'Byline wrapper',
      'instance_settings' => array(
        'classes' => '',
        'description' => '',
        'show_label' => '0',
        'label_element' => 'h3',
        'effect' => 'none',
        'speed' => 'none',
      ),
      'formatter' => 'open',
    ),
  );
  $export['group_wrapper_byline|node|idea_story|default'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_wrapper_header|node|idea_story|default';
  $field_group->group_name = 'group_wrapper_header';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'idea_story';
  $field_group->mode = 'default';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Header wrapper',
    'weight' => '0',
    'children' => array(
      0 => 'field_editorial_summary',
      1 => 'field_key_taxonomy',
      2 => 'media_icon',
      3 => 'title',
      4 => 'group_wrapper_byline',
    ),
    'format_type' => 'div',
    'format_settings' => array(
      'label' => 'Header wrapper',
      'instance_settings' => array(
        'classes' => '',
        'description' => '',
        'show_label' => '0',
        'label_element' => 'h3',
        'effect' => 'none',
        'speed' => 'none',
      ),
      'formatter' => 'open',
    ),
  );
  $export['group_wrapper_header|node|idea_story|default'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_wrapper_related|node|idea_story|default';
  $field_group->group_name = 'group_wrapper_related';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'idea_story';
  $field_group->mode = 'default';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Related',
    'weight' => '4',
    'children' => array(
      0 => 'field_link_unlimited',
      1 => 'field_person_fac_ref',
      2 => 'field_related_idea_story',
      3 => 'related_title',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'label' => 'Related',
      'instance_settings' => array(
        'classes' => '',
        'description' => '',
      ),
      'formatter' => 'collapsed',
    ),
  );
  $export['group_wrapper_related|node|idea_story|default'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_wrapper_taxonomy|node|idea_story|default';
  $field_group->group_name = 'group_wrapper_taxonomy';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'idea_story';
  $field_group->mode = 'default';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Taxonomy wrapper',
    'weight' => '2',
    'children' => array(
      0 => 'field_academic_area_unlimited',
      1 => 'field_business_insight_topic',
      2 => 'field_region_of_interest',
    ),
    'format_type' => 'gsb_field_formatter_group_comma_separator',
    'format_settings' => array(
      'label' => 'Taxonomy wrapper',
      'instance_settings' => array(
        'item_count' => '0',
        'classes' => '',
      ),
      'formatter' => 'open',
    ),
  );
  $export['group_wrapper_taxonomy|node|idea_story|default'] = $field_group;

  return $export;
}
