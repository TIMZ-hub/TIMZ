import { Component } from "@angular/core";
import { Location } from "@angular/common";
const applicationSettings = require('tns-core-modules/application-settings');import {FirebaseService} from '../../services/firebase.service';
import {User} from '../../models/user.model';
import * as imagepicker from "nativescript-imagepicker";
import { Page } from "tns-core-modules/ui/page/page";
const imageSourceModule = require(`tns-core-modules/image-source`);
const firebase = require("nativescript-plugin-firebase");
const fs = require("tns-core-modules/file-system");

@Component({
    moduleId: module.id,
    selector: "rr-register",
    templateUrl: "register.component.html",
})
export class RegisterComponent {
    isAuthenticating = false;
    public user: User;
    public list;
    private userProfilePicURI;
    public userName: string;

    public constructor(private page: Page, private location: Location, private firebaseService: FirebaseService) {

        this.user = new User();
        
    }

    public selectProfilePicture() {
      const this_ = this;
      const context = imagepicker.create({ mode: "single"});
      context.authorize().then(function() {
      return context.present();
      }).then(function(selection) {
      selection.forEach(function(selected) {
          // process the selected image
          if (selected.android) {
            const Pview: any = this_.page.getViewById(`userPic`);
            Pview.src = selected.android;
            this_.userProfilePicURI = selected.android;
          }
      });
      this.list = selection;
      }).catch(function (e) {});
    }
    public goBack() {
        this.location.back();
    }
    signUp() {
      const this_ = this;
      this.firebaseService.register(this.user)
        .then((res) => {
          this.isAuthenticating = false;
          const userID = JSON.parse(res as string)['uid'];
          this_.uploadProfilePicToFirebase(userID, this.userProfilePicURI);
          firebase.update('/users/'+userID,
            {'name': this_.userName} ).then( function (result) {
            // alert('updated user name.');
        });
          this.location.back();
        //  this.toggleDisplay();
        })
        .catch((message:any) => {
          alert(message);
          this.isAuthenticating = false;
        });
}

  uploadProfilePicToFirebase(userID, filePath) {
    const this_ = this;
    firebase.storage.uploadFile({
      // the full path of the file in your Firebase storage (folders will be created)
      remoteFullPath: 'uploads/usersProfilePics/'+userID+'.jpg',
      // option 1: a file-system module File object
      localFile: fs.File.fromPath(filePath),
      // get notified of file upload progress
      onProgress: function(status) {
        console.log("Uploaded fraction: " + status.fractionCompleted);
        console.log("Percentage complete: " + status.percentageCompleted);
      }
    }).then(
        function (uploadedFile) {
          console.log("File uploaded: " + JSON.stringify(uploadedFile));
        },
        function (error) {
          console.log("File upload error: " + error);
        }
    );
  }

}
