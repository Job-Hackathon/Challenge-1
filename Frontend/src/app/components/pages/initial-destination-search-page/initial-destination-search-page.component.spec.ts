import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialDestinationSearchPageComponent } from './initial-destination-search-page.component';

describe('InitialDestinationSearchPageComponent', () => {
  let component: InitialDestinationSearchPageComponent;
  let fixture: ComponentFixture<InitialDestinationSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitialDestinationSearchPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialDestinationSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
