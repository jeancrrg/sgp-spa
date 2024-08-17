import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pxtSimNao'
})
export class PxtSimNaoPipe implements PipeTransform {

  transform(value: any, uppercase?: boolean, accents?: boolean): any {
    let sim: string = 'Sim';
    let nao: string = 'Não';
    sim = uppercase ? sim.toUpperCase() : sim;
    nao = uppercase ? nao.toUpperCase() : nao;
    sim = !accents ? this.removeAccents(sim) : sim;
    nao = !accents ? this.removeAccents(nao) : nao;
    return value ? sim : nao;
    
  }

  private removeAccents(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }

}
