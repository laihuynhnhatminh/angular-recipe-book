import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShareModule } from '../share/share.module';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';

@NgModule({
  declarations: [ShoppingEditComponent, ShoppingListComponent],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    ShareModule,
    ShoppingListRoutingModule,
  ],
})
export class ShoppingListModule {}
