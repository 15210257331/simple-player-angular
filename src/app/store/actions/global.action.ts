import { Action } from '@ngrx/store';

export enum GlobalActionTypes {
    ToogleShowPlaylist = 'ToogleShowPlaylist',
}

export class ToogleShowPlaylist implements Action {
    readonly type = GlobalActionTypes.ToogleShowPlaylist;
    constructor(public payload:boolean) {}
}

