import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { MainScreenComponent } from "./mainScreen/main-screen.component";
import { SignInComponent } from "./signin/signin.component";

const routes: Routes = [
    { path: "", component: MainScreenComponent },
    { path: "login", component: LoginComponent },
    { path: "signin", component: SignInComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
