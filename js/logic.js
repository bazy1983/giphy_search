$(document).ready(function(){

    var apiKey = "cnvVfq7XSIKMKEvBcaV7y9oFTHegmF6X",
        search = "cat",
        resultCount = 10,
        request = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey + "&limit=" + resultCount,
        data; //store response data


    $.ajax({
        method : "GET",
        url : request
    }).then(function (res){
        data = res;

        // display data to document
        for (var i = 0; i < res.data.length; i++){
            var col = $("<div class = 'col-md-3 col-xs-6'>")
            var image = $("<img>").attr ({
                src : res.data[i].images.original.url,
                alt : search
            });
          image.addClass("img_result")
          col.append(image)
          $(".results").append (col)
        }
    })

    // var xhr = $.get();
    // xhr.done(function(data) { console.log("success got data", data); });



});