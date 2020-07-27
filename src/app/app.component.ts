import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'learnfirebase';
  
  items: Observable<any[]>;

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[1-9]+[0-9]*$/),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private firestore: AngularFirestore) {
    this.items = firestore.collection('users').valueChanges();
  }

  ngOnInit(): void {}


  onSubmit() {
   
    this.firestore
      .collection('users')
      .add({ name: this.userForm.value.name, phone: this.userForm.value.phone, email: this.userForm.value.email });
    this.userForm.reset()
  }

  ngOnDestroy(){

  }
}
