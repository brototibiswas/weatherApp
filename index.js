$(document).ready(function() {
    $('#weather').hide();
    var unit = 'f';
    var convert = $('.convert');


    if(unit == 'f') convert.text('c');
    else if (unit == 'm') convert.text('f');

    var units = {
        'm' : {
            'temp' : 'C',
            'wind' : 'kmph'
        },
        'f' : {
            'temp' : 'F',
            'wind' : 'Mph'
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

            grabWeatherData(latitude, longitude, unit);
        });
    }


    /**
     * Gets weather data of location using current latitude and longitude
     * @param {1} latitude float
     * @param {1} longitude float
     */
    function grabWeatherData(latitude, longitude) {
        var api = 'http://api.weatherstack.com/current?access_key=8d3baa7becfab1a05751bfbe036909cd';

        $.ajax({
            type: "GET",
            headers: {'Access-Control-Allow-Origin':'*'},
            dataType: "jsonp",
            url: api + '&query=' + latitude + ',' + longitude + '&units=' + unit,
            success: function(data) {
                console.log(data);
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
        // var daytime = 'no';
        var today = new Date();
        var day = getWeekday(today.getDay());
        var currentTime = data.location.localtime.substring(11);
        var condition = data.current.weather_descriptions[0]
        // var condition = 'cloudy'

        $('.location').text(`${data.location.name} , ${data.location.region} `);
        $('.time').text(currentTime);
        $('.day').text(day);
        $('.temperature').text(data.current.temperature);
        $('.tempUnit').text(units[unit].temp);
        $('.tempUnitSm').text(units[unit].temp);
        $('.feelTemp').text(data.current.feelslike);
        $('.condition').text(condition);
        $('.windNum').text(data.current.wind_speed);
        $('.windUnit').text(units[unit].wind);
        $('.humidityNum').text(data.current.humidity);
        $('.uvIdx').text(data.current.uv_index);
        $('.weather_icon').attr('src', data.current.weather_icons[0]);

        getBackground(condition.toLowerCase(), daytime);
    }


    /**
    * Grabs card and page background based on weather condition
    * @param {1} condition String
    * @param {2} daytime Boolean
    */
    function getBackground(condition, daytime) {
        console.log(condition, daytime)

        if(daytime == 'yes') {
            if(condition == 'sunny' || condition == 'partly cloudy' || condition == 'overcast') {
                console.log('day sunny')
                setBackground(bg.sunny.card, bg.sunny.page)
            }
            else if (condition == 'mist' || condition == 'cloudy' || condition == 'fog' || condition == 'freezing fog') {
                console.log('day cloudy')
                setBackground(bg.cloudy.card, bg.cloudy.page)
            }
        }
        else if (daytime == 'no') {
            if(condition == 'clear' || condition == 'partly cloudy' || condition == 'overcast') {
                console.log('night clear')
                setBackground(bg.night.card, bg.night.page)
            }
            else if (condition == 'mist' || condition == 'cloudy' || condition == 'fog' || condition == 'freezing fog') {
                console.log('night cloudy')
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