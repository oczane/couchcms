var apiURL = 'http://localhost:8000';

var app = angular.module("ejsapp", ["ui.router", "ngSanitize", "ui.tinymce", "ngCookies"]);


app.controller("MainController", function($scope, $location, $http, $state, $stateParams, $cookieStore) {

	$scope.culture = "";
	$scope.pagename = "";
	$scope.maincontent = "";

	var params = $location.absUrl().split('/');

	$scope.init = function() {
		$http(
            {
                method: "GET",
                url: apiURL + "/api/get",
                params: {
                    culture: params[params.length -2],
                    page_name: params[params.length -1]
                }
            }
        )
        .success(function(result) {
            $scope.culture = result.value.culture;
			$scope.pagename = result.value.pagename;
			$scope.maincontent = result.value.maincontent;
        })
        .error(function(error) {
            console.log(JSON.stringify(error));
        });
	}

	$scope.save = function(culture, pagename, content) {
	        $http(
	            {
	                method: "POST",
	                url: apiURL + "/api/save",
	                data: {
	                    maincontent: content,
	                    author: "Rakesh Gupta",
	                    culture: culture,
	                    page_name: pagename
	                }
	            }
	        )
	        .success(function(result) {
	            $scope.saved = true;
	            $state.go("item/"+culture+"|"+pagename);
	        })
	        .error(function(error) {
	            console.log(JSON.stringify(error));
	        });
	}
});	