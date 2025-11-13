import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarestudianteComponent } from './registrarestudiante.component';

describe('RegistrarestudianteComponent', () => {
  let component: RegistrarestudianteComponent;
  let fixture: ComponentFixture<RegistrarestudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarestudianteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarestudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
