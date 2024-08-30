import { Ambiente } from "src/app/core/models/enumerations/Ambiente.enum";

export const environment = {
    production: true,
    config_file: 'assets/config/env.json',
    KEY_DIALOG_HTTP_SERVICE: 'httpService',
    ambiente: Ambiente.PRD,
    chaveToken: 'token'
};
