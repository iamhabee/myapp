import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login'
import { HomePage } from '../pages/home/home';
import { CreateBlogsListPage } from '../pages/create-blogs-list/create-blogs-list'
import { CreateBlogsPage } from '../pages/create-blogs/create-blogs'
import { BlogsDetailsPage } from '../pages/blogs-details/blogs-details'
import { SignupPage } from '../pages/signup/signup'
import { ResetPage } from '../pages/reset/reset'
import { ProfilePage } from '../pages/profile/profile'
import { AuthProvider } from '../providers/auth/auth';
import { EventProvider } from '../providers/event/event';
import { ProfileProvider } from '../providers/profile/profile';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    SignupPage,
    ResetPage,
    LoginPage,
    CreateBlogsListPage,
    CreateBlogsPage,
    BlogsDetailsPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    SignupPage,
    ResetPage,
    LoginPage,
    CreateBlogsListPage,
    CreateBlogsPage,
    BlogsDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    EventProvider,
    ProfileProvider,
    Camera,
    File,
    FilePath,
    Transfer
  ]
})
export class AppModule {}
