import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
const applicationSettings = require('tns-core-modules/application-settings');
import {FirebaseService} from '../../services/firebase.service';
const firebase = require("nativescript-plugin-firebase");
import * as dialogs from "tns-core-modules/ui/dialogs";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { ModalComponent } from "../newGroupModal/newGroupModal";
import { JoinGroupModalComponent } from "../join-group-modal/join-group-modal.component";
import { Page } from "tns-core-modules/ui/page/page";
const fs = require("tns-core-modules/file-system");

@Component({
    moduleId: module.id,
    selector: "RR-secure",
    templateUrl: "home.component.html",
})
export class HomeComponent implements OnInit {

    public constructor(private page: Page, private router: RouterExtensions, private firebaseService: FirebaseService,
        private viewContainerRef: ViewContainerRef, private modalService: ModalDialogService) { }

    private userGroups = [];
    private userID;

    public ngOnInit() {
        if(!applicationSettings.getBoolean("authenticated", false)) {
            this.router.navigate(["/login"], { clearHistory: false });
        }
        const this_ = this;
        firebase.getCurrentUser().then(user => {
          this.userID = user.uid;
          this_.setUserPicture();
          const ids = [];
          firebase.getValue('/users/'+this.userID).then(result => {
            Object.keys(result['value']).forEach(function(key) {
                this_.updateGroupNameByID(key);
              });
          })
          .catch(error => console.log("Error: " + error));
    });

    }

    public logout() {
        applicationSettings.remove("authenticated");
        this.router.navigate(["/login"], { clearHistory: false });
    }
    
    public onNewGroup(args) {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: true,
            context: {}
        };
        this.modalService.showModal(ModalComponent, options);
    }

    public onJoinGroup(args) {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: true,
            context: {}
        };
        this.modalService.showModal(JoinGroupModalComponent, options);
    }

    public updateGroupNameByID(groupId) {
        const this_ = this;
        firebase.getValue('/groups/'+groupId).then( result => {
            const res = result['value']['name'];
            this_.userGroups.push({key: groupId, name:res});
            console.log(this_.userGroups);
          })
    }

    public openGroup(groupID, name) {
        this.router.navigate(["/group-view"], { clearHistory: false, queryParams: {groupID: groupID, groupName: name, userID: this.userID}});
        // alert(groupID);
    }

    public setUserPicture() {
        const this_ = this;
        // let's first determine where we'll create the file using the 'file-system' module
        const documents = fs.knownFolders.documents();
        const logoPath = documents.path + "/myProfilePic.jpg";
        const localLogoFile = documents.getFile("myProfilePic.jpg");
        firebase.storage.downloadFile({
          remoteFullPath: 'uploads/usersProfilePics/'+this.userID+'.jpg',
          localFile: fs.File.fromPath(logoPath),
        }).then(
            function (uploadedFile) {
              console.log("File downloaded to the requested location");
              const Pview: any = this_.page.getViewById(`userPic`);
              Pview.src = documents.path + '/myProfilePic.jpg';
            },
            function (error) {
              console.log("File download error: " + error);
            }
        );
    }

}


