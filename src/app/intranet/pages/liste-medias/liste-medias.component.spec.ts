import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMediasComponent } from './liste-medias.component';

describe('ListeMediasComponent', () => {
  let component: ListeMediasComponent;
  let fixture: ComponentFixture<ListeMediasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeMediasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeMediasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
