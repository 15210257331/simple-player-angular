import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';

//import the weather reducer
import { playlistReducer, PlaylistState } from './playlist.reducer';
// import { hotStore, HotState } from './hot.reducer';
// import { topListStore, TopListState } from './list.reducer';
// import { controlStore, ControlState } from './control.reducer';

//state 一个应用级的总的状态
export interface state {
    PlaylistState: PlaylistState;
    // hotStore: HotState;
    // topListStore: TopListState;
    // controlStore: ControlState;
}

//将状态中的每一个状态注册相应的reducer
export const reducers: ActionReducerMap<state> = {
    PlaylistState: playlistReducer,
    // hotStore: hotStore,
    // topListStore: topListStore,
    // controlStore: controlStore,
}
