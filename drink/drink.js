app.controller('drinkController', function($scope, FBoperation) {

    $scope.drinktype = FBoperation.getData('drinktype');

    $scope.drink = FBoperation.getData('drink');
    $scope.drink.$loaded()
        .then(function() {
            $scope.load();
        });

    $scope.drink.$watch(function(a) {
        console.log(a);
        if ($scope.myTable) {
            $scope.myTable.destroy();
            $scope.load();
        }
    });


    $scope.resetForm = function() {
        $scope.show = false;
        $scope.edit = false;
        $scope.action = '';
        $scope.tmp = {};
        $scope.tmp.name = '';
        $scope.tmp.price = '';
        $scope.tmp.type = '';
    };

    $scope.load = function() {

        function filterColumn(i) {
            $('#drinktable').DataTable().column(i).search(
                $('#col' + i + '_filter').val()
            ).draw();
        }

        $(document).ready(function() {
            $scope.myTable = $('#drinktable').DataTable({
                "paging": true,
                "ordering": true,
                "info": true
            });
            $('input.column_filter').on('keyup click', function() {
                filterColumn($(this).attr('data-column'));
            });
            $('select.column_filter').on('keyup click', function() {
                filterColumn($(this).attr('data-column'));
            });
        });
    }



    $scope.operation = function(tmp, action) {
        if (action == "add") {
            $scope.drink.$add(tmp);
            $scope.resetForm();
        }

        if (action == "edit") {
            DBoperation.editData('bakery', 'id', tmp.id).then(
                function(data) {
                    $scope.resetForm();
                    console.log(data);
                    $scope.tmp = data[0];
                    $scope.tmp.price = parseFloat($scope.tmp.price);
                    $scope.show = true;
                    $scope.edit = true;
                    $scope.action = 'update';
                },
                function(error) {
                    console.log(error);
                }
            );
        }
        if (action == "update") {
            tmp.table = "bakery";
            tmp.primarykey = "id";
            tmp.action = "update";
            console.log(tmp);
            DBoperation.updateData(tmp).then(
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


});