import { Action } from '@ngrx/store';


export interface State {

}

export const initialState: State = {

};

export function searchReducer(state = initialState, action: Action): State {
  switch (action.type) {

    default:
      return state;
  }
}
