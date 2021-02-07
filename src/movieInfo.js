import React, { useState, useEffect } from 'react'
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardTitle,
    CardImg,
    CardBody,
    // CardFooter,
    Button
} from 'shards-react';
import './movieinfo.css'
import { CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
// import MoonLoader from "react-spinners/ClipLoader";
import { contextCreate } from './context';
import ReactPaginate from 'react-paginate';
import { fetchData } from './apirequest';
import Moviecard from './moviecard';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function MovieInfo() {
    const [movieInfo, setMovieInfo] = useState([]);
    const [selectedPage, setSelectedPage] = useState(1);
    const [movieResult, setMovieResult] = useState();
    const [carouselImages, setCarouselImages] = useState();
    const [topRatedMovies, setTopRatedMovies] = useState();
    const [genreMovies, setGenreMovies] = useState();

    const movieGenre = [
        'Action',
        'Comedy',
        'Horror',
        'Drama',
        'Thriller',
        'Crime',
        'Science Fiction',
        'War',
        'Animation',
    ]

    const handleDragStart = (e) => e.preventDefault();

    useEffect(() => {
        async function fetchDataRequest() {
            const data = await fetchData(selectedPage);
            console.log('data:', data)
            if (data && Object.keys(data).length > 0) {
                const items = data.trendngMovieInfo;
                const topRated = data.topRatedMovieInfo;
                const genreData = data.genre.action;
                setCarouselImages(items);
                setTopRatedMovies(topRated);
                setGenreMovies(genreData)
                setMovieInfo(data.movieInfo);
                setMovieResult(data);
            }
        }
        fetchDataRequest();
    }, [])

    useEffect(() => {
        async function fetchDataRequest() {
            const data = await fetchData(selectedPage);
            if (data && Object.keys(data).length > 0) {
                setMovieInfo(data.movieInfo);
                const items = data.trendngMovieInfo;
                setCarouselImages(items);
                setMovieResult(data);
            }
        }
        fetchDataRequest();
        window.scrollTo({
            top: 0,
            left: 100,
            behavior: 'smooth'
        })
        const disabledButton = document.getElementsByClassName('disabled');
        if (disabledButton && disabledButton[0]) {
            disabledButton[0].children[0].style.cursor = 'not-allowed';
        }
    }, [selectedPage])

    const handlePageClick = async (e) => {
        const pageSelected = e.selected + 1;
        setSelectedPage(pageSelected);
    }

    const handleSelectTabs = (index) => {
        console.log('index:', index)
        let movieData = genreMovies;
        switch (index) {
            case 0:
                setGenreMovies(movieResult.genre.action)
                break;
            case 1:
                setGenreMovies(movieResult.genre.comedy)
                break;
            case 2:
                setGenreMovies(movieResult.genre.horror)
                break;
            case 3:
                setGenreMovies(movieResult.genre.drama)
                break;
            case 4:
                setGenreMovies(movieResult.genre.thriller)
                break;
            case 5:
                setGenreMovies(movieResult.genre.crime)
                break;
            case 6:
                setGenreMovies(movieResult.genre.sciFi)
                break;
            case 7:
                setGenreMovies(movieResult.genre.war)
                break;
            case 8:
                setGenreMovies(movieResult.genre.animation)
                break;
            default:
                setGenreMovies(movieResult.genre.action)
                break;

        }
    }

    return (
        <>
            <h2>Trending Movies</h2>
            <AliceCarousel
                mouseTracking
                items={carouselImages && carouselImages.map(item => {
                    return <img src={`https://image.tmdb.org/t/p/w342${item.poster_path}`} alt={item.title} onDragStart={handleDragStart} />
                })}
                className='custom-carousel'
                animationType='fadeout'
                autoWidth={true}
                autoPlay={true}
                autoPlayInterval={900}
                disableDotsControls={true}
                disableButtonsControls={true}
                infinite={true}
            />
            <br /><br />
            <section>
                <h2>Top Rated Movies</h2>
                {

                }
            </section>
            <section>
                Genres
                <Tabs defaultIndex={0} onSelect={(index) => handleSelectTabs(index)}>
                    <TabList>
                        {
                            movieGenre.map((item, index) => {
                                return (
                                    <Tab key={index}>{item}</Tab>
                                )
                            })
                        }
                    </TabList>

                    {
                        movieGenre.map((item, index) => {
                            return (
                                <TabPanel key={index}>
                                    {
                                        genreMovies && genreMovies.results && genreMovies.results.length > 0 && genreMovies.results.map(item => {
                                            return (
                                                <Moviecard item={item} key={item.id} />
                                            )
                                        }
                                        )
                                    }
                                </TabPanel>
                            )
                        })
                    }
                </Tabs>
            </section>
            <section>
                <Container>
                    <Row>
                        <Col className='movie-layout'>
                            {
                                movieInfo && movieInfo.length > 0 && movieInfo.map(item =>
                                    // item.release_date ?
                                    // <Moviecard item={item}/>
                                    <Card className='movie-info' key={item.id}>
                                        {/* <CardHeader>Title</CardHeader> */}
                                        <small id='average-voting' title='Average Rating'>{item.vote_average > 2 ? item.vote_average.toFixed(1) : 'N/R'}</small>
                                        <CardImg id='movie-poster' src={`https://image.tmdb.org/t/p/w185${item.poster_path}`} />
                                        <CardBody id='card-body'>
                                            <CardTitle id='card-title' title={item.title}>{item.title}</CardTitle>
                                            <p className='movie-genre'>Release Date - {item.release_date}</p>
                                            <p className='movie-genre'>Language - {item.original_language.toUpperCase()}</p>
                                            <p className='movie-genre'>Genre - {item.genres}</p>
                                            <p className='movie-genre'>Director - {item.director}</p>
                                            <p className='movie-genre'>Available on - {item.streamingPlatoform ? item.streamingPlatoform.flatrate ? item.streamingPlatoform.flatrate.length > 0 ? item.streamingPlatoform.flatrate[0].provider_name ? item.streamingPlatoform.flatrate[0].provider_name : '-' : '-' : '-' : '-'}</p>
                                            <p className='movie-genre'>Run Time - {item.runTime ? `${(item.runTime)} min` : ''}</p>
                                        </CardBody>
                                        {/* <Button id="read-more">Read more &rarr;</Button> */}
                                        {/* <CardFooter>Card footer</CardFooter> */}
                                    </Card>
                                    // : ''
                                )
                            }
                        </Col>
                    </Row>
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={movieResult ? movieResult.pageInfo.total_pages : 2000}
                        marginPagesDisplayed={5}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                </Container>
            </section>
        </>
    )
}