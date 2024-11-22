import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceChannelsComponent } from './workspace-channels.component';

describe('WorkspaceChannelsComponent', () => {
  let component: WorkspaceChannelsComponent;
  let fixture: ComponentFixture<WorkspaceChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceChannelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkspaceChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
