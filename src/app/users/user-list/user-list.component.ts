import { Component, OnInit, Output } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../users';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../post/post.service';

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

  constructor(
    private userService: UserService,
    private router: Router,
    private ps: PostService
  ) {}

  ngOnInit(): void {
    this.updateUsers(10);
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

  updateUsers(number: number) {
    this.userService.getUsers(number).subscribe((user) => (this.users = user));
  }

  delete(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.updateUsers(10);
    });
  }

  showForm() {
    this.showAddForm = !this.showAddForm;
  }

  createUser(user: User) {
    try {
      this.userService.addUser(user).subscribe(() => {
        this.userService.getUsers(10).subscribe((user) => {
          this.users = user;
          this.addUserForm.reset();
          this.showForm();
        });
      });
    } catch (error) {
      alert(error);
    }
  }

  searchUser(value: string) {
    this.userService
      .searchUser(value)
      .subscribe((user) => {
        this.users = user;
      });
  }

  numberUsers(number: number) {
    this.updateUsers(number);
  }

  userDetail(user: User) {
    this.router.navigate([`/users/${user.id}`]);
  }
}

