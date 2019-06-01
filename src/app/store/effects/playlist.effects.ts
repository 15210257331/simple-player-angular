import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { PlaylistActionTypes, LoadCurrentSongError, LoadCurrentSongSuccess} from '../actions';
import { ApiService } from '../../service/api.service';
import { codeConstant } from 'src/app/constant';

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
        map((data) => data['payload']),
        mergeMap((payload) =>
            forkJoin(
                this.apiService.getSongDetail(payload['id'])
                    .pipe(catchError(() => of({ 'code': codeConstant.errorCode, banners: [] }))),
                this.apiService.getSongUrl(payload['id'])
                    .pipe(catchError(() => of({ 'code': codeConstant.errorCode, result: [] }))),
                this.apiService.getSongLyric(payload['id'])
                    .pipe(catchError(() => of({ 'code': codeConstant.errorCode, result: [] }))),
            )
            .pipe(
                map(data => new LoadCurrentSongSuccess({currentSongDetail: data, currentSong: payload})),
                catchError((err) => {
                    return of(new LoadCurrentSongError(err["message"]));
                })
            )
        )
    )
}