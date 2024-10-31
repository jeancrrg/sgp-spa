import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { CommonModule } from "@angular/common";
import { HomeRoutes } from "./home.routes";
import { RouterModule } from "@angular/router";
import { ToolbarButtonsModule } from "src/app/shared/components/toolbar-buttons/toolbar-buttons.module";
import { MenuBarModule } from "../../shared/components/menu-bar/menu-bar.module";
import { DataViewModule } from "primeng/dataview";
import { CarouselModule } from "primeng/carousel";

@NgModule({
    declarations: [HomeComponent],
    imports: [
    CommonModule,
    ToolbarButtonsModule,
    RouterModule.forChild(HomeRoutes),
    MenuBarModule,
    DataViewModule,
    CarouselModule
]
})
export class HomeModule {}
