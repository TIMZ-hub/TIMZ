import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
const applicationSettings = require('tns-core-modules/application-settings');
import {FirebaseService} from '../../services/firebase.service';
const firebase = require("nativescript-plugin-firebase");
import * as dialogs from "tns-core-modules/ui/dialogs";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { ModalComponent } from "../newGroupModal/newGroupModal";

@Component({
    moduleId: module.id,
    selector: "RR-secure",
    templateUrl: "home.component.html",
})
export class HomeComponent implements OnInit {

    public constructor(private router: RouterExtensions, private firebaseService: FirebaseService,
        private viewContainerRef: ViewContainerRef, private modalService: ModalDialogService) { }

    private userGroups = [];
    private userID;

    public ngOnInit() {
        if(!applicationSettings.getBoolean("authenticated", false)) {
            this.router.navigate(["/login"], { clearHistory: true });
        }
        const this_ = this;
        firebase.getCurrentUser().then(user => {
          this.userID = user.uid
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
        this.router.navigate(["/login"], { clearHistory: true });
    }
    
    public onNewGroup(args) {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: true,
            context: {}
        };
        this.modalService.showModal(ModalComponent, options);
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
        this.router.navigate(["/group-view"], { clearHistory: true, queryParams: {groupID: groupID, groupName: name}});
        // alert(groupID);
    }

}


