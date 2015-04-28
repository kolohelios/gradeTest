'use strict';

angular.module('gradeTest')
.factory('Course', function($firebaseObject, $rootScope){

  function Course(){
  }

  Course.init = function(){
    $rootScope.fbCourses = $rootScope.fbRoot.child('users/' + $rootScope.activeUser.uid);
    $rootScope.afCourses = $firebaseObject($rootScope.fbCourses);
    return $rootScope.afCourses;
  };

  Course.add = function(newCourse){
    var courses = $rootScope.afCourses.courses ? $rootScope.afCourses.courses.split(',') : [];
    courses.push(newCourse);
    courses = courses.join();
    $rootScope.afCourses.courses = courses;
    return $rootScope.afCourses.$save();
  };

  return Course;

});
