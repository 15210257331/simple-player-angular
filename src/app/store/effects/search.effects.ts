import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TopListActionTypes, LoadTopListError } from '../actions';
import { SearchService } from '../../services';

// effects 就是一个service  过滤出特定的action 进行相应的异步操作 得到结果后再dispatch相应的成功的action
@Injectable()
export class SearchEffects {

  // 获取搜索列表
  @Effect()
  searchData$ = this.actions$
    .pipe(
      ofType(TopListActionTypes.LoadData),
      mergeMap((data) => this.searchListService.searchResult(data)
          .pipe(
            map(data => ({ type: '[TopList API] Data Loaded Success', payload: data })),
            catchError((err) => {
              //call the action if there is an error
              return of(new LoadTopListError(err["message"]));
            })
          ))
    )

  // 热搜推荐

  constructor(
    private actions$: Actions,
    private searchListService: SearchService
  ) { }
}