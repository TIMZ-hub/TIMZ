import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { FirebaseService } from '~/app/services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';
import * as dialogs from "tns-core-modules/ui/dialogs";
import { goBack } from 'tns-core-modules/ui/frame/frame';
const firebase = require("nativescript-plugin-firebase");
import * as imagepicker from "nativescript-imagepicker";
import { Page } from 'tns-core-modules/ui/page/page';
const fs = require("tns-core-modules/file-system");

@Component({
  selector: 'ns-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.css']
})
export class GroupViewComponent implements OnInit {

  private groupName;
  private groupID;
  private userID;
  private groupPicURI;

  constructor(private page: Page, private router: RouterExtensions, private firebaseService: FirebaseService, private route: ActivatedRoute) { }

  ngOnInit() {
    const this_ = this;
    this.route.queryParams.subscribe(params => {
      this_.groupID = params.groupID;
      this_.groupName = params.groupName;
      this_.userID = params.userID;
      this_.setGroupPicture();
    });
  }

  public openLeaveGroupDialog() {
    const this_ = this;
    dialogs.confirm({
      title: "Leave Group",
      message: "Are you sure?",
      okButtonText: "Yes",
      cancelButtonText: "No",
  }).then(function (result) {
      if (result === true)
        this_.leaveGroup();
    });
  }

  public setGroupPicture() {
    const this_ = this;
    // let's first determine where we'll create the file using the 'file-system' module
    const documents = fs.knownFolders.documents();
    const logoPath = documents.path + "/myGroupProfilePic.jpg";
    const localLogoFile = documents.getFile("myGroupProfilePic.jpg");
    const remotePath = 'uploads/groupsProfilePics/'+this.groupID+'.jpg';
    this.firebaseService.downloadFile(remotePath, fs.File.fromPath(logoPath)).then(
        function (uploadedFile) {
          console.log("File downloaded to the requested location");
          const Pview: any = this_.page.getViewById(`groupProfilePic`);
          Pview.src = documents.path + '/myGroupProfilePic.jpg';
        },
        function (error) {
          console.log("File download error: " + error);
        }
    );
}

  leaveGroup() {
    this.firebaseService.leaveGroup(this.userID, this.groupID);
    this.router.navigate(["/home"], { clearHistory: true });
  }

  openGroupMembers() {
    const this_ = this;
    this.router.navigate(["/group-members"], { clearHistory: false, queryParams: {groupID: this_.groupID}});
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
          const Pview: any = this_.page.getViewById(`groupProfilePic`);
          Pview.src = selected.android;
          this_.groupPicURI = selected.android;
          this_.firebaseService.uploadGroupProfilePicToFirebase(this_.groupID,  this_.groupPicURI)
        }
    });
    this.list = selection;
    }).catch(function (e) {});
  }

}
