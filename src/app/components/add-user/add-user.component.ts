import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserDTO } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnDestroy {

  private subscriptions = new Subscription();
  @Input() public userAdd = { name: '', email: '', phone: 0 };

  constructor(
    public userService: UserService, 
    public router: Router
  ) { }

  public addUser(data: UserDTO): void {
    const subscription = this.userService.addUser(this.userAdd)
    .subscribe((data: {}) => {
      this.router.navigate(['/list'])
    })
    this.subscriptions.add(subscription);
  };
 
  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  };
}