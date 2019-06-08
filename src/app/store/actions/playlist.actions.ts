import { Action } from '@ngrx/store';

export enum PlaylistActionTypes {
    LoadCurrentSong = 'LoadCurrentSong',
    LoadCurrentSongSuccess = 'LoadCurrentSongSuccess',
    LoadCurrentSongError = 'LoadCurrentSongError',
    ChangeCurrentSong = 'ChangeCurrentSong',
    AddToPlaylist = 'AddToPlaylist',
    DeleteSongFromPlaylist = 'DeleteSongFromPlaylist',
    ClearPlaylist = 'ClearPlaylist',
}

export class LoadCurrentSong implements Action {
    readonly type = PlaylistActionTypes.LoadCurrentSong;
    constructor(public payload:number) {}
}

export class LoadCurrentSongSuccess implements Action {
    readonly type = PlaylistActionTypes.LoadCurrentSongSuccess;
    constructor(public payload:any) {}
}

export class LoadCurrentSongError implements Action {
    readonly type = PlaylistActionTypes.LoadCurrentSongError;
    constructor(public payload:any) {}
}

export class ChangeCurrentSong implements Action {
    readonly type = PlaylistActionTypes.ChangeCurrentSong;
    constructor(public payload: any) { };
}


export class AddToPlaylist implements Action {
    readonly type = PlaylistActionTypes.AddToPlaylist;
    constructor(public payload: any) { };
}

export class DeleteSongFromPlaylist implements Action {
    readonly type = PlaylistActionTypes.DeleteSongFromPlaylist;
    constructor(public payload: number) { }; // 传index
}

export class ClearPlaylist implements Action {
    readonly type = PlaylistActionTypes.ClearPlaylist;
}




// export type SearchActions = LoadHotKeyWord;
