import { Action } from '@ngrx/store';
import { UserActionTypes } from '../actions';

export interface UserAction extends Action {
    type: string;
    payload: any;
}

// 用户信息
export interface UserState {
    userInfo: any;
    userSongList: any[]; // 用户的歌单
    likeList: any[];
}

export const initialState: UserState = {
    userInfo: null,
    userSongList: [],
    likeList: [],
};

export function userReducer(state: UserState = initialState, action: UserAction) {
    switch (action.type) {
        case UserActionTypes.LoadUserInfoSuccess:
            return {
                userInfo: action.payload[0],
                userSongList: action.payload[1],
                likeList: action.payload[2]['ids'],
            };
        case UserActionTypes.LoadUserInfoError:
            return {
                userInfo: null,
                userSongList: [],
                likeList: [],
            };
        case UserActionTypes.Logout:
            return {
                userInfo: null,
                userSongList: [],
                likeList: [],
            };
        case UserActionTypes.LikeSongSuccess:
            state.likeList = [action.payload, ...state.likeList];
            return state;
        case UserActionTypes.LikeSongError:
            return state;
        default:
            return state;
    }
}
