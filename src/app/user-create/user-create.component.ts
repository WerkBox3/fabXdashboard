import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {UserService} from "../services/user.service";
import {NewUser} from "../shared/models/new-user.model";
import {User} from "../shared/models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    wikiName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required)
  });

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    let newUser = new NewUser();
    newUser.name = this.form.get('name').value;
    newUser.wikiName = this.form.get('wikiName').value;
    newUser.phoneNumber = this.form.get('phoneNumber').value;

    this.userService.createNewUser(newUser)
      .subscribe(
        (user: User) => {
          console.log("newUser successfully created: %o", user);
          this.router.navigateByUrl(`/user/${user.id}`);
        },
        error => console.error("newUser not successfully created: %o", error)
      );
  }
}
