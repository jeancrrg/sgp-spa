import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoProdutoComponent } from './resumo-produto.component';

describe('ResumoProdutoComponent', () => {
  let component: ResumoProdutoComponent;
  let fixture: ComponentFixture<ResumoProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumoProdutoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
