import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import * as fromApp from '../store/app.reducer';
import * as RecipeActions from './store/recipe.actions';
import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipesResolver implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private action$: Actions
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    return this.store.select('recipe').pipe(
      take(1),
      map((recipeState) => {
        return recipeState.recipes;
      }),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          this.store.dispatch(new RecipeActions.FetchRecipes());
          return this.action$.pipe(ofType(RecipeActions.SET_RECIPE), take(1));
        } else {
          return of(recipes);
        }
      })
    );
  }
}
