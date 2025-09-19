import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Actions } from './actions';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Actions', () => {
  let component: Actions;
  let fixture: ComponentFixture<Actions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Actions],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Actions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
