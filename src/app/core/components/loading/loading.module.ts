import { CommonModule } from "@angular/common";
import { LoadingComponent } from "./loading.component";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

@NgModule({
    imports: [CommonModule],
    declarations: [LoadingComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    exports: [LoadingComponent],
})
export class LoadingModule {}
