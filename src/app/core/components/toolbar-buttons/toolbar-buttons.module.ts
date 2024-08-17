import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToolbarButtonsComponent } from './toolbar-buttons.component';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
    declarations: [ToolbarButtonsComponent],
    imports: [
        CommonModule,
        ToolbarModule
    ],
    exports: [ToolbarButtonsComponent],
})
export class ToolbarButtonsModule {}
