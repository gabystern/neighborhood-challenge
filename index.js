$(document).ready(function() {
  listBoroughs()
  listMacros()
  listNeighborhoods()
})

function listBoroughs(){
  $.ajax({
      url: "locationsResponse.json",
      success: function(response) {
        console.log(response.data)
        let list="";
        let weightedArray = response.data.sort(function(a, b) {
            return a.weight - b.weight;
        });
        for (var i=0; i<weightedArray.length; i++){
          let boroughClass = weightedArray[i].borough.name.split(' ').join('')
          list += `<li class=${boroughClass}>`+weightedArray[i].borough.name+"</li>"
        }
        document.getElementById("borough").innerHTML += list
  }})
}

function listMacros(){
  $.ajax({
    url: "locationsResponse.json",
    success: function(response){
      for (var i=0; i<response.data.length; i++){
        let macroList = ""
        let macroClass = ""
        let boroughClass = response.data[i].borough.name.split(' ').join('');
        let weightedArray = response.data[i].mappings.sort(function(a, b) {
            return a.weight - b.weight;
        });
      
        console.log(weightedArray)
        for (var j=0; j<response.data[i].mappings.length; j++){
          if (response.data[i].mappings.length > 1){
            macroClass = response.data[i].mappings[j].macro.name.split(' ').join('')
            macroList += `<li class=${macroClass}>`+response.data[i].mappings[j].macro.name+"</li>"
          }
        }
        $( `.${boroughClass}` ).append(`<ul>${macroList}</ul>`)
      }
    }
  })
}

function listNeighborhoods(){
  $.ajax({
    url: "locationsResponse.json",
    success: function(response) {
      for (var i=0; i<response.data.length; i++){
        let neighbList = ""
        for (var j=0; j<response.data[i].mappings.length; j++){
          for (var k=0; k<response.data[i].mappings[j].neighborhoods.length; k++){
            if (response.data[i].mappings[j].neighborhoods[k].name !== response.data[i].borough.name){
              neighbList += "<li>"+response.data[i].mappings[j].neighborhoods[k].name+"</li>"
            }
          }
          let macroClass = response.data[i].mappings[j].macro.name.split(' ').join('')
          $( `.${macroClass}` ).append(`<ul>${neighbList}</ul>`)
        }
      // document.getElementsByClassName(response.data[i].borough.name)[0].append("<ul>"+neighbList+"</ul>")
      }
    }
  })
}
