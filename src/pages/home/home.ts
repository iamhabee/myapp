import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { CreateBlogsPage } from '../create-blogs/create-blogs';
import { CreateBlogsListPage } from '../create-blogs-list/create-blogs-list';
import { ProfilePage } from '../profile/profile';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

 
export class HomePage {

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) {

  }
  

  goToProfile(){
   let toast = this.toastCtrl.create({
      message: 'User Login successfully',
      duration: 3000
    });
    toast.present();
    this.navCtrl.push(ProfilePage)
  }
  goToCreate(){ 
    this.navCtrl.push(CreateBlogsPage); 
  }
  goToList(){ 
    this.navCtrl.push(CreateBlogsListPage); 
  }

  
}

