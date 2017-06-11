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
                $(document).ready(function() {
                    $scope.myTable = $('#bakerytable').DataTable();
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

    $scope.add = function(tmp) {

        tmp.table = "bakery";
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


});