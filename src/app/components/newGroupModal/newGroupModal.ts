import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { FirebaseService } from "~/app/services/firebase.service";
import { Page } from "tns-core-modules/ui/page/page";
const firebase = require("nativescript-plugin-firebase");
import * as dialogs from "tns-core-modules/ui/dialogs";
import { RouterExtensions } from "nativescript-angular/router";
import { groupCategories } from "~/app/services/shared";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";

@Component({
    moduleId: module.id,
    selector: "modal",
    template: `
        <StackLayout margin="30">
            <Label text="Create New Group" style="font-weight: bold;"></Label>
            <TextField id="gName" [(ngModel)]="gName" style="padding-top: 30" hint="Group Name"></TextField>
            <TextField id="maxN" [(ngModel)]="maxN" keyboardType="number" style="padding-top: 32" hint="Max Members"></TextField>
            <StackLayout>
                <Label text="Category:"></Label>
                <DropDown #dd itemsTextAlignment="center"
                    [items]="items"
                    [(ngModel)]="selectedIndex"
                    row="0"
                    (selectedIndexChanged)="onCategoryChange($event)"
                colSpan="2"></DropDown>
            </StackLayout>
            <Button text="Create" (tap)="createNewGroup()"></Button>
            <Button text="Cancel" (tap)="close()"></Button>
        </StackLayout>
	`
})
export class ModalComponent implements OnInit {

    public gName= "";
    public maxN = 1;
    public groupCategory;
    public selectedIndex;
    public items;

    constructor(private params: ModalDialogParams, private firebaseService: FirebaseService, private router: RouterExtensions) {}

    ngOnInit() {
        this.items = groupCategories;
        this.groupCategory = this.items[0];
    }

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
        const this_ = this;
        firebase.push(
            '/groups',
            {
              'name': name,
              'maxMembers': maxPlayers,
              'ownerId': ownerID,
              'groupCategory': this_.groupCategory,
            }).then( function (result) {
                if(result.key) {
                    this_.addGroupToUser(ownerID, result.key);
                    this_.addUserToGroup(ownerID, result.key)
                    dialogs.alert("Group Created.").then(()=> {
                        this_.close();
                    });
                }
            }
        );
    }
    public addGroupToUser(userID, groupID) {
        firebase.update(
            '/users/'+userID+'/joinedGroups',
            {
                [groupID]: true
            }
        ).then( function (result) {
            // alert('added to user.');
        });
    }

    public addUserToGroup(userID, groupID) {
        firebase.update(
            '/groups/'+groupID+'/users',
            {
                [userID]: true
            }
        ).then( function (result) {
            // alert('added user to group.');
        });
    }

    public onCategoryChange(args: SelectedIndexChangedEventData) {
        this.groupCategory = this.items[args.newIndex];
    }

    public openGroup(groupID, name) {
        this.router.navigate(["/group-view"], { clearHistory: false, queryParams: {groupID: groupID, groupName: name}});
        // alert(groupID);
    }
}

