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


$("#signup").on('click', function (e) {
    e.preventDefault();
        let user = {
            name: $("#name").val(),
            email: $("#email").val(),
            username: $("#username").val(),
            contact: $("#contact").val(),
            password: $("#password").val()
        };
    console.log(user);
        $.ajax({
            type: 'POST',
            url: "http://localhost:3000/users/signup",
            data: user,
            success: function (reply) {
                console.log("registered");
                window.location.href="login"
            },
            error: function () {
                alert("Fill all the form fields!");
            }
        });
    });
    
   $("#loginbtn").on('click', function (e) {
    e.preventDefault();
        let user = {
            username: $("#username").val(),
            password: $("#password").val()
        }; 
       console.log(user);
               $.ajax({
            type: 'POST',
            url: "http://localhost:3000/users/login",
            data: user,
                   
                success: function (user) {
               console.log(user.usertype);
               if(user.usertype === true){
                   alert("Logged In As Admin");
                   window.location.href = '/admindashboard';
               }
               else{
                   console.log("Logged In");
                   window.location.href = '/dashboard';
               }
            },   
            error: function () {
                alert("Fill all the form fields!");
            }
               
               });
   });

   function rowTemplate(user) {
    let oneRow = 
    "<tr><td>" + user.name + "</td><td>" 
    + user.email + "</td>" + 
       "</td><td>" +
        user.username + "</td>"
    +  "</td><td>" + user.contact + "</td>";
    
    oneRow += '<td><button type="button" class="btn btn-danger delete" event_id=' + event._id + '>Delete</button></td> </tr>';
    return oneRow;
}

$.ajax({
    type: 'GET',
    url: base_url + 'users',
    success: function (users) {
        console.log("Success");
        let myRows = [];
        $.each(users, function (index, user) {
            myRows.push(rowTemplate(user));
        });
        tblBody.append(myRows);
    },
    error: function () {
        alert('Something went wrong!');
    }
});
    });