/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
/**
 * This plugins menu items for the control panel
 */
define(function(require, exports, module) {
  'use strict';

  var fileMenuItems = [
    {
      name: "New",
      tooltip: "Open a new notebook with default languages(Evaluators)",
      action: function() {
        bkHelper.newSession();
      }
    },
    {
      name: "Open recent",
      items: function() {
        return bkHelper.getRecentMenuItems();
      }
    }
  ];
  var helpMenuItems = [
    {
      name: "About Beaker",
      action: function() {
        bkHelper.showModalDialog(undefined, "app/template/about.html");
      },
      tooltip: "Basic information about this application"
    },
    {
      name: "Tutorial notebook",
      action: function() {
        bkHelper.openNotebook("config/tutorial.bkr", undefined, true);
      },
      tooltip: "Open the tutorial notebook"
    },
    {
      name: "Keyboard shortcuts",
      action: function() {
        window.open("./keyboardShortcuts.html");
      },
      tooltip: "Show keyboard shortcuts"
    },
    {
      name: "Report a bug or feature request",
      action: function() {
        window.open("https://github.com/twosigma/beaker-notebook/issues/new");
      },
      tooltip: "Log an issue in GitHub"
    },
    {
      name: "Privacy policy",
      action: function() {
        window.open("http://beakernotebook.com/privacy");
      },
      tooltip: "Privacy policy on beakernotebook.com"
    }    
  ];

  var menuItemsDeferred = bkHelper.newDeferred();
  bkHelper.getHomeDirectory().then(function(homeDir) {
    var treeViewChooserTemplate = '<div class="modal-header">' +
        '   <h1>Open <span ng-show="getStrategy().treeViewfs.showSpinner"><i class="fa fa-refresh fa-spin"></i></span></h1>' +
        '</div>' +
        '<div class="modal-body">' +
        '   <tree-view rooturi="/" fs="getStrategy().treeViewfs"></tree-view>' +
        '   <tree-view rooturi="' + homeDir + '" fs="getStrategy().treeViewfs"></tree-view>' +
        '</div>' +
        '<div class="modal-footer">' +
        "   <div class='text-left'>Enter a file path (e.g. /Users/...) or URL (e.g. http://...):</div>" +
        '   <p><input id="openFileInput" class="input-xxlarge" ng-model="getStrategy().result" ng-keypress="getStrategy().close($event, close)" focus-start /></p>' +
        '   <button ng-click="close()" class="btn">Cancel</button>' +
        '   <button ng-click="close(getStrategy().result)" class="btn btn-primary">Open</button>' +
        '</div>';
    var toAdd = [
      { parent: "File", items: fileMenuItems },
      {
        parent: "File",
        submenu: "Open",
        items: [
          {
            name: "Open... (.bkr)",
            tooltip: "Open a bkr notebook file",
            action: function() {
              bkHelper.showModalDialog(
                  function(originalUrl) {
                    bkHelper.openNotebook(originalUrl);
                  },
                  treeViewChooserTemplate,
                  bkHelper.getFileSystemFileChooserStrategy()
              );
            }
          }
        ]
      },
      {
        parent: "Settings",
        items: [{
          name: "Set anonymous tracking permission",
          action: function() {
            bkHelper.showAnonymousTrackingDialog();
          },
          tooltip: "Show the dialog for setting anonymous tracking permission"
        }]
      },
      { parent: "Help", items: helpMenuItems }
    ];
    menuItemsDeferred.resolve(toAdd);
  });

  exports.getMenuItems = function() {
    return menuItemsDeferred.promise;
  };
});
