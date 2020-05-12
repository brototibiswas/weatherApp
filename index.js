$(document).ready(function() {
    $('#weather').hide();

    if(navigator.geolocation) {
        var currentPosition = '';

        navigator.geolocation.getCurrentPosition(function(position) {
            currentPosition = position;
            var latitude = currentPosition.coords.latitude;
            var longitude = currentPosition.coords.longitude;
            console.log(currentPosition);

            grabWeatherData(latitude, longitude);
        });
    }

    function grabWeatherData(latitude, longitude) {
        var api = 'http://api.weatherstack.com/current?access_key=8d3baa7becfab1a05751bfbe036909cd';

        $.ajax({
            type: "GET",
            headers: {'Access-Control-Allow-Origin':'*'},
            dataType: "jsonp",
            url: api + '&query=' + latitude + ',' + longitude,
            success: function(data) {
                console.log(data);
                setWeatherUI(data);
            }
        });
    }
    
});