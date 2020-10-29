 /*
 * Title: security-question-create.component.spec.ts
 * Author: Verlee Washington, Nicole Forke, Janet Blohn, and Joann Saeou
 * Date: 10/24/2020
 * modified By: Joann Saeou
 * Description: this is the typescript file  for security question create configuration page CRUD operation
 */


import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityQuestionCreateComponent } from './security-question-create.component';

describe('SecurityQuestionCreateComponent', () => {
  let component: SecurityQuestionCreateComponent;
  let fixture: ComponentFixture<SecurityQuestionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityQuestionCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityQuestionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
