(function ($) {

Drupal.behaviors.gsb_feature_idea_story_ct = {
 
  attach: function (context, settings) {

    // create the HierarchyInfo using the data from the 
    // multiple select field being replaced

    // testing testing testing
    //var selectFieldName = "field_key_taxonomy"; 
    //var selectFieldName = "field_test2";
    var selectFieldName = "field_test2"; 

    var hi = new Drupal.gsb_feature_idea_story_ct.HierarchyInfo();
    hi.addCloneLevelFields(selectFieldName);	

    $('.node-form').submit(function(){
      console.log('node-form submitted');
      hi.removeCloneLevelFields();
    });

  }	

};  

Drupal.gsb_feature_idea_story_ct = Drupal.gsb_feature_idea_story_ct || {};

Drupal.gsb_feature_idea_story_ct.HierarchyInfo = function () {

  /**
   * Properties 
   */

  var self = this;

  // current list of selected values
  this.currentSelectedValues = [];

  // naming used for the cloned level fields
  this.LEVELNAME = 'fake-level';

  // selectField: the select field being replaced
  this.selectField = null;

  // add button at the end of the selects
  this.addButton = null;

  /**
   * Methods 
   */

  /**
   * addCloneLevelFields
   */
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

    // add an 'Add' button to the end

    var levelSelect = $('#' + self.LEVELNAME + depth); 
    self.addAddButton(levelSelect);

    // setup a change handler for the new level 1 clone select field

    self.setLevelChangeHandler(1);

    // initial the list of currently selected values

    self.initializeCurrentSelectedValues();

  }; // end of addCloneLevelFields

  /**
   * removeCloneLevelFields
   */
  this.removeCloneLevelFields = function() {

    var depth = self.findDepth();
    for (var index = 1; index <= depth; index++) {
      var levelSelect = $('#' + self.LEVELNAME + index); 
      levelSelect.remove();      
    }    

  }; // end of removeCloneLevelFields    

  /**
   * initializeCurrentSelectedValues
   */
  this.initializeCurrentSelectedValues = function() {

    var currentSelectedValues = self.selectField.val();
    if (currentSelectedValues == null) {
      return;
    }

    var selectedValues = [];
    for (var index = 0; index < currentSelectedValues.length; index++) {
      selectedValues[selectedValues.length] = currentSelectedValues[index];
    }

    // add the selection table

    self.addSelectedTable();

    // build up the initial rows in the selection table

    console.log('in initializeCurrentSelectedValues - building initial rows in selected table');
  
    // breakout the items with their levels and parents

    var options = self.selectField.children().find( "option" );
    if (options.length == 0) {
      options = self.selectField.find( "option" );
    }

    var depth = self.findDepth();    

    var topLevelItems = []; 
    var childLevelItems = []; 

    options.each(function( index ) {
      
      var value = $( this ).val();

      if ($.inArray(value, selectedValues) != -1) {
        
        var itemIndex = $( this ).attr("data-index");
        var level = $( this ).attr("data-level");   
        var parentIndex = $( this ).attr("data-parent");   
        var text = $( this ).text(); 

        var item = { 
          value: value,
          index: itemIndex,
          level: level,
          parentIndex: parentIndex,
          text: text   
        };

        if (level == 1) {
          topLevelItems[topLevelItems.length] = item;
        } else {
          childLevelItems[childLevelItems.length] = item; 
        }

      }

    });    

    console.log('topLevelItems = ');
    console.log(topLevelItems);     

    console.log('childLevelItems = ');
    console.log(childLevelItems);    

    var selectedRows = [];

    for (var index = 0; index < topLevelItems.length; index++) {
      var rowItems = [];
      self.getRowItems(rowItems, topLevelItems[index], childLevelItems); 
      selectedRows[selectedRows.length] = [ rowItems.reverse() ];      
    }

    console.log('selectedRows = ');
    console.log(selectedRows);   

    var flattenedRows = [];
    var flatRow = [];
    var prevLevel = 0;

    for (var index = 0; index < selectedRows.length; index++) {

      var items = selectedRows[index][0];

      for (var itemsIndex = 0; itemsIndex < items.length; itemsIndex++) {

        var item = items[itemsIndex];

        if (item.level > prevLevel) {
          // add item, and track prevLevel
          flatRow[flatRow.length] = item;
          prevLevel = item.level;
          continue;
        }

        // we've got a flat row, add it
        flattenedRows[flattenedRows.length] = $.extend({}, flatRow);
        
        // pop diff + 1
        var diff = prevLevel - item.level;
        diff++;
        for (var diffIndex = 0; diffIndex < diff; diffIndex++) {
          flatRow.splice(flatRow.length-1, 1);
        }

        // add item, and track prevLevel
        flatRow[flatRow.length] = item;
        prevLevel = item.level;   

      }     

    }    

    // we've got one last flat row, add it
    flattenedRows[flattenedRows.length] = $.extend({}, flatRow);     

    flattenedRows.reverse();

    console.log('flattenedRows = ');
    console.log(flattenedRows); 

    // now... roll thru our flattened list and row by row  
    // add them to the selected table  

    for (var index = 0; index < flattenedRows.length; index++) {

      var row = flattenedRows[index];

      var selectedTextList = [];
      var indexList = [];

      $.each(row, function(key, value) {
        var item = value;
        selectedTextList[selectedTextList.length] = item.text;
        indexList[indexList.length] = item.value;
      });

      self.addSelectedTableRow(selectedTextList, indexList);

    }

  }; // end of initializeCurrentSelectedValues  

  /**
   * getRowItems
   */
  this.getRowItems = function(rowItems, parentItem, childItems) {

    for (var index = 0; index < childItems.length; index++) {
      if (parentItem.index == childItems[index].parentIndex) {
        this.getRowItems(rowItems, childItems[index], childItems);
      }
    }

    rowItems[rowItems.length] = parentItem;

  }; // end getRowItems

  /**
   * createHierarchyInfo
   */
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

  /**
   * findDepth
   */
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

  /**
   * cloneSelect
   */
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

    if (self.addButton) {
      self.selectField.clone()
        .attr('id', levelId).attr('data-level', index)
        .insertBefore(self.addButton)
        .removeAttr('multiple');     
    } else {
      self.selectField.clone()
        .attr('id', levelId)
        .attr('data-level', index)
        .appendTo('.form-item-' + classFieldName + '-und')
        .removeAttr('multiple');
    }

    // run thru the options and remove any that are not level x options

    var levelSelect = $('#' + self.LEVELNAME + index); 

    var options = levelSelect.children().find( "option" );
    if (options.length == 0) {
      options = levelSelect.find( "option" );
    }
    options.each(function( optionsIndex ) {
      var level = $( this ).attr("data-level");
      if (level != index) {
        $( this ).remove();
      }
    });       

    // add an 'empty' option at the top 
    levelSelect.prepend(
      $('<option>', { value: '-none', text: '- None -'})
    );

  }; // end of cloneSelect 

  /**
   * setLevelOptions
   */
  this.setLevelOptions = function(level, childrenIndexes) {

    var depth = self.findDepth();

    if (level > depth) {
      // no more levels to set, because we are at the lowest level.
      // so nothing to do here.
      return;
    }

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

    // add an 'empty' option at the top 
    levelSelect.prepend(
      $('<option>', { value: '-none', text: '- None -'})
    );    

  };  

  /**
   * hideLowerLevels
   */
  this.hideLowerLevels = function(level) {
    var depth = self.findDepth();
    var level = parseInt(level);
    for (var index = level+1; index <= depth; index++) {
      var levelSelect = $('#' + self.LEVELNAME + index); 
      levelSelect.hide();      
    }
  };  

  /**
   * getChildIndexes
   */
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

  /**
   * setLevelChangeHandler
   */
  this.setLevelChangeHandler = function(handlerLevel) {

    $('#' + self.LEVELNAME + handlerLevel).change(function() {
      
      var option = $(this).find('option:selected');

      var index = option.attr("data-index");
      var level = option.attr("data-level");

      var index = option.attr("data-index");
      var level = option.attr("data-level");
      
      if (level == undefined) {
        self.hideLowerLevels(parseInt(handlerLevel));
        return;
      }

      console.log(self.LEVELNAME + level + ' change handler, ' + 'index = ' + index);

      // select the value in the original multiple select field
      //var newSelection = $('#' + self.LEVELNAME + handlerLevel).val();
      //self.selectField.val(newSelection);

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

  /**
   * addAddButton
   */
  this.addAddButton = function(element) {
    
    element.after(
      $('<input type="button" value="Add" class="fake-add-button form-submit" id="fake-add-button">')
    );

    self.addButton = $("#fake-add-button");

    // setup a click handler for the new add button
    self.addButton.click(function() {

      // get selections from the level selects

      var prevSelectedValue = '-none';
      var prevSelectedValueList = [];
      var prevSelectedText = [];

      var depth = self.findDepth();
      for (var index = 1; index <= depth; index++) {
        
        var levelSelect = $('#' + self.LEVELNAME + index); 

        var selectedValue = levelSelect.val(); 
        var selectedText = $( '#' + self.LEVELNAME + index + ' option:selected' ).text();       
        console.log('selectedValue = '+selectedValue+' selectedText = '+selectedText);

        if (selectedValue == '-none') {
          break;
        } 

        prevSelectedValue = selectedValue;
        prevSelectedValueList[prevSelectedValueList.length] = selectedValue;
        prevSelectedText[prevSelectedText.length] = selectedText;

      }      

      console.log('prevSelectedValue = '+prevSelectedValue+' prevSelectedText = '+prevSelectedText.join(' > '));

      // add the selection text to the table 

      self.addSelectedTableRow(prevSelectedText, prevSelectedValueList);

      self.updateCurrentSelection();      

    });

  };  // end of addAddButton     

  /**
   * addSelectedTable
   */
  this.addSelectedTable = function() {

    self.addButton.after($(
      '<div class="dropbox">' + 
        '<table id="fake-selected-table">' + 
          '<caption class="dropbox-title">All selections</caption>' + 
          '<tbody>' + 
            '<tr id="fake-level-is-empty">' +
              '<td>Nothing has been selected.</td>' + 
            '</tr>' + 
          '</tbody>' + 
        '</table>' +
      '</div>'
    ));

  };  // end of addSelectedTable   

  /**
   * addNoNothinRow
   */
  this.addNoNothinRow = function() {

    console.log('in addNoNothinRow');

    $('#fake-selected-table tr:last').after($(
      '<tr id="fake-level-is-empty">' +
        '<td>Nothing has been selected.</td>' + 
      '</tr>' 
    ));    

  };  // end of addNoNothinRow    

  /**
   * addSelectedTableRow
   */
  this.addSelectedTableRow = function(selectedTextList, indexList) {

    // update the current selected values list

    for (var index = 0; index < indexList.length; index++) {
      self.currentSelectedValues[self.currentSelectedValues.length] = indexList[index];
    }

    var oddeven = 'odd';
    if ($('#fake-selected-table tr:last').hasClass('odd')) {
      oddeven = 'even';
    }

    var dashedIndexList = indexList.join('-');
    var arrowedTextList = selectedTextList.join(' > ');

    $('#fake-selected-table tr:last').after($(
      '<tr class="' + oddeven + '" id="fake-level-remove-tr-' + dashedIndexList + '">' + 
        '<td><span class="fake-level-item" >' + arrowedTextList + '</span></td>' + 
        '<td class="fake-level-remove"><span><a href="#" id="fake-level-remove-link-' + dashedIndexList + '" data-index="' + dashedIndexList + '">Remove</a></span></td>' + 
      '</tr>'
    ));

    // setup a click handler for the new remove link
    $('#fake-level-remove-link-'+dashedIndexList).click(function(event) {
      
      // get the list of indexes related to this selected row

      var dashedIndexList = $(this).attr('data-index');
      console.log('got remove link click for index = '+dashedIndexList);
      
      // convert the list into an array of index to be removed

      var removeIndexList = dashedIndexList.split('-');

      // remove these indexes from our list of currently selected

      $.each(removeIndexList, function(key, value) {
        self.currentSelectedValues.splice( $.inArray(value, self.currentSelectedValues), 1 );
      });
      
      console.log('currentSelectedValues = ');
      console.log(self.currentSelectedValues);
      
      // update the current selection to reflect the new list, 
      // now that an item has been removed

      self.updateCurrentSelection();

      console.log('self.currentSelectedValues.length = '+self.currentSelectedValues.length);
      if (self.currentSelectedValues.length == 0) {
        // add the 'no nothin been selected' row, since there are now no selections
        self.addNoNothinRow();
      }

      // remove this selected table row
      
      $('#fake-level-remove-tr-'+dashedIndexList).remove();

      event.stopPropagation();
      event.preventDefault();
    
    });    

    $('#fake-level-is-empty').remove();

  };  // end of addSelectedTableRow   

  /**
   * updateCurrentSelection
   */
  this.updateCurrentSelection = function() {
    var keys = $.map( self.currentSelectedValues, function( n, i ) {
      return ( n );
    });
    console.log('in updateCurrentSelection keys = ' + keys.join(','));
    self.selectField.val(keys);
  };  // end of updateCurrentSelection   

  /**
   * getLevel
   */
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