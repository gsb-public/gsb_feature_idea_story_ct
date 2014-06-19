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
  $field_group->identifier = 'group_alumni_name|node|idea_story|form';
  $field_group->group_name = 'group_alumni_name';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'idea_story';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_alumni_story';
  $field_group->data = array(
    'label' => 'Alumni Name',
    'weight' => '12',
    'children' => array(
      0 => 'field_salutation',
      1 => 'field_first_name',
      2 => 'field_last_name',
      3 => 'field_middle_name',
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
  $export['group_alumni_name|node|idea_story|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_alumni_story|node|idea_story|form';
  $field_group->group_name = 'group_alumni_story';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'idea_story';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Alumni Story',
    'weight' => '19',
    'children' => array(
      0 => 'field_alumni_story',
      1 => 'field_year',
      2 => 'field_program_single',
      3 => 'group_alumni_name',
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
  $export['group_alumni_story|node|idea_story|form'] = $field_group;

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
    'weight' => '22',
    'children' => array(
      0 => 'field_academic_area_unlimited',
      1 => 'field_business_insight_topic',
      2 => 'field_centers_research_programs',
      3 => 'field_tag',
      4 => 'field_region_of_interest',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'label' => 'Tagging',
      'instance_settings' => array(
        'required_fields' => 1,
        'classes' => '',
        'description' => '',
      ),
      'formatter' => 'collapsed',
    ),
  );
  $export['group_taxonomy|node|idea_story|form'] = $field_group;

  return $export;
}
