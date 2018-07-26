import { Component, OnInit } from '@angular/core';
import { Form } from '../models/form';
import { FormResult } from '../models/formResult';
import { Observable, of } from "rxjs";
import { JsonPipe } from '../../../node_modules/@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  form:Form = new Form();  
  
  formResult:FormResult = new FormResult();  
  forms: FormResult[] = [];
  returnData:any;

  jsonVar:JsonPipe;
  
  ngOnInit() {
    this.form.id = 1;
  }

  onSubmit(){
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
    .then(
      data => {
        this.returnData = data;
        var text; 
        var p3 = Promise.resolve(this.returnData.json());
        var teste = p3.then((v) => {
          this.formResult.id = v["Id"];
          this.formResult.msgs = v["Msgs"];
          this.formResult.price = v["Price"];
          this.formResult.quantity = v["Quantity"];
          this.formResult.side = v["Side"];
          this.formResult.status = v["Status"];
          this.formResult.symbol = v["Symbol"];
          
          this.forms.push(this.formResult);
          this.NewFields();

        }, function(e) {
          console.log(e);
        })
      }      
    )
    .catch((error) => {
      console.error(error);
    })
  }

  NewFields(){
    this.form = new Form();
    this.formResult = new FormResult();
    this.form.id = this.forms.length + 1;
  }

}
