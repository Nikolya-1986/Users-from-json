import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserDTO } from 'src/app/interfaces/user.interface';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

  public users: UserDTO[] | any;
  private readonly destroy$ = new Subject();
  
  constructor(
    public userService: UserService
  ) { }

  public ngOnInit():void {
    this.fetchUsers();
  };

  private fetchUsers(): UserDTO | any {
    return this.userService.getUsers()
    .pipe(takeUntil(this.destroy$))
    .subscribe((res: {}) => {
      this.users = res;
    })
  };

  public delete(id: string): void {
    if (window.confirm('Really?')){
      this.userService.deleteUser(id).subscribe(res => {
        this.fetchUsers()
      })
    }
  };

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  };
}