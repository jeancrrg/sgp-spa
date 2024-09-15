import { Departamento } from './Departamento.model';

export class Categoria {
    codigo: number;
    nome: string;
    indicadorAtivo: boolean;
    departamento: Departamento;
    dataCadastro: Date;
    dataUltimaAlteracao: Date;
}
