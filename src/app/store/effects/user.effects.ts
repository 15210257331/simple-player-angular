import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { UserActionTypes, LoadUserInfoSuccess, LoadUserInfoError, LikeSongSuccess, LikeSongError } from '../actions';
import { ApiService } from '../../service/api.service';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) { }

    @Effect()
    userInfo$ = this.actions$.pipe(
        ofType(UserActionTypes.LoadUserInfo),
        map((data) => data['payload']),
        mergeMap((payload) =>
            forkJoin(
                this.apiService.getUserDetail(payload)
                    .pipe(
                        catchError(err => {
                            return of(new LoadUserInfoError(err["message"]));
                        })
                    ),
                this.apiService.getUserSongList(payload)
                    .pipe(
                        catchError(err => {
                            return of(new LoadUserInfoError(err["message"]));
                        })
                    ),
                this.apiService.myLikeSongList(payload)
                    .pipe(
                        catchError(err => {
                            return of(new LoadUserInfoError(err["message"]));
                        })
                    ),
            )
            .pipe(
                map(data => {
                    return new LoadUserInfoSuccess(data);
                }),
                catchError(err => {
                    return of(new LoadUserInfoError(err["message"]));
                })
            )
        )
    );

    @Effect()
    likeSong$ = this.actions$.pipe(
        ofType(UserActionTypes.LikeSong),
        map((data) => data['payload']),
        mergeMap((payload) =>
            this.apiService.likeSong(payload['id'])
                .pipe(
                    map(data => {
                        return new LikeSongSuccess(payload['id']);
                    }),
                    catchError(err => {
                        return of(new LikeSongError(err["message"]));
                    })
                )
        )
    );
}
