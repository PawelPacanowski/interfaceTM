import {Component, OnInit} from '@angular/core';
import {NONE_TYPE} from "@angular/compiler";
import {BotApiService} from "../bot-api.service";
import {SessionService} from "../session.service";
import {WordListManager} from "../word-list-element/word-list-manager.service";
import {UserListManager} from "../user-list-element/user-list-manager.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent implements OnInit {
  pendingGeneralInfo: number = 2;
  pendingFlaggedWords: boolean = true;
  pendingUserList: boolean = true;
  pendingUserStats: boolean = true;

  dcServerID: string = "none"

  serverTotWords: number = 0;
  serverTotFlagWords: number = 0;

  memberTotWords: number = 0;
  memberTotFlagWords: number = 0;

  serverUsers: any[] = [];
  serverWords: any[] = [];

  selectedMember: any;
  selectedMemberData: any[] = [];

  searchUser: string = "";
  searchByUsr: string = "";
  searchByServ: string = "";
  wordToAdd: string = "";
  wordInputError: boolean = false;

  filteredUsers: any[] = [];
  filteredWordsServ: any[] = [];
  filteredWordsUsr: any[] = [];

  constructor(private api: BotApiService,
              protected sessionService: SessionService,
              private wordListManager: WordListManager,
              private router: Router) {
  }

  ngOnInit() {
    if (this.sessionService.isEstablished()) {
      this.dcServerID = this.sessionService.getSessionServerID();

      this.api.getServerTotalWords(this.dcServerID).subscribe(
        result => {
          this.serverTotWords = parseInt(result);
          this.pendingGeneralInfo = this.pendingGeneralInfo - 1;
        }
      )

      this.api.getServerTotalFlaggedWords(this.dcServerID).subscribe(
        result => {
          this.serverTotFlagWords = parseInt(result);
          this.pendingGeneralInfo = this.pendingGeneralInfo - 1;
        }
      )

      this.wordListManager.killElement.subscribe(() => {
        this.updateUserFlaggedWords(this.selectedMember);
      });

      this.updateWordsList();
      this.updateUsersList();
    }
  }

  private updateWordsList() {
    this.pendingFlaggedWords = true;
    this.api.getServerWords(this.dcServerID).subscribe(
      result => {
        this.serverWords = []
        for (const word of Object.keys(result)) {
          console.log(word, result[word]);
          this.serverWords.push({word: word, count: result[word]});
          this.pendingFlaggedWords = false;
        }
      }
    )
  }

  private updateUsersList() {
    this.pendingUserList = true;
    this.api.getAllMembers(this.dcServerID).subscribe(
      result => {
        this.serverUsers = result;
        console.log(this.serverUsers);
        this.pendingUserList = false;
      }
    )
  }

  wordUnalived() {
    console.log("unalived");
    this.api.getServerTotalFlaggedWords(this.dcServerID).subscribe(
      result => {
        this.serverTotFlagWords = parseInt(result);
        this.pendingFlaggedWords = false;
      }
    )
  }

  addWord() {
    if (this.wordInputError || this.wordToAdd == "") return;
    this.pendingFlaggedWords = true;
    this.api.addWord(this.dcServerID, this.wordToAdd).subscribe(
      result => {
        this.updateWordsList();
        this.updateUserFlaggedWords(this.selectedMember);
      }
    )
  }

  handleWordInput() {
    if (this.wordToAdd.length > 64) this.wordInputError = true;
      else this.wordInputError = false;
  }

  loadSelectedUser(user: any) {
    this.pendingUserStats = true;
    console.log("loading", user.userID);
    this.selectedMember = user;

    this.api.getMemberTotalWords(this.dcServerID, user.userID).subscribe(
      result => {
        this.memberTotWords = parseInt(result);
        console.log(result);
      }
    )

    this.api.getMemberTotalFlaggedWords(this.dcServerID, user.userID).subscribe(
      result => {
        this.memberTotFlagWords = parseInt(result);
        console.log(result);
      }
    )


    this.updateUserFlaggedWords(user);
  }

  updateUserFlaggedWords(user: any) {
    if (user == null) return;

    this.api.getMemberWords(this.dcServerID, user.userID).subscribe(
      result => {
        this.selectedMemberData = [];
        for (const word of Object.keys(result)) {
          console.log(word, result[word]);
          this.selectedMemberData.push({word: word, count: result[word]});
        }
        console.log(this.selectedMember);
        this.pendingUserStats = false;
      }
    )
  }

  deleteMemberData(member: any) {
    if (member == this.selectedMember) {
      this.selectedMember = null;
      this.selectedMemberData = [];
    }
  }

  logout() {
    this.sessionService.resetSession();
    this.router.navigate(['login']);
  }

  sortWordsAsc() {
    this.serverWords.sort((a, b) => a.count - b.count);
    this.filteredWordsServ.sort((a, b) => a.count - b.count);
  }

  sortWordsDsc() {
    this.serverWords.sort((a, b) => b.count - a.count);
    this.filteredWordsServ.sort((a, b) => b.count - a.count);
  }

  sortUserDataAsc() {
    this.selectedMemberData.sort((a, b) => a.count - b.count);
    this.filteredWordsUsr.sort((a, b) => a.count - b.count);
  }

  sortUserDataDsc() {
    this.selectedMemberData.sort((a, b) => b.count - a.count);
    this.filteredWordsUsr.sort((a, b) => b.count - a.count);
  }

  filterWords(collection: string): void {
    if (collection == 'server') {
      const lowerSearchString = this.searchByServ.toLowerCase();
      this.filteredWordsServ = this.serverWords.filter(word =>
        word.word.toLowerCase().includes(lowerSearchString)
      );
    }
    else if (collection == 'user') {
      const lowerSearchString = this.searchByUsr.toLowerCase();
      this.filteredWordsUsr = this.selectedMemberData.filter(word =>
        word.word.toLowerCase().includes(lowerSearchString)
      );
    }
  }

  sortUsersAsc() {
    this.serverUsers.sort((a, b) => a - b);
    this.filteredUsers.sort((a, b) => a - b);
  }

  sortUsersDsc() {
    this.serverUsers.sort((a, b) => b - a);
    this.filteredUsers.sort((a, b) => b - a);
  }

  filterUsers() {
    const lowerSearchString = this.searchUser.toLowerCase();
    this.filteredUsers = this.serverUsers.filter(user =>
      user.toString().toLowerCase().includes(lowerSearchString)
    );
  }
}
