import { Component, OnInit } from '@angular/core';
import { Router } from '../services/router.service';

@Component({
  selector: 'notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  route(){
    this.router.routeTo('');
  }

}
