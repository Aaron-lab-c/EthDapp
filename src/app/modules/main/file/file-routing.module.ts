import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileComponent } from './file/file.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
const routes: Routes = [
  { path: '', component: FileComponent },
  { path: 'upload', component: FileUploadComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileRoutingModule { }
