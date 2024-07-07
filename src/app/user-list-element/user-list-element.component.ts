import {Component, EventEmitter, input, Input, Output} from '@angular/core';
import {BotApiService} from "../bot-api.service";
import {UserListManager} from "./user-list-manager.service";

@Component({
  selector: 'app-user-list-element',
  templateUrl: './user-list-element.component.html',
  styleUrl: './user-list-element.component.css'
})
export class UserListElementComponent {
  alive: boolean = true;
  @Input() isSelected: boolean = false;
  @Output() onSelect= new EventEmitter<any>();
  @Output() onUnselect= new EventEmitter<any>();
  @Output() unalived = new EventEmitter<void>();
  @Input() userID: string = ""

  constructor(private listManger: UserListManager) {
    this.listManger.selectOne.subscribe(selected => {
      if (selected == this) this.selectElement();
      else this.unselectElement();
    })
  }



  public handleClick() {
    this.listManger.selectOne.emit(this);

    // this.listManger.eventUnselectAll.emit();
    // this.isSelected = !this.isSelected;
    // if (this.isSelected) this.selected.emit();
    // console.log("selected", this.userID);
  }

  public unselectElement() {
    this.isSelected = false;
    this.onUnselect.emit(this);
  }

  public selectElement() {
    if (this.isSelected) {
      this.unselectElement();
      return;
    }

    this.isSelected = true;
    this.onSelect.emit(this);
  }
}
