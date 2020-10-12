import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Time24to12Format } from "src/app/shared/pipe/time24to12.pipe";

@NgModule({
  declarations: [Time24to12Format],
  imports: [
    CommonModule
  ],
  exports: [Time24to12Format]
})
export class SharedModule { }
