import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToolbarButtonsModule } from './toolbar-buttons/toolbar-buttons.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, ToolbarButtonsModule],
    exports: [ToolbarButtonsModule],
})
export class CoreComponentsModule {}
