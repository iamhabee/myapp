import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import { BlogsDetailsPage } from '../blogs-details/blogs-details';

@IonicPage()
@Component({
  selector: 'page-create-blogs-list',
  templateUrl: 'create-blogs-list.html',
})
export class CreateBlogsListPage {
  public eventList: Array<any>;
    constructor(public navCtrl: NavController, public eventProvider: EventProvider) {

    }

    ionViewDidEnter() {
      this.eventProvider.getEventList().on('value', snapshot => {
      this.eventList = [];
      snapshot.forEach( snap => {
        this.eventList.push({
          id: snap.key,
          name: snap.val().name,
          price: snap.val().price,
          date: snap.val().date,
      });
  return false
    });
  });
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateBlogsListPage');
  }

  goToEventDetail(eventId){
    this.navCtrl.push(BlogsDetailsPage, { 'eventId': eventId });
  }

}
