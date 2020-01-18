import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteContactsComponent } from './favorite-contacts.component';

describe('FavoriteContactsComponent', () => {
  let component: FavoriteContactsComponent;
  let fixture: ComponentFixture<FavoriteContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
