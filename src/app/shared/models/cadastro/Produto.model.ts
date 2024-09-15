import { Categoria } from "./Categoria.model";
import { Departamento } from "./Departamento.model";
import { Marca } from "./Marca.model";
import { StatusProduto } from "./StatusProduto.model";
import { TipoProduto } from "./TipoProduto.model";

export class Produto {
    codigo: number;
    nome: string;
    codigoBarrasEAN: string;
    tipoProduto: TipoProduto;
    statusProduto: StatusProduto;
    marca: Marca;
    departamento: Departamento;
    categoria: Categoria;
    dataCadastro: Date;
    dataUltimaAlteracao: Date;
    preco: number;
    quantidadeEstoque: number;
    descricaoDetalhada: string;
}
