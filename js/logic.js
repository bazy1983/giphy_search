$(document).ready(function(){

    

    $(".btn").on("click", function(){
        $(".results").empty();
        
        var apiKey = "cnvVfq7XSIKMKEvBcaV7y9oFTHegmF6X",
        search = $("input").val(),
        resultCount = $(".dropdown option:selected").val(),
        request = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey + "&limit=" + resultCount,
        data; //store response data

        $.ajax({
            method : "GET",
            url : request
        }).then(function (res){
            data = res;

            // display data to document
            for (var i = 0; i < res.data.length; i++){
                var col = $("<div class = 'img_box col-md-3 col-xs-6'>")
                var image = $("<img>").attr ({
                    src : res.data[i].images.original.url,
                    alt : search
                });
            image.addClass("img_result")
            col.append(image)
            $(".results").append (col)
            }
        });

    });
    // var xhr = $.get();
    // xhr.done(function(data) { console.log("success got data", data); });



});