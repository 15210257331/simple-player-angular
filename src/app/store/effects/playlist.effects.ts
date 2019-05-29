import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PlaylistActionTypes, LoadCurrentSongError } from '../actions';
import { ApiService } from '../../service/api.service';

// effects 就是一个service  过滤出特定的action 进行相应的异步操作 得到结果后再dispatch相应的成功的action
@Injectable()
export class PlaylistEffects {

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) { }

    @Effect()
    searchData$ = this.actions$.pipe(
        ofType(PlaylistActionTypes.LoadCurrentSong),
        mergeMap((id) => this.apiService.getSongDetail(id)
            .pipe(
                map(data => ({ type: PlaylistActionTypes.LoadCurrentSongSuccess, payload: data })),
                catchError((err) => {
                    //call the action if there is an error
                    return of(new LoadCurrentSongError(err["message"]));
                })
            )
        )
    )
}