import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateBlogsListPage } from './create-blogs-list';

@NgModule({
  declarations: [
    CreateBlogsListPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateBlogsListPage),
  ],
})
export class CreateBlogsListPageModule {}
