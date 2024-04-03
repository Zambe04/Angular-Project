import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token')
    if(token){
      this.authService.setToken(token)
      this.router.navigate(['/users'])
    }else{
      this.router.navigate(['/login'])
    }
  }

  openLogin(){
    window.open('https://gorest.co.in/consumer/login')
  }
}
