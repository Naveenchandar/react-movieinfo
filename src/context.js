import React, { useState, createContext } from "react";
import { fetchData } from './apirequest';

// Create Context Object
export const contextCreate = createContext();

export const ContextProvider = props => {
    const [movieInfo, setMovieInfo] = useState(0);
    const [movieResult, setMovieResult] = useState(0);
    React.useEffect(() => {
        async function fetchDataRequest() {
            const data = await fetchData();
            console.log('data:', data)
            if (data && Object.keys(data).length > 0) {
                setMovieInfo(data.movieInfo);
                setMovieResult(data);
            }
        }
        fetchDataRequest();
    }, [])

    return (
        <contextCreate.Provider value={[movieInfo, setMovieInfo,movieResult,setMovieResult]}>
            {props.children}
        </contextCreate.Provider>
    );
};