var apiURL = 'http://localhost:8000';

var app = angular.module("couchcmsapp", ["ui.router", "ngSanitize", "ui.tinymce", "ngCookies"]);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("home", {
            "url": "/:culture/home",
            "templateUrl": "templates/home.html",
            "controller": "MainController",
            "cache": false
        })
        .state("/", {
            "url": "/",
            "templateUrl": "templates/default.html",
            "controller": "MainController",
            "cache": false
        });
    $urlRouterProvider.otherwise("/");
});

app.controller("MainController", function($scope, $location, $http, $state, $stateParams, $cookieStore) {

    $scope.items = {};
    $scope.saved = false;
    $scope.culture =  'en-in';

    //{type : $scope.culture[0].value};

    $scope.landing = function(culture){
        $location.path(culture + '/home');
    }

    if($stateParams.culture) {
        $http(
            {
                method: "GET",
                url: apiURL + "/api/get",
                params: {
                    culture: $stateParams.culture,
                    page_name: 'home'
                }
            }
        )
        .success(function(result) {
            $scope.home = result;
        })
        .error(function(error) {
            console.log(JSON.stringify(error));
        });
    }

});

//============================================================================================================================================
/*
app.controller("LoginController", function($scope, $location, $http, $state, $stateParams, $cookieStore) {
    if ($cookieStore.get('IsLoggedIn') == null){
        $location.path('/login');
    }

    if (!$cookieStore.get('IsLoggedIn') == 'yes'){
        $location.path('/login');
    }

    $scope.items = {};
    $scope.saved = false;
    $scope.culture =  'en-in';
    $scope.errorMsg = "";
    $scope.clicked = 0;

    $scope.ShowtoEdit = function(){
        $scope.clicked = ($scope.clicked == 0) ? 1 : 0;
    }

    $scope.RedirectToEdit = function(culture){
        $location.path('/item/' + culture + '|home', true);
    }


    $scope.Login = function(email, pwd){

        if (email == 'test@test.com' && pwd == 'test'){
            $cookieStore.put('IsLoggedIn' ,'yes');
            $cookieStore.put('email', email);
            $location.path('/create');
        }
        else{
            $scope.errorMsg = "Invalid credentials";
        }

    }

    $scope.Logout = function(){
            $cookieStore.remove('IsLoggedIn');
            $cookieStore.remove('email');
            $location.path('/login');
    }

    $scope.fetchAll = function() {
        $http(
            {
                method: "GET",
                url: apiURL + "/api/get"
            }
        )
        .success(function(result) {
            for(var i = 0; i < result.length; i++) {
                $scope.items[result[i].id] = result[i];
            }
        })
        .error(function(error) {
            console.log(JSON.stringify(error));
        });
    }

    // Look up a document if we landed in the info screen for editing a document
    if($stateParams.documentId) {
        $scope.saved = false;
        $http(
            {
                method: "GET",
                url: apiURL + "/api/get",
                params: {
                    document_id: $stateParams.documentId
                }
            }
        )
        .success(function(result) {
            $scope.inputForm = result;
        })
        .error(function(error) {
            console.log(JSON.stringify(error));
        });
    }

    $scope.delete = function(documentId) {
        $http(
            {
                method: "POST",
                url: apiURL + "/api/delete",
                data: {
                    document_id: documentId
                }
            }
        )
        .success(function(result) {
            delete $scope.items[documentId];
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
*/