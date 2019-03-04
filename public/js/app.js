// this will be our js file for front-end app logic
// wait for the document to load and be ready
$(document).ready(function () {

    // this button should load the scraped articles
    $("#scrape-button").on("click", function () {
        // send the GET request to display all the info on the page
        // but first check for updates
        $.get("/", function () {
            $.get("/all", function () {
                location.href = "/all";
            });
        });

    });

    // this button will load all the comments for that specific article
    $(document).on("click", "#comments-button", function () {
        // empty the div before adding new comments so comments are not piled up infinitely
        $("#comment-body").empty();

        // grab the id attribute of the button to use it for our route
        let articleId = $(this).data("id");
        // give the add-comment-button this article ID so it can be used to add comments with the route
        $("#add-comment-button").attr("data-id", articleId);

        // get route to retrieve the article and its comments
        $.get("/articles/" + articleId, function (result) {

            // loop through all the comments for this one article
            for (let i = 0; i < result.comment.length; i++) {
                // store the comments in a variable for easier access
                let articleComment = result.comment[i].body;

                // dynamically create a delete button for every comment
                // also give it classes and a specific article ID to use later
                let deleteButton = $("<button>");
                deleteButton.addClass("btn right delete-button modal-close");
                deleteButton.text("X");
                deleteButton.attr("data-id", result.comment[i]._id);

                // append both the comment and delete button in the comments section of the modal
                $("#comment-body").append("<p>", articleComment, deleteButton, "</p><br>");
            }
        });
        // once the get request has retrieved the results, then open the modal with the results
        $("#comment-modal").modal("open");
    });

    // this button enables the user to add a comment to any specific article
    $(document).on("click", "#add-comment-button", function () {
        // prevent the page from reloading
        // event.preventDefault();
        // tell the user they have successfully added the comment
        alert("Successfully added comment!");
        // save the article's ID for later use
        let articleId = $(this).data("id");
        // the comment being added is an object because the post route requires req.body
        let newComment = {
            body: $("#add-comment-input").val().trim()
        };
        // post route that finds the article by ID and adds the new comment
        $.post("/articles/" + articleId, newComment, function () {
            // the input field will be emptied after it's all said and done
            $("#add-comment-input").val("");
            // reload the page in order for the articleID to get refreshed
            location.reload();
        });

    });

    // route to delete a specific button
    // since the buttons are being created dynamically, I use this format to select each button
    $(document).on("click", ".delete-button", function () {

        // alert the user they have deleted the comment first
        alert("Comment successfully deleted!");

        // save the comment ID 
        let commentId = $(this).data("id");
        // make an ajax delete request to the specific ID
        $.ajax("/comments/" + commentId, {
            type: "DELETE"
        });
    });

    // materialize modal initialization
    $(".modal").modal();

});
