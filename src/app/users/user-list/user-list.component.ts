import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../users';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  showAddForm: boolean = false;
  addUserForm!: FormGroup;
  searchForm!: FormGroup;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.updateUsers();
    this.addUserForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      id: new FormControl(1234567, Validators.required),
      status: new FormControl('active'),
    });
    this.searchForm = new FormGroup({
      searchValue: new FormControl(''),
    });
  }

  updateUsers() {
    this.userService.getUsers().subscribe((user) => (this.users = user));
  }

  delete(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.updateUsers();
    });
  }

  showForm() {
    this.showAddForm = !this.showAddForm;
  }

  createUser() {
    try {
      const user: User = this.addUserForm.value;
      this.userService.addUser(user).subscribe(() => {
        this.userService.getUsers().subscribe((user) => {
          this.users = user;
          this.addUserForm.reset();
          this.showForm();
        });
      });
    } catch (error) {
      alert(error);
    }
  }

  searchUser() {
    this.userService
      .searchUser(this.searchForm.value.searchValue)
      .subscribe((user) => {
        this.users = user;
      });
  }

  userDetail(id: number){
    this.router.navigate([`/users/${id}`]);
  }
}
