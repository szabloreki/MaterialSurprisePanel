import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LoginService } from '../login.service';
import { MdSnackBar } from '@angular/material'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: ''
  }
  constructor(
    private loginService: LoginService,
    private snackBar: MdSnackBar,
    private router: Router
  ) { }

  ngOnInit() {}

  login(user) {
    this.loginService.login(this.user)
      .subscribe(
        us => {
          this.snackBar.open('Zalogowano pomyślnie');
          this.router.navigate(['/app/shop/products']);
        },
        err => {
          this.snackBar.open('Zły login lub hasło');
          this.user = { email: '', password: ''};
        }
      )
  }

}
