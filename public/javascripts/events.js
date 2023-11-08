$(document).ready(function (){
    let base_url = 'http://localhost:3000/';
     let imageFile = '';
     let tblBody = $("#tblbody");
     
     $.ajaxSetup({
         xhrFields: {
             withCredentials: true        
         },
         crossDomain: true     
     });
     
 console.log('hello');
 
 $("#imageFile").on('change', function () {
         let formData = new FormData();
         let files = $("#imageFile").get(0).files;
         if (files.length > 0) {
             formData.append("imageFile", files[0]);
         }
         // $("#add-hero").prop("disabled", true);
         $.ajax({
             type: 'POST',
             url: base_url + 'upload',
             contentType: false,
             cache: false,
             processData: false,
             data: formData,
             success: function (data) {
                 imageFile = data.filename;
                 // $("#add-hero").prop("disabled", false);
             },
             error: function () {
                 alert("Image upload failed!");
             }
         });
     });

     $("#addevent").on('click', function () {
        let event = {
            name: $("#name").val(),
            eventtype: $("#eventtype").val(),
            desc: $('#desc').val(),
            location: $('#location').val(),
            imageName: imageFile
        };
        $.ajax({
            type: 'POST',
            url: base_url + 'events',
            data: event,
            success: function (event) {
//                tblBody.append(rowTemplate(event));
//                imageFile = '';
//                $('#eventform').trigger('reset');
                console.log("Uploaded");
            },
            error: function () {
                alert("Fill all the form fields!");
            }
        });
    });

        function rowTemplate(event) {
            let oneRow = 
            "<tr><td>" + event.name +
             "</td><td>" + event.eventtype +
              "</td>" + 
               "</td><td>" +
                event.desc + "</td>"
            +  "</td><td>" + event.location + "</td>";
            if (event.imageName !== '') {
                oneRow += "<td><img src= " + base_url + "uploads/" + event.imageName + " width='60' /></td>";
            } else {
                oneRow += "<td> No Image </td>";
            }
              oneRow += '<td><button type="button" class="btn btn-warning update" event_id=' + event._id + '>Update</button></td> ';
            oneRow += '<td><button type="button" class="btn btn-danger delete" event_id=' + event._id + '>Delete</button></td> </tr>';
            return oneRow;
        }

        $.ajax({
            type: 'GET',
            url: base_url + 'events',
            success: function (events) {
                console.log("Success");
                let myRows = [];
                $.each(events, function (index, event) {
                    myRows.push(rowTemplate(event));
                });
                tblBody.append(myRows);
            },
            error: function () {
                alert('Something went wrong!');
            }
        });

        tblBody.on('click', '.delete', function () {
            $.ajax({
                type: 'DELETE',
                url: base_url + 'events/' + $(this).attr('event_id'),
                success: function () {
                    location.reload();
                }
            });
        });

        let eventId;
        tblBody.on('click', '.update', function () {
            eventId = $(this).attr('event_id');
            $.ajax({
                type: 'GET',
                url: base_url + 'events/' + eventId,
                success: function (event) {
                    console.log(event);
                    $('#name').val(event.name);
                    $('#eventtype').val(event.eventtype);   
                    $('#desc').val(event.desc);
                    $('#location').val(event.location);
                  
                    // $('#add-event').hide();
                    // $('#updateevent').show();
                },
                error: function () {
                    console.log("Something went wrong!");
                }
            });
    });
    
            $('#updateevent').on('click', function () {
            let event = {
                name: $("#name").val(),
                eventtype: $('#eventtype').val(),
                desc: $("#desc").val(),
                location:  $('#location').val(),
                
            }
                if(imageFile !== '') {
                event.imageName= imageFile;
            }
            
            $.ajax({
                type: 'PUT',
                url: base_url + 'events/' + eventId,
                data: event,
                success: function (event) {
                    console.log(event);
                    alert("Event Updated");
                    location.href('/eventview');
                }
            })
    
    });

    });