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

    public ngOnInit() {
        if(!applicationSettings.getBoolean("authenticated", false)) {
            this.router.navigate(["/login"], { clearHistory: true });
        }
        // const userDetails = <any>this.firebaseService.getUserInfo();
        // console.log(userDetails);
    }

    public logout() {
        applicationSettings.remove("authenticated");
        this.router.navigate(["/login"], { clearHistory: true });
    }
    
    public onNewGroup(args) {
        // const groupName = "test group name";
        // const groupID = "r4r4r4r4r4r4r";
        // const ownerID = "d5g5";
        // firebase.setValue(
        //     '/groups',
        //     {foo:'bar'}
        // ).then(function (result) {
        //       alert("created fooo");
        //     }
        // );    
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: true,
            context: {}
        };
        this.modalService.showModal(ModalComponent, options);
    }

}


