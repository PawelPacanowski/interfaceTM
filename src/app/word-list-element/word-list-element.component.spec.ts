import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordListElementComponent } from './word-list-element.component';

describe('WordListElementComponent', () => {
  let component: WordListElementComponent;
  let fixture: ComponentFixture<WordListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WordListElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
