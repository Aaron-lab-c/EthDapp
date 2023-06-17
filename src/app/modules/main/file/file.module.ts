import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileRoutingModule } from './file-routing.module';
import { FileComponent } from './file/file.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileNavtabComponent } from './file-navtab/file-navtab.component';
import { FormsModule } from '@angular/forms';
import { FileDetailComponent } from './file-detail/file-detail.component';

@NgModule({
  declarations: [
    FileComponent,
    FileUploadComponent,
    FileNavtabComponent,
    FileDetailComponent
  ],
  imports: [
    CommonModule,
    FileRoutingModule,
    FormsModule
  ]
})
export class FileModule { }
