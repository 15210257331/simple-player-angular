import { Action } from '@ngrx/store';
import { PlaylistActionTypes } from '../actions';


export interface PlaylistAction extends Action {
    type: string;
    payload: any
}

// 每首歌的详情
export interface SongDetail {
    _id: string,
    songName: string,
    songPic: 'assets/img/default-music-pic.jpg',
    songDesc: string,
    singerName: string,
    url: string,
    lyrics: any[],
    additional: any
}

// 播放列表接口
export interface PlaylistState {
    songList: any[],
    currentSong: SongDetail
}

export const initialState: PlaylistState = {
    songList: [],
    currentSong: {
        _id: '',
        songName: '',
        songPic: 'assets/img/default-music-pic.jpg',
        songDesc: '',
        singerName: '',
        url: '',
        lyrics: [],
        additional: ''
    }
};

export function playlistReducer(state: PlaylistState = initialState, action: PlaylistAction): PlaylistState {
    switch (action.type) {
        case PlaylistActionTypes.LoadCurrentSongSuccess:
            state.currentSong = action.payload;
            const arr = state.songList.map(item => item.id);
            if (arr.indexOf(action.payload.id) < 0) {
                state.songList = [...state.songList, action.payload];
            }
            return state;
        case PlaylistActionTypes.AddToSongList:
            const arr1 = state.songList.map(item => item.id);
            if (arr1.indexOf(action.payload.id) < 0) {
                state.songList = [...state.songList, action.payload];
            }
            return state;
        case PlaylistActionTypes.DeleteSongList:
            state.songList.splice(action.payload, 1);
            return state;
        default:
            return state;
    }
}
