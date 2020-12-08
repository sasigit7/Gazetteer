//Adding map
const map = L.map("map", { attributionControl: false }).setView([0, 0], 1.5);

// Adding base layer
const layer = new L.StamenTileLayer("toner");
map.addLayer(layer);

// Pre-defined Countries List Table
let countries_tab = `
        <table class='table table-hover' style='font-family:arial, helvetica;'>
        <thead>
        <tr><th scope='col' class='text-info' style='font-size: 20px'>Select Any Country</th></tr>
        </thead>
        <tbody>`;

//
const district_boundary = new L.geoJson();
district_boundary.addTo(map);

//
$.ajax({
  dataType: "json",
  url: "data/countryBorders.geo.json",
  success: function (data) {
    $(data.features).each(function (key, data) {
      district_boundary.addData(data);
      countries_tab +=
        "<tr><td onClick=zoomTo(this)>" + data.properties.name + "</td></tr>";
    });

    countries_tab += "</tbody></table>";
    $("#country_div").html(countries_tab);
    district_boundary.setStyle(polystyle);
  },
}).error(function () {});

function polystyle(feature) {
  return {
    fillColor: "green",
    weight: 0.1,
    opacity: 0.1,
    color: "white", //Outline color
    fillOpacity: 0.7,
  };
}

//
const highlight_boundary = new L.geoJson();
highlight_boundary.addTo(map);

function highstyle(feature) {
  return {
    fillColor: "brown",
    weight: 0.1,
    opacity: 0.1,
    color: "white", //Outline color
    fillOpacity: 0.7,
  };
}
function zoomTo(e) {
  country = $(e).html();
  district_boundary.eachLayer(function (layer) {
    if (layer.feature.properties.name == country) {
      highlight_boundary.clearLayers();
      highlight_boundary.addData(layer.feature);
      map.fitBounds(layer.getBounds());
      highlight_boundary.setStyle(highstyle);
      LoadCountryInfo(country);
    }
  });
}
