import { NgModule } from "@angular/core";
import { SobreComponent } from "./sobre.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SobreRotas } from "./sobre.routes";

@NgModule({
    declarations: [SobreComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(SobreRotas)
    ]
})
export class SobreModule { }
