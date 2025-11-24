import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroIntervenciones } from './registro-intervenciones';

describe('RegistroIntervenciones', () => {
  let component: RegistroIntervenciones;
  let fixture: ComponentFixture<RegistroIntervenciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroIntervenciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroIntervenciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
