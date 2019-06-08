import { Action } from '@ngrx/store';
import { PlaylistActionTypes } from '../actions';
import * as helper from '../../utils/helpers';

export interface PlaylistAction extends Action {
    type: string;
    payload: any
}

// 每首歌的详情
export interface SongDetail {
    id: string,
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
    playlist: any[],
    currentSong: SongDetail,
    currentIndex: number,
}

export const initialState: PlaylistState = {
    playlist: [],
    currentSong: {
        id: '',
        songName: '',
        songPic: 'assets/img/default-music-pic.jpg',
        songDesc: '',
        singerName: '',
        url: '',
        lyrics: [],
        additional: ''
    },
    currentIndex: -1,
};

export function playlistReducer(state: PlaylistState = initialState, action: PlaylistAction) {
    switch (action.type) {
        case PlaylistActionTypes.LoadCurrentSongSuccess:
            const [songInfo, songUrl, songLyrics] = action.payload.currentSongDetail;
            state.currentSong = { // 一定要这么写不能进行属性赋值
                id: songInfo['songs'][0]['id'],
                songName: songInfo['songs'][0]['name'],
                songPic: songInfo['songs'][0]['al']['picUrl'],
                songDesc: songInfo['songs'][0]['name'],
                singerName: songInfo['songs'][0]['ar'][0]['name'],
                url: songUrl['data'][0]['url'],
                lyrics: songLyrics['lrc'] ? helper.formatLyric(songLyrics['lrc']['lyric']) : [],
                additional: songInfo['songs'][0]
            };
            const playlist = state.playlist.map(item => item.id);
            if (playlist.indexOf(action.payload.currentSong.id) < 0) {
                state.playlist = [...state.playlist, action.payload.currentSong];
            }
            const newPlaylist = state.playlist.map(item => item.id);
            state.currentIndex = newPlaylist.indexOf(action.payload.currentSong.id);
            return state;
        case PlaylistActionTypes.LoadCurrentSongError:
            return state;
        case PlaylistActionTypes.AddToPlaylist:
            const arr1 = state.playlist.map(item => item.id);
            if (arr1.indexOf(action.payload.id) < 0) {
                state.playlist = [...state.playlist, action.payload];
            }
            return state;
        case PlaylistActionTypes.DeleteSongFromPlaylist:
            let arr = state.playlist.map(item => item.id);
            if (action.payload === state.currentIndex) {
                state.currentIndex = -1;
                state.currentSong = {
                    id: '',
                    songName: '',
                    songPic: 'assets/img/default-music-pic.jpg',
                    songDesc: '',
                    singerName: '',
                    url: '',
                    lyrics: [],
                    additional: ''
                };
            }
            state.playlist.splice(action.payload, 1);
            return state;
        case PlaylistActionTypes.ClearPlaylist:
            state.playlist = [];
            state.currentIndex = -1;
            state.currentSong = {
                id: '',
                songName: '',
                songPic: 'assets/img/default-music-pic.jpg',
                songDesc: '',
                singerName: '',
                url: '',
                lyrics: [],
                additional: ''
            };
            return state;
        default:
            return state;
    }
}
