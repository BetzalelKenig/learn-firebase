import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'learnfirebase';
  items: Observable<any[]>;
  constructor(private firestore: AngularFirestore) {
    this.items = firestore.collection('items').valueChanges();
  }

  ngOnInit(): void {}

  addUser(user) {
    console.log(user);

    this.firestore.collection('items').add({ name: user });
  }
}
