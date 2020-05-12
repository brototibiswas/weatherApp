$(document).ready(function() {
    $('#weather').hide();
    $('#loading').show();

    if (window.location.hostname == 'brototibiswas.github.io'){
        $('#loading').text("Error: The api is blocked on Github Pages because it is not hosted over http :(");
    }

    var unit = 'f';
    var convert = $('.convert');


    if(unit == 'f') convert.text('c');
    else if (unit == 'c') convert.text('f');

    var units = {
        'c' : {
            'temp' : 'C',
            'wind' : 'Kmph',
            'vis'  : 'KM'
        },
        'f' : {
            'temp' : 'F',
            'wind' : 'Mph',
            'vis'  : 'M'
        }
    }

    var bg = {
        'sunny' : {
            'card' : 'https://marketplace.canva.com/EADaolBd2RI/1/0/1600w/canva-orange-gradient-background-o2hhkFDVvtk.jpg',
            'page' : 'https://critter-sitters.com/wp-content/uploads/2018/07/pexels-photo-301599.jpeg'
        },
        'cloudy' : {
            'card' : 'https://digitalsynopsis.com/wp-content/uploads/2017/02/beautiful-color-gradients-backgrounds-075-clean-mirror.png',
            'page' : 'https://i.pinimg.com/originals/cb/6d/2c/cb6d2c974f71580b964c1f931e8b2aa3.jpg'
        },
        'night' : {
            'card' : 'https://sportsturf.net/wp-content/uploads/2016/06/Blue-Gradient-Background-Wallpaper.jpg',
            'page' : 'https://i.pinimg.com/originals/96/bb/de/96bbdef0373c7e8e7899c01ae11aee91.jpg'
        },
        'clear' : {

        }
    }

    if(navigator.geolocation) {
        var currentPosition = '';

        navigator.geolocation.getCurrentPosition(function(position) {
            currentPosition = position;
            var latitude = currentPosition.coords.latitude;
            var longitude = currentPosition.coords.longitude;

            grabWeatherData(latitude, longitude);

            $('.convert').on('click', function(e) {
                console.log(e);
                var u = e.target.innerHTML;
    
                if(u == 'f') {
                    unit = 'f';
                    e.target.innerHTML = 'c';
                    grabWeatherData(latitude, longitude);
                }
                else if(u == 'c') {
                    unit = 'c';
                    e.target.innerHTML = 'f';
                    grabWeatherData(latitude, longitude);
                }
            });
        });
    }


    /**
     * Gets weather data of location using current latitude and longitude
     * @param {1} latitude float
     * @param {1} longitude float
     */
    function grabWeatherData(latitude, longitude) {
        var api = 'https://api.weatherapi.com/v1/current.json?key=aee66bc4bb8b43bb887230554201205';

        $.ajax({
            type: "GET",
            dataType: "json",
            url: api + '&q=' + latitude + ',' + longitude,
            success: function(data) {
                console.log(data);
                $('#loading').hide();
                $('#weather').show();
                setWeatherUI(data);
            }
        });

    }


    /**
     * Sets weather UI on html to data provided by api
     * @param {1} data JSON data provided by api
     */
    function setWeatherUI(data) {
        var daytime = data.current.is_day;
        var today = new Date();
        var day = getWeekday(today.getDay());
        var currentTime = data.location.localtime.substring(11);
        var condition = data.current.condition.text
        // var condition = 'cloudy'

        $('.location').text(`${data.location.name} , ${data.location.region} `);
        $('.time').text(currentTime);
        $('.day').text(day);
        $('.condition').text(condition);
        $('.humidityNum').text(data.current.humidity);
        $('.tempUnit').text(units[unit].temp);
        $('.tempUnitSm').text(units[unit].temp);
        $('.windUnit').text(units[unit].wind);
        $('.visUnit').text(units[unit].vis);

        if(unit == 'f') {
            $('.temperature').text(data.current.temp_f);
            $('.feelTemp').text(data.current.feelslike_c);
            $('.windNum').text(data.current.wind_mph);
            $('.visNum').text(data.current.vis_km);
        }
        else if(unit == 'c') {
            $('.temperature').text(data.current.temp_c);
            $('.feelTemp').text(data.current.feelslike_c);
            $('.windNum').text(data.current.wind_kph);
            $('.visNum').text(data.current.vis_miles);
        }

        getBackground(condition.toLowerCase(), daytime);
    }


    /**
    * Grabs card and page background based on weather condition
    * @param {1} condition String
    * @param {2} daytime Number
    */
    function getBackground(condition, daytime) {
        console.log(condition)
        if(daytime == '1') {
            if(condition == 'sunny' || condition == 'partly cloudy' || condition == 'overcast') {
                setBackground(bg.sunny.card, bg.sunny.page)
            }
            else if (condition == 'mist' || condition == 'cloudy' || condition == 'fog' || condition == 'freezing fog') {
                setBackground(bg.cloudy.card, bg.cloudy.page)
            }
        }
        else if (daytime == '0') {
            if(condition == 'clear' || condition == 'partly cloudy' || condition == 'overcast') {
                setBackground(bg.night.card, bg.night.page)
            }
            else if (condition == 'mist' || condition == 'cloudy' || condition == 'fog' || condition == 'freezing fog') {
                setBackground(bg.cloudy.card, bg.night.page)
            }
        }
        
    }


    /**
    * Set the weather card and background image to image url
    * @param {1} cardBg String 
    * @param {2} pageBg String
    */
    function setBackground(cardBg, pageBg) {
        $('.card-bg').css('background-image', `url(${cardBg})`);
        $('.page-bg').css('background-image', `url(${pageBg})`);

    }


    function getWeekday(num) {
        console.log(num);

        switch(num) {
            case 0 : 
                return 'Sunday';
                break;
            case 1 : 
                return 'Monday';
                break;
            case 2 : 
                return 'Tuesday';
                break;
            case 3 : 
                return 'Wednesday';
                break;
            case 4 : 
                return 'Thursday';
                break;
            case 5 : 
                return 'Friday';
                break;
            case 6 : 
                return 'Saturday';
                break;
        }
    }
    
});