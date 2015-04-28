'use strict';

angular.module('gradeTest')
.controller('GradesCtrl', function($scope, Course, Grade, $rootScope){

  $scope.courses = Course.init();
  $scope.grades = Grade.init();

  $scope.courses.$loaded().then(updateValues);

  $scope.addCourse = function(courseName){
    Course.add(courseName)
    .then(updateValues)
    .catch(function(error){
      console.error(error);
    });
  };

  $scope.addGrade = function(grade){
    Grade.add(grade);
    $scope.grade = {};
  };

  $scope.destroyGrade = function(course, gradeIndex){
    Grade.destroy(course, gradeIndex);
  };

  function updateValues(){
    $scope.courseNames = $scope.courses.courses.split(',');
  }

  $scope.editGrade = function(course, index, grade){
    console.log(course, index, grade);
    $scope.editIndexVal = index;
    $scope.editCourse = course;
    $scope.grade.date = grade.date.getDate();
    console.log(grade);
    $scope.grade = grade;
  };

  $scope.saveGrade = function(grade){
    Grade.update($scope.editCourse, $scope.editIndexVal, grade);
    $scope.editIndexVal = null;
    $scope.editCourse = null;
  };



  // function calcAverages(){
  //   console.log($scope.grades);
  // }

});
