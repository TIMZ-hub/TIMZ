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

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        MainComponent,
        ModalComponent,
        GroupViewComponent,
        ChatComponent
    ],
    exports: [
        ModalComponent,
    ],
    entryComponents: [ModalComponent],
    providers: [FirebaseService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
