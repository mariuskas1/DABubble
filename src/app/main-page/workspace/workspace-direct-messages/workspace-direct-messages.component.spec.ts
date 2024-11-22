import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceDirectMessagesComponent } from './workspace-direct-messages.component';

describe('WorkspaceDirectMessagesComponent', () => {
  let component: WorkspaceDirectMessagesComponent;
  let fixture: ComponentFixture<WorkspaceDirectMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceDirectMessagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkspaceDirectMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
