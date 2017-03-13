"use strict"
angular
	.module("controller.allLibraries", []);

angular
	.module("controller.allLibraries")
	.controller("AllLibrariesController", AllLibrariesController);

AllLibrariesController.$Inject = ["$scope", "$http"];

function AllLibrariesController($scope, $http) {
    var vm = this;
    vm.loadAllLibraies = loadAllLibraies;

    angular.element("#alPage").addClass("active");
    angular.element("#fbPage").removeClass("active");


    function loadAllLibraies() {
        vm.libraryOptions = getAllLibrariesData();
    }
    function getAllLibrariesData() {
        var source = getDataSource();
        return {
            sortable: true,
            pageable: true,
            dataSource: source,
            columns: [{
                field: "LibraryId",
                title: "Library Id",
                width: "120px"
            }, {
                field: "Name",
                title: "Library Name",
                width: "120px"
            }, {
                field: "City",
                title: "City",
                width: "120px"
            }]
        }
    }

    function getDataSource() {
        var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    type: "GET",
                    url: "https://libraryapi.azurewebsites.net/api/Libraries",
                    dataType: "json"
                }
            },
            requestStart: function (e) {
                kendo.ui.progress($("#alViewID"), true);
            },
            requestEnd: function (e) {
                kendo.ui.progress($("#alViewID"), false);
            },
            pageSize: 5,
            serverPaging: true,
            serverSorting: true


        });
        return dataSource
    }
}