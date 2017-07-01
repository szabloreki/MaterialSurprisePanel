import {Component, OnInit} from '@angular/core';
import {UsersService} from "../users.service";

@Component({
  selector: 'spa-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  users$;
  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.users$ = this.usersService.get();
  }
}
