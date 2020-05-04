import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridListComponent } from './grid-list/grid-list.component';
import { CardListComponent } from './card-list/card-list.component';




@NgModule({
  declarations: [GridListComponent, CardListComponent],
  imports: [
    CommonModule
  ],
  exports: [GridListComponent, CardListComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule { }
