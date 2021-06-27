import { Component, enableProdMode, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs/operators';
import { locale, loadMessages, formatMessage } from 'devextreme/localization';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}
import { UserService } from 'src/app/services/user.service';


if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService],
  preserveWhitespaces: true
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  faTrash = faTrash;
  payments = [];
  formatMessage = formatMessage;
  locale: string = "en";

  constructor(private service: UserService) {


  }

  ngOnInit(): void {
    this.initMessages();
    locale(this.locale);
    this.loadUsers();
  }

  initMessages() {
    loadMessages(this.service.getDictionary());
  }

  refreshUsers(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.service.getUserList().pipe(map((mutation: any[]) => mutation.map((p, i) => {
      return { ...p.payload.doc.data(), 'key': [p.payload.doc.id][0], 'index': i + 1 };
    }))).subscribe(data => {
      this.users = data;
    })
  };

  removeUser = e =>this.service.deleteUser(e.data.key);

  updateUser = e =>this.service.updateUser(e.data, e.data.key);

}
