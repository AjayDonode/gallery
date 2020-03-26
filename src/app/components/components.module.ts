import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridListComponent } from './grid-list/grid-list.component';



@NgModule({
  declarations: [GridListComponent],
  imports: [
    CommonModule
  ],
  exports: [GridListComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule { }
