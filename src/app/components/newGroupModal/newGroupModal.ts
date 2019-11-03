import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { FirebaseService } from "~/app/services/firebase.service";
import { Page } from "tns-core-modules/ui/page/page";
const firebase = require("nativescript-plugin-firebase");

@Component({
    moduleId: module.id,
    selector: "modal",
    template: `
        <StackLayout>
            <Label text="Create New Group" style="font-weight: bold;"></Label>
            <TextField id="gName" [(ngModel)]="gName" style="padding-top: 30" hint="Group Name"></TextField>
            <TextField id="maxN" [(ngModel)]="maxN" keyboardType="number" style="padding-top: 32" hint="Max Members"></TextField>
            <Button text="Create" (tap)="createNewGroup()"></Button>
            <Button text="Cancel" (tap)="close()"></Button>
        </StackLayout>
	`
})
export class ModalComponent implements OnInit {

    public gName= "";
    public maxN = 1;

    constructor(private params: ModalDialogParams, private firebaseService: FirebaseService) {}

    ngOnInit() {}

    close() {
      this.params.closeCallback();
    }

    public createNewGroup() {
        let ownerID = '';
        firebase.getCurrentUser()
      .then(user => {
        ownerID = user.uid
        this.creatNewGroupToFirebase(this.gName, this.maxN, ownerID);
      })
    }

    public creatNewGroupToFirebase(name, maxPlayers, ownerID) {
        firebase.push(
            '/groups',
            {
              'name': name,
              'maxMembers': maxPlayers,
              'ownerId': ownerID,
            }).then( function (result) {
                if(result.key)
                    alert('Group Created.');
            }
        );
    }
}

