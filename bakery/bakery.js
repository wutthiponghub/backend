        app.controller('bakeryController', function($scope, DBoperation) {


            $scope.loadData = function() {
                DBoperation.getData('bakery').then(
                    function(data) {
                        console.log(data);
                        $scope.bakery = data;
                        $(document).ready(function() {
                            $('#bakerytable').DataTable();
                        });
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            }


        });