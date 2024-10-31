import { NgModule } from '@angular/core';
import { ToolbarButtonsComponent } from './toolbar-buttons.component';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@NgModule({
    declarations: [ToolbarButtonsComponent],
    exports: [ToolbarButtonsComponent],
    imports: [
        CommonModule,
        ToolbarModule,
        InputGroupModule,
        InputGroupAddonModule
    ]
})
export class ToolbarButtonsModule {}
