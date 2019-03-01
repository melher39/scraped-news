// this will be our js file for front-end app logic
// wait for the document to load and be ready
$(document).ready(function() {
    // this button should load the scraped articles
    $("#scrape-button").on("click", function(event){
        // 
        // event.preventDefault();
        // send the GET request to scrape the thrasher site
        $.ajax("/scrape", {
            type: "GET"
            // then send another GET request to gather all the articles retrieved
    }).then(function(){
        $.ajax("/all", {
            type: "GET"
        }).then(function(){
            location.href = "/all";
        });
    });
    });

    $(".comments-button").on("click", function(){
        alert("it works");
        let articleId = $(this).data("id");
        $.get("/articles/"+ articleId, function(result){
            console.log("this is the article with the comments: " + result);

            for (let i=0; i <result.comment.length; i++){
                let comment = result.comment[i].body;
                console.log(comment);
                $("#comment-body").append(comment);

            }
            // jquery for modal pop-up    
            $("#comment-modal").modal("open");
           
        });

    });

    $(".modal").modal();


});
