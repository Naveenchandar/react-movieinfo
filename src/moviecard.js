import React from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardImg,
    CardBody,
    // CardFooter,
    Button
} from 'shards-react';
import './movieinfo.css'

function Moviecard({ item }) {
    return (
        <div>
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
        </div>
    )
}

export default Moviecard
