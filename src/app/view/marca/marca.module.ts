import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MarcaRotas } from "./marca.routes";
import { RouterModule } from "@angular/router";
import { MarcaComponent } from "./marca.component";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { ToolbarModule } from "primeng/toolbar";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { PanelModule } from "primeng/panel";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [MarcaComponent],
    imports: [
        CommonModule,
        BreadcrumbModule,
        ToolbarModule,
        ButtonModule,
        RippleModule,
        PanelModule,
        FormsModule,
        RouterModule.forChild(MarcaRotas)
    ]
})
export class MarcaModule { }
