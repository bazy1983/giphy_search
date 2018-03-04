$(document).ready(function(){

    var textBox;

    $("#ajaxRequest").on("click", function(){
        $(".results").empty();
        textBox = $("input").val().trim(); //getting text box value
        var history = $("<button class = 'ajaxHistory btn btn-success'>").val(textBox).html('<i class="fas fa-times-circle"></i> '+textBox);
        $(".history").append(history);
        $("input").val(""); //remove text from search box
        //call ajax function and pass text box value
        ajaxCall(textBox);
    });

    // removes the history button when click on x
    $(".history").on("click","i", function(){
        $(".ajaxHistory").remove();
    })

    // runs ajax request from history buttons
    $(".history").on("click",".ajaxHistory", function(){
        $(".results").empty();
        var historyBtn = $(this).val();
        ajaxCall(historyBtn);
    })

    $("input").keyup(function(e){
        if (e.keyCode === 13) {
            $(".results").empty();
        textBox = $("input").val().trim(); //getting text box value
        var history = $("<button class = 'ajaxHistory btn btn-success'>").val(textBox).html('<i class="fas fa-times-circle"></i> '+textBox);
        $(".history").append(history);
        $("input").val(""); //remove text from search box
        //call ajax function and pass text box value
        ajaxCall(textBox);
        };
    })

    function ajaxCall (search) {
        var apiKey = "cnvVfq7XSIKMKEvBcaV7y9oFTHegmF6X",
        resultCount = $(".dropdown option:selected").val(), //number of results
        request = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey + "&limit=" + resultCount + "&rating=g";
        
        //ajax request 
        $.ajax({ 
            method : "GET",
            url : request
        }).then(function (res){ //response 

            // display data to document
            for (var i = 0; i < res.data.length; i++){
                var col = $("<div class = 'img_box col-md-3 col-xs-6'>") //create div
                var image = $("<img>").attr ({ //create image element with attrbutes
                    src : res.data[i].images.original.url,
                    alt : search
                });
            image.addClass("img_result")
            col.append(image)
            $(".results").append (col)
            }
        });
    }


});