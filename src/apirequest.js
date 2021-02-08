export const fetchData = async (pageNumber) => {
    let movieInformation = [];
    const commonPath = 'https://api.themoviedb.org/3';
    const apiKey = '8b40eae734096a4234c35315c17d1351';
    const movieResponse = await fetch(
        `${commonPath}/discover/movie?api_key=${apiKey}&with_original_language=ta&sort_by=primary_release_date.desc&page=${pageNumber}`
    );
    const trendngMovieResponse = await fetch(
        `${commonPath}/trending/movie/week?api_key=8b40eae734096a4234c35315c17d1351`
    );

    const genreResponse = await fetch(
        `${commonPath}/genre/movie/list?api_key=${apiKey}&with_original_language=ta`
    );

    const topRatedResponse = await fetch(
        `${commonPath}/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
    );

    const actionResponse = await fetch(
        `${commonPath}/movie/top_rated?api_key=${apiKey}&with_genres=28`
    );

    const comedyResponse = await fetch(
        `${commonPath}/movie/top_rated?api_key=${apiKey}&with_genres=35`
    );

    const horrorResponse = await fetch(
        `${commonPath}/movie/top_rated?api_key=${apiKey}&with_genres=27`
    );

    const dramaResponse = await fetch(
        `${commonPath}/movie/top_rated?api_key=${apiKey}&with_genres=18`
    );

    const thrillerResponse = await fetch(
        `${commonPath}/movie/top_rated?api_key=${apiKey}&with_genres=53`
    );

    const crimeResponse = await fetch(
        `${commonPath}/movie/top_rated?api_key=${apiKey}&with_genres=80`
    );

    const sciFiResponse = await fetch(
        `${commonPath}/movie/top_rated?api_key=${apiKey}&with_genres=878`
    );

    const warResponse = await fetch(
        `${commonPath}/movie/top_rated?api_key=${apiKey}&with_genres=10752`
    );

    const animationResponse = await fetch(
        `${commonPath}/movie/top_rated?api_key=${apiKey}&with_genres=16`
    );

    let movieData = await movieResponse.json();
    const genreData = await genreResponse.json();
    const trendngMovieResponseData = await trendngMovieResponse.json();
    const topRatedResponseData = await topRatedResponse.json();
    const actionResponseData = await actionResponse.json();
    const comedyResponseData = await comedyResponse.json();
    const horrorResponseData = await horrorResponse.json();
    const dramaResponseData = await dramaResponse.json();
    const thrillerResponseData = await thrillerResponse.json();
    const crimeResponseData = await crimeResponse.json();
    const sciFiResponseData = await sciFiResponse.json();
    const warResponseData = await warResponse.json();
    const animationResponseData = await animationResponse.json();
    movieInformation = [{
        ...movieData,
        genreData,
        trendngMovieResponseData,
        topRatedResponseData,
        actionResponseData,
        comedyResponseData,
        horrorResponseData,
        dramaResponseData,
        thrillerResponseData,
        crimeResponseData,
        sciFiResponseData,
        warResponseData,
        animationResponseData
    }]
    function findGenre(genreId, genreArray) {
        for (const item of genreArray) {
            if (item.id === genreId) {
                return item.name;
            }
        }
    }

    function findDirectorName(movieId, movieCreditData) {
        for (const item of movieCreditData) {
            if (item.movieId === movieId && item.job === 'Director') {
                return item.original_name;
            }
        }
    }

    function findStreamingPlatform(movieId, data) {
        let platform = {};
        data[1].forEach(key => {
            if (typeof key === 'object') {
                for (var aaa in key) {
                    key[aaa].movieId = movieId;
                    platform = key[aaa];
                }
            }
        })
        return platform;
    }

    const functionWithPromise = async movie => {
        const movieCreditResponse = await fetch(
            `${commonPath}/movie/${movie.id}/credits?api_key=${apiKey}&with_original_language=ta`
        )
        const movieStreamResponse = await fetch(
            `${commonPath}/movie/${movie.id}/watch/providers?api_key=${apiKey}&with_original_language=ta`
        );
        const movieRunTimeResponse = await fetch(
            `${commonPath}/movie/${movie.id}?api_key=${apiKey}&with_original_language=ta`
        );
        const movieCreditData = await movieCreditResponse.json();
        const movieStreamData = await movieStreamResponse.json();
        const movieRunTimeData = await movieRunTimeResponse.json();
        if (movieCreditData && movieCreditData.crew && movieCreditData.crew.length > 0) {
            for (const crewData of movieCreditData.crew) {
                crewData.movieId = movieCreditData.id;
            }
            const movieDirectorName = findDirectorName(movie.id, movieCreditData.crew)
            movie.director = movieDirectorName;
        }
        let availableOn = {};

        if (movieStreamData && movieStreamData.results) {
            for (const item in movieStreamData) {
                availableOn.movieId = movie.id
                availableOn.platform = movieStreamData[item]
            }
            const streamingPlatoform = findStreamingPlatform(movie.id, Object.entries(availableOn))
            movie.streamingPlatoform = streamingPlatoform;
        }

        if (movieRunTimeData && movieRunTimeData.id === movie.id) {
            const runTime = movieRunTimeData.runtime;
            const status = movieRunTimeData.status;
            movie.runTime = runTime;
            movie.status = status;
        }

        if (movie.genre_ids && movie.genre_ids.length > 0) {
            movie.genre_ids.map(item => {
                const findGenreById = findGenre(item, genreData.genres)
                movie.genres = findGenreById;
            })
        }
        movieInformation = [{
            ...movieData, genreData, movieCreditData, movieStreamData, trendngMovieResponseData,
            topRatedResponseData,
            actionResponseData,
            comedyResponseData,
            horrorResponseData,
            dramaResponseData,
            thrillerResponseData,
            crimeResponseData,
            sciFiResponseData,
            warResponseData,
            animationResponseData
        }]
        return Promise.resolve(movie)
    }

    const anAsyncFunction = async item => {
        return functionWithPromise(item)
    }

    const getData = async () => {
        return Promise.all(movieData.results.map(item => {
            return anAsyncFunction(item)
        }
        ))
    }

    const getGenreData = async (respdata) => {
        let data = respdata?.results.map(item => {
            return anAsyncFunction(item)
        }
        )
        let results = await data;
        return results;
    }

    const genreResults = async (data) => {
        let results = await getGenreData(data);
        console.log('actionResults:', results);
    }
    genreResults(actionResponseData).then(data => {
        return data;
    })
    genreResults(comedyResponseData).then(data => {
        return data;
    })
    genreResults(horrorResponseData).then(data => {
        return data;
    })
    genreResults(dramaResponseData).then(data => {
        return data;
    })
    genreResults(thrillerResponseData).then(data => {
        return data;
    })
    genreResults(crimeResponseData).then(data => {
        return data;
    })
    genreResults(sciFiResponseData).then(data => {
        return data;
    })
    genreResults(warResponseData).then(data => {
        return data;
    })
    genreResults(animationResponseData).then(data => {
        return data;
    })

    return getData().then(data => {
        return ({
            movieInfo: data,
            pageInfo: movieData,
            trendngMovieInfo: trendngMovieResponseData.results,
            topRatedMovieInfo: topRatedResponseData,
            genre: {
                action: actionResponseData,
                comedy: comedyResponseData,
                horror: horrorResponseData,
                drama: dramaResponseData,
                thriller: thrillerResponseData,
                crime: crimeResponseData,
                sciFi: sciFiResponseData,
                war: warResponseData,
                animation: animationResponseData,
            }
        })
    })
}