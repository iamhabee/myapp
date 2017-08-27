import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Loading, Platform, LoadingController, ActionSheetController, ToastController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';

declare var cordova: any;
@IonicPage()
@Component({
selector: 'page-profile',
templateUrl: 'profile.html',
})
export class ProfilePage {
  
  lastImage: string = null;
  loading: Loading;
  public userProfile: any;
  public birthDate: string;

    constructor(private camera: Camera, private platform: Platform, private transfer: Transfer, private file: File, private filePath: FilePath, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public navCtrl: NavController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public profileProvider: ProfileProvider, public authProvider: AuthProvider){

    }

        ionViewDidEnter() {
      this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
      this.birthDate = userProfileSnapshot.val().birthDate;
    });
  }

      logOut(): void {
    this.authProvider.logoutUser().then(() => {
    this.navCtrl.setRoot(LoginPage);
    });
  }

      updateName(){
    const alert = this.alertCtrl.create({
    message: "Your first name & last name",
    inputs: [{
    name: 'firstName',
    placeholder: 'Your first name',
    value: this.userProfile.firstName
    },
    {
    name: 'lastName',
    placeholder: 'Your last name',
    value: this.userProfile.lastName
    },
    ],
    buttons: [
    {
    text: 'Cancel',
    },
    {
    text: 'Save',
    handler: data => {
    this.profileProvider.updateName(data.firstName, data.lastName);
        }
      }]
  });
    alert.present();
  }

    updateDOB(birthDate){
  this.profileProvider.updateDOB(birthDate);
  }
        updateEmail(){
      const alert = this.alertCtrl.create({
      inputs: [
      {
      name: 'newEmail',
      placeholder: 'Your new email',
      },
      {
      name: 'password',
      placeholder: 'Your password',
      type: 'password'
      },
      ],
      buttons: [
      {
      text: 'Cancel',
      },
      {
      text: 'Save',
      handler: data => {
      const newEmail = data.newEmail;
      this.profileProvider.updateEmail(data.newEmail, data.password)
      .then( () =>{
      this.userProfile.email = newEmail;
      }).catch(error => {
      console.log('ERROR: '+error.message);
          });
        }
            }]
          });
      alert.present();
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
  // Create options for the Camera Dialog
  var options = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };
 
  // Get the data of an image
  this.camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    }
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });
}

// Create a new name for the image
private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
  }, error => {
    this.presentToast('Error while storing file.');
  });
}
 
private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}
 
// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}
public uploadImage() {
  // Destination URL
  var url = "https://tradition-1cc50.firebaseio.com";
 
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
 
  // File name only
  var filename = this.lastImage;
 
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename}
  };
 
  const fileTransfer: TransferObject = this.transfer.create();
 
  this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });
  this.loading.present();
 
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    this.loading.dismissAll()
    this.presentToast('Image succesful uploaded.');
  }, err => {
    this.loading.dismissAll()
    this.presentToast('Error while uploading file.');
  });
}
        updatePassword(){
      const alert = this.alertCtrl.create({
      inputs: [
      {
      name: 'newPassword',
      placeholder: 'Your new password',
      type: 'password'
      },
      {
      name: 'oldPassword',
      placeholder: 'Your old password',
      type: 'password'
      },
      ],
      buttons: [
      {
      text: 'Cancel',
      },
      {
      text: 'Save',
      handler: data => {
      this.profileProvider.updatePassword(data.newPassword,
      data.oldPassword);
          }
        }]
      });
      alert.present();
  }

}