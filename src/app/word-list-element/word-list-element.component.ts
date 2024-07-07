import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {BotApiService} from "../bot-api.service";
import {WordListManager} from "./word-list-manager.service";

@Component({
  selector: 'app-word-list-element',
  templateUrl: './word-list-element.component.html',
  styleUrl: './word-list-element.component.css'
})
export class WordListElementComponent {
  alive: boolean = true;
  @Output() unalived = new EventEmitter<void>();
  @Output() deleteClick = new EventEmitter<void>();
  @Input() dcServer: string = ""
  @Input() dcUser: string = ""
  @Input() item!: any;
  @Input() canDelete: boolean = false;

  constructor(private api: BotApiService, private listManager: WordListManager) {

  }

  deleteWordFromDatabase() {
    if (this.canDelete) {
      this.deleteClick.emit();
      this.api.deleteWord(this.dcServer, this.item.word).subscribe(
        result => {
          if (result) {
            this.alive = false;
            this.unalived.emit();
            this.listManager.killElement.emit(this);
          }
        }
      )
    }
  }

}
