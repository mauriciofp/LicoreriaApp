import { ActionReducerMap } from '@ngrx/store';

import * as ui from './reducers/ui.reducer';

export interface AppState {
  ui: ui.UiState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
};
