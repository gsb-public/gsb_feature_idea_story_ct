(function ($) {

Drupal.behaviors.gsb_feature_idea_story_ct = {
 
  attach: function (context, settings) {

    // create the HierarchyInfo using the data from the 
    // multiple select field being replaced

    // testing testing testing
    //var selectFieldName = "field_key_taxonomy"; 
    var selectFieldName = "field_test2"; 

    var hi = new Drupal.gsb_feature_idea_story_ct.HierarchyInfo();
    hi.addCloneLevelFields(selectFieldName);	

  }	

};  

Drupal.gsb_feature_idea_story_ct = Drupal.gsb_feature_idea_story_ct || {};

Drupal.gsb_feature_idea_story_ct.HierarchyInfo = function () {

  var self = this;

  // 
  // hierarchyInfo
  //
  // ... is created during on the 'attach' event for the page
  // will hold the following info:
  //
  // hierarchyInfo[key] = { 'index' : index, 'parentList' : parentList, 'childrenList' : childrenList }
  // ... where key equals the data-index of an option item,
  // 'index' equals the data-index of an option item,
  // 'parentList' equals the data-index list of anscestor parents to the option item 
  // and 'childrenList' equals the data-index list of children to the option item
  //
  var hierarchyInfo = []; 

  // naming used for the cloned level fields
  this.LEVELNAME = 'fake-level';

  // selectField: the select field being replaced
  this.selectField = null;

  // method getHierarchyInfo

  this.getHierarchyInfo = function() {
    return hierarchyInfo;
  };

  // method addCloneLevelFields

  this.addCloneLevelFields = function(selectFieldName) {

    if ($('#'+self.LEVELNAME+'1').length > 0) {
      return;
    }

    // initialize the selectFieldName and selectField object
    // setting it to the select field being replaced
    this.selectFieldName = selectFieldName;
    this.selectField = $("[name='" + self.selectFieldName + "[und][]']");

    // create the HierarchyInfo using the data from the 
    // multiple select field being replaced

    self.createHierarchyInfo();	

    // find the number of levels
    var depth = self.findDepth();

    // create clones for each depth

    for (var index = 1; index <= depth; index++) {
      self.cloneSelect(index);
    }         

    // hide all but the level 1 select for now

    self.hideLowerLevels(1);

    // setup a change handler for the new level 1 clone select field

    self.setLevelChangeHandler(1);

  }; // end of addCloneLevelFields

  // method createHierarchyInfo

  this.createHierarchyInfo = function() {

    console.log('in gsb_feature_idea_story_ct');

    // get the select element for select field

    var selectField = $("[name='" + self.selectFieldName + "[und][]']");
    console.log(selectField);

    // get the list of objects for the select

    var options = selectField.children().find( "option" );
    if (options.length == 0) {
      options = selectField.find( "option" );
    }
    console.log(options);

    // get the current selection value for the select

    var currentSelectionValue = selectField.val();
    if (currentSelectionValue == null) {
      console.log("currentSelectionValue: no value currently set");
    } else {
      console.log("currentSelectionValue: "+currentSelectionValue);			
    }

    // set the attribute 'data-index' for the root item '_none'
    var rootItem = '_none';
    $("[name='" + self.selectFieldName + "[und][]'] option[value='" + rootItem + "']").attr("data-index","-1");

    // set the 'data-index' and the 'data-level' for the remaining options

    var parentList = [];
    var prevLevel = 0;
    var prevIndex = -1;

    options.each(function( index ) {

      var optionText = $( this ).text();
      var level = self.getLevel(optionText);

      $( this ).attr("data-index", index);
      $( this ).attr("data-level", level);

      if (level > prevLevel) {
        parentList[parentList.length] = prevIndex;
      } else if (level < prevLevel) {
        while (parentList.length > level) {
          parentList.splice(parentList.length-1, 1);	
        }
      }

      prevLevel = level;
      prevIndex = index;

      var parentIndex = parentList[parentList.length-1];

      $( this ).attr("data-parent", parentIndex);			  

    }); 	

  }; // end of createHierarchyInfo

  // method findDepth

  this.findDepth = function() {

    console.log('in findDepth');

    var depth = 1;

    // get the list of objects for the select

    var options = self.selectField.children().find( "option" );
    if (options.length == 0) {
      options = self.selectField.find( "option" );
    }

    options.each(function( index ) {
      var level = $( this ).attr("data-level");
      if (level > depth) {
       depth = level;
      }
    }); 	

    return depth;

  }; // end of findDepth	

  // method cloneSelect

  this.cloneSelect = function(index) {

    console.log('in cloneSelect');

    // check if the level select already exists,
    // and if it does delete it... so that we can recreate it

    var levelSelect = $('#' + self.LEVELNAME + index); 
    if (levelSelect != undefined) {
      levelSelect.remove();
    }

    var classFieldName = self.selectFieldName.replace("_", "-");    

    var levelId = self.LEVELNAME + index;
    self.selectField.clone().attr('id', levelId).attr('data-level', index).appendTo('.form-item-' + classFieldName + '-und').removeAttr('multiple');

    // run thru the options and remove any that are not level x options

    var options = $('#' + self.LEVELNAME + index).children().find( "option" );
    if (options.length == 0) {
      options = $('#' + self.LEVELNAME + index).find( "option" );
    }
    options.each(function( optionsIndex ) {
      var level = $( this ).attr("data-level");
      if (level != index) {
        $( this ).remove();
      }
    });       

  }; // end of cloneSelect 

  // method setLevelOptions

  this.setLevelOptions = function(level, childrenIndexes) {

    self.cloneSelect(level);

    var levelSelect = $('#' + self.LEVELNAME + level); 

    var options = levelSelect.children().find( "option" );
    if (options.length == 0) {
      options = levelSelect.find( "option" );
    }
    options.each(function( optionsIndex ) {
      var itemIndex = $( this ).attr("data-index");
      if ($.inArray(itemIndex, childrenIndexes) == -1) {
        $( this ).remove();
      }
    }); 

  };  

    // method hideLowerLevels

  this.hideLowerLevels = function(level) {
    var depth = self.findDepth();
    var level = parseInt(level);
    for (var index = level+1; index <= depth; index++) {
      var levelSelect = $('#' + self.LEVELNAME + index); 
      levelSelect.hide();      
    }
  };  

  // method getChildIndexes

  this.getChildIndexes = function(parentIndex) {

    var childList = [];

    var options = self.selectField.children().find( "option" );
    if (options.length == 0) {
      options = self.selectField.find( "option" );
    }

    options.each(function( index ) {
      var pi = $( this ).attr("data-parent");
      if (pi == parentIndex) {
        childList[childList.length] = $( this ).attr("data-index");
      }
    }); 

    return childList;

  }; // end of getChildIndexes  

  // method setLevelChangeHandler

  this.setLevelChangeHandler = function(handlerLevel) {

    $('#' + self.LEVELNAME + handlerLevel).change(function() {
      
      var option = $(this).find('option:selected');

      var index = option.attr("data-index");
      var level = option.attr("data-level");

      console.log(self.LEVELNAME + level + ' change handler, ' + 'index = ' + index);

      // select the value in the original multiple select field
      var realSelectField = $("[name='" + self.selectFieldName + "[und][]']");
      realSelectField.val($('#' + self.LEVELNAME + handlerLevel).val());

      // get list of child index, who have the just selected parent option
      var parentIndex = index;
      var childrenIndexes = self.getChildIndexes(parentIndex);
      console.log('childrenIndexes = ');
      console.log(childrenIndexes);

      self.setLevelOptions(parseInt(level)+1, childrenIndexes);
      self.hideLowerLevels(parseInt(level)+1);

      self.setLevelChangeHandler(parseInt(level)+1);

    });

  }; // end of setLevelChangeHandler    

  // method getLevel

  this.getLevel = function(text) {

    var level = '1';

    if (text == '- None -') {
      return 0;
    }	

    if (text.charAt(0) == '-') {
      level = '2';	
    }

    if (text.charAt(1) == '-') {
      level = '3';	
    }

    if (text.charAt(2) == '-') {
      level = '4';	
    }

    return level;

  };	// end of getLevel

}	

}(jQuery)); 	