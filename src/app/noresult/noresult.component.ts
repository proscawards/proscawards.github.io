import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'noresult',
  templateUrl: './noresult.component.html',
  styleUrls: ['./noresult.component.scss']
})
export class NoResultComponent implements OnInit {

  @Input() prevQuery: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
