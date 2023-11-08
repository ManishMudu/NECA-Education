$(function () {
    $.ajaxSetup({
      xhref:{
          withCredentials: true
      }
  
  });
      let base_url = 'http://localhost:3000/';
  
      $("#logout").on('click', function(e){

  
          $.ajax({
              type: "GET",
              url: base_url + "users/logout",
              success: function() {
               alert("logout");
               window.location="login";
            
              },
              error: function() {
                alert("Something went wrong!");
              }
            });
          // alert("sucess");
      });
      
    });