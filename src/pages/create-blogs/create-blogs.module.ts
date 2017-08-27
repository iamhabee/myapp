import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateBlogsPage } from './create-blogs';

@NgModule({
  declarations: [
    CreateBlogsPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateBlogsPage),
  ],
})
export class CreateBlogsPageModule {}
