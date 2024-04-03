import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../users';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements  OnInit {
  users: User[] = []

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(user => this.users = user)
  }

  delete(id: number){
    this.userService.deleteUser(id)
  }
}
