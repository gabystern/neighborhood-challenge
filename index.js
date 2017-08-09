$(document).ready(function() {
  listBoroughs()
  listMacros()
  listNeighborhoods()
  clickNeighborhood()
  listOnlyBoroughs()
})

function listBoroughs(){
  $.ajax({
      url: "locationsResponse.json",
      success: function(response) {
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
        if (weightedArray.length > 1){
          for (var j=0; j<weightedArray.length; j++){
            macroClass = weightedArray[j].macro.name.split(' ').join('')
            macroList += `<li class=${macroClass}>`+weightedArray[j].macro.name+"</li>"
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
              let borough = response.data[i].borough.name.split(' ').join('')+"Nbhood"
              neighbList += `<li class=${borough}>`+response.data[i].mappings[j].neighborhoods[k].name+"</li>"
            }
          }
          let macroClass = response.data[i].mappings[j].macro.name.split(' ').join('')
          $( `.${macroClass}` ).append(`<ul>${neighbList}</ul>`)
        }
      }
    }
  })
}

function clickNeighborhood(){
  $(document).on('click', '.ManhattanNbhood', function () {
    $('.HManhattan').toggleClass( "highlight" );
  })
  $(document).on('click', '.BrooklynNbhood', function () {
    $('.HBrooklyn').toggleClass( "highlight" );
  })
  $(document).on('click', '.QueensNbhood', function () {
    $('.HQueens').toggleClass( "highlight" );
  })
  $(document).on('click', '.BronxNbhood', function () {
    $('.HBronx').toggleClass( "highlight" );
  })
  $(document).on('click', '.StatenIslandNbhood', function () {
    $('.HStatenIsland').toggleClass( "highlight" );
  })
}

function listOnlyBoroughs(){
  $.ajax({
    url: "locationsResponse.json",
    success: function(response){
      let list="";
      let weightedArray = response.data.sort(function(a, b) {
          return a.weight - b.weight;
      });
      for (var i=0; i<weightedArray.length; i++){
        let boroughClass = "H"+weightedArray[i].borough.name.split(' ').join('')
        list += `<div class=${boroughClass}>`+weightedArray[i].borough.name+"</div>"
      }
      document.getElementById("highlightBoroughs").innerHTML += list
    }
  })
}
