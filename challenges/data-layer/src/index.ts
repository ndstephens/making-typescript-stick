export interface DataEntity {
  id: string;
}
export interface Movie extends DataEntity {
  director: string;
}
export interface Song extends DataEntity {
  singer: string;
}

//////////

export type DataEntityMap = {
  movie: Movie;
  song: Song;
};

/////////

type DataStoreMethods = {
  [K in keyof DataEntityMap as `add${Capitalize<K>}`]: (
    arg: DataEntityMap[K]
  ) => DataEntityMap[K];
} & {
  [K in keyof DataEntityMap as `get${Capitalize<K>}`]: (
    id: string
  ) => DataEntityMap[K] | undefined;
} & {
  [K in keyof DataEntityMap as `getAll${Capitalize<K>}s`]: () => DataEntityMap[K][];
} & {
  [K in keyof DataEntityMap as `clear${Capitalize<K>}s`]: () => void;
};

///////////

export class DataStore implements DataStoreMethods {
  #store: { [K in keyof DataEntityMap as `${K}s`]: DataEntityMap[K][] } = {
    movies: [],
    songs: [],
  };

  addMovie(arg: Movie): Movie {
    this.#store.movies.push(arg);
    return arg;
  }
  addSong(arg: Song): Song {
    this.#store.songs.push(arg);
    return arg;
  }
  getMovie(id: string): Movie | undefined {
    return this.#store.movies.find((movie) => id === movie.id);
  }
  getSong(id: string): Song | undefined {
    return this.#store.songs.find((song) => id === song.id);
  }
  getAllMovies(): Movie[] {
    return this.#store.movies;
  }
  getAllSongs(): Song[] {
    return this.#store.songs;
  }
  clearMovies(): void {
    this.#store.movies = [];
  }
  clearSongs(): void {
    this.#store.songs = [];
  }
}
