export interface MoviesHomepageResults {
  page: number;
  results: movieresults[];
}

interface movieresults {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: string;
  poster_path?: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieInfoType {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | Collection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface Collection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

// ANIME RELATED TYPES

export interface AnimeInfo {
  id?: string;
  title?: Title;
  malId?: number;
  synonyms?: string[];
  isLicensed?: boolean;
  isAdult?: boolean;
  countryOfOrigin?: string;
  trailer?: Trailer;
  image?: string;
  imageHash?: Hash;
  popularity?: number;
  color?: string;
  cover?: string;
  coverHash?: Hash;
  description?: string;
  status?: Status;
  releaseDate?: number;
  startDate?: EndDateClass;
  endDate?: EndDateClass;
  totalEpisodes?: number;
  currentEpisode?: number;
  rating?: number;
  duration?: number;
  genres?: string[];
  season?: string;
  studios?: string[];
  subOrDub?: string;
  type?: RecommendationType;
  recommendations?: Recommendation[];
  characters?: Character[];
  relations?: Relation[];
  mappings?: Mapping[];
  artwork?: Artwork[];
  episodes?: Episode[];
}

interface Artwork {
  img?: string;
  type?: ArtworkType;
  providerId?: ProviderID;
}

enum ProviderID {
  Anilist = "anilist",
  Kitsu = "kitsu",
  Mal = "mal",
  Tvdb = "tvdb",
}

enum ArtworkType {
  Banner = "banner",
  ClearArt = "clear_art",
  ClearLogo = "clear_logo",
  Icon = "icon",
  Poster = "poster",
  TopBanner = "top_banner",
}

interface Character {
  id?: number;
  role?: Role;
  name?: Name;
  image?: string;
  imageHash?: Hash;
  voiceActors?: VoiceActor[];
}

enum Hash {
  Hash = "hash",
}

interface Name {
  first?: string;
  last?: null | string;
  full?: string;
  native?: null | string;
  userPreferred?: string;
}

enum Role {
  Main = "MAIN",
  Supporting = "SUPPORTING",
}

interface VoiceActor {
  id?: number;
  language?: Language;
  name?: Name;
  image?: string;
  imageHash?: Hash;
}

enum Language {
  Chinese = "Chinese",
  English = "English",
  French = "French",
  German = "German",
  Japanese = "Japanese",
  Portuguese = "Portuguese",
  Spanish = "Spanish",
}

interface EndDateClass {
  year?: number;
  month?: number;
  day?: number;
}

export interface Episode {
  id?: string;
  title?: string;
  description?: null;
  number?: number;
  image?: string;
  imageHash?: Hash;
  airDate?: null;
}

interface Mapping {
  id?: string;
  providerId?: string;
  similarity?: number;
  providerType?: ProviderType;
}

enum ProviderType {
  Anime = "ANIME",
  Meta = "META",
}

interface Recommendation {
  id?: number;
  malId?: number;
  title?: Title;
  status?: Status;
  episodes?: number;
  image?: string;
  imageHash?: Hash;
  cover?: string;
  coverHash?: Hash;
  rating?: number;
  type?: RecommendationType;
}

enum Status {
  Completed = "Completed",
}

interface Title {
  romaji?: string;
  english?: null | string;
  native?: string;
  userPreferred?: string;
}

enum RecommendationType {
  Movie = "MOVIE",
  Ona = "ONA",
  Tv = "TV",
  TvShort = "TV_SHORT",
}

interface Relation {
  id?: number;
  relationType?: string;
  malId?: number;
  title?: Title;
  status?: Status;
  episodes?: number | null;
  image?: string;
  imageHash?: Hash;
  color?: null | string;
  type?: string;
  cover?: string;
  coverHash?: Hash;
  rating?: number;
}

interface Trailer {
  id?: string;
  site?: string;
  thumbnail?: string;
  thumbnailHash?: Hash;
}

export interface AnimeSearch {
  currentPage?: number;
  hasNextPage?: boolean;
  results?: Result[];
}

interface Result {
  id?: string;
  malId?: number;
  title?: Title;
  status?: string;
  image?: string;
  imageHash?: string;
  cover?: null | string;
  coverHash?: string;
  popularity?: number;
  description?: string;
  rating?: number;
  genres?: string[];
  color?: null | string;
  totalEpisodes?: number;
  currentEpisodeCount?: number;
  type?: string;
  releaseDate?: number;
  episodeTitle?: string;
  episodeNumber?: number;
}

interface Title {
  romaji?: string;
  english?: null | string;
  native?: string;
  userPreferred?: string;
}

export interface AnimeLinks {
  headers?: Headers;
  sources?: Source[];
  download?: string;
}

interface Headers {
  Referer?: string;
}

interface Source {
  url?: string;
  isM3U8?: boolean;
  quality?: string;
}
