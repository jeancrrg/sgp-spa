import { Categoria } from "./Categoria.model";
import { Departamento } from "./Departamento.model";
import { Marca } from "./Marca.model";

export class Produto {
    codigo: number;
    nome: string;
    codigoBarrasEAN: string;
    codigoTipoProduto: number;
    codigoStatus: number;
    marca: Marca;
    departamento: Departamento;
    categoria: Categoria;
    dataUltimaAlteracao: Date;
    preco: number;
    quantidadeEstoque: number;
}
