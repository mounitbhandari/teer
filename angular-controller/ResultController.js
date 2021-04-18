app.controller("ResultCtrl", function ($scope,$http,$filter,$rootScope,dateFilter,$timeout,$interval,$window) {
    $scope.msg = "This is result controller";
    $scope.tab = 1;
    $scope.selectedTab = {
        "color" : "white",
        "background-color" : "coral",
        "font-size" : "15px",
        "padding" : "5px"
    };
    $scope.setTab = function(newTab){
        $scope.tab = newTab;
    };
    $scope.isSet = function(tabNum){
        return $scope.tab === tabNum;
    };


    $scope.start_date=new Date();
    $scope.end_date=new Date();
    
    $scope.changeDateFormat=function(userDate){
        return moment(userDate).format('YYYY-MM-DD');
    };

    $scope.getPlaySeriesList=function(){
        var request = $http({
            method: "get",
            url: api_url+"/getPlaySeries",
            dataType:JSON,
            data: {},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function(response){
            $scope.seriesList=response.data;
        });
    }; 
    $scope.getPlaySeriesList();
    // get total sale report for 2d game
    $scope.resultData=[];
    $scope.getRow = function(num) {
        return new Array(num);
    }
    
    $scope.getResultListByDate=function(searchDate){
		var dt=$scope.changeDateFormat(searchDate);
        var request = $http({
            method: "post",
            url: api_url+"/getResultsByDate",
            dataType:JSON,
            data: {
            	result_date: dt
            }
            ,headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function(response){
            $scope.resultData=response.data;
            $scope.resultTableRow = Math.floor(($scope.resultData.length) / 2);
                if(($scope.resultData.length) % 2){
                    $scope.resultTableRow +=1;
                }
        });
    };  

    $scope.todayDate = $scope.changeDateFormat(new Date());
    $scope.getResultListByDate($scope.todayDate);
    $scope.message='';
    $scope.submitNewMessage=function(message){
        var request = $http({
            method: "post",
            url: api_url+"/addNewMessage",
            dataType:JSON,
            data: {
                msg: message
            }
            ,headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function(response){
            $scope.messageRecord=response.data;
            if($scope.messageRecord.success==1){
            	 $scope.message='';
                $scope.submitStatus=true;
                $timeout(function() {
                    $scope.submitStatus = false;
                }, 5000);
                
            }
        });
       
    };

});

