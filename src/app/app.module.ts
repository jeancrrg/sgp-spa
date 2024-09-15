import { IConfig, NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe, LocationStrategy, PathLocationStrategy, registerLocaleData } from '@angular/common';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { RouterModule } from '@angular/router';
import { AppRotas } from './app.routes';
import { CoreComponentsModule } from './core/components/core-components.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { LoadingModule } from './core/components/loading/loading.module';
import { LoadingService } from './core/components/loading/loading.service';
import { RequisicaoHttpService } from './core/service/requisicaoHttp.service';
import { NotificacaoService } from './core/service/notificacao.service';
import { environment } from 'src/environments/environment';
import { ConfiguracaoService } from './core/service/configuracao.service';
import { ConfiguracaoAuxiliarService } from './core/service/configuracao.auxiliar.service';
import { ToastModule } from 'primeng/toast';
import localePt from '@angular/common/locales/pt';

export function configServiceCreator(configuracaoService: ConfiguracaoService) {
    return () => configuracaoService.load(environment.config_file);
}

registerLocaleData(localePt);

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [
        RouterModule.forRoot(AppRotas),
        AppLayoutModule,
        CommonModule,
        BrowserModule,
        FormsModule,
        CoreComponentsModule,
        ConfirmDialogModule,
        LoadingModule,
        ToastModule,
        NgxMaskDirective,
        NgxMaskPipe
    ],
    providers: [
        { provide: APP_INITIALIZER, useFactory: configServiceCreator, deps: [ ConfiguracaoService ], multi: true },
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        provideNgxMask(),
        DatePipe,
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        ConfirmationService,
        LoadingService,
        RequisicaoHttpService,
        NotificacaoService,
        MessageService,
        ConfiguracaoAuxiliarService,
        ConfiguracaoService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
