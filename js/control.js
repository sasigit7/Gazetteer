//controls
L.control.scale().addTo(map);
map.zoomControl.setPosition('bottomright');


// Search bar on the map 
  let controlSearch = new L.Control.Search({
    position:'topright',    // Location of the search bar?
    layer: district_boundary,  // name of the layer
    initial: false,
		marker: false,
    textPlaceholder: 'Search...',
	propertyName : 'name'
});
  
    controlSearch.on('search:locationfound', function(e) {
      
	 district_boundary.eachLayer(function(layer) {
		
    if (layer.feature.properties.name == e.text) {
		highlight_boundary.clearLayers();
		highlight_boundary.addData(layer.feature);
        map.fitBounds(layer.getBounds());
		highlight_boundary.setStyle(highstyle);
		LoadCountryInfo(e.text	)
    }
})
  })
 
map.addControl(controlSearch); // add it to the map

// Loading Country's Information
function LoadCountryInfo(name){
	//var countryHtml = "<h3 class = 'm-2 text-primary text-center'>"+ name +"</h3>";
	
	
	
	$.ajax({
               type:"GET",
               dataType: "json",
               url:"https://restcountries.eu/rest/v2/name/"+name+"?fullText=true",
               success:function(data)
               {
				   console.log(data);
				var countryHtml = "<div class='card text-white bg-info m-3' style='max-width: 30vw'><div class='card-header'><h1>"+name+"</h1></div><div class='card-body'><p class='card-text'>";  
				  countryHtml += "<table class='table table-borderless text-white'>";  
                  countryHtml += "<tr><th>Capital</th><td>"+data[0].capital+"</td></tr>";  
                  countryHtml += "<tr><th>Population</th><td>"+data[0].population+"</td></tr>";  
                  countryHtml += "<tr><th>Flag</th><td><img src="+data[0].flag+" style='height:80px'></td></tr>";
				  countryHtml += "<tr><th>Currency</th><td>"+data[0].currencies[0].name+"</td></tr>";  
                  countryHtml += "</table></p></div></div>";  
				  $("#info_div").html(countryHtml);
                
               }
            });
	
	
}
 
 