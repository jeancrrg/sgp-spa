import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar-buttons.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ToolbarComponent],
    imports: [CommonModule, ToolbarModule],
    exports: [ToolbarComponent],
})
export class ToolbarModule {}
