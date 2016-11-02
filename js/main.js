$(function() {
    //variables
    var databaseUrl = 'http://www.omdbapi.com/?s=';
    var found = false;
    var pages = 0;
    var limit = 5;
    var offset = 0;
    var searchMovie = "";

    //selectors
    var $movies = $('#movies'); //movie display panel
    var $pic = $('#moviePoster');
    var $details = $('#movieDetails');



    $pic.slideUp();
    $pic.attr('src', '');
    $pic.attr('alt', '');


    $('#searchBox').on('search', function() //on click of search button, find movie
        {
            offset = 0;
            searchMovie = $("#searchBox").val().toLowerCase(); //find this movie
            pages = 0;

            $pic.slideUp();
            $pic.attr('src', '');
            $pic.attr('alt', '');

            if (searchMovie != "" && searchMovie != null) {
                $.ajax({
                    type: 'GET',
                    url: databaseUrl + searchMovie,
                    success: function(movies) {
                        var currentOffset = 1; //offset variable
                        var index = 1; //movie count

                        $movies.html("");

                        $pic.slideUp(200);
                        $details.slideUp(200);

                        console.log('success', movies["Search"]);

                        $.each(movies["Search"], function(i, movie) {

                            //{
                            pages++;
                            if (currentOffset > offset && index <= limit) {
                                $movies.append('<p> <a href="#moviePoster" class="movieLink" data-id="' + movie.imdbID + '" data-year="' + movie.Year + '" data-type="' + movie.Type + '" data-title="' + movie.Title + '" data-img="' + movie.Poster + '"><strong>' + movie.Title + '</strong></a><br><strong>Year : </strong>' + movie.Year + '<br><strong>Type : </strong>' + movie.Type.substr(0, 1).toUpperCase() + movie.Type.substr(1, movie.Type.length - 1) + '</p>');
                                index++;
                                console.log(movie.Poster);
                            }
                            found = true;
                            currentOffset++;
                            //}
                        });

                        //offset = currentOffset-1;

                        if (!found) {
                            $movies.html("No results found!");
                            offset = 0;
                        }

                        if (found) {
                            console.log(pages);
                            pages = pages / limit;

                            for (var btn = 0; btn < pages; btn++) {
                                if (btn == 0)
                                    $movies.append('<button type="button" class="pageNumber activeClass" value="' + (parseInt(btn) + 1) + '" data-offset="' + (parseInt(btn)) + '">' + (parseInt(btn) + 1) + "</button>");
                                else
                                    $movies.append('<button type="button" class="pageNumber" value="' + (parseInt(btn) + 1) + '" data-offset="' + (parseInt(btn)) + '">' + (parseInt(btn) + 1) + "</button>");
                            }

                        }
                    },
                    error: function() {
                        $movies.html("Error communicating server. <br>Please retry or try again later.");
                    }
                })
            } else {
                $movies.html("Please, enter a keyword!");
            }
        });



    $('#searchBtn').on('click', function() //on click of search button, find movie
        {
            offset = 0;
            searchMovie = $("#searchBox").val().toLowerCase(); //find this movie
            pages = 0;

            $pic.slideUp();
            $pic.attr('src', '');
            $pic.attr('alt', '');

            if (searchMovie != "" && searchMovie != null) {
                $.ajax({
                    type: 'GET',
                    url: databaseUrl + searchMovie,
                    success: function(movies) {
                        var currentOffset = 1; //offset variable
                        var index = 1; //movie count

                        $movies.html("");

                        $pic.slideUp(200);
                        $details.slideUp(200);

                        console.log('success', movies["Search"]);

                        $.each(movies["Search"], function(i, movie) {

                            //{
                            pages++;
                            if (currentOffset > offset && index <= limit) {
                                $movies.append('<p> <a href="#moviePoster" class="movieLink" data-id="' + movie.imdbID + '" data-year="' + movie.Year + '" data-type="' + movie.Type + '" data-title="' + movie.Title + '" data-img="' + movie.Poster + '"><strong>' + movie.Title + '</strong></a><br><strong>Year : </strong>' + movie.Year + '<br><strong>Type : </strong>' + movie.Type.substr(0, 1).toUpperCase() + movie.Type.substr(1, movie.Type.length - 1) + '</p>');
                                index++;
                                console.log(movie.Poster);
                            }
                            found = true;
                            currentOffset++;
                            //}
                        });

                        //offset = currentOffset-1;

                        if (!found) {
                            $movies.html("No results found!");
                            offset = 0;
                        }

                        if (found) {
                            console.log(pages);
                            pages = pages / limit;

                            for (var btn = 0; btn < pages; btn++) {
                                if (btn == 0)
                                    $movies.append('<button type="button" class="pageNumber activeClass" value="' + (parseInt(btn) + 1) + '" data-offset="' + (parseInt(btn)) + '">' + (parseInt(btn) + 1) + "</button>");
                                else
                                    $movies.append('<button type="button" class="pageNumber" value="' + (parseInt(btn) + 1) + '" data-offset="' + (parseInt(btn)) + '">' + (parseInt(btn) + 1) + "</button>");
                            }

                        }
                    },
                    error: function() {
                        $movies.html("Error communicating server. <br>Please retry or try again later.");
                    }
                })
            } else {
                $movies.html("Please, enter a keyword!");
            }
        });






    $movies.delegate('.movieLink', 'click', function() {

        $pic.slideDown();
        $details.slideDown();

        var thisMovie = $(this);
        console.log(thisMovie.attr('data-id'));
        console.log(thisMovie.attr('data-year'));
        console.log(thisMovie.attr('data-type'));
        console.log(thisMovie.attr('data-title'));
        console.log(thisMovie.attr('data-img'));


        $pic.attr('src', thisMovie.attr('data-img')).attr('alt', thisMovie.attr('data-title'));
        $details.html('<p><strong><h3 class="text-primary">' + thisMovie.attr('data-title') + '</h3></strong></a><br><strong>Year : </strong>' + thisMovie.attr('data-year') + '<br><strong>Type : </strong>' + thisMovie.attr('data-type').substr(0, 1).toUpperCase() + thisMovie.attr('data-type').substr(1, thisMovie.attr('data-type').length - 1) + '</p>');


    });


    $movies.delegate('.pageNumber', 'click', function() {
        var thisButton = $(this);
        console.log(thisButton.attr('data-offset'));

        //button number
        var btnNumber = thisButton.attr('data-offset');

        $movies.html("");

        offset = parseInt(thisButton.attr('data-offset')) * limit;
        //var searchMovie = $("#searchBox").val().toLowerCase(); //find this movie
        pages = 0;

        //alert(searchMovie);
        console.log("inside click");

        // if (searchMovie != "" && searchMovie != null) 
        // {
        $.ajax({
            type: 'GET',
            url: databaseUrl + searchMovie,
            success: function(movies) {
                var currentOffset = 1; //offset variable
                var index = 1; //movie count

                $movies.html("");
                console.log('success', movies["Search"]);

                $.each(movies["Search"], function(i, movie) {

                    console.log(searchMovie);
                    //if (movie.Title.toLowerCase().indexOf(searchMovie) >= 0)  //movie found
                    //{
                    pages++;
                    if (currentOffset > offset && index <= limit) {
                        $movies.append('<p> <a href="#moviePoster" class="movieLink" data-id="' + movie.imdbID + '" data-year="' + movie.Year + '" data-type="' + movie.Type + '" data-title="' + movie.Title + '" data-img="' + movie.Poster + '"><strong>' + movie.Title + '</strong></a><br><strong>Year : </strong>' + movie.Year + '<br><strong>Type : </strong>' + movie.Type.substr(0, 1).toUpperCase() + movie.Type.substr(1, movie.Type.length - 1) + '</p>');
                        index++;
                    }
                    found = true;
                    currentOffset++;
                    //}
                });

                //offset = currentOffset-1;

                if (!found) {
                    $movies.html("No results found!");
                    offset = 0;
                }

                if (found) {
                    pages = pages / limit;

                    for (var btn = 0; btn < pages; btn++) {
                        if (btn == btnNumber)
                            $movies.append('<button type="button" class="pageNumber activeClass" value="' + (parseInt(btn) + 1) + '" data-offset="' + (parseInt(btn)) + '">' + (parseInt(btn) + 1) + "</button>");
                        else
                            $movies.append('<button type="button" class="pageNumber" value="' + (parseInt(btn) + 1) + '" data-offset="' + (parseInt(btn)) + '">' + (parseInt(btn) + 1) + "</button>");
                    }
                }
            },
            error: function() {
                $movies.html("Error communicating server. <br>Please retry or try again later.");
            }
        })

    });


})