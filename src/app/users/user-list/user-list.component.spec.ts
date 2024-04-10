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
import { of } from 'rxjs';

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
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the user-list', () => {
    let spyService = spyOn(service, 'getUsers').and.returnValue(of(mockModel));

    component.ngOnInit();
    fixture.detectChanges();

    let modelName = fixture.nativeElement.querySelector(
      'span[class=name-user]'
    );

    expect(component.users).toEqual(mockModel);
    expect(spyService).toHaveBeenCalledTimes(1);
    expect(modelName.innerHTML).toContain(mockModel[0].name);
  });

  it('should show and hide the add-user form', () => {
    const form = fixture.nativeElement.querySelector('form[class=add-form]');
    let showForm: boolean = component.showAddForm;
    expect(showForm).toBeFalse();

    component.showForm();
    fixture.detectChanges();

    showForm = component.showAddForm;

    expect(showForm).toBeTrue();

    fixture.whenStable().then(() => {
      expect(form).toBeTruthy();
    });
  });

  it('should submit the add-user form with the btn click and create the user', () => {
    let spyService = spyOn(service, 'addUser').and.returnValue(of(mockModel));

    let addBtn = fixture.nativeElement.querySelector(
      '.modify-section button[name=add]'
    );
    addBtn.click();
    fixture.detectChanges();

    let formSection = fixture.nativeElement.querySelector('.form-section');
    expect(formSection).toBeTruthy();
    let user = (formSection.value = {
      id: 2356896,
      name: 'Alice',
      email: 'alice@gmail.com',
      gender: 'Female',
      status: 'active',
    });

    component.createUser(user);
    fixture.detectChanges();

    expect(spyService).toHaveBeenCalledTimes(1);
    expect(spyService).toHaveBeenCalledWith(user);
  });

  it('should search the User', () => {
    let spyService = spyOn(service, 'searchUser').and.returnValue(
      of(mockModel)
    );
    let searchValue = 'Pi';

    component.searchUser(searchValue);
    fixture.detectChanges();

    expect(spyService).toHaveBeenCalledTimes(1);
    expect(spyService).toHaveBeenCalledWith(searchValue);
  });

  it('should delete the user', () => {
    let result: User[] = [
      {
        id: 1234567,
        name: 'Pier',
        email: 'pier@gmaail.com',
        gender: 'male',
        status: 'active',
      },
    ];
    let spyService = spyOn(service, 'deleteUser').and.returnValue(
      of(result)
    );
    let name = fixture.nativeElement.querySelector('.user-row .name-user')
    let email = fixture.nativeElement.querySelector('.user-row .email-user')

    component.delete(mockModel[1].id);
    fixture.detectChanges();

    expect(spyService).toHaveBeenCalledTimes(1);
    expect(spyService).toHaveBeenCalledWith(mockModel[1].id);
    expect(name).toBeNull()
    expect(email).toBeNull()
  });
});
