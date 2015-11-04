(function(){
'use strict';

var apiUrl = 'http://api.wunderground.com/api/6943c5333a420e73/';

$(document).ready(init);

function init(){
  $('#location').click(clear);
  $('#search').click(search);

	var url = apiUrl + 'conditions/q/autoip.json';
  var forcastUrl = apiUrl + 'forecast/q/autoip.json';

  $.get(url)
  .done(function(data){
    cb(data);
  })
  .error(function(error){
    console.log(error);
  });

  $.get(forcastUrl)
  .done(function(data){
      forecastCb(data);
  })
  .error(function(error){
    console.log(error);
  })
}

function cb(data){
  console.log(data);
    var location = data.current_observation.display_location;
    var city = location.full;
    var zip = location.zip;
    var humidity = data.current_observation.relative_humidity;
    var temperature = data.current_observation.temperature_string;
    var obTime = data.current_observation.observation_time;
    var weather = data.current_observation.icon;
    var windDegree = data.current_observation.wind_degrees;
    var weatherIconUrl = "http://icons.wxug.com/i/c/k/nt_" + weather + ".gif";

    $('.location').text(city + ' ' + zip);
    $('input').val(zip);
    $('.obtime').text(obTime);

    var $img = $('<img>');
    $img.attr('src',weatherIconUrl);
    $('.img').empty();
    $('.img').append($img);

    $('.temperature').text(temperature);
    $('.humidity').text(humidity);
    $('.windDegree').text(windDegree);
}

function forecastCb(data){
      $('#day1Img, #day2Img, #day3Img').empty();
      var forecast = data.forecast.simpleforecast.forecastday;
      var day1 = forecast[1].date.pretty;
      var day1Icon = forecast[1].icon;
      var day1IconUrl = "http://icons.wxug.com/i/c/k/" + day1Icon + ".gif";
      var day1TempHigh = forecast[1].high.fahrenheit + ' F';
      var day1TempLow = forecast[1].low.fahrenheit + ' F';

      $('.day1').text(day1);
      $('.day1High').text(day1TempHigh);
      $('.day1Low').text(day1TempLow);

      var $img1 = $('<img>');
      $img1.addClass('day1Img');
      $img1.attr('src',day1IconUrl);
      $('#day1Img').append($img1);

      var day2 = forecast[2].date.pretty;
      var day2Icon = forecast[2].icon;
      var day2IconUrl = "http://icons.wxug.com/i/c/k/" + day2Icon + ".gif";
      var day2TempHigh = forecast[2].high.fahrenheit + ' F';
      var day2TempLow = forecast[2].low.fahrenheit + ' F';

      $('.day2').text(day2);
      $('.day2High').text(day2TempHigh);
      $('.day2Low').text(day2TempLow);

      var $img2 = $('<img>');
      $img2.addClass('day2Img');
      $img2.attr('src',day2IconUrl);
      $('#day2Img').append($img2);

      var day3 = forecast[3].date.pretty;
      var day3Icon = forecast[3].icon;
      var day3IconUrl = "http://icons.wxug.com/i/c/k/" + day3Icon + ".gif";
      var day3TempHigh = forecast[3].high.fahrenheit + ' F';
      var day3TempLow = forecast[3].low.fahrenheit + ' F';

      $('.day3').text(day3);
      $('.day3High').text(day3TempHigh);
      $('.day3Low').text(day3TempLow);

      var $img3 = $('<img>');
      $img3.addClass('day3Img');
      $img3.attr('src',day3IconUrl);
      $('#day3Img').append($img3);
}

function clear(){
  $('input').val('');
}

function search(){
  var zip = $('input').val();

  var apiUrl = 'http://api.wunderground.com/api/6943c5333a420e73/';
  var url = apiUrl + 'conditions/q/' + zip + '.json';
  var forcastUrl = apiUrl + 'forecast/q/' + zip + '.json';
  
  console.log(url);
  $.get(url)
  .done(function(data){
    cb(data);
  })
  .error(function(error){
    console.log(error);
  });

  $.get(forcastUrl)
    .done(function(data){
    forecastCb(data);
  })
  .error(function(error){
      console.log(error);
  })

}

})();










