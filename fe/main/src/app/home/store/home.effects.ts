import { inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { HomeService } from '../services/home.service';

export function createLoadMessageEffect(
  setLoading: (loading: boolean) => void,
  setMessage: (message: string) => void,
  setError: (error: string) => void
) {
  const homeService = inject(HomeService);

  return pipe(
    tap(() => setLoading(true)),
    switchMap(() =>
      homeService.getHello().pipe(
        tapResponse({
          next: (message) => {
            setMessage(message);
            setLoading(false);
          },
          error: (err: Error) => {
            setError(err.message);
            setLoading(false);
          }
        })
      )
    )
  );
}
