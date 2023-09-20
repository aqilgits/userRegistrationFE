import { Component, OnInit, Input } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  constructor(private service: ApiserviceService) { }

  @Input() user: any;
  userid = "";
  username = "";
  email = "";
  phone = "";
  skillsets = "";
  hobby = "";

  ngOnInit(): void {

    this.userid = this.user.userid;
    this.username = this.user.username;
    this.email = this.user.email;
    this.phone = this.user.phone;
    this.skillsets = this.user.skillsets;
    this.hobby = this.user.hobby;
  }

  addUser() {
    var user = {
      username: this.username,
      email: this.email,
      phone: this.phone,
      skillsets: this.skillsets,
      hobby: this.hobby,
    };
    this.service.addUser(user).subscribe(res => {
      alert(res.toString());
    });
  }

  updateUser() {
    var user = {
      userid: this.userid,
      username: this.username,
      email: this.email,
      phone: this.phone,
      skillsets: this.skillsets,
      hobby: this.hobby,
    };
    this.service.updateUser(this.userid,user).subscribe(res => {
      alert(res.toString());
    });
  }
}

