
export interface MusicInfo {
    id?: string;
    songName?: string;
    songPic?: string;
    songDesc?: string;
    singerName?: string;
    url?: string;
    lyrics?: any[];
    additional?: any;
}

export interface MyMusicListInfo {
    id?: string;
    name: string;
    description?: string;
    songs: MusicInfo[];
}
