import {EventEmitter, Injectable} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Make service available throughout the application
})
export class UserListManager {
  selectOne= new EventEmitter<any>();
}
