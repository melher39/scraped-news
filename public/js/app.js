// this will be our js file for front-end app logic
// wait for the document to load and be ready
$(document).ready(function () {
    // this button should load the scraped articles
    $("#scrape-button").on("click", function (event) {
        // event.preventDefault();
        // send the GET request to display all the info on the page
            $.ajax("/all", {
                type: "GET"
            }).then(function () {
                location.href = "/all";
            });
        });

    $(".comments-button").on("click", function () {
        // alert("it works");
        // empty the div before adding new comments so comments are not piled up infinitely
        $("#comment-body").empty();


        let articleId = $(this).data("id");
        $.get("/articles/" + articleId, function (result) {
            console.log("this is the article with the comments: " + result);

            for (let i = 0; i < result.comment.length; i++) {
                let articleComment = result.comment[i].body;
                console.log(articleComment);


                let deleteButton = $("<button>");
                deleteButton.addClass("btn right delete-button modal-close");
                deleteButton.text("X");
                deleteButton.attr("data-id", result.comment[i]._id);
                $("#comment-body").append("<div>", articleComment, deleteButton, "</div>");


            }
        });

        $("#comment-modal").modal("open");


    });

    $(".add-comment-button").on("click", function(event){
        event.preventDefault();
        alert("Successfully added comment!");
        let articleId = $(this).data("id");
        let newComment = {
            body: $("#add-comment-input").val().trim()
        };
        console.log(newComment);
        $.post("/articles/" + articleId, newComment, function(){
            $("#add-comment-input").val("");
        });
    });

    $(document).on("click", ".delete-button", function () {
        // alert("delete button works");
        let commentId = $(this).data("id");
        $.ajax("/comments/" + commentId, {
            type: "DELETE"
        }).then(
            function () {
                // $("#comment.modal").modal("close");
            });
    });

    // $(".modal-close").on("click", function(){

    // })

    $(".modal").modal();


});
