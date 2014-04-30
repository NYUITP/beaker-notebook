/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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
 * M_bkBunsenHelper
 * The docs go here ...
 *
 */
(function() {
  'use strict';
  var module = angular.module('M_bkBunsenHelper', [
    'M_bkCore',
    'M_bkShare',
    'M_bkHelper'
  ]);
  /**
   * bkBunsenHelper
   *
   */
  module.factory('bkBunsenHelper', function(bkBaseSessionModel, bkCoreManager, bkShare, bkHelper, $dialog, $routeParams, $window) {

    var bunsenSave = function(notebook, operation) {
      $window.top.postMessage({projectId: $routeParams.projectId,
                               notebook: notebook,
                               operation: operation},
                              $routeParams.bunsenUiUrl);
      bkBaseSessionModel.setEdited(false);
    };

    var bkBunsenHelper = {
      forDebugOnly: {
        bkBaseSessionModel: bkBaseSessionModel,
        bkCoreManager: bkCoreManager
      },

      userId: function() {
        return $routeParams.userId;
      },

      saveNotebook: function() {
        var serializedNotebook = {
          data: bkHelper.getSessionData().content,
          name: $routeParams.notebookName
        };
        bunsenSave(serializedNotebook, 'update');
      },

      saveNotebookAs: function(callback, template) {
        template = 'template/saveBunsenFile.html';

        var options = {
          backdrop: true,
          keyboard: true,
          backdropClick: true,
          controller: 'fileChooserController'
        };

        if (template.indexOf('template/') === 0) {
          options.templateUrl = template;
        } else {
          options.template = template;
        }

        $dialog.dialog(options)
          .open()
          .then(function(newName) {
            var serializedNotebook = {
              data: bkHelper.getSessionData().content,
              name: newName
            };
            bunsenSave(serializedNotebook, 'create');
          });
      }

    };
    window.bkBunsenHelper = bkBunsenHelper; // TODO, we want to revisit the decision of making this global
    return bkBunsenHelper;
  });
})();
