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
    this.route.queryParams.subscribe(params => {
      this.groupID = params.groupID;
      this.groupName = params.groupName;
      this.userID = params.userID;
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
        }
    });
    this.list = selection;
    }).catch(function (e) {});
  }

}
