import { Injectable } from "@angular/core";
import { Ambiente } from "../models/enumerations/Ambiente.enum";
import { environment } from "src/environments/environment";
import { ConfiguracaoService } from "./configuracao.service";

@Injectable()
export class ConfiguracaoAuxiliarService {

  constructor(public configuracaoService: ConfiguracaoService) {
  }

  public getConfiguracao(chave: string, valor: string, deveTerminarComBarra?: boolean) {
    return this.configuracaoService.getConfiguration(chave, valor, deveTerminarComBarra);
  };

  /*  Configurações para Backend */
  public getUrlBackendLocal() {
    return this.getConfiguracao('BACKEND', 'LOCAL');
  };
  public getUrlBackendProducao() {
    return this.getConfiguracao('BACKEND', 'PRD');
  };
  public getUrlBackendHomologacao() {
    return this.getConfiguracao('BACKEND', 'HML');
  };
  public getUrlBackendDesenvolvimento() {
    return this.getConfiguracao('BACKEND', 'DSV');
  };
  public getUrlBackendTeste() {
    return this.getConfiguracao('BACKEND', 'TST');
  };
  /* Fim Configurações para Backend */

  /*  Configurações para Frontend */
  public getUrlFrontendLocal() {
    return this.getConfiguracao('FRONTEND', 'LOCAL');
  };
  public getUrlFrontendProducao() {
    return this.getConfiguracao('FRONTEND', 'PRD');
  };
  public getUrlFrontendHomologacao() {
    return this.getConfiguracao('FRONTEND', 'HML');
  };
  public getUrlFrontendDesenvolvimento() {
    return this.getConfiguracao('FRONTEND', 'DSV');
  };
  public getUrlFrontendTeste() {
    return this.getConfiguracao('FRONTEND', 'TST');
  };
  /* Fim Configurações para Frontend */

  /*  Configurações para FTP */
  public getUrlFtpProducao() {
    return this.getConfiguracao('FTP', 'PRD');
  };
  public getUrlFtpHomologacao() {
    return this.getConfiguracao('FTP', 'HML');
  };
  public getUrlFtpDesenvolvimento() {
    return this.getConfiguracao('FTP', 'DSV');
  };
  public getUrlFtpTeste() {
    return this.getConfiguracao('FTP', 'TST');
  };
  /* Fim Configurações para FTP */

  public getContextoSistema(sistema?: string, ambiente?: Ambiente) {
    if (sistema && sistema !== undefined && sistema !== '') {
      if (ambiente && ambiente !== undefined) {
        return this.getUrlBackendAmbiente(ambiente) + this.getConfiguracao('CONTEXTO_SISTEMAS', sistema);
      } else {
        return this.getConfiguracao('CONTEXTO_SISTEMAS', sistema);
      }
    } else {
      if (ambiente && ambiente !== undefined) {
        return this.getUrlBackendAmbiente(ambiente) + this.getContextoBackendApp();
      } else {
        return this.getContextoBackendApp();
      }
    }
  };

  public getConfiguracaoApp(conf: string, deveTerminarComBarra?: boolean) {
    return this.getConfiguracao('APP', conf, deveTerminarComBarra);
  }

  public getContextoFrontendApp() {
    return this.getConfiguracao('APP', 'CONTEXTO_FRONT');
  }

  public getContextoBackendApp() {
    return this.getConfiguracao('APP', 'CONTEXTO_BACK');
  };

  public getPathImagem(valor: string) {
    return this.getConfiguracao('PATH_IMAGENS', valor, false)
  }

  public getUrlFrontendAutenticacao() {
    return this.getConfiguracao('FRONTEND', 'AUTH');
  }

  public getUrlBackendAtual() {
    return this.getUrlBackendAmbiente(environment.ambiente);
  }

  public getUrlFrontendAtual() {
    return this.getUrlFrontendAmbiente(environment.ambiente);
  }

  public getUrlFtpAtual() {
    return this.getUrlFtpAmbiente(environment.ambiente);
  }

  public getUrlBackendAmbiente(ambiente: Ambiente) {
    switch(ambiente) {
      case Ambiente.PRD:
        return this.getUrlBackendProducao();
      case Ambiente.HML:
        return this.getUrlBackendHomologacao();
      case Ambiente.DSV:
        return this.getUrlBackendDesenvolvimento();
      case Ambiente.TST:
        return this.getUrlBackendTeste();
      case Ambiente.LOCAL:
        return this.getUrlBackendLocal();
      default:
        return this.getUrlBackendProducao();
    }
  }

  public getUrlFrontendAmbiente(ambiente: Ambiente) {
    switch(ambiente) {
      case Ambiente.PRD:
        return this.getUrlFrontendProducao();
      case Ambiente.HML:
        return this.getUrlFrontendHomologacao();
      case Ambiente.DSV:
        return this.getUrlFrontendDesenvolvimento();
      case Ambiente.TST:
        return this.getUrlFrontendTeste();
      case Ambiente.LOCAL:
        return this.getUrlFrontendLocal();
      default:
        return this.getUrlFrontendProducao();
    }
  }

  public getUrlFtpAmbiente(ambiente: Ambiente) {
    switch(ambiente) {
      case Ambiente.PRD:
        return this.getUrlFtpProducao();
      case Ambiente.HML:
        return this.getUrlFtpHomologacao();
      case Ambiente.DSV:
        return this.getUrlFtpDesenvolvimento();
      case Ambiente.TST:
        return this.getUrlFtpTeste();
      case Ambiente.LOCAL:
        return this.getUrlFtpProducao();
      default:
        return this.getUrlFtpProducao();
    }
  }

  public getUrlBackend(sistema?: string, ambiente?: Ambiente) {
    if (sistema && ambiente) {
      return this.getUrlBackendAmbiente(ambiente) + this.getConfiguracao('CONTEXTO_SISTEMAS', sistema);
    }
    if (ambiente) {
      return this.getUrlBackendAmbiente(ambiente) + this.getConfiguracaoApp('CONTEXTO_BACK');
    }
    if (sistema) {
      return this.getUrlBackendAtual() + this.getConfiguracao('CONTEXTO_SISTEMAS', sistema);
    }
    return this.getUrlBackendAtual() + this.getConfiguracaoApp('CONTEXTO_BACK');
  }

  public getCodigoSistema() {
    return this.getConfiguracaoApp('CODIGO_SISTEMA', false);
  }

}
