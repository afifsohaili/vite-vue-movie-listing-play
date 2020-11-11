export interface Movie {
    title: string;
    year: number;
    imdbId: string;
}

export interface MovieListings {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: Array<Movie>
}
