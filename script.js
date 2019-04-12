// This isn't necessary but it keeps the editor from thinking L and carto are typos
/* global L, carto */

var map = L.map('map', {
  center: [52.50, 13.50],
  zoom: 10
});

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

// Initialize Carto
var client = new carto.Client({
  apiKey: 'default_public',
  username: 'surgab'
});

// Initialze source data
var listings = new carto.source.SQL('SELECT * FROM listings_berlin');
var districts = new carto.source.SQL('SELECT * FROM berliner_ortsteile');

// Create style for the data
var style = new carto.style.CartoCSS(`
  #layer {
  marker-width: ramp([price], range(30, 5), quantiles(5));
  marker-fill: #ee4d5a;
  marker-fill-opacity: 0.9;
  marker-file: url('https://s3.amazonaws.com/com.cartodb.users-assets.production/maki-icons/heart-18.svg');
  marker-allow-overlap: true;
  marker-line-width: 1;
  marker-line-color: #FFFFFF;
  marker-line-opacity: 1;
  }
`);
var style2 = new carto.style.CartoCSS(`
  #layer {
  polygon-fill: #6dbaba;
  polygon-opacity: 0.47;
  }
  #layer::outline {
  line-width: 1;
  line-color: #FFFFFF;
  line-opacity: 0.5;
  }
`);

// Add style to the data
var districtlayer = new carto.layer.Layer(districts, style2);
var listingslayer = new carto.layer.Layer(listings, style);

// Add the data to the map as a layer
client.addLayer(districtlayer);
client.addLayer(listingslayer);
client.getLeafletLayer().addTo(map);

// Step 1: Find the button by its class. If you are using a different class, change this.
var mitteButton = document.querySelector('.mitte-button');

// Step 2: Add an event listener to the button. We will run some code whenever the button is clicked.
mitteButton.addEventListener('click', function (e) {
  listings.setQuery("SELECT * FROM listings_berlin WHERE neighbourhood_group = 'Mitte'");
  
  // Sometimes it helps to log messages, here we log to let us know the button was clicked. You can see this if you open developer tools and look at the console.
  console.log('Mitte was clicked');
});

// Step 1: Find the button by its class. If you are using a different class, change this.
var neukoellnButton = document.querySelector('.neukoelln-button');

// Step 2: Add an event listener to the button. We will run some code whenever the button is clicked.
mitteButton.addEventListener('click', function (e) {
  listings.setQuery("SELECT * FROM listings_berlin WHERE neighbourhood_group = 'Neukoelln'");
  
  // Sometimes it helps to log messages, here we log to let us know the button was clicked. You can see this if you open developer tools and look at the console.
  console.log('Neukoelln was clicked');
});