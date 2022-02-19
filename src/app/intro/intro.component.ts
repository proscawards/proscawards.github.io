import { Component } from '@angular/core';
import * as $ from "jquery";
import Swal from 'sweetalert2';
import Storage from '../model/Storage';
import { TypeWriterComponent } from './intro.typewriter.component';
const storage = new Storage();

@Component({
  selector: 'intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent extends TypeWriterComponent {

  private owlStr = "<img class='owls' src='assets/images/owls/owls_owl.svg'/><img class='owls' src='assets/images/owls/owls_lufie.svg'/><img class='owls' src='assets/images/owls/owls_guin.svg'/><img class='owls' id='phoenix' src='assets/images/owls/owls_owlhuang.svg'/><img class='owls' src='assets/images/owls/owls_flowl.svg'/>";

  constructor(){
    super();
  }

  logoBtnOnClick(){
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
        $("#changeFontBtn").html(this.owlStr);
        $("#logoFooterBtn").html(this.owlStr);
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
        storage.setState(0);
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
