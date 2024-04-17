import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UsersRoutingModule } from '../users-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from '../user.service';
import { User } from '../users';
import { forkJoin, of } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

let mockModel: User[] = [
  {
    id: 1234567,
    name: 'Pier',
    email: 'pier@gmaail.com',
    gender: 'male',
    status: 'active',
  },
  {
    id: 3456789,
    name: 'Anne',
    email: 'anne@gmaail.com',
    gender: 'female',
    status: 'inactive',
  },
];

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let service: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        UsersRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(UserService);
  });

  beforeEach(() => {
    spyOn(service, 'getUsers').and.returnValue(of(mockModel));

    component.ngOnInit();
    service.getUsers(10).subscribe((users) => {
      component.users = users;
      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the user-list', () => {
    let modelName = fixture.nativeElement.querySelector(
      'span[class=name-user]'
    );

    expect(component.users).toEqual(mockModel);
    expect(service.getUsers).toHaveBeenCalledTimes(3);
    expect(modelName.innerHTML).toContain(mockModel[0].name);
  });

  it('should show and hide the add-user form', () => {
    let form = fixture.nativeElement.querySelector('.form-section');
    expect(form).toBeFalsy();

    let showBtn = fixture.nativeElement.querySelector('.add');
    expect(showBtn).toBeTruthy();
    showBtn.click();
    fixture.detectChanges();

    form = fixture.nativeElement.querySelector('.form-section');
    expect(form).toBeTruthy();
  });

  it('should submit the add-user form with the btn click and create the user', async () => {
    let addBtn = fixture.nativeElement.querySelector('.add');
    addBtn.click();
    fixture.detectChanges();

    let formSection = fixture.nativeElement.querySelector('.form-section');
    expect(formSection).toBeTruthy();

    let user = {
      id: 2356896,
      name: 'Alice',
      email: 'alice@gmail.com',
      gender: 'Female',
      status: 'active',
    };
    let spyService = spyOn(service, 'addUser').and.returnValue(of(mockModel));

    component.createUser(user);
    fixture.detectChanges();

    expect(spyService).toHaveBeenCalledWith(user);
    expect(spyService).toHaveBeenCalledTimes(1);
  });

  it('should search the User', () => {
    let spyService = spyOn(service, 'searchUser').and.returnValue(
      of(mockModel)
    );
    let searchValue = 'Pi';

    component.searchUser(searchValue);

    expect(spyService).toHaveBeenCalledTimes(1);
    expect(spyService).toHaveBeenCalledWith(searchValue);
  });

  it('should delete the user', () => {
    let beforeDeletion: User[] = [
      {
        id: 1234567,
        name: 'Pier',
        email: 'pier@gmaail.com',
        gender: 'male',
        status: 'active',
      },
    ];
    let afterDeletion: User[] = [];

    spyOn(service, 'deleteUser').and.returnValue(of(afterDeletion));

    component.users = beforeDeletion;

    component.delete(1234567);

    expect(service.deleteUser).toHaveBeenCalledTimes(1);
    expect(service.deleteUser).toHaveBeenCalledWith(beforeDeletion[0].id);
  });
});
