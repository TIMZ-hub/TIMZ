// import { Component } from "@angular/core";

// @Component({
//     selector:"login",
//     templateUrl:"./login.component.html",
//     styleUrls:['./login.component.css'],
//     moduleId: module.id
// })
// export class LoginComponent{

// }
import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { SnackBar } from "nativescript-snackbar";
const applicationSettings = require('tns-core-modules/application-settings');
import {FirebaseService} from '../../services/firebase.service';
import {User} from '../../models/user.model';
import { Page } from "tns-core-modules/ui/page/page";
@Component({
    moduleId: module.id,
    selector: "rr-login",
    templateUrl: "login.component.html",
})
export class LoginComponent implements OnInit {
    isAuthenticating = false;
    public user: User;

    public constructor(private router: RouterExtensions, private firebaseService: FirebaseService, private page: Page) {
      this.page.actionBarHidden = true; 
      this.page.backgroundImage = "res://timz";
      this.user = {
        "email":"",
        "password":""
      }
    }

    public ngOnInit() {
        if(applicationSettings.getBoolean("authenticated", false)) {
            this.router.navigate(["/home"], { clearHistory: true });
        }
    }

    public login() {
     this.firebaseService.login(this.user)
      .then(() => {
        this.isAuthenticating = true;
        applicationSettings.setBoolean("authenticated", true);
        this.router.navigate(["/home"], { clearHistory: true } );
        // this.router.navigate(["/mainComponent"], { clearHistory: true });
      })
      .catch((message:any) => {
        this.isAuthenticating = false;
      });
  }

}
