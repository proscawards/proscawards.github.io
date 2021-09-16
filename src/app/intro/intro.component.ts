import { Component } from '@angular/core';
import * as $ from "jquery";
import Swal from 'sweetalert2';
import Storage from '../model/Storage';
const storage = new Storage();

@Component({
  selector: 'intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent {

  logoBtnOnClick(){
    const owl = '<svg id="owl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><style>.cls-1{fill:#a06530;}.cls-2{fill:#d8db97;}.cls-3{fill:#fff;}</style></defs><path class="cls-1" d="M117.48,191c-1.59,0-33.65,0-34.44,0-36.48,0-65.3-44-49.1-92.17C45.26,65.16,45.26,47.49,45.26,47.49l-4-38.67C50.72,29.87,66,43.73,85.06,47.49c6.16.81,11.9,0,14.94,0,7,0,13.73,0,20,.41.71,0,1.44-.12,2.17-.22C141.28,43.92,156.56,30.06,166.06,9l-4,38.67S163,65.05,173.34,99C188.27,147.83,153.17,191.31,117.48,191Z"/><path class="cls-2" d="M151.2,178.18c-16.8,19.94-83.4,19.58-99.36.8L70.52,80.79H131.8Z"/><circle class="cls-3" cx="72.99" cy="80.79" r="19.95"/><circle class="cls-3" cx="129.38" cy="80.79" r="19.95"/><circle cx="80.67" cy="74.91" r="7.2"/><circle cx="122.18" cy="74.91" r="7.2"/></svg>';
    switch (storage.getState() ? storage.getState() : 0){
      case 0:
        $("#changeFontBtn").text("SC ONG");
        $("#logoFooterBtn").text("SC ONG");
        storage.setState(1);
        break;
      case 1:
        $("#changeFontBtn").text("Ong Shuoh Chwen");
        $("#logoFooterBtn").text("Ong Shuoh Chwen");
        storage.setState(2);
        break;
      case 2:
        $("#changeFontBtn").text("王烁錞");
        $("#logoFooterBtn").text("王烁錞");
        storage.setState(3);
        break; 
      case 3:
        $("#changeFontBtn").text("왕삭순");
        $("#logoFooterBtn").text("왕삭순");
        storage.setState(4);
        break;  
      case 4:
        $("#changeFontBtn").html(owl+owl+owl);
        $("#logoFooterBtn").html(owl+owl+owl);
        storage.setState(5);
        break; 
      case 5:
        $("#changeFontBtn").text("proscawards");
        $("#logoFooterBtn").text("proscawards");
        storage.setState(0);
        break; 
      default:
        $("#changeFontBtn").text("proscawards");
        $("#logoFooterBtn").text("proscawards");
        storage.setState(1);
        break;   
    }
  }

  //Download Resume
  downloadResume(e: any){
    e.preventDefault();
    Swal.fire({
      text: `Do you want to download resume?`,
      confirmButtonText: "Download",
      showCancelButton: true
    }).then(result => {
      if (result.isConfirmed) {
        var hiddenElement = document.createElement('a');
        hiddenElement.href = "assets/files/proscawards_resume.pdf";
        hiddenElement.target = '_blank';
        hiddenElement.download = "proscawards_resume.pdf";
        hiddenElement.click();
        hiddenElement.remove();
      }
    });
  }
}