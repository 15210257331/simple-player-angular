import { Action } from '@ngrx/store';
import { GlobalActionTypes } from '../actions/global.action';

export interface GlobalAction extends Action {
    type: string;
    payload: any
}

// 全局状态
export interface GlobalState {
   showPlaylist: boolean;
}


export const initialState: GlobalState = {
    showPlaylist: false,
};

export function globalReducer(state: GlobalState = initialState, action: GlobalAction) {
    switch (action.type) {
        case GlobalActionTypes.ToogleShowPlaylist:
            state.showPlaylist = action.payload;
            return state;
        default:
            return state;
    }
}
