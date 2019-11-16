import * as firebase from "nativescript-plugin-firebase";
import {Injectable, NgZone} from "@angular/core";
import {User} from '../models/user.model';
const fs = require("tns-core-modules/file-system");

@Injectable()
export class FirebaseService {
  constructor(
    private ngZone: NgZone,
  ){

  }

  register(user: User) {
      return firebase.createUser({
        email: user.email,
        password: user.password
      }).then(
            function (result:any) {
              return JSON.stringify(result);
            },
            function (errorMessage:any) {
              alert(errorMessage);
            }
        )
    }

  login(user: User) {
    return firebase.login({
      type: firebase.LoginType.PASSWORD,
      passwordOptions: {
        email: user.email,
        password: user.password
      }
    }).then((result: any) => {
          return JSON.stringify(result);
      }, (errorMessage: any) => {
        alert(errorMessage);
      });
  }

  uploadUserProfilePicToFirebase(userID, filePath) {
    firebase.storage.uploadFile({
      // the full path of the file in your Firebase storage (folders will be created)
      remoteFullPath: 'uploads/usersProfilePics/'+userID+'.jpg',
      // option 1: a file-system module File object
      localFile: fs.File.fromPath(filePath),
      // get notified of file upload progress
      onProgress: function(status) {
        console.log("Uploaded fraction: " + status.fractionCompleted);
        console.log("Percentage complete: " + status.percentageCompleted);
      }
    }).then(
        function (uploadedFile) {
          console.log("File uploaded: " + JSON.stringify(uploadedFile));
        },
        function (error) {
          console.log("File upload error: " + error);
        }
    );
  }

  leaveGroup(userID, groupID) {
    firebase.remove("/users/"+ userID + '/joinedGroups/'+ groupID);
    firebase.remove("/groups/"+ groupID + '/users/'+ userID);
  }

  getGroupOwnerId(groupID) {
    return firebase.getValue('groups/'+groupID+'/ownerId');
  }

  getGroupMembers(groupID) {
    return firebase.getValue('groups/'+groupID+'/users');
  }

  getUserNameByUserID(userID) {
    return firebase.getValue('/users/'+userID+'/name');
  }

  getUserGroups(userID) {
    return firebase.getValue('/users/'+userID+'/joinedGroups');
  }

  getCurrentUser() {
    return firebase.getCurrentUser();
  }

  getGroupData(groupID) {
    return firebase.getValue('/groups/'+groupID);
  }

  downloadFile(remoteFullPath, localFile) {
    return firebase.storage.downloadFile({
      remoteFullPath: remoteFullPath,
      localFile: localFile,});
  }

  addGroupToUserJoinedGroups(userID, groupID) {
    return firebase.update('/users/'+userID+'/joinedGroups', {[groupID]: true});
  }

  addUserToGroupMembers(userID, groupID) {
    return firebase.update('/groups/'+groupID+'/users', {[userID]: true});
  }

  createNewGroup(name, maxPlayers, ownerID, category) {
    return firebase.push(
      '/groups',
      {
        'name': name,
        'maxMembers': maxPlayers,
        'ownerId': ownerID,
        'groupCategory': category,
      });
  }

  setUserName(userID, userName) {
    return firebase.update('/users/'+userID, {'name': userName} );
  }

  uploadGroupProfilePicToFirebase(groupID, filePath) {
    const this_ = this;
    firebase.storage.uploadFile({
      remoteFullPath: 'uploads/groupsProfilePics/'+groupID+'.jpg',
      localFile: fs.File.fromPath(filePath),
      onProgress: function(status) {
        console.log("Uploaded fraction: " + status.fractionCompleted);
        console.log("Percentage complete: " + status.percentageCompleted);
      }
    }).then(
        function (uploadedFile) {
          console.log("File uploaded: " + JSON.stringify(uploadedFile));
        },
        function (error) {
          console.log("File upload error: " + error);
        }
    );
  }
}
