'use strict';

angular.module('gradeTest')
.factory('Grade', function($firebaseArray, $rootScope){

  function Grade(){
  }

  Grade.init = function(){
    $rootScope.fbGrades = $rootScope.fbRoot.child('users/' + $rootScope.activeUser.uid);
    $rootScope.afGrades = $firebaseArray($rootScope.fbGrades);
    return $rootScope.afGrades;
  };

  Grade.add = function(newGrade){
    var grade = angular.copy(newGrade);
    grade.date = grade.date.getTime();

    console.log(newGrade);
    var courseName = newGrade.course;
    var fbGrade = $rootScope.fbGrades.child(courseName);
    var afGrade = $firebaseArray(fbGrade);
    return afGrade.$add(grade);
  };

  Grade.destroy = function(course, index){
    var fbGrade = $rootScope.fbGrades.child(course);
    var afGrade = $firebaseArray(fbGrade);
    afGrade.$loaded().then(function(){
      afGrade.$remove(index);
    });
    return;
  };

  Grade.update = function(course, index, grade){
    var fbGrade = $rootScope.fbGrades.child(course);
    var afGrade = $firebaseArray(fbGrade);
    afGrade[index] = grade;
    afGrade.$loaded().then(function(){
      console.log(afGrade.$save(index));
    });
    return;
  }

  return Grade;

});
