import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {
  constructor(private service:ApiserviceService){};
  UserList: any = [];
  ModalTitle = "";
  ActivateAddEditUserComp: boolean = false;
  User: any;

  UserIdFilter = "";
  UserNameFilter = "";
  UserListWithoutFilter: any = [];

  ngOnInit(): void {
    this.refreshDepList();
  }

  addClick() {
    this.User = {
      userid: "0",
      username: "",
      email:"",
      phone:"",
      skilsets:"",
      hobby:"",
    }
    this.ModalTitle = "Add User";
    this.ActivateAddEditUserComp = true;
  }

  editClick(userid:any,user: any) {
    this.User = user;
    this.ModalTitle = "Edit User";
    this.ActivateAddEditUserComp = true;
  }

  deleteClick(user: any) {
    if (confirm('Are you sure??'+user)) {
      this.service.deleteUser(user).subscribe(data => {
        alert(data.toString());
        this.refreshDepList();
      })
    }
  }

  closeClick() {
    this.ActivateAddEditUserComp = false;
    this.refreshDepList();
  }


  refreshDepList() {
    this.service.getAllUser().subscribe(data => {
      console.log(data)
      this.UserList = data;
      this.UserListWithoutFilter = data;
    });
  }

  sortResult(prop: any, asc: any) {
    this.UserList = this.UserListWithoutFilter.sort(function (a: any, b: any) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      }
      else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });
  }

  FilterFn() {
    var UserIdFilter = this.UserIdFilter;
    var UserNameFilter = this.UserNameFilter;

    this.UserList = this.UserListWithoutFilter.filter(
      function (el: any) {
        return el.DepartmentId.toString().toLowerCase().includes(
          UserIdFilter.toString().trim().toLowerCase()
        ) &&
          el.UserName.toString().toLowerCase().includes(
            UserNameFilter.toString().trim().toLowerCase())
      }
    );
  }
}