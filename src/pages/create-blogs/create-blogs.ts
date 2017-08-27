import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';


@IonicPage()
@Component({
  selector: 'page-create-blogs',
  templateUrl: 'create-blogs.html',
})
export class CreateBlogsPage {

  constructor(public navCtrl: NavController, public eventProvider: EventProvider) {

  }
  createEvent(eventName: string, eventDate: string, eventPrice: number, eventCost: number) {
      this.eventProvider.createEvent(eventName, eventDate, eventPrice, eventCost)
      .then( newEvent => {
      this.navCtrl.pop();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateBlogsPage');
  }

}
