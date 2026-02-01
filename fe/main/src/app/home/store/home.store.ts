import { computed, inject } from '@angular/core';
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  patchState
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { HomeService } from '../services/home.service';
import { initialHomeState } from './home.state';
import { selectHasMessage, selectDisplayMessage } from './home.selectors';

export const HomeStore = signalStore(
  { providedIn: 'root' },
  withState(initialHomeState),
  withComputed((store) => ({
    hasMessage: selectHasMessage(store.message),
    displayMessage: selectDisplayMessage(store.message, store.error)
  })),
  withMethods((store, homeService = inject(HomeService)) => ({
    setMessage(message: string) {
      patchState(store, { message, error: null });
    },
    setError(error: string) {
      patchState(store, { error, loading: false });
    },
    reset() {
      patchState(store, initialHomeState);
    },
    loadMessage: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(() =>
          homeService.getHello().pipe(
            tapResponse({
              next: (message) => patchState(store, { message, loading: false, error: null }),
              error: (err: Error) => patchState(store, { error: err.message, loading: false })
            })
          )
        )
      )
    )
  }))
);
