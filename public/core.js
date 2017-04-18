var app = angular.module('NavSpot', []);

function placeMarker(data, map) {
  var lati, lngi, title, details;
  var image = 'https://image.ibb.co/nmGCo5/Spot3.png';
  var pizza = 'http://i.imgur.com/SM5t71i.png';
  var danger = 'http://i.imgur.com/APzYWBf.png';
  var study = 'http://i.imgur.com/Y4OXg9o.png';
  var group = 'http://i.imgur.com/ylIkOcp.png';
  var social = 'http://i.imgur.com/97NZuMp.png';

  var assignListener = function(markerObj, infoWindowObj) {
    return function() {
      infoWindowObj.open(map, markerObj);
    };
  };

  var infoWindow = new google.maps.InfoWindow;

  // Open info window
  var onMarkerClick = function() {
    var marker = this;
    infoWindow.setContent( marker.details );
    infoWindow.open(map, marker);
    mkmap.lastmarkeropened = marker;
  };

  // Close the info window
  google.maps.event.addListener(map, 'click', function() {
    infoWindow.close();
  });
  var marker = [] ;

  // Loop start
  for(i=0; i < data.length; i++) {
    console.log(data[i].eventLocation + " OF TYPE " + data[i].eventType);
    if (data[i].eventName != "") {
      title = data[i].eventName;
    }
    if (data[i].eventDetails != "") {
      details = '<div class="stylefive">' + data[i].eventName + ' </div>  <div class="stylefour"> <i>' + data[i].eventLocation + '</i> </div> <div class="stylefourhalf">' + data[i].eventDetails + '</div>';
    }
    if (data[i].eventLocation == "Library West") {
      lati = 29.651409;
      lngi = -82.342909;
    }
    else if (data[i].eventLocation == "Southwest Rec") {
      lati = 29.637712;
      lngi = -82.368024;
    }
    else if (data[i].eventLocation == "Plaza of the Americas") {
      lati = 29.650533;
      lngi = -82.342684;
    }
    else if (data[i].eventLocation == "The Hub") {
      lati = 29.648077;
      lngi = -82.345496;
    }
    else if (data[i].eventLocation == "Turlington Plaza") {
      lati = 29.649085;
      lngi =-82.343699;
    }
    else if (data[i].eventLocation == "Marston Library") {
      lati = 29.647965;
      lngi = -82.344005;
    }
    else if (data[i].eventLocation == "Reitz Union") {
      lati = 29.645793;
      lngi = -82.347717;
    }
    else if (data[i].eventLocation == "Stadium") {
      lati = 29.649889;
      lngi = -82.348182;
    }
    else if (data[i].eventLocation == "O'Connell Center") {
      lati = 29.649429;
      lngi = -82.351092;
    }
    else if (data[i].eventLocation == "French Fries") {
      lati = 29.647892;
      lngi = -82.344198;
    }
    else if (data[i].eventLocation == "Little Hall") {
      lati = 29.649082;
      lngi = -82.340717;
    }
    else if (data[i].eventLocation == "NEB") {
      lati = 29.642579;
      lngi = -82.347115;
    }
    else if (data[i].eventLocation == "Lake Alice") {
      lati = 29.641758;
      lngi = -82.358032;
    }
    else if (data[i].eventLocation == "Flavet Field") {
      lati = 29.646952;
      lngi = -82.354358;
    }
    else if (data[i].eventLocation == "Levin College of Law Building") {
      lati = 29.649528;
      lngi = -82.359052;
    }
    else if (data[i].eventLocation == "Heavener School of Business Building") {
      lati = 29.651820;
      lngi = -82.340002;
    }
    else if (data[i].eventLocation == "Larsen Hall") {
      lati = 29.643291;
      lngi = -82.347327;
    }
    else if (data[i].eventLocation == "Phillips Center") {
      lati = 29.635426;
      lngi = -82.369317;
    }
    else if (data[i].eventLocation == "College of Medicine Building") {
      lati = 29.635222;
      lngi = -82.369332;
    }

    else {
      lati = 29.645793;
      lngi = -82.347717;
      console.log(data[i].eventLocation + " not found");
    }
    if (data[i].eventType == "Study Group") {
      image = study;
    }
    else if (data[i].eventType == "Food") {
      image = pizza;
    }
    else if (data[i].eventType  == "Meeting") {
      image = group;
    }
    else if (data[i].eventType  == "Danger") {
      image = danger;
    }
    else if (data[i].eventType  == "Social") {
      image = social;
    }
    else {
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
  var uluru = {lat: 29.643220, lng: -82.350427};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: uluru
  });
  // Marker Images
  var image = 'https://image.ibb.co/nmGCo5/Spot3.png';
  var image3 = 'http://www.poolcleaningfl.com/wp-content/uploads/2014/11/map_icon.png';

  placeMarker(data, map);
}

function mainController($scope, $http) {
  $scope.formData = {};

  $http.get('/api/events')
    .success(function(data) {
      $scope.events = data;
      initMap(data);
      for(i = 0; i < data.length; i++) {
        console.log(data[i].eventLocation);
      }
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

  // if a field is left empty, sent alert, return false
  $scope.validateForm = function() {
    if (!$scope.formData.eventName) {
      alert("Please give your event a name!");
      return false;
    }
    else if (!$scope.formData.eventType) {
      alert("Please choose an event type!");
      return false;
    }
    else if (!$scope.formData.eventLocation) {
      alert("Please choose a location!");
      return false;
    }
    else if (!$scope.formData.eventDetails) {
      alert("Please include some details about your event!");
      return false;
    }
    return true;
  }
}
