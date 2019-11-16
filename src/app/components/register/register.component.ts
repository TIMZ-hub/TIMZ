import { Component } from "@angular/core";
import { Location } from "@angular/common";
const applicationSettings = require('tns-core-modules/application-settings');import {FirebaseService} from '../../services/firebase.service';
import {User} from '../../models/user.model';
import * as imagepicker from "nativescript-imagepicker";
import { Page } from "tns-core-modules/ui/page/page";
const imageSourceModule = require(`tns-core-modules/image-source`);
const firebase = require("nativescript-plugin-firebase");

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
          this_.firebaseService.uploadUserProfilePicToFirebase(userID, this.userProfilePicURI);
          this.firebaseService.setUserName(userID, this_.userName).then( function (result) {
            // alert('updated user's name.');
        });
          this.location.back();
        //  this.toggleDisplay();
        })
        .catch((message:any) => {
          alert(message);
          this.isAuthenticating = false;
        });
}


}
