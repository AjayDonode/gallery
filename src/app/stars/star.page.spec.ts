import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StarPage } from './star.page';

describe('StarPage', () => {
  let component: StarPage;
  let fixture: ComponentFixture<StarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StarPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
