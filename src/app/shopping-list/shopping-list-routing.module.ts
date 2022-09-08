import { RouterModule, Routes } from '@angular/router';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ShoppingListComponent,
    children: [{ path: ':name/edit', component: ShoppingEditComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingListRoutingModule {}
