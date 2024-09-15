import { Status } from '../enum/Status.enum';

export class ImagemProduto {
    codigo: number;
    nome: string;
    nomeImagemServidor: string;
    tamanhoImagemBytes: number;
    codigoProduto: number;
    tipoExtensaoImagem: string;
    dataUltimaAlteracao: Date;
    arquivoBase64: string;
    tamanhoImagemConvertido: string;
    statusCadastro: Status;
    mensagemErroCadastro: string;
}
