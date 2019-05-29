import { Action } from '@ngrx/store';

export enum PlaylistActionTypes {
    LoadCurrentSong = 'LoadCurrentSong',
    LoadCurrentSongSuccess = 'LoadCurrentSongSuccess',
    LoadCurrentSongError = 'LoadCurrentSongError',
    ChangeCurrentSong = 'ChangeCurrentSong',
    AddToSongList = 'AddToSongList',
    DeleteSongList = 'DeleteSongList'
}

export class LoadCurrentSong implements Action {
    readonly type = PlaylistActionTypes.LoadCurrentSong;
    constructor(public payload:string) {}
}

export class LoadCurrentSongSuccess implements Action {
    readonly type = PlaylistActionTypes.LoadCurrentSongSuccess;
    constructor(public payload:any) {}
}

export class LoadCurrentSongError implements Action {
    readonly type = PlaylistActionTypes.LoadCurrentSongError;
    constructor(public payload:any) {}
}

export class AddToSongList implements Action {
    readonly type = PlaylistActionTypes.AddToSongList;
    constructor(public payload: any) { };
}

export class ChangeCurrentSong implements Action {
    readonly type = PlaylistActionTypes.ChangeCurrentSong;
    constructor(public payload: any) { };
}



// export type SearchActions = LoadHotKeyWord;
