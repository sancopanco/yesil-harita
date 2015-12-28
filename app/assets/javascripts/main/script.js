//================================================================================================= MAIN INIT

function init() {
  map = null;
  mapOptions = {
    zoom: 9,
    center: new google.maps.LatLng(41.015137, 28.979530),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControlOptions: {
      style: null
    },
    mapTypeControlOptions: {
      style: null
    },
    scrollwheel: true
  };
  markers = [];
  geocoder = new google.maps.Geocoder();
  infowindow = new google.maps.InfoWindow();
  $(document).on('click', '#report', function() {
    var button = $(this);
    button.html('...');
    $.post('/report.json', { point_id: button.attr('data-point-id') }, function(data) {
      if (data.status == 'success') {
        button.html('Hata bildirildi');
        button.addClass('disabled');
      } else {
        button.html('Bir hata oluştu.');
        button.addClass('disabled');
      }
    });
  });
}

//================================================================================================= ZOOM ON

function zoomOn(location) {
  geocoder.geocode({"address": location + ", Istanbul"}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      map.setZoom(13);
    } else {
      // geocode failed due to status
    }
  });
}

//================================================================================================= INIT SEARCH

function initSearch(local) {
  var hash = document.location.hash.replace("#", "").trim();
  if (hash != "" && hash != "_=_" && document.getElementById("map-canvas")) {
    zoomOn(decodeURIComponent(document.location.hash));
  }
  $("#search").submit(function(event) {
    var city = $("#city").val().trim();
    if (!city) {
      return false;
    }
    local = local || false;
    if (local) {
      zoomOn(city);
      document.location.hash = encodeURIComponent(city);
    } else {
      window.location = map_path + "#" + encodeURIComponent(city);
    }
    return false;
  });
}

//================================================================================================= INIT MAP

function initMap() {
  if (!document.getElementById("map-canvas")) {
    return false;
  }
  if ($(window).width() <= 767) {
    mapOptions.zoomControlOptions.style = google.maps.ZoomControlStyle.SMALL;
    mapOptions.mapTypeControlOptions.style = google.maps.MapTypeControlStyle.DROPDOWN_MENU;
    mapOptions.scrollwheel = false;
  }
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}

//================================================================================================= ADD PINS

function addPins(data) {
  google.maps.event.addListener(map, "click", function() {
    infowindow.close();
  });
  var pins = ["pin-recycle-bin.png", "pin-recycling-center.png"];
  var titles = ["Geridönüşüm", "Toplama noktası"];
  Handlebars.registerHelper("ifequal", function(op1, op2, options) {
    if (op1 === op2) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });
  var template = Handlebars.compile($("#template").html());
  for (var i = 0; i < data.length; i++) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(data[i]["lat"], data[i]["lng"]),
      icon: "/assets/" + pins[data[i]["point_type"]],
      title: titles[data[i]["type"]],
      index: i,
      map: map
    });
    google.maps.event.addListener(marker, "click", function() {
      var marker = this;
      infowindow.setContent(template(data[marker.index]));
      infowindow.open(map, marker);
      var graphUrl = "https://graph.facebook.com/" + data[marker.index]["user_uid"] + "/picture";
      $.get(graphUrl, function(data) {
        var userGraphUrl = 
        $("#infowindow .img-avatar").attr("src", graphUrl);
        $("#infowindow .img-avatar").attr("title", "Ekleyen " + data["name"]);
      });
    });
    markers.push(marker);
  }
  var markerCluster = new MarkerClusterer(map, markers, {
    gridSize: 30,
    maxZoom: 11,
    styles: [
      {
        url: "/assets/tree.png",
        width: 32,
        height: 32,
        anchor: [7, null],
        textColor: "#570a36",
        textSize: 10
      }
    ]
  });
}

//================================================================================================= END