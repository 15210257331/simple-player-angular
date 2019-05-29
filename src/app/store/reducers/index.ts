import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';

//import the weather reducer
import { counterReducer } from './counter.reducer';
import { hotStore, HotState } from './hot.reducer';
import { topListStore, TopListState } from './list.reducer';
import { controlStore, ControlState } from './control.reducer';

//state 一个应用级的总的状态
export interface state {
    count: number;
    hotStore: HotState;
    topListStore: TopListState;
    controlStore: ControlState;
}

//将状态中的每一个状态注册相应的reducer
export const reducers: ActionReducerMap<state> = {
    count: counterReducer,
    hotStore: hotStore,
    topListStore: topListStore,
    controlStore: controlStore,
}
