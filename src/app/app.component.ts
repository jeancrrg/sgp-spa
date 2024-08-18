import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LoadingService } from './core/components/loading/loading.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    isLoading: boolean = false;

    constructor(
        private primengConfig: PrimeNGConfig,
        private loader: LoadingService
    ) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.loader.isLoading.subscribe(load => {
            if (load !== undefined && load !== null) {
                this.isLoading = load;
            } else {
                this.isLoading = false;
            }
        });
    }
}
