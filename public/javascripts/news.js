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

     $("#addnews").on('click', function () {
        let news = {
            title: $("#title").val(),
            desc: $('#desc').val(),
            imageName: imageFile
        };
        $.ajax({
            type: 'POST',
            url: base_url + 'news',
            data: news,
            success: function (news) {
//                tblBody.append(rowTemplate(news));
//                imageFile = '';
//                $('#newsform').trigger('reset');
                console.log("Uploaded");
            },
            error: function () {
                alert("Fill all the form fields!");
            }
        });
    });

        function rowTemplate(news) {
            let oneRow = 
            "<tr><td>" + news.title +
             "</td><td>" +
                news.desc + "</td>";
            if (event.imageName !== '') {
                oneRow += "<td><img src= " + base_url + "uploads/" + news.imageName + " width='60' /></td>";
            } else {
                oneRow += "<td> No Image </td>";
            }
              oneRow += '<td><button type="button" class="btn btn-warning update" news_id=' + news._id + '>Update</button></td> ';
            oneRow += '<td><button type="button" class="btn btn-danger delete" news_id=' + news._id + '>Delete</button></td> </tr>';
            return oneRow;
        }

        $.ajax({
            type: 'GET',
            url: base_url + 'news',
            success: function (news) {
                console.log("Success");
                let myRows = [];
                $.each(news, function (index, news) {
                    myRows.push(rowTemplate(news));
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
                url: base_url + 'news/' + $(this).attr('news_id'),
                success: function () {
                    location.reload();
                }
            });
        });

        let newsId;
        tblBody.on('click', '.update', function () {
            newsId = $(this).attr('news_id');
            $.ajax({
                type: 'GET',
                url: base_url + 'news/' + newsId,
                success: function (news) {
                    console.log(news);
                    $('#title').val(news.title);  
                    $('#desc').val(news.desc);
                  
                    // $('#add-news').hide();
                    // $('#updatenews').show();
                },
                error: function () {
                    console.log("Something went wrong!");
                }
            });
    });
    
            $('#updatenews').on('click', function () {
            let news = {
                title: $("#title").val(),
                desc: $("#desc").val(),
                
            };
                if(imageFile !== '') {
                news.imageName= imageFile;
            }
            
            $.ajax({
                type: 'PUT',
                url: base_url + 'news/' + newsId,
                data: news,
                success: function (news) {
                    console.log(news);
                    alert("News Updated");
                    location.href('/newsview');
                }
            })
    
    });

    });