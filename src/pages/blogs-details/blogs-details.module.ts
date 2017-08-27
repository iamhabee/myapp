import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlogsDetailsPage } from './blogs-details';

@NgModule({
  declarations: [
    BlogsDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BlogsDetailsPage),
  ],
})
export class BlogsDetailsPageModule {}
