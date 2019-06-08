import { Action } from '@ngrx/store';

export enum UserActionTypes {
    LoadUserInfo = 'LoadUserInfo',
    LoadUserInfoSuccess = 'LoadUserInfoSuccess',
    LoadUserInfoError = 'LoadUserInfoError',
    Logout = 'Logout',
    LikeSong = 'LikeSong',
    LikeSongSuccess = 'LikeSongSuccess',
    LikeSongError = 'LikeSongError',
}

export class LoadUserInfo implements Action {
    readonly type = UserActionTypes.LoadUserInfo;
    constructor(public payload: number) {}
}

export class LoadUserInfoSuccess implements Action {
    readonly type = UserActionTypes.LoadUserInfoSuccess;
    constructor(public payload: any) {}
}

export class LoadUserInfoError implements Action {
    readonly type = UserActionTypes.LoadUserInfoError;
    constructor(public payload: any) {}
}

export class Logout implements Action {
    readonly type = UserActionTypes.Logout;
    constructor() {}
}

export class LikeSong implements Action {
    readonly type = UserActionTypes.LikeSong;
    constructor(public payload: any) {}
}

export class LikeSongSuccess implements Action {
    readonly type = UserActionTypes.LikeSongSuccess;
    constructor(public payload: any) {}
}

export class LikeSongError implements Action {
    readonly type = UserActionTypes.LikeSongError;
    constructor(public payload: any) {}
}

