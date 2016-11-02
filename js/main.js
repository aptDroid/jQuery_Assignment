$(function() {
    //variables
    var databaseUrl = 'http://www.omdbapi.com/?s=';
    var pages = 0;
    var limit = 5;
    var offset = 0;
    var searchMovie = "";

    $('#moviePoster').slideUp();
    $('#moviePoster').attr('src', '').attr('alt', '');

    function fetchDataOnSearch() {
        offset = 0;
        searchMovie = $("#searchBox").val().toLowerCase(); //find this movie
        pages = 0;

        $('#moviePoster').slideUp();
        $('#moviePoster').attr('src', '').attr('alt', '');

        if (searchMovie != "" && searchMovie != null) {
            $.ajax({
                type: 'GET',
                url: databaseUrl + searchMovie,
                success: function(movies) {
                    if (movies.Response == "False") {
                        alert("no");
                        $('#movies').html("No results found!");
                        offset = 0;
                    } else {
                        var currentOffset = 1; //offset variable
                        var index = 1; //movie count

                        $('#movies').html("");
                        $('#moviePoster').slideUp(200);
                        $('#movieDetails').slideUp(200);

                        $.each(movies["Search"], function(i, movie) {
                            pages++;
                            if (currentOffset > offset && index <= limit) {
                                $('#movies').append('<p> <a href="#moviePoster" class="movieLink" data-id="' + movie.imdbID + '" data-year="' + movie.Year + '" data-type="' + movie.Type + '" data-title="' + movie.Title + '" data-img="' + movie.Poster + '"><strong>' + movie.Title + '</strong></a><br><strong>Year : </strong>' + movie.Year + '<br><strong>Type : </strong>' + movie.Type.substr(0, 1).toUpperCase() + movie.Type.substr(1, movie.Type.length - 1) + '</p>');
                                index++;
                            }
                            currentOffset++;

                        });
                        pages = pages / limit;

                        for (var btn = 0; btn < pages; btn++) {
                            if (btn == 0)
                                $('#movies').append('<button type="button" class="pageNumber activeClass" value="' + (parseInt(btn) + 1) + '" data-offset="' + (parseInt(btn)) + '">' + (parseInt(btn) + 1) + "</button>");
                            else
                                $('#movies').append('<button type="button" class="pageNumber" value="' + (parseInt(btn) + 1) + '" data-offset="' + (parseInt(btn)) + '">' + (parseInt(btn) + 1) + "</button>");

                        }

                    }
                },
                error: function() {
                    $('#movies').html("Error communicating server. <br>Please retry or try again later.");
                }
            });
        } else {
            $('#movieDetails').html('');
            $('#movies').html("Please, enter a keyword!");
        }
    }

    $('#searchBox').on('search', function() //on search, find movie
        {
            fetchDataOnSearch();
        });

    $('#searchBtn').on('click', function() //on click, find movie
        {
            fetchDataOnSearch();
        });

    $('#movies').delegate('.movieLink', 'click', function() {
        var thisMovie = $(this);

        $('#moviePoster').slideDown();
        $('#movieDetails').slideDown();

        $('#moviePoster').attr('src', thisMovie.attr('data-img')).attr('alt', thisMovie.attr('data-title'));
        $('#movieDetails').html('<p><strong><h3 class="text-primary">' + thisMovie.attr('data-title') + '</h3></strong></a><br><strong>Year : </strong>' + thisMovie.attr('data-year') + '<br><strong>Type : </strong>' + thisMovie.attr('data-type').substr(0, 1).toUpperCase() + thisMovie.attr('data-type').substr(1, thisMovie.attr('data-type').length - 1) + '</p>');

    });


    $('#movies').delegate('.pageNumber', 'click', function() {
        $('#movies').html("");
        $('#movies').html("");

        var thisButton = $(this);
        var btnNumber = thisButton.attr('data-offset');

        offset = parseInt(thisButton.attr('data-offset')) * limit;
        //find this movie
        pages = 0;

        $.ajax({
            type: 'GET',
            url: databaseUrl + searchMovie,
            success: function(movies) {
                var currentOffset = 1; //offset variable
                var index = 1; //movie count

                $.each(movies["Search"], function(i, movie) {

                    pages++;
                    if (currentOffset > offset && index <= limit) {
                        $('#movies').append('<p> <a href="#moviePoster" class="movieLink" data-id="' + movie.imdbID + '" data-year="' + movie.Year + '" data-type="' + movie.Type + '" data-title="' + movie.Title + '" data-img="' + movie.Poster + '"><strong>' + movie.Title + '</strong></a><br><strong>Year : </strong>' + movie.Year + '<br><strong>Type : </strong>' + movie.Type.substr(0, 1).toUpperCase() + movie.Type.substr(1, movie.Type.length - 1) + '</p>');
                        index++;
                    }
                    found = true;
                    currentOffset++;
                });
                pages = pages / limit;

                for (var btn = 0; btn < pages; btn++) {
                    if (btn == btnNumber)
                        $('#movies').append('<button type="button" class="pageNumber activeClass" value="' + (parseInt(btn) + 1) + '" data-offset="' + (parseInt(btn)) + '">' + (parseInt(btn) + 1) + "</button>");
                    else
                        $('#movies').append('<button type="button" class="pageNumber" value="' + (parseInt(btn) + 1) + '" data-offset="' + (parseInt(btn)) + '">' + (parseInt(btn) + 1) + "</button>");
                }
            },
            error: function() {
                $('#movies').html("Error communicating server. <br>Please retry or try again later.");
            }
        })

    });


})