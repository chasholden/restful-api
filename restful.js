var baseUrl = 'https://shielded-sea-3725.herokuapp.com/data-api/';
var collection = 'cholden';

//----------------------section toggles---------------------------

$("#toggle-create").click(function(){
    $("#read").toggle("slow");
    $("#create").toggle("slow");
  });

$("#toggle-edit").click(function(){
    $("#read").toggle("slow");
    $("#edit").toggle("slow");
  });

$("#toggle-delete").click(function(){
    $("#read").toggle("slow");
    $("#delete").toggle("slow");
  });

$("#cancel-create").click(function(evt){
  evt.preventDefault( );
    $("#create").toggle("slow");
    $("#read").toggle("slow");
  });

$("#cancel-delete").click(function(evt){
  evt.preventDefault( );
    $("#delete").toggle("slow");
    $("#read").toggle("slow");
  });

$("#cancel-edit").click(function(evt){
  evt.preventDefault( );
    $("#edit").toggle("slow");
    $("#read").toggle("slow");
  });

//----------------------create---------------------------- 

$('#submit-create').off( );
$('#submit-create').on( 'click', function( evt ) {
    var fname = $('#add-fname').val();
    var lname = $('#add-lname').val();
    var grade = $('#add-grade').val();

    evt.preventDefault( );
  
  if (fname == null || fname =="" || lname == null || lname =="" || grade == null || grade =="") {
    alert("Please fill out all fields");
    return false;
    } else {

    $.ajax( baseUrl + collection,
    {
        method: 'POST',
        data: {
                  fname: fname,
                  lname: lname,
                  grade: grade
              },
        success: logCreate,
        error: logAjaxError
    });
};
});
function logCreate( data ) {
    console.log( 'Data received:', data );
    $("#create").toggle("slow");
    $("#read").toggle("slow");
}

function logAjaxError( jqXHR, textStatus, errorThrown ) {
    console.log( 'AJAX error. Status:', textStatus, 'error:', errorThrown );
}

//--------------------------read-------------------------------

$('#read').click(function(){
$.ajax( baseUrl + collection,
{
    method: 'GET',
    success: displayList,
    error: logAjaxError
} );

function displayList( data ) {
  $("#table-body").html('');
    console.log( 'Data received:', data );
        var trHTML = '';
        $.each(data, function (i, item) {
            trHTML += '<tr><td>' + item.fname + '</td><td>' + item.lname + '</td><td>' + item.grade + '</td><td>' + item._id + '</td></tr>';
        });
        $('#table-body').append(trHTML);
    };
});

function logAjaxError( jqXHR, textStatus, errorThrown ) {
    console.log( 'AJAX error. Status:', textStatus, 'error:', errorThrown );
};


//------------------------delete-------------------------------

$('#submit-delete').off( );
$('#submit-delete').on( 'click', function( evt ) {
    var id = $('#delete-id').val();

    evt.preventDefault( );

    $.ajax( baseUrl + collection + '/' + id,
    {
        method: 'DELETE',
        success: logDeleteResult,
        error: logAjaxError
    } );
} );

function logDeleteResult( data ) {
    console.log( 'Data received:', data );
    $("#delete").toggle("slow");
    $("#read").toggle("slow");
}

function logAjaxError( jqXHR, textStatus, errorThrown ) {
    console.log( 'AJAX error. Status:', textStatus, 'error:', errorThrown );
}

//--------------------edit---------------------------------

$('#submit-edit').off( );
$('#submit-edit').on( 'click', function( evt ) {
    var id = $('#edit-id').val();
    var fname = $('#edit-fname').val();
    var lname = $('#edit-lname').val();
    var grade = $('#edit-grade').val();

    evt.preventDefault( );
  
  if (id == null || id =="" ||fname == null || fname =="" || lname == null || lname =="" || grade == null || grade =="") {
    alert("Please fill out all fields");
    return false;
    } else {

    $.ajax( baseUrl + collection + '/' + id,
    {
        method: 'PUT',
        data: {
                  fname: fname,
                  lname: lname,
                  grade: grade
              },
        success: logUpdateResult,
        error: logAjaxError
    });
};
});
function logUpdateResult( data ) {
    console.log( 'Data received:', data );
    $("#edit").toggle("slow");
    $("#read").toggle("slow");
}

function logAjaxError( jqXHR, textStatus, errorThrown ) {
    console.log( 'AJAX error. Status:', textStatus, 'error:', errorThrown );
}