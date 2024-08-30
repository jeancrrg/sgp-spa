import { Ambiente } from "src/app/core/models/enumerations/Ambiente.enum";

export const environment = {
    production: false,
    config_file: 'assets/config/env.json',
    KEY_DIALOG_HTTP_SERVICE: 'requisicaoHttpService',
    ambiente: Ambiente.LOCAL,
    chaveToken: 'token'
};
