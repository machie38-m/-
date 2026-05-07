export interface AnimeResult {
    id: string;
    title: string | any;
    image?: string;
    episodeNumber?: number;
    type?: string;
    [key: string]: any;
}

export interface AnimeInfo extends AnimeResult {
    description?: string;
    genres?: string[];
    status?: string;
    releaseDate?: string;
    rating?: string;
    episodes?: Episode[];
}

export interface Episode {
    id: string;
    number: number;
    title?: string;
    [key: string]: any;
}
