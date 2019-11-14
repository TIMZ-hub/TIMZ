import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/home/home.component";
import { MainComponent } from "./components/mainComponent/mainComponent";
import { GroupViewComponent } from "./components/group-view/group-view.component";
import { ChatComponent } from "./components/chat/chat.component";
import { GroupMembersComponent } from "./components/group-members/group-members.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "home", component: HomeComponent },
    { path: "home1", component: HomeComponent },
    { path: "mainComponent", component: MainComponent },
    { path: "group-view", component: GroupViewComponent },
    { path: "chat", component: ChatComponent },
    { path: "group-members", component: GroupMembersComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
