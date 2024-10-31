import { NgModule } from "@angular/core";
import { MenuBarComponent } from "./menu-bar.component";
import { CommonModule } from "@angular/common";
import { MenubarModule } from "primeng/menubar";

@NgModule({
    declarations: [MenuBarComponent],
    exports: [MenuBarComponent],
    imports: [
        CommonModule,
        MenubarModule
    ]
})
export class MenuBarModule {}
