import { ActionReducerMap } from '@ngrx/store';
import { playlistReducer, PlaylistState } from './playlist.reducer';
import { GlobalState, globalReducer } from './global.reducer';
import { UserState, userReducer } from './user.reducer';


// state 一个应用级的总的状态(单一状态树)
export interface Appstate {
    playlistState: PlaylistState;
    globalState: GlobalState;
    userState: UserState;
}

// 将状态中的每一个状态注册相应的reducer
export const reducers: ActionReducerMap<Appstate> = {
    playlistState: playlistReducer,
    globalState: globalReducer,
    userState: userReducer,
};

