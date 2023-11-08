$(function () {

    
    let base_url = 'http://localhost:3000/';
    
       $.ajaxSetup({
        xhrFields: {
            withCredentials: true
            
        },
        crossDomain: true
    });
    
    $.ajax({
        
        type: 'GET',
        url: base_url + 'admindashboard',
        success: function(count) {
            let usercount = count.usercount
            let eventcount = count.eventcount
            let newscount = count.newscount
            let rulecount = count.rulecount
            let reportcount = count.reportcount
            
            //count.append(usercount);
            users.append(usercount);
            events.append(eventcount);
            rules.append(rulecount);
            news.append(newscount);
            reports.append(reportcount);
            console.log(eventcount);
            
        },
        error: function(){
            alert('Count delviered faild');
        }
        
        
    });
    
});