import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

@Component({
    moduleId: module.id,
    selector: "modal",
    template: `
		<StackLayout style="width: 80%; height: 60%">
        <TextField style="padding-top: 30" hint="Enter Group Name"></TextField>
        <TextField style="padding-top: 30" hint="Date of First Game"></TextField>
        <TextField style="padding-top: 30" hint="Max Members"></TextField>
        <Button text="Create" (tap)="close()"></Button>
        <Button text="Cancel" (tap)="close()"></Button>
            
        </StackLayout>
	`
})
export class ModalComponent implements OnInit {

    constructor(private params: ModalDialogParams) {}

    ngOnInit() {}

    close() {
        this.params.closeCallback();
    }
}

