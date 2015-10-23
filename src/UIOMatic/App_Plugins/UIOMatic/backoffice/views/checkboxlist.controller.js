﻿angular.module("umbraco").controller("UIOMatic.Views.Checkboxlist",
    function ($scope, uioMaticObjectResource) {
        //example config
        //"{'typeName':'Example.Models.Person, Example', 'valueColumn': 'Id', 'textColumn'='FirstName'}"

        $scope.delimiter = ",";
        if ($scope.property.Config.delimiter)
            $scope.delimiter = $scope.property.Config.delimiter;

        function init() {
            uioMaticObjectResource.getAll($scope.property.Config.typeName, $scope.property.Config.textColumn, "asc").then(function (response) {
                $scope.objects = response.data;

              

                angular.forEach($scope.objects, function (object) {

                    if ($scope.property.Value && _.indexOf($scope.property.Value.toString().split($scope.delimiter), object[$scope.property.Config.valueColumn].toString()) > -1)
                        object.selected = true;
                    else
                        object.selected = false;

                });
            });
        }

        init();

        $scope.$on('ValuesLoaded', function (event, data) {
            init();
        });

        $scope.setValue = function() {
            var val = [];
            angular.forEach($scope.objects, function (object) {
                if (object.selected)
                    val.push(object[$scope.property.Config.valueColumn]);
            });

            $scope.property.Value = val.join($scope.delimiter);
        }
    });