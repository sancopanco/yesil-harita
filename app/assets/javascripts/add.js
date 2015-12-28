$(function() {
var marker = new google.maps.Marker({map: map});
var infowindow = new google.maps.InfoWindow();

//================================================================================================= POINT TYPE SELECTION

  $(".btn-group a").click(function() {
    $(".btn-group a").removeClass("active");
    $(this).addClass("active");
    var pointType = $(this).attr("data-point-type");
    $("#point_point_type").val(pointType);
    if (pointType == 0) {
      $(".form-group.collapse").hide("normal");
    }
    if (pointType == 1) {
      $(".form-group.collapse").show("normal");
      //$("#point_name").attr("placeholder", "");
    }
    if (pointType == 2) {
      $(".form-group.collapse").show("normal");
      
    }
    return false;
  });

//================================================================================================= DETECT LOCATION

  $("#detect").click(function() {
    infowindow.close();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        marker.setPosition(position);
        map.setZoom(17);
        map.setCenter(position);
        $("#point_lat").val(position.lat());
        $("#point_lng").val(position.lng());
        geocoder.geocode({"latLng": position}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              $("#point_address").val(results[0].formatted_address);
              infowindow.setContent(results[0].formatted_address);
              infowindow.open(map, marker);
            }
          } else {
            // geocode failed due to status
          }
        });
      }, function() {
        // geolocation failed
      });
    } else {
      // geolocation not available
    }
    return false;
  });

//================================================================================================= CLICK MAP

  google.maps.event.addListener(map, "click", function(event) {
    infowindow.close();
    position = event.latLng;
    marker.setPosition(position);
    $("#point_lat").val(position.lat());
    $("#point_lng").val(position.lng());
    geocoder.geocode({"latLng": position}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          $("#point_address").val(results[0].formatted_address);
          infowindow.setContent(results[0].formatted_address);
          infowindow.open(map, marker);
        }
      } else {
        // geocode failed due to status
      }
    });
  });

//================================================================================================= CHECK CHECKBOXES

  var checkBoxes = $("input[type='checkbox']");
  function checkedMaterials() {
    for (i = 0; i < checkBoxes.length; i++) {
      if (checkBoxes[i].checked) {
        return true;
      }
    }
    if ($("#point_other").val().trim() != "") {
      return true;
    }
    return false;
  }

//================================================================================================= SUBMIT FORM

  $("#new_point").submit(function() {
    if ($("#point_lat").val().trim() === "" || $("#point_lng").val().trim() === "") {
      $("#alert").html("lokasyon hatalı.");
      $("#alert").show();
      return false;
    }
    if (!checkedMaterials()) {
      $("#alert").html("<strong>Hımm!</strong> Meterail tipi belirlenmeli");
      $("#alert").show();
      return false;
    }
    var website = $("#point_website").val().trim();
    if (website != "" && website.indexOf("http") == -1) {
      $("#point_website").val("http://" + website);
    }
  });

});