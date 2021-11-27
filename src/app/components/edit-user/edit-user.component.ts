import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { UserDTO } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  private id = this.actRoute.snapshot.params['id'];
  public useEdit: any = {};
  private readonly subscriptions = new Subscription();
  
  constructor(
    public userService: UserService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {}

  public ngOnInit(): void { 
    this.userService.getSingleUser(this.id).subscribe((res: {}) => {
      this.useEdit = res;
    })
  };

  public updateUser(id: string, data: UserDTO): void {
    if(window.confirm('Yes, please...')){
      this.userService.updateUser(this.id, data)
      .pipe(take(1))
      .subscribe(res => {
        this.router.navigate(['/list'])
      })
    }
  };

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  };
}
