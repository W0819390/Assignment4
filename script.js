/*
    Assignment #4
    {Sam Sondhi}
*/

$(function () {
    document.addEventListener('DOMContentLoaded', function () {
        if ('geolocation' in navigator) {
          // Geolocation is available, proceed with the code
        } else {
          // Geolocation is not available, display an error message
          document.getElementById('locationhere').textContent = 'Geolocation is not available. Please allow geolocation to use this application.';
          return; // Stop further execution
        }
      });      

      navigator.geolocation.getCurrentPosition(function (position) {
        // Get latitude and longitude
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
      
        // Display the current location
        document.getElementById('locationhere').textContent = `Current Location: Latitude ${latitude}, Longitude ${longitude}`;
      });

      const storedLocation = localStorage.getItem('location');

      if (storedLocation) {
        // Create a new tag and display the stored location
        const storedLocationElement = document.createElement('p');
        storedLocationElement.textContent = `Stored Location: ${storedLocation}`;
        document.getElementById('content').appendChild(storedLocationElement);
      
        // Display a welcome back message
        const welcomeBackMessage = document.createElement('h2');
        welcomeBackMessage.textContent = 'Welcome back to the page!';
        document.getElementById('content').appendChild(welcomeBackMessage);
      
        // Calculate and display the distance traveled
        const distance = calculateDistance(storedLocation, latitude, longitude);
        const distanceElement = document.createElement('p');
        distanceElement.textContent = `You traveled ${distance} km since your last visit to this page.`;
        document.getElementById('content').appendChild(distanceElement);
      }
 
      else {
        // Display a welcome message for first-time visitors
        const welcomeMessage = document.createElement('h2');
        welcomeMessage.textContent = 'Welcome to the page for the first time!';
        document.getElementById('content').appendChild(welcomeMessage);
      }

      // Store the current location in local storage
      const currentLocation = `Latitude ${latitude}, Longitude ${longitude}`;
      localStorage.setItem('location', currentLocation);

    // DO NOT EDIT ANY CODE IN THIS FUNCTION DEFINTION
    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript
    function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
        var toRadians = function (num) {
            return num * Math.PI / 180;
        }
        var R = 6371000; // radius of Earth in metres
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2 - lat1);
        var Δλ = toRadians(lon2 - lon1);

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (R * c);
    }
});


