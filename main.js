$(function() {
    "use strict";

    var map;

    loadData().then(function(data) {
        var positions = convertPositions(data);
        var latlongs = convertLatLong(positions);
        showMap(positions[0]);
        overlayImage("jayway_office_cropped.png",
                     {
            lat: 55.611990,
            long: 12.999412
        },
        {
            lat: 55.612176,
            long: 12.999782
        });
        addLines(latlongs);
        // addMarkers(positions);
    });

    function loadData() {
        return $.getJSON('test.json');
    }

    function convertPositions(list) {
        return list.map(convertPosition);
    }

    function convertPosition(obj) {
        var lat = obj.position.Latitude/1000000;
        var long = obj.position.Longitude/1000000;
        return {
            id: obj.id,
            latlong: new google.maps.LatLng(lat, long)
        };
    }

    function convertLatLong(list) {
        return list.map(function(pos) {
            return pos.latlong;
        });
    }


    function showMap(pos) {
        var mapOptions = {
            center: pos.latlong,
            zoom: 25,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    }

    function overlayImage(url, topLeft, bottomRight) {
        var delta = 0.0001;
        var imageBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(topLeft.lat, topLeft.long),
            new google.maps.LatLng(bottomRight.lat, bottomRight.long)
        );
        var image = new google.maps.GroundOverlay(url, imageBounds);
        image.setMap(map);
    }


    function addMarkers(positions) {
        positions.forEach(addMarker);
    }

    function addMarker(pos) {
        console.log(pos);
        var latlng = new google.maps.LatLng(pos.lat, pos.long);
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: pos.id
        });
    }

    function addLines(latlongs) {
        var path = new google.maps.Polyline({
            path: latlongs,
            icons: [{
                icon: {path: google.maps.SymbolPath.CIRCLE},
                offset: '0%'
            },
            {
                icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
                offset: '100%'
            }],
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        path.setMap(map);
    }


});
