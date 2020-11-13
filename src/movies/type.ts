export interface Movie {
    title: string;
    year: number;
    imdbId: string;
}

export interface MovieListings {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    data: Array<Movie>
}
