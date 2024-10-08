import { TabelaDinamicaService } from './../../core/service/tabela-dinamica.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { catchError, of, tap } from 'rxjs';
import { DynamicTableComponent } from 'src/app/core/components/dynamic-table/dynamic-table.component';
import { TablePrimeColumOptions } from 'src/app/core/components/dynamic-table/TablePrimeColumOptions';
import { NotificacaoService } from 'src/app/core/service/notificacao.service';
import { ValidationUtils } from 'src/app/core/utils/ValidationUtils.util';
import { Departamento } from 'src/app/shared/models/cadastro/Departamento.model';
import { ConfirmacaoDialogDTO } from 'src/app/shared/models/dto/ConfirmacaoDialogDTO.model';
import { DepartamentoService } from 'src/app/shared/services/departamento.service';
import { ExcelService } from 'src/app/shared/services/excel.service';

@Component({
    selector: 'app-departamento',
    templateUrl: './departamento.component.html',
    styleUrl: './departamento.component.scss',
})
export class DepartamentoComponent implements OnInit {

    itemsBreadCrumb: MenuItem[] = [];
    filtroCodigoDepartamento: number;
    filtroNomeDepartamento: string;
    filtroIndicadorDepartamentoAtivo: boolean = true;
    estaCadastrando: boolean = false;
    estaEditando: boolean = false;
    listaDepartamentos: Departamento[] = [];

    @ViewChild('tabelaDepartamento') tabelaDepartamento: DynamicTableComponent;

    colunasTabelaDepartamento: TablePrimeColumOptions[] = [
        { header: 'Código', field: 'codigo', width: '10%', align: 'center' },
        { header: 'Nome', field: 'nome', align: 'center' },
        { header: 'Ativo', field: 'indicadorAtivo', width: '10%', align: 'center', boolField: true},
        { header: 'Data Cadastro', field: 'dataCadastro', dateField: true, datePipe: 'dd/MM/yyyy HH:mm', width: '15%', align: 'center' },
        { header: 'Última Alteração', field: 'dataUltimaAlteracao', dateField: true, datePipe: 'dd/MM/yyyy HH:mm', width: '15%', align: 'center' },
        { header: '', width: '5%', align: 'center', buttonField: true, iconButton: "pi pi-pencil", command: (Departamento) =>
            this.habilitarEdicao(Departamento), tooltip: "Editar" },
        { header: '', width: '5%', align: 'center', buttonField: true, iconButton: "pi pi-times", command: (Departamento) =>
            this.abrirDialogConfirmacaoInativacao(Departamento), tooltip: "Inativar" }
    ];

    constructor(
        private confirmationService: ConfirmationService,
        private notificacaoService: NotificacaoService,
        private tabelaDinamicaService: TabelaDinamicaService,
        private excelService: ExcelService,
        private departamentoService: DepartamentoService
    ) { }

    ngOnInit(): void {
        this.itemsBreadCrumb.push({ icon: 'pi pi-home', routerLink: ['/']});
        this.itemsBreadCrumb.push({ label: 'Cadastro'});
        this.itemsBreadCrumb.push({ label: 'Departamento' });
        this.pesquisar();
    }

    pesquisar(): void {
        this.listaDepartamentos = [];
        this.departamentoService.buscar(this.filtroCodigoDepartamento, this.filtroNomeDepartamento, this.filtroIndicadorDepartamentoAtivo, true).pipe(
            tap((response) => {
                this.listaDepartamentos = [...response];
				if (!ValidationUtils.isNotUndefinedAndNotNull(this.listaDepartamentos) || this.listaDepartamentos.length == 0) {
					this.notificacaoService.informacao('Nenhum departamento encontrado!', undefined, false, 10);
				}
                this.listaDepartamentos = [...this.listaDepartamentos];
            }),
            catchError((error) => {
                this.notificacaoService.erro(error.error, undefined, false, 10);
                return of();
            })
        ).subscribe();
    }

    limparFiltros(): void {
        this.filtroCodigoDepartamento = undefined;
        this.filtroNomeDepartamento = undefined;
    }

    habilitarCadastro(): void {
        this.estaCadastrando = true;
        this.estaEditando = false;
        this.limparFiltros();
        this.listaDepartamentos = [];
        this.filtroIndicadorDepartamentoAtivo = true;
    }

    habilitarEdicao(departamento: Departamento): void {
        this.estaEditando = true;
        this.estaCadastrando = false;
        this.filtroCodigoDepartamento = departamento.codigo;
        this.filtroNomeDepartamento = departamento.nome;
        this.filtroIndicadorDepartamentoAtivo = departamento.indicadorAtivo;
        this.listaDepartamentos = [];
    }

    desabilitarCadastroEdicao(): void {
        this.estaCadastrando = false;
        this.estaEditando = false;
        this.limparFiltros();
    }

    salvar(): void {
        if (!ValidationUtils.stringNotEmpty(this.filtroNomeDepartamento)) {
            this.notificacaoService.aviso('Nome do departamento não encontrado! Informe o nome!', undefined, false, 10);
            return;
        }

        let departamento: Departamento = new Departamento();
        departamento.codigo = this.estaEditando ? this.filtroCodigoDepartamento : undefined;
        departamento.nome = this.filtroNomeDepartamento;
        departamento.indicadorAtivo = this.filtroIndicadorDepartamentoAtivo;

        if (this.estaCadastrando) {
            this.cadastrarDepartamento(departamento);
        } else {
            this.atualizarDepartamento(departamento);
        }
    }

    cadastrarDepartamento(departamento: Departamento): void {
        this.departamentoService.cadastrar(departamento, true).pipe(
            tap((response) => {
                let departamentoSalvo = response;
                this.listaDepartamentos.push(departamentoSalvo);
                this.limparFiltros();
                this.estaCadastrando = false;
                this.estaEditando = false;
                this.pesquisar();
                this.notificacaoService.sucesso('Departamento cadastrado com sucesso!', undefined, false, 10);
            }),
            catchError((error) => {
                this.notificacaoService.erro(error.error, undefined, false, 10);
                return of();
            })
        ).subscribe();
    }

    atualizarDepartamento(departamento: Departamento): void {
        this.departamentoService.atualizar(departamento, true).pipe(
            tap((response) => {
                let departamentoSalvo = response;
                this.listaDepartamentos.push(departamentoSalvo);
                this.limparFiltros();
                this.estaCadastrando = false;
                this.estaEditando = false;
                this.pesquisar();
                this.notificacaoService.sucesso('Departamento atualizado com sucesso!', undefined, false, 10);
            }),
            catchError((error) => {
                this.notificacaoService.erro(error.error, undefined, false, 10);
                return of();
            })
        ).subscribe();
    }

    exportarExcel(): void {
        const listaDadosDepartamentos: any[] = this.tabelaDinamicaService.montarListaDadosExportacao(this.colunasTabelaDepartamento, this.listaDepartamentos)
        this.excelService.exportarArquivoExcel(listaDadosDepartamentos, 'relatorio_departamentos');
    }

    abrirDialogConfirmacaoInativacao(departamento: Departamento): void {
        let dtoConfirmacao = new ConfirmacaoDialogDTO();
        dtoConfirmacao.key = 'dialogConfirmacaoInativacao';
        dtoConfirmacao.message = 'Deseja realmente inativar esse departamento?';
        dtoConfirmacao.accept = () => {
            this.inativar(departamento);
        }
		this.confirmationService.confirm(dtoConfirmacao);
    }

    inativar(departamento: Departamento): void {
        if (!departamento.indicadorAtivo) {
            this.notificacaoService.aviso('Não é possível inativar pois esse departamento já está inativo!', undefined, false, 10);
            return;
        }
        this.departamentoService.inativar(departamento.codigo, true).pipe(
            tap(() => {
                this.pesquisar();
                this.notificacaoService.sucesso('Departamento inativado com sucesso!', undefined, false, 10);
            }),
            catchError((error) => {
                this.notificacaoService.erro(error.error, undefined, false, 10);
                return of();
            })
        ).subscribe();
    }

}
