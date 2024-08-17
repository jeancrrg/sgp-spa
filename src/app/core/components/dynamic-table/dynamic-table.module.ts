import { CommonModule } from "@angular/common";
import { DynamicTableComponent } from "./dynamic-table.component";
import { PrimengCustomModule } from "src/app/shared/modules/primeng-custom.module";
import { NgModule } from "@angular/core";
import { CorePipesModule } from "../../pipes/core-pipes.module";
import { CoreDirectivesModule } from "src/app/shared/directives/core-directives.module";
import { TableModule } from "primeng/table";

@NgModule({
    declarations: [DynamicTableComponent],
    exports: [DynamicTableComponent],
    //entryComponents: [DynamicTableComponent], Depreciado a partir da versão 9 do Primeng
    imports: [
        CommonModule,
        PrimengCustomModule,
        CorePipesModule,
        CoreDirectivesModule,
    ],
})
export class DynamicTableModule {}
