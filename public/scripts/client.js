console.log( 'hi from js' );
$(document).ready(function(){
  console.log( 'hi from jquery' );

//on click event for show animals
  $('#showAnimals').on( 'click', function( ){
  console.log( 'showAnimals button clicked' );
  $('.outputDiv').empty();
$.ajax({
  type: 'GET',
  url: '/animals',
  success: function( outputData ){
    console.log( 'from inside success ajax outputData: ' + outputData );
    for (var i = 0; i < outputData.length; i++) {
      var listOfAnimals = "<p>" + 'Type: ' + outputData[i].type + '<br>' + 'Quantity: ' + outputData[i].quantity + "</p>";
      $('.outputDiv').append( listOfAnimals );
    } //end for loop
  } //end success
}); //end ajax call
}); //end showAnimals click function

var displayAnimals = function(){
   $.ajax({
     type: 'GET',
     url: '/animals',
     success: function( outputData ){
       console.log( 'from inside success ajax outputData: ' + outputData );
       for (var i = 0; i < outputData.length; i++) {
         var listOfAnimals = "<p>" + 'Type: ' + outputData[i].type + ' ' + 'Quantity: ' + outputData[i].quantity + "</p>";
        //  $('.outputDiv').empty();
        $('.outputDiv').append( listOfAnimals );
       } //end for loop
     } //end success
   }); //end ajax call
 };

var randomNumberMaker = function( min, max ){
  return( Math.random() * (1 + max-min) + min).toFixed(0);
};


$('#addAnimalButton').on('click', function(){
  console.log( 'addAnimalButton clicked' );
  var newAnimalType = $( '#animalEntered' ).val();
 console.log( 'newAnimalType is ' + newAnimalType );
  // var newAnimalQuantity = $( Number(randomNumberMaker( 1, 100 )) ) ;
  // console.log( 'newAnimalQuantity is ' + newAnimalQuantity );
      // create object to post
      var newAnimal = {
      "type": newAnimalType,
      // "quantity": newAnimalQuantity
      };
  $.ajax({
    type: 'POST',
    url: '/newAnimal',
    data: newAnimal,
    success: function( data ){
      console.log( 'inside ajax add animal success' );
      displayAnimals( );
      // return listOfAnimals;
    }
  });//end of ajax
});//end of addAnimalButton
});//end of jquery
