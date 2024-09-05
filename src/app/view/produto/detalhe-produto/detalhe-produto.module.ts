import { NgModule } from "@angular/core";
import { DetalheProdutoComponent } from "./detalhe-produto.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PanelModule } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { ToolbarButtonsModule } from 'src/app/core/components/toolbar-buttons/toolbar-buttons.module';
import { PrimengCustomModule } from 'src/app/shared/modules/primeng-custom.module';
import { DynamicTableModule } from 'src/app/core/components/dynamic-table/dynamic-table.module';
import { CoreDirectivesModule } from 'src/app/shared/directives/core-directives.module';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DetalheProdutoRotas } from "./detalhe-produto.routes";
import { GalleriaModule } from "primeng/galleria";

@NgModule({
    declarations: [DetalheProdutoComponent],
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
        GalleriaModule,
        RouterModule.forChild(DetalheProdutoRotas)
    ]
})
export class DetalheProdutoModule {}
