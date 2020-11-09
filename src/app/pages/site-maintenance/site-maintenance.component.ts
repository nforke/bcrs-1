import { Component, OnInit, ViewChildren } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-site-maintenance',
  templateUrl: './site-maintenance.component.html',
  styleUrls: ['./site-maintenance.component.css']
})
export class SiteMaintenanceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /*userMenu() {
    this.trigger.openMenu();

    //this.router.navigate(['/']);
    };
    userList() {
      //this.trigger.route(['/']);

      //this.router.navigate(['/']);
      };
*/
}
