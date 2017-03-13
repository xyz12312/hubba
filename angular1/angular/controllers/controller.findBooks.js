"use strict";
angular
	.module("controller.findBooks", []);

angular
	.module("controller.findBooks")
	.controller("FindBooksController", FindBooksController);

FindBooksController.$Inject = ["$scope", "$http"];

function FindBooksController($scope, $http) {
    var vm = this;
    vm.loadBooks = loadBooks;
    angular.element("#fbPage").addClass("active");
    angular.element("#alPage").removeClass("active");

    $('.loadBooks').attr('disabled', true);
    $('#findBooksID').keyup(function () {
        if ($(this).val().length != 0)
            $('.loadBooks').attr('disabled', false);
        else
            $('.loadBooks').attr('disabled', true);
    })


    function loadBooks() {
        var boobID = $("#findBooksID").val();
        if (isNaN(boobID)) {
            alert("Must input numbers");
        } else {
            vm.bookOptions = getAllBookData();
        }

    }
    function getAllBookData() {
        var source = getDataSource();
        return {
            sortable: true,
            pageable: true,
            dataSource: source,
            columns: [{
                field: "BookId",
                title: "Book Id",

            }, {
                field: "Title",
                title: "Book Title",

            }, {
                field: "ISBN",
                title: "ISBN",
            },
             {
                 field: "DateOfPublication",
                 title: "Date Of Publication",
             }],
            noRecords: {
                template: "No data available on current page. Current page is: #=this.dataSource.page()#"
            },
        }
    }

    function getDataSource() {
        var boobID = $("#findBooksID").val();
        var dataSource = new kendo.data.DataSource({


            transport: {
                read: {
                    type: "GET",
                    url: "https://libraryapi.azurewebsites.net/api/libraries/" + boobID + "/librarybook",

                    dataType: "json"
                }
            },
            requestStart: function (e) {
                kendo.ui.progress($("#fbViewID"), true);
            },
            requestEnd: function (e) {
                kendo.ui.progress($("#fbViewID"), false);
            },
            pageSize: 5,
            serverPaging: true,
            serverSorting: true


        });
        return dataSource
    }
}