import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationResultsPageComponent } from './destination-results-page.component';

describe('DestinationResultsPageComponent', () => {
  let component: DestinationResultsPageComponent;
  let fixture: ComponentFixture<DestinationResultsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationResultsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationResultsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
