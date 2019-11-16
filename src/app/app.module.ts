import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { FirebaseService } from "./services/firebase.service";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { MainComponent } from "./components/mainComponent/mainComponent";
import { HomeComponent } from "./components/home/home.component";
import { ModalComponent } from "./components/newGroupModal/newGroupModal";
import { GroupViewComponent } from './components/group-view/group-view.component';
import { ChatComponent } from './components/chat/chat.component';
import { JoinGroupModalComponent } from "./components/join-group-modal/join-group-modal.component";
import { GroupMembersComponent } from './components/group-members/group-members.component';
import { DropDownModule } from "nativescript-drop-down/angular";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        DropDownModule,
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        MainComponent,
        ModalComponent,
        GroupViewComponent,
        ChatComponent,
        JoinGroupModalComponent,
        GroupMembersComponent
    ],
    exports: [
        ModalComponent,
        JoinGroupModalComponent
    ],
    entryComponents: [ModalComponent, JoinGroupModalComponent],
    providers: [FirebaseService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
