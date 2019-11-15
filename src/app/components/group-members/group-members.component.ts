import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { FirebaseService } from '~/app/services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import * as dialogs from "tns-core-modules/ui/dialogs";
const firebase = require("nativescript-plugin-firebase");

@Component({
  selector: 'ns-group-members',
  templateUrl: './group-members.component.html',
  styleUrls: ['./group-members.component.css']
})
export class GroupMembersComponent implements OnInit {

  public groupID;
  public groupName;
  public groupMembers = [];
  public groupOwnerID;

  constructor(private router: RouterExtensions, private firebaseService: FirebaseService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.groupID = params.groupID;
      // this.groupName = params.groupName;
      this.getGroupMembers();
      this.getGroupOwnerID();
    });
  }
  getGroupOwnerID() {
    const this_ = this;
    firebase.getValue('groups/'+this_.groupID+'/ownerId').then( result => {
      if (result && result.value)
        this_.groupOwnerID = result.value;
    })
  }

  onMemberLongPress(memberId, memberName) {
    dialogs.confirm({
      title: "Kick out member",
      message: "Are you sure you wanna kick out " + memberName + "?",
      okButtonText: "Yes",
      cancelButtonText: "No",
  }).then(result => {
      console.log("Dialog result: " + result);
  });
  }

  getGroupMembers() {
    const this_ = this;
    firebase.getValue('groups/'+this_.groupID+'/users').then( result => {
      if (result && result.value) {
        Object.keys(result.value).forEach(key => {
          const value = result.value[key];
          if (value === true) {
              firebase.getValue('/users/'+key+'/name').then( result2 => {
                  if (result) {
                      const name = result2.value;
                      this_.groupMembers.push({id: key, name: name, isBallBringer: false});
                  }
                })
          }

        }
      );
      }
    })
  }

  toggleBallBringer(memb) {
    memb.isBallBringer = !memb.isBallBringer;
  } 

  isGroupOwner(id) {
    if (id === this.groupOwnerID)
      return true;
    return false;
  }

}
