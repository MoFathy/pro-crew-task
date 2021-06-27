import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import User from '../models/User';


export class Dictionary {
  [key: string]: UserView;
}
export class UserView {
  id?: string;
  name?: string;
  mobile?: string;
  email?: string;
  birthDate?: string;
  salary?: string;
}
let dictionary: Dictionary = {
  "en": {
    "id": "Id",
    "name": "Name",
    "mobile": "Mobile",
    "email": "Email",
    "birthDate": "Birth Date",
    "salary": "Salary"
  }
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private angularFirestore: AngularFirestore) { }

  getUserDoc(id) {
    return this.angularFirestore
      .collection('user-collection')
      .doc(id)
      .valueChanges()
  }

  getUserList(): Observable<any[]> {
    return this.angularFirestore
      .collection("user-collection").snapshotChanges()
  }

  createUser(user: User) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection("user-collection")
        .add(user)
        .then(response => { console.log(response) }, error => reject(error));
    });
  }

  deleteUser(user) {
    return this.angularFirestore
      .collection("user-collection")
      .doc(user)
      .delete();
  }

  updateUser(user: User, id) {
    return this.angularFirestore
      .collection("user-collection")
      .doc(id)
      .update({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        birth_date: user.birth_date,
        salary: user.salary
      });
  }

  getDictionary() {
    return dictionary;
  }

}
