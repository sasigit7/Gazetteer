
//adding map and base layer
const map = L.map('map',{attributionControl: false}).setView([0,0], 1.4);

const layer = new L.StamenTileLayer("toner");
map.addLayer(layer);

let countries_tab = "<table class='table table-hover mt-2' style='font-family:Comic Sans,arial,helvetica;'> <thead><tr><th scope='col' class='text-warning'>Select A Country</th></tr></thead><tbody>";
const district_boundary = new L.geoJson();
district_boundary.addTo(map);

$.ajax({
dataType: "json",
url: "data/countryBorders.geo.json",
success: function(data) {
    $(data.features).each(function(key, data) {
        district_boundary.addData(data);
		
		countries_tab += "<tr><td>"+ data.properties.name +"</td></tr>"
    });
	
	  countries_tab += "</tbody></table>";
	  $('#country_div').html(countries_tab);
	  district_boundary.setStyle(polystyle);
}
}).error(function() {});

function polystyle(feature) {
    return {
        fillColor: 'green',
        weight: 0.1,
        opacity: 0.1,
        color: 'white',  //Outline color
        fillOpacity: 0.1
    };
}




