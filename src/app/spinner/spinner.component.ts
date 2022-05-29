import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnChanges {

  @Input() isCompleted: boolean;

  constructor() { 
    this.isCompleted = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isCompleted.currentValue) {
      $(".spinnerWrapperDiv").hide();
    }
  }
}
