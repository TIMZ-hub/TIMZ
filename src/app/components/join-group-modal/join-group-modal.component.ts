import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { FirebaseService } from '~/app/services/firebase.service';
const firebase = require("nativescript-plugin-firebase");

@Component({
  selector: 'ns-join-group-modal',
  templateUrl: './join-group-modal.component.html',
  styleUrls: ['./join-group-modal.component.css']
})
export class JoinGroupModalComponent implements OnInit {

  constructor(private params: ModalDialogParams, private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  close() {
    this.params.closeCallback();
  }

  public addGroupToUser(groupID) {
    const this_ = this;
    let userID = '';
    this.firebaseService.getGroupData(groupID).then( result => {
      const isGroupExists = result.value;
      if (isGroupExists) {
        this.firebaseService.getCurrentUser().then(user => {
          userID = user.uid;
          this.firebaseService.addGroupToUserJoinedGroups(userID, groupID);
          this.firebaseService.addUserToGroupMembers(userID, groupID);
        })
      } else {
        alert('Group does not exists.')
      }

    }) .catch(error => console.log("Error: " + error));
  }


}
