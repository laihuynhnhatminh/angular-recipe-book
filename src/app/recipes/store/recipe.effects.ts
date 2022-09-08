import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.action$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        'https://angular-recipe-book-8ce1c-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
      );
    }),
    map((recipes) => {
      return recipes.map((recipe) => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : [],
        };
      });
    }),
    map((recipes) => {
      return new RecipeActions.SetRecipe(recipes);
    })
  );

  @Effect({ dispatch: false })
  storeRecipes = this.action$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipe')),
    switchMap(([actionData, recipeState]) => {
      return this.http.put(
        'https://angular-recipe-book-8ce1c-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
        recipeState.recipes
      );
    })
  );

  constructor(
    private action$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
