var app = angular.module('NavSpot', []);

function test(data){
  console.log(data);
}

function placeMarker(data, map){
var lati, lngi, title, details;
var image = 'https://image.ibb.co/nmGCo5/Spot3.png';


  var pizza = 'http://i.imgur.com/SM5t71i.png';
  var danger = 'http://i.imgur.com/APzYWBf.png';
  var study = 'http://i.imgur.com/Y4OXg9o.png';
  var group = 'http://i.imgur.com/ylIkOcp.png';

  var assignListener = function(markerObj, infoWindowObj){
    return function() {
      infoWindowObj.open(map, markerObj);
    };
  };

  var infoWindow = new google.maps.InfoWindow;
  // open info window
  var onMarkerClick = function() {
    var marker = this;
    infoWindow.setContent( marker.details );
    infoWindow.open(map, marker);
    mkmap.lastmarkeropened = marker;
  };
  // close the info window
  google.maps.event.addListener(map, 'click', function() {
    infoWindow.close();
  });
  var marker = [] ;
  
  // loop start
  for(i=0; i < data.length; i++){
    console.log(data[i].eventLocation + " OF TYPE " + data[i].eventType);
    if(data[i].eventName != ""){
      title = data[i].eventName;
    }
    if(data[i].eventDetails != ""){
      details = '<p> <b>' + data[i].eventName + '</b> <br> <b>' + data[i].eventLocation + '</b> <br>' + data[i].eventDetails + '</p>';
    }

      if(data[i].eventLocation == "Library West"){
        lati = 29.651409;
        lngi = -82.342909;
      }
      else if(data[i].eventLocation == "Southwest Rec"){
        lati = 29.637712;
        lngi = -82.368024;
      }
      else if(data[i].eventLocation == "Plaza of the Americas"){
        lati = 29.650533;
        lngi = -82.342684;
      }
      else if(data[i].eventLocation == "The Hub"){
        lati = 29.648077;
        lngi = -82.345496;
      }
      else if(data[i].eventLocation == "Turlington Plaza"){
        lati = 29.649085;
        lngi =-82.343699;
      }
      else if(data[i].eventLocation == "Marston Library"){
        lati = 29.647965;
        lngi = -82.344005;
      }
      else if(data[i].eventLocation == "Reitz Union"){
        lati = 29.645793;
        lngi = -82.347717;
      }
      else if(data[i].eventLocation == "Stadium"){
        lati = 29.649889;
        lngi = -82.348182;
      }
      else if(data[i].eventLocation == "O'Connell Center"){
        lati = 29.649429;
        lngi = -82.351092;
      }
      else if(data[i].eventLocation == "French Fries"){
        lati = 29.647892;
        lngi = -82.344198;
      }
      else{
        lati = 29.645793;
        lngi = -82.347717;
        console.log(data[i].eventLocation + " not found");
      }
      if(data[i].eventType == "Study Group"){
        image = study;
        //image = image;
      }
      else if(data[i].eventType == "Food"){
        image = pizza;
        //image = image;

      }
      else if(data[i].eventType  == "Meeting"){
        image = group;
        //image = image;
      }
      else if(data[i].eventType  == "Danger") {
        image = danger;
        //image = image
        //console.log("Danger");
      }
      else{
        console.log("default icon used for " + i);
      }

      marker[ i ] = new google.maps.Marker({
        position: {lat: lati, lng: lngi},
        title : title,
        map: map,
        icon: image,
        details: details
      });

      // attach event to open info window
      google.maps.event.addListener(marker[ i ], 'click', onMarkerClick );
      // end loop
      
  }
}

function initMap(data) {
  //var eventName = ["TEST","","",""];
  //var eventLocation = ["Library West", "east", "Plaza of the Americas", "The Hub", "Turlington Plaza", "Marston Plaza", "Reitz Union", "NEB", "dung", "law"];
  //var eventType = ["Danger", "Food", "Study Group", "Meeting", "Danger", "Danger", "Meeting", "Food", "Food", "Study Group"];
  //var eventDetails = ["TEST1", "", "", ""];
  //var lati, lngi, title, details;
  var uluru = {lat: 29.643220, lng: -82.350427};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: uluru
  });
  // Marker Images
  var image2 = 'https://image.ibb.co/kRpLak/98131acc6d38e230b3b02342aef1ef1b.jpg';
  var image = 'https://image.ibb.co/nmGCo5/Spot3.png';
  var image3 = 'http://www.poolcleaningfl.com/wp-content/uploads/2014/11/map_icon.png';

  var centerMarker = new google.maps.Marker({
    position: {lat: 29.643894, lng: -82.354748},
    map: map,
    icon: image3
  });
  placeMarker(data, map);
}

/*
function checkform() {
  if(data[i].eventType == ""){
      alert('REQUIRED FIELD ERROR: Please select event type')
      return false;
    }
  else if(data[i].eventLocation == ""){
      alert('REQUIRED FIELD ERROR: Please select location')
      return false;
    }
  else if(data[i].eventName == ""){
      alert('REQUIRED FIELD ERROR: Please enter name')
      return false;
    }
  else if(data[i].eventDetails == ""){
      alert('REQUIRED FIELD ERROR: Please enter event details')
      return false;
    }
  return true;
}
*/


function mainController($scope, $http) {
  $scope.formData = {};

  $http.get('/api/events')
    .success(function(data) {
      $scope.events = data;
      initMap(data);
      for(i = 0; i < data.length; i++){
        console.log(data[i].eventLocation);
        //placeMarker(data[i]);
        //test(data);
      }
      //placeMarker(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // when submitting the add form, send the text to the node API
  $scope.createEvent = function() {
    $http.post('/api/events', $scope.formData)
      .success(function(data) {
        $scope.formData = {}; // clear the form so our user is ready to enter another
        $scope.events = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };



}
