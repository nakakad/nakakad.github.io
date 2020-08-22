$(document).ready(function() {
  
  // Data Table
  var datatab = $('#empTable').DataTable({
    "oLanguage" : {
      "sLengthMenu": "Display _MENU_", // **dont remove _MENU_ keyword**
    },
    "columnDefs": [
      { "visible": false, "targets": [9,10]},
      {
          "className":      'details-control',
          "orderable":      false,
          "data":           null,
          "defaultContent": '',
          "targets": 0
      },
  ],
  "order": [[1, 'asc']]
    
  });


   /* Formatting function for row details - modify as you need */
   function format (d) {
    // `d` is the original data object for the row

    return '<table cellpadding="5" cellspacing="0" border="0">'+
            '<tr>'+
                '<td>Admission\'s Page Link:</td>'+
                '<td>' + d["9"] + '</td>'+
            '</tr>'+
            '<tr>'+
              '<td>Gateway Admission\'s Page Link:</td>'+
              '<td>' + d["10"] + '</td>'+
            '</tr>'+
            '</table>';
} 

// Add event listener for opening and closing details
$('#empTable tbody').on('click', 'td.details-control', function () {
  var tr = $(this).closest('tr');
  var row = datatab.row( tr );

  if ( row.child.isShown() ) {
      // This row is already open - close it
      row.child.hide();
      tr.removeClass('shown');
  }
  else {
      // Open this row
      row.child( format(row.data()) ).show();
      tr.addClass('shown');
  }
});
 
// main function
function submission () {

// Admission Test
$(".test").each(function () {
  if ($(this).prop("checked")) {
   var selected_adtests = $(this).val();
   $("tr").each(function(tr_index, tr) {
       var admission = $(tr).find(".tabtest").text();
       if(selected_adtests == admission) {
           $(tr).addClass('fit');
          } 
      });
}});

$("#Lanc").addClass('fit');

// GCSE
//WP & GCSE
function meets_GCSE (input_id, data_id, data_idWP) {
  var achieved_gcse = parseInt($(input_id).val())
  if ($("#yes").prop("checked")){
    $("tr.fit").each(function (tr_index, tr){
      var needed_gcse = parseInt($(this).attr(data_id))
      var needed_WP_gcse = parseInt($(this).attr(data_idWP))
      if ((achieved_gcse < needed_gcse) && (achieved_gcse < needed_WP_gcse) ){
      $(this).removeClass("fit");
      }
    })
  } else if ($("#no").prop("checked")) {
    $("tr.fit").each(function (tr_index, tr){
      var needed_gcse = parseInt($(this).attr(data_id))
      if (achieved_gcse < needed_gcse ){
        $(this).removeClass("fit");
      } 
    })
  }
}

// Science ammendment 
// Subject requirements 
meets_GCSE("#Maths","data-mathsgcse", "data-mathsgcseWP")
meets_GCSE("#English", "data-englishgcse", "data-englishgcseWP")
if (!($("#Double_science").val() == "")){
  meets_GCSE("#Double_science", "data-doublescience", "data-doublescienceWP")

}else {
  meets_GCSE("#Biology", "data-biologygcse", "data-biologygcseWP")
  meets_GCSE("#ChemGCSE", "data-chemgcse", "data-chemgcseWP")
  meets_GCSE("#Physics", "data-physicsgcse", "data-physicsgcseWP")
}


// Best Grade 
$("tr.fit").each(
  function (tr_index, tr) {
    var best_num = parseInt($(tr).attr("data-numbest"))
    if($(tr).attr("data-bestgcse") == "7"){
      var actual_num = parseInt($("#Grade7").val()) + parseInt($("#Grade8").val()) + parseInt($("#Grade9").val());
      if(actual_num < best_num){
        $(tr).removeClass('.fit');
      }
    } else if ($(tr).attr("data-bestgcse") == "6"){
      var actual_num = parseInt($("#Grade6").val()) + parseInt($("#Grade7").val()) + parseInt($("#Grade8").val()) + parseInt($("#Grade9").val());
      if(actual_num < best_num){
        $(tr).removeClass('.fit');
      }
    } else if ($(tr).attr("data-bestgcse") == "4"){
      var actual_num = parseInt($("#Grade4").val()) + parseInt($("#Grade5").val()) + parseInt($("#Grade6").val()) + parseInt($("#Grade7").val()) + parseInt($("#Grade8").val()) + parseInt($("#Grade9").val());
      if(actual_num < best_num){
        $(tr).removeClass('.fit');
      }
    }
  }
)


// A Level Subjects 

//both

if( !(($("#BiologyA").prop("checked")) && ($("#ChemistryA").prop("checked")))){
  $("tr.fit[data-alevel = 'both']").removeClass('fit');
};

// chem

if (! (($("#ChemistryA").prop("checked")) && ($("#MathsA").prop("checked") || $("#PhysicsA").prop("checked") || $("#BiologyA").prop("checked") ))){
  $("tr.fit[data-alevel = 'chem']").removeClass('fit');
}
// non core

if (!( (($("#BiologyA").prop("checked")) && ( $("#ChemistryA").prop("checked") || $("#MathsA").prop("checked") || $("#Psychology").prop("checked") || $("#PhysicsA").prop("checked"))) || (($("#ChemistryA").prop("checked")) && ($("#MathsA").prop("checked") || $("#Psychology").prop("checked") || $("#PhysicsA").prop("checked")))  )){
  $("tr.fit[data-alevel = 'either']").removeClass('fit');

}

// core

if (!( (($("#BiologyA").prop("checked")) && ( $("#ChemistryA").prop("checked") || $("#MathsA").prop("checked") || $("#PhysicsA").prop("checked"))) || (($("#ChemistryA").prop("checked")) && ($("#MathsA").prop("checked") || $("#PhysicsA").prop("checked")))  )){
  $("tr.fit[data-alevel = 'core']").removeClass('fit');

}

// individuals

if (!(($("#ChemistryA").prop("checked")) && ($("#BiologyA").prop("checked") || $("#Psychology").prop("checked") || $("#PhysicsA").prop("checked") ))){
  $("tr.fit[data-alevel = 'south']").removeClass('fit');

}

if (!( (($("#BiologyA").prop("checked")) && ( $("#Economics").prop("checked") || $("#ChemistryA").prop("checked") || $("#MathsA").prop("checked") || $("#Psychology").prop("checked") || $("#PhysicsA").prop("checked"))) || (($("#ChemistryA").prop("checked")) && ( $("#Economics").prop("checked") || $("#MathsA").prop("checked") || $("#Psychology").prop("checked") || $("#PhysicsA").prop("checked")))  )){
  $("tr.fit[data-alevel = 'keele']").removeClass('fit');

}

if (!( (($("#BiologyA").prop("checked")) && ( $("#CompSci").prop("checked") || $("#ChemistryA").prop("checked") || $("#MathsA").prop("checked") || $("#Psychology").prop("checked") || $("#PhysicsA").prop("checked"))) || (($("#ChemistryA").prop("checked")) && ( $("#CompSci").prop("checked") || $("#MathsA").prop("checked") || $("#Psychology").prop("checked") || $("#PhysicsA").prop("checked")))  )){
  $("tr.fit[data-alevel = 'kent']").removeClass('fit');

}

if (! (($("#BiologyA").prop("checked")) && ($("#MathsA").prop("checked") || $("#PhysicsA").prop("checked") || $("#ChemistryA").prop("checked") || $("#Psychology").prop("checked") ))){
  $("tr.fit[data-alevel = 'plymouth']").removeClass('fit');
}

if (! (($("#ChemistryA").prop("checked")) && ($("#MathsA").prop("checked") || $("#PhysicsA").prop("checked") || $("#BiologyA").prop("checked") || $("#FMaths").prop("checked") ))){
  $("tr.fit[data-alevel = 'oxford']").removeClass('fit');
}

if (! (($("#ChemistryA").prop("checked")) || ($("#MathsA").prop("checked") && $("#BiologyA").prop("checked")) || ($("#PhysicsA").prop("checked") && $("#BiologyA").prop("checked")) )){
  $("tr.fit[data-alevel = 'leeds']").removeClass('fit');
}

if (! (($("#ChemistryA").prop("checked") && $("#BiologyA").prop("checked")) || ($("#Psychology").prop("checked") && $("#BiologyA").prop("checked")) || ($("#Psychology").prop("checked") && $("#ChemistryA").prop("checked")) )){
  $("tr.fit[data-alevel = 'lancaster']").removeClass('fit');
}

// Course Type
var selected_course = $("#course").val();
if (selected_course == "Unsure") {
  $("tr.fit").addClass("fit")
} else {
  $("tr.fit").each(function(tr_index, tr) {
    var course = $(tr).find(".tabcourse").text();
    if(selected_course != course) {
            $(tr).removeClass('fit');
    }
  });
}
// A Grades and WP
var selected_agrade = $("#Agrad").val();
if ($("#yes").prop("checked")){
    var WP_agrade = `tr[data-wpagrade *= '${selected_agrade}'], tr[data-agrade *= '${selected_agrade}']`
    $("tr.fit").not(WP_agrade).removeClass('fit');
} else if ($("#no").prop("checked")){
    var func_agrade = `tr[data-agrade *= '${selected_agrade}']`
    $("tr.fit").not(func_agrade).removeClass('fit');
}

// Modal
if (($("#yes").prop("checked")) && ((parseInt($("#Agrad").val())) < 4) ) {
  // display modal box 
  $(".modal").css("display", "block");
  // Add red outline to gateway column
  $(".gategcse, .gatealevel").addClass("highlight")
  // close on click
  $(".close").on( "click", function () {
    $(".modal").css("display", "none")
  // remove redline from gateway colum
  })
}


//DO NOT TOUCH THESE, THEY CLOSE OFF THE FUNCTION
    };

// SUBMIT 

$('input[type=button]').click(submission)

// PAGE TURNER

$('#empTable').on('draw.dt',submission).DataTable();

// CLOSING - DO NOT TOUCH
  
});




