app.controller('bakeryController', function($scope, DBoperation) {



    $scope.resetForm = function() {
        $scope.show = false;
        $scope.edit = false;
        $scope.action = '';
        $scope.tmp = {};
        $scope.tmp.id = '';
        $scope.tmp.name = '';
        $scope.tmp.price = '';
        $scope.tmp.type = '';
    };

    $scope.load = function() {
        DBoperation.getData('bakery').then(
            function(data) {
                console.log(data);
                $scope.bakery = data;

                function filterColumn(i) {
                    $('#bakerytable').DataTable().column(i).search(
                        $('#col' + i + '_filter').val()
                    ).draw();
                }

                $(document).ready(function() {
                    $scope.myTable = $('#bakerytable').DataTable();
                    $('input.column_filter').on('keyup click', function() {
                        filterColumn($(this).attr('data-column'));
                    });
                    $('select.column_filter').on('keyup click', function() {
                        filterColumn($(this).attr('data-column'));
                    });
                });
            },
            function(error) {
                console.log(error);
            }
        );
        DBoperation.getData('bakerytype').then(
            function(data) {
                console.log(data);
                $scope.bakerytype = data;
            },
            function(error) {
                console.log(error);
            }
        );
    }

    $scope.operation = function(tmp, action) {
        if (action == "add") {
            tmp.table = "bakery";
            tmp.action = "add";
            DBoperation.addData(tmp).then(
                function(data) {
                    console.log(data);
                    $scope.resetForm();
                    $scope.myTable.destroy();
                    $scope.load();

                },
                function(error) {
                    console.log(error);
                }
            );
        }
        if (action == "delete") {
            var r = confirm("Confirm to Delete!");
            if (r == true) {
                dataDelete = {};
                dataDelete.id = tmp;
                dataDelete.primarykey = "id";
                dataDelete.table = "bakery";
                dataDelete.action = "delete";
                console.log(dataDelete);
                DBoperation.deleteData(dataDelete).then(
                    function(data) {
                        console.log(data);
                        $scope.resetForm();
                        $scope.myTable.destroy();
                        $scope.load();
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            }
        }


    }


});