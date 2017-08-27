import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 public rootPage : any;
  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

      // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDmv_c3JVzAQPU3wxxqgdikwULWrgzxauY",
    authDomain: "tradition-1cc50.firebaseapp.com",
    databaseURL: "https://tradition-1cc50.firebaseio.com",
    projectId: "tradition-1cc50",
    storageBucket: "tradition-1cc50.appspot.com",
    messagingSenderId: "868972037990"
  };
  firebase.initializeApp(config);

const unsubscribes = firebase.auth().onAuthStateChanged((user) => {
    if(user){
    this.rootPage=  HomePage;
    unsubscribes();
     }else{
       this.rootPage=LoginPage;
    unsubscribes();
     }
  
  });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

