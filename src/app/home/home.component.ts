import { Component, OnInit } from '@angular/core';
import { Form } from '../models/form';
import { Observable, of } from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  form:Form = new Form();  
  forms: Form[] = [];

  ngOnInit() {
    this.form.id = 1;
  }

  onSubmit(){
    console.log(this.form);
    fetch('http://localhost:63864/api/Form/' , {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        form: this.form
      })
    })
    .then((data) => {
      this.forms.push(this.form);
      this.NewFields();
    })
    .catch((error) => {
      console.error(error);
    })
  }

  NewFields(){
    this.form = new Form();
    this.form.id = this.forms.length + 1;
  }

}
