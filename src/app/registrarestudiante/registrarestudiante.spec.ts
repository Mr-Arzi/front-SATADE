import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Registrarestudiante } from './registrarestudiante';

describe('Registrarestudiante', () => {
  let component: Registrarestudiante;
  let fixture: ComponentFixture<Registrarestudiante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registrarestudiante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Registrarestudiante);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
