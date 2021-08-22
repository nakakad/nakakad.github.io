$(document).ready(() => {
    // GCSE Convert subject selection into subject grades 
    
        $('.selection select').on('change', function(){
            // Extract the subject chosen
            var subject = $(this).val()
            // Clone the choice template
            var $choiceTemplate = $('.choice').clone(true)
            $choiceTemplate.attr('class', 'chosen')
            $choiceTemplate.removeClass('mchoice')
            // Set the label for
            $choiceTemplate.children('label').attr('for', subject)
            $choiceTemplate.children('select').attr('id', subject)
            // Set the label text
            $choiceTemplate.children('label').text(subject)
            // Set the name of select
            $choiceTemplate.children('select').attr('name', subject)
            // replace the selection with the choice
            $(".choices").append($choiceTemplate)
    
        })
    
    // A Level 
    $('.a-level-selection select').on('change', function(){
        // Extract the subject chosen
        var subject = $(this).val()
        // Clone the choice template
        var $choiceTemplate = $('.a-level-choice').clone(true)
        $choiceTemplate.attr('class', 'chosen')
        // Set the label for
        $choiceTemplate.children('label').attr('for', subject)
        $choiceTemplate.children('select').attr('id', subject)
        // Set the label text
        $choiceTemplate.children('label').text(subject)
        // Set the name of select
        $choiceTemplate.children('select').attr('name', subject)
        // replace the selection with the choice
        $(".a-level-choices").append($choiceTemplate)
    
    })
    
    // Delete a subject row
        $('.close').on('click', function(){
            $(this).parent().hide()
        })
    
        $('.close').on('hover', function(){
            $(this).css("color","white")
        })
    
     // Modal Content
    //info buttons 
    $('.info-button').on('click', function(){
        $(this).next().css('display', 'block')
    })
    
    $('.escape').on('click', function(){
        $(this).parent().css('display', 'none')
    })
    //// TEST IS BELOW
    // Data Table
    var datatab = $('#data-table').DataTable({
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
    $('#data-table tbody').on('click', 'td.details-control', function () {
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
    
    // Apply the function to each row
    /*
    $('#submit input').on('click', function(){
        
        $('tr').addClass('fit');
        }
    );
    */
    
    // Main Function
    
    function submission() {

    //Admission Tests 
    $('input[name = "adtest"]').each(function () {
        if ($(this).prop("checked")) {
         var selected_adtests = $(this).val();
         $("tr").each(function(tr_index, tr) {
             var admission = $(tr).find(".tabtest").text();
             if(selected_adtests == admission) {
                 $(tr).addClass('fit');
                } 
            });
    }});

    $("#Buckingham").addClass('fit')

    // A Levels: Subjects 
    // Both Chemistry and Biology
    if( !(($(".a-level-choices #Biology").length) && ($(".a-level-choices #Chemistry").length)) ) {
        $("tr.fit[data-alevel = 'both']").removeClass('fit');
    }
    
    // Chem Mandatory 
    if (! (($(".a-level-choices #Chemistry").length) && ( ($(".a-level-choices #Maths").length)|| ($(".a-level-choices #Physics").length) || ($(".a-level-choices #Biology").length) ))){
        $("tr.fit[data-alevel = 'chem']").removeClass('fit');
    }
    
    // Either Bio or Chem
    if (!( ( ($(".a-level-choices #Biology").length) && ( ($(".a-level-choices #Chemistry").length) || ($(".a-level-choices #Maths").length)|| ($(".a-level-choices #Chemistry").length) || ($(".a-level-choices #Physics").length))) || (($(".a-level-choices #Chemistry").length) && (($(".a-level-choices #Maths").length) || ($(".a-level-choices #Psychology").length) || ($(".a-level-choices #Physics").length)))  )){
        $("tr.fit[data-alevel = 'either']").removeClass('fit');
    
    }
    
    // Either Bio or Chem not psych
    if (!( (($(".a-level-choices #Biology").length) && ( ($(".a-level-choices #Chemistry").length) || ($(".a-level-choices #Maths").length) || ($(".a-level-choices #Physics").length))) || (($(".a-level-choices #Chemistry").length) && ( ($(".a-level-choices #Maths").length) || ($(".a-level-choices #Physics").length)))  )){
        $("tr.fit[data-alevel = 'core']").removeClass('fit');
      
    }
    
    // Individuals 
    
    if (!( (($(".a-level-choices #Biology").length) && ( ($(".a-level-choices #Economics").length) || ($(".a-level-choices #Chemistry").length) || ($(".a-level-choices #Maths").length) || ($(".a-level-choices #Psychology").length) || ($(".a-level-choices #Physics").length))) || (($(".a-level-choices #Chemistry").length) && ( ($(".a-level-choices #Economics").length) || ($(".a-level-choices #Maths").length) || ($(".a-level-choices #Psychology").length) || ($(".a-level-choices #Physics").length)))  )){
        $("tr.fit[data-alevel = 'keele']").removeClass('fit');
      
    }
    
    if (!( (($(".a-level-choices #Biology").length) && ( ($(".a-level-choices #Computer Science").length) || ($(".a-level-choices #Chemsitry").length) || ($(".a-level-choices #Maths").length) || ($(".a-level-choices #Psychology").length) || ($(".a-level-choices #Physics").length))) || (($(".a-level-choices #Chemistry").length) && ( ($(".a-level-choices #Computer Science").length) || ($(".a-level-choices #Maths").length) || ($(".a-level-choices #Psychology").length) || ($(".a-level-choices #Physics").length)))  )){
        $("tr.fit[data-alevel = 'kent']").removeClass('fit');
      
    }
    
    if (! (($(".a-level-choices #Biology").length) && ( ($(".a-level-choices #Maths").length)|| ($(".a-level-choices #Physics").length) || ($(".a-level-choices #Chemistry").length) || ($(".a-level-choices #Psychology").length)))){
        $("tr.fit[data-alevel = 'plymouth']").removeClass('fit');
    }
    
    if (! (($(".a-level-choices #Chemistry").length) && ( ($(".a-level-choices #Maths").length) || ($(".a-level-choices #Physics").length) || ($(".a-level-choices #Biology").length) || ($(".a-level-choices #Further Maths").length) ))){
        $("tr.fit[data-alevel = 'oxford']").removeClass('fit');
    }
    
    if (! (($(".a-level-choices #Chemistry").length) || ( ($(".a-level-choices #Maths").length) && ($(".a-level-choices #Biology").length)) || (($(".a-level-choices #Physics").length) && ($(".a-level-choices #Biology").length)) )){
        $("tr.fit[data-alevel = 'leeds']").removeClass('fit');
    }
    
    if (! (( ($(".a-level-choices #Chemistry").length) && ($(".a-level-choices #Biology").length)) || ( ($(".a-level-choices #Psychology").length) && ($(".a-level-choices #Biology").length)) || ( ($(".a-level-choices #Psychology").length) && ($(".a-level-choices #Chemistry").length)) )){
        $("tr.fit[data-alevel = 'lancaster']").removeClass('fit');
    }
    
    // Alevels : Grades
    var $grades_list = [];
    $(".a-level-choices select").each(function (){
        var grade = parseInt($(this).val())
        $grades_list.push(grade)
    })
    $grades_list.sort()
    $grades_list.reverse()
    var $best_three = ($grades_list[0]).toString() + ($grades_list[1]).toString() + ($grades_list[2]).toString()
    
    $('tr.fit').each(function (tr_index, tr){
        if($("#yes").prop("checked")){
            var $needed_alevel = $(this).attr("data-wpagrade")
        }else {
            var $needed_alevel = $(this).attr("data-agrade")
        }
    
        for (i=0; i < 4; i++){
            if (parseInt($best_three[i]) < parseInt($needed_alevel[i]) ){
                $(this).removeClass('fit');
              }
        }
       
    })
    
    // Course Type
        var selected_course = $( "input[name ='course-type']:checked" ).val()
        if (selected_course == "unsure") {
        } else {
            $("tr.fit").each(function(tr_index, tr) {
              var course = $(tr).find(".tabcourse").text();
              if(selected_course != course) {
                      $(tr).removeClass('fit');
              }
            });
        }
    
    // GCSE
    // How to check grades for individual subjects 
    function meets_GCSE(subject){
        var $achieved_gcse = parseInt($(`.choices select[name *= "${subject}"]`).val())
        if($("#yes").prop("checked")){
            var $gcse_search_term = "data-" + subject.replace(/\s+/g, '-').toLowerCase() + "-gcseWP"
        } else {
            var $gcse_search_term = "data-" + subject.replace(/\s+/g, '-').toLowerCase() + "-gcse"
        }
        $('tr.fit').each(function (tr_index, tr){
            var $needed_gcse = parseInt($(this).attr($gcse_search_term))
            if ($achieved_gcse < $needed_gcse){
              $(this).removeClass('fit');
            }
        })
    }
 
    //Apply the function to each subject
    $('.choices select').each(function(){
        var $subject = $(this).attr("id")
        meets_GCSE($subject)
    })
    
    // PART 2: Overall GCSE Performance 
    $("tr.fit").each(function (tr_index, tr) {
        if($("#yes").prop("checked")){
            var best_num = parseInt($(this).attr("data-numbestWP"))
            var best_gcse = parseInt($(this).attr("data-bestgcseWP"))
        }else {
            var best_num = parseInt($(this).attr("data-numbest"))
            var best_gcse = parseInt($(this).attr("data-bestgcse"))
        }
    
        var acheived_best_number = 0
        $('.choices select').each(function() {
            if (parseInt($(this).val()) >= best_gcse){
                acheived_best_number = acheived_best_number + 1
            }
        })
        if(acheived_best_number < best_num){
            $(this).removeClass('fit');
        }
    })
    
    
    }
    // Tie it to the submit button
    $('#submit input').click(submission)
    
    // Page turner
    $('#data-table').on('draw.dt',submission).DataTable();
    
    
    // Final Closing
    
    });