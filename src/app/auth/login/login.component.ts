import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  inputform!: FormGroup;
  form: any;
  btndisabled: boolean = this.authService.btndisabled

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams
    const token = queryParams['token']
    if (token) {
    this.authService.setToken(token);
    }

    this.inputform = new FormGroup({
      token: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if (this.inputform.valid) {
      this.authService.setToken(this.inputform.value.token);
      this.inputform.reset();
    } else {
      alert('Invalid form! Please try again');
    }
    Object.keys(this.inputform.controls).forEach((key) => {
      this.inputform.controls[key].setErrors(null);
    });
    this.btndisabled = true
  }
}
