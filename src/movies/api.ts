import axios from 'axios'
import {MovieListings} from './type';

const httpService = axios.create({
    baseURL: 'https://jsonmock.hackerrank.com/api/movies/'
})

interface FindMoviesParam {
    page: number;
    title?: string;
}

interface Movie {
    Title: string;
    Year: number;
    imdbID: string;
}

interface MoviesApiResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: Array<Movie>
}

const find: ({page, title}: FindMoviesParam) => Promise<MovieListings> = async ({page, title}) => {
    const params = {
        page,
        ...title?.length ? {Title: title} : {}
    }
    const results = await httpService.get<MoviesApiResponse>('search', {params});
    const listings = {
        ...results.data,
        data: results.data.data.map(({Title, Year, imdbID}) => ({title: Title, year: Year, imdbId: imdbID}))
    }
    return listings
}

export {
    find
}
