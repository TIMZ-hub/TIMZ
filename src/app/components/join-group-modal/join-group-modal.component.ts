import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
const firebase = require("nativescript-plugin-firebase");

@Component({
  selector: 'ns-join-group-modal',
  templateUrl: './join-group-modal.component.html',
  styleUrls: ['./join-group-modal.component.css']
})
export class JoinGroupModalComponent implements OnInit {

  constructor(private params: ModalDialogParams) { }

  ngOnInit() {
  }

  close() {
    this.params.closeCallback();
  }

  public addGroupToUser(groupID) {
    const this_ = this;
    let userID = '';
    firebase.getValue('/groups/'+groupID)
    .then( result => {
      const isGroupExists = result.value;
      if (isGroupExists) {
        firebase.getCurrentUser().then(user => {
          userID = user.uid
          firebase.update('/users/'+userID+'/joinedGroups', {[groupID]: true});
          firebase.update('/groups/'+groupID+'/users', {[userID]: true});
        })
      } else {
        alert('Group does not exists.')
      }

    }) .catch(error => console.log("Error: " + error));
  }


}
