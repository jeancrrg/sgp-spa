import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MarcaRotas } from "./marca.routes";
import { RouterModule } from "@angular/router";
import { MarcaComponent } from "./marca.component";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { PanelModule } from "primeng/panel";
import { FormsModule } from "@angular/forms";
import { ToolbarButtonsModule } from "src/app/core/components/toolbar-buttons/toolbar-buttons.module";
import { PrimengCustomModule } from "src/app/shared/modules/primeng-custom.module";
import { DynamicTableModule } from "src/app/core/components/dynamic-table/dynamic-table.module";
import { CoreDirectivesModule } from "src/app/shared/directives/core-directives.module";
import { DialogModule } from "primeng/dialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";

@NgModule({
    declarations: [MarcaComponent],
    imports: [
        CommonModule,
        BreadcrumbModule,
        ButtonModule,
        RippleModule,
        PanelModule,
        FormsModule,
        ToolbarButtonsModule,
        DynamicTableModule,
        PrimengCustomModule,
        CoreDirectivesModule,
        DialogModule,
        ConfirmDialogModule,
        RouterModule.forChild(MarcaRotas)
    ]
})
export class MarcaModule { }
