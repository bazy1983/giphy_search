$(document).ready(function(){

    //preset buttons added to history div upon document onload
    var preset = ["wow", "oh", "amazing", "cool", "omg"]
    for (var i = 0; i <preset.length; i++){
        //create history button
        var history = $("<button class = 'ajaxHistory btn btn-success'>").val(preset[i]).html('<i class="fas fa-times-circle"></i> '+preset[i]);
        $(".history").append(history);
        $("input").val(""); //remove text from search box
    }


    var textBox,
        query, //store input value for pagination event
        searchResult; // store json data to toggle between images when clicked on

    $("#ajaxRequest").on("click", function(){
        if ($("input").val() === ""){return false}
        textBox = $("input").val().trim(); //getting text box value
        query = textBox; //used later on for pagination
        var history = $("<button class = 'ajaxHistory btn btn-success'>").val(textBox).html('<i class="fas fa-times-circle"></i> '+textBox);
        $(".history").append(history);
        $("input").val(""); //remove text from search box
        //call ajax function and pass text box value
        ajaxCall(textBox, 0);
    });

    // removes the history button when click on x
    $(".history").on("click","i", function(){
        var removebtn = $(this).parent();
        //will call bootstarp modal
        $('#myModal').modal("show", true);
        //by clicking on remove, it will remove the history button and hide the modal
        $("#remove").on("click", function(){
            removebtn.remove();
            $('#myModal').modal("hide");
        });
    })

        

    // runs ajax request from history buttons
    $(".history").on("click",".ajaxHistory", function(){
        var historyBtn = $(this).val();
        query = historyBtn; //used later on for pagination
        ajaxCall(historyBtn, 0);
    })

    $("input").keyup(function(e){
        if (e.keyCode === 13) {
            if ($("input").val() === ""){return false} // prevent event from running when empty text
            
            textBox = $("input").val().trim(); //getting text box value
            query = textBox; //used later on for pagination

            //create history button
            var history = $("<button class = 'ajaxHistory btn btn-success'>").val(textBox).html('<i class="fas fa-times-circle"></i> '+textBox);
            $(".history").append(history);
            $("input").val(""); //remove text from search box
            //call ajax function and pass text box value 
            ajaxCall(textBox, 0);
        };
    })

    
    function ajaxCall (search, pagination) {
        $(".results").empty();//empty out all previous results
        var apiKey = "cnvVfq7XSIKMKEvBcaV7y9oFTHegmF6X",
        resultCount = $(".dropdown option:selected").val(), //number of results
        request = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey + "&limit=" + resultCount + "&rating=g&offset="+ pagination*resultCount;
        //AJAX request 
        $.ajax({ 
            method : "GET",
            url : request
        }).then(function (res){ //response 
            searchResult = res; //store json data to toggle between images
            //console.log(res);
            // display data to document
            for (var i = 0; i < res.data.length; i++){
                var col = $("<div class = 'img_box col-md-3 col-xs-6'>") //create div
                var image = $("<img>").attr ({ //create image element with attrbutes
                    src : res.data[i].images.original_still.url,
                    value: i,
                    alt : search
                });
                image.addClass("img_result")
                col.append(image)
                $(".results").append(col);
            };
            // build search pagination with numbers
            $(".pagination").empty();
            $(".pageNumber").show();
            //this will start pagination from the one next to clicked one
            for (x = pagination + 1; x < pagination + 10; x++){
                var page = $("<span class = 'page'>").text(x);
                $(".pagination").append(page);
            };
        });
    }

    // toggle between original and still image when clicked on
    $(".results").on ("click", ".img_result", function(){
        var imgData = $(this),
            imgIndex = imgData.attr("value");
        
        if (imgData.attr("src") === searchResult.data[imgIndex].images.original_still.url) {
            imgData.attr("src", searchResult.data[imgIndex].images.original.url);
        } else {
            imgData.attr("src", searchResult.data[imgIndex].images.original_still.url)
        };
    })

    //pagination
    $(".pagination").on("click", ".page", function(){
        var number = $(this).text();
        number = parseInt(number);
        ajaxCall(query, number);
    });

    $("#first").on("click", function(){
        ajaxCall(query, 0);
    });


});