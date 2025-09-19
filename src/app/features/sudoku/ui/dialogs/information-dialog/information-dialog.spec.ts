import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationDialog } from './information-dialog';

describe('InformationDialog', () => {
  let component: InformationDialog;
  let fixture: ComponentFixture<InformationDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
