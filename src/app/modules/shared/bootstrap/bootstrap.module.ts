import { NgModule } from '@angular/core';
import { NgbToastModule, NgbDatepickerModule  } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
      NgbToastModule,
      NgbDatepickerModule
    ],
    exports: [
      NgbToastModule,
      NgbDatepickerModule
    ]
})
export class BootstrapModule { }