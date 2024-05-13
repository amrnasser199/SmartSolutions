
// Dynamic Map Impelementation
var Lastmarker;
var initLocation;
var infowindowContent;
var infowindow;
var isNewData = true;
var setFunctionName;
var currentPinName;
var map;

function initData(functionName, isNew, name, address, location) {
    setFunctionName = functionName;
    isNewData = isNew;
    currentPinName = name;
    infowindowContent = document.getElementById("infowindow-content");
    infowindow = new google.maps.InfoWindow();
    infowindow.setContent(infowindowContent);


    if (isNew) {
        initLocation = new google.maps.LatLng(29.991597911198227, 31.153149731281022);
    }
    else {
        initLocation = new google.maps.LatLng(location.lat, location.lng);
        setLocationContentHeader(name, address);
    }

}
function setLocationContentHeader(name, address) {
    infowindowContent.children["place-name"].textContent = name;
    infowindowContent.children["place-address"].textContent = address;
}

function initMap() {
    if (typeof setFunctionName === 'undefined')
        return;
    map = new google.maps.Map(document.getElementById("map"),
        {
            center: initLocation,
        });
    if (isNewData) {
        map.setZoom(8);
    }
    else {
        map.setZoom(13);
    }
    // For input
    const input = document.getElementById("pac-input");
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo("bounds", map);
    // Specify just the place data fields that you need.
    autocomplete.setFields(["place_id", "geometry", "name", "formatted_address"]);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // end of input
    const geocoder = new google.maps.Geocoder();
    if (isNewData) {
        Lastmarker = new google.maps.Marker({ map: map });
        Lastmarker.setVisible(false);
    }
    else {
        Lastmarker = new google.maps.Marker({ map: map, position: initLocation });
        infowindow.open(map, Lastmarker);
    }
    Lastmarker.addListener("click", () => {
        infowindow.open(map, Lastmarker);
    });
    autocomplete.addListener("place_changed", () => {
        infowindow.close();
        const place = autocomplete.getPlace();

        if (!place.place_id) {
            return;
        }
        geocoder
            .geocode({ placeId: place.place_id })
            .then(({ results }) => {
                map.setZoom(13);
                map.setCenter(results[0].geometry.location);
                // Set the position of the marker using the place ID and location.
                Lastmarker.setPlace({
                    placeId: place.place_id,
                    location: results[0].geometry.location,
                });
                Lastmarker.setVisible(true);

                if (isNewData) {
                    infowindowContent.children["place-name"].textContent = place.name;
                }
                else {
                    infowindowContent.children["place-name"].textContent = currentPinName;
                }

                infowindowContent.children["place-address"].textContent =
                    results[0].formatted_address;

                addMarker(results[0].geometry.location, map);

            })
            .catch((e) => window.alert("Geocoder failed due to: " + e));
    });
}


function addMarker(location, map) {
    Lastmarker.setVisible(true);
    infowindow.close();
    Lastmarker.setPosition(location);
    DotNet.invokeMethodAsync('AssetManagementPure.Web',
        setFunctionName,
        location.lat() + "&" + location.lng(),
        infowindowContent.children["place-address"].textContent);

    infowindow.open(map, Lastmarker);
}


function setDynamicLocationEmpty() {
    infowindow.close();
    map.setZoom(8);
    Lastmarker.setVisible(false);
}
// Static Map Impelementation
var staticMap;
var staticMarker;
var staticInfoContent;
var staticInfoWindow;

function initStaticMap(mapID) {
    const staticInitLocation = new google.maps.LatLng(29.991597911198227, 31.153149731281022);
    staticMap = new google.maps.Map(document.getElementById(mapID),
        {
            center: staticInitLocation,
            zoom: 8,
            gestureHandling: "cooperative",
        });
    staticMarker = new google.maps.Marker({
        map: staticMap,
        position: staticInitLocation,
        animation: google.maps.Animation.DROP,
    });
    staticMarker.setVisible(false);
    staticInfoContent = document.getElementById(mapID + "-content");
    staticInfoWindow = new google.maps.InfoWindow();
    staticInfoWindow.setContent(staticInfoContent);
    staticMarker.addListener("click", () => {
        staticInfoWindow.open(staticMap, staticMarker);
    });
}
function setStaticLocation(location, header, fullAddress) {
    var newPosition = new google.maps.LatLng(location.lat, location.lng);
    staticMap.setCenter(newPosition);
    staticMap.setZoom(16);
    staticInfoContent.children["marker-name"].textContent = header;
    staticInfoContent.children["marker-address"].textContent = fullAddress;
    staticInfoWindow.close();
    staticMarker.setPosition(newPosition);
    staticMarker.setVisible(true);
    staticInfoWindow.open(staticMap, staticMarker);
}
function setStaticLocationEmpty() {
    staticInfoWindow.close();
    staticMap.setZoom(8);
    staticMarker.setVisible(false);
}


// Static Map with multi Markers Impelementation
function initStaticMapMultiMarkers(mapID, markersList, isRTL, iconURL) {
    const staticInitLocation = new google.maps.LatLng(24.7135517, 46.6752957);
    let staticMapMulti = new google.maps.Map(document.getElementById(mapID),
        {
            center: staticInitLocation,
            zoom: 4,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            gestureHandling: "cooperative",
        });
    // adding markers to map 
    for (let i = 0; i < markersList.length; i++) {

        let pinLocation = new google.maps.LatLng(markersList[i].latitude, markersList[i].longitude);
        if (iconURL) {
            addMarkerToMultiMap(staticMapMulti, pinLocation, iconURL, isRTL, markersList[i].name, markersList[i].fullAddress);
        }
        else {
            addMarkerToMultiMap(staticMapMulti, pinLocation, isRTL, markersList[i].name, markersList[i].fullAddress);
        }
    }
}

function addMarkerToMultiMap(map, location,isRTL, name, address) {
    var marker = new google.maps.Marker({
        map: map,
        position: location,
        animation: google.maps.Animation.DROP,
    });

    var contentString;
    if (isRTL) {
         contentString = "<div style=\"color:black;padding:0 3px;font-family:arabicFont\">"
            + "<span class=\"title\">" + name + "</span>"
            + "<br />"
            + "<span>" + address + "</span>"
            + "</div >";
    }
    else {
         contentString = "<div style=\"color:black;padding:0 3px;font-family:englishFont\">"
            + "<span class=\"title\">" + name + "</span>"
            + "<br />"
            + "<span>" + address + "</span>"
            + "</div >";
    }
    const infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(contentString);
        infowindow.open(this.map, this);
    });
}
function addMarkerToMultiMapWithIcon(map, location, iconURL, isRTL, name, address) {
    var marker = new google.maps.Marker({
        map: map,
        position: location,
        animation: google.maps.Animation.DROP,
        icon: iconURL
    });

    var contentString;
    if (isRTL) {
        contentString = "<div style=\"color:black;padding:0 3px;font-family:arabicFont\">"
            + "<span class=\"title\">" + name + "</span>"
            + "<br />"
            + "<span>" + address + "</span>"
            + "</div >";
    }
    else {
        contentString = "<div style=\"color:black;padding:0 3px;font-family:englishFont\">"
            + "<span class=\"title\">" + name + "</span>"
            + "<br />"
            + "<span>" + address + "</span>"
            + "</div >";
    }

    const infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(contentString);
        infowindow.open(this.map, this);
    });
}

