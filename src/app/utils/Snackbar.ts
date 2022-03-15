import { MatSnackBar } from '@angular/material/snack-bar';
import { WINDOW } from '../services/window.service';
import { Inject, Injectable } from '@angular/core';
import { Router } from '../services/router.service';

interface SB_TYPES {
    isSocial?: Boolean, //Social3d social media
    isResume?: Boolean, //Social3d resume
    isRouter?: Boolean, //Social3d router
    isDefault?: Boolean //Normal usage, does not have an action
}

interface SB_ADDITIONAL {
    isEmail?: Boolean, //Email on submit
    isSuccess?: Boolean, //If email is successfully submitted
    isWarning?: Boolean, //A warning toast
}

@Injectable({
    providedIn: 'root',
})

export class Snackbar {

    private SB_DURATION: number = 3000;
    private SB_TITLE: string = "";
    private SB_URL: string = "";
    private SB_ACTION: string = "";
    private SB_TYPE: number = 0;
    private SB_DATA: SB_ADDITIONAL = {};

    constructor(      
        @Inject(WINDOW) private window: Window,
        private snackbar: MatSnackBar,
        private router: Router,
    ){
    }

    //Duration of the active snackbar before closing
    setDuration(duration: number): Snackbar{this.SB_DURATION = duration; return this;}
    
    //Title of the snackbar
    setTitle(title: string): Snackbar{this.SB_TITLE = title; return this;}
    
    //URL when action of the snackbar is clicked
    setUrl(url: string): Snackbar{this.SB_URL = url; return this;}
    
    //Action button of the snackbar
    setAction(action: string): Snackbar{this.SB_ACTION = action; return this;}

    //Additional info to be used
    setAdditional(data: SB_ADDITIONAL): Snackbar{this.SB_DATA = data; return this;}

    //Type of snackbars
    setType(type: SB_TYPES): Snackbar{
        type.isSocial ? this.SB_TYPE = 1 :
        type.isResume ? this.SB_TYPE = 2 :
        type.isRouter ? this.SB_TYPE = 3 :
        this.SB_TYPE = 0;
        return this;
    }

    //Compile all information and display snackbar
    execute(): Snackbar{
        switch (this.SB_TYPE){
            case 0:
                this.openSnackbar();
                break;
            case 1:
                this.openSnackbar().isSocial();
                break;
            case 2:
                this.openSnackbar().isResume();
                break;
            case 3:
                this.openSnackbar().isRouter();
                break;
        }
        return this;
    }

    private openSnackbar(): Snackbar{
        this.snackbar.open(this.SB_TITLE, this.SB_ACTION, {
            duration: this.SB_DURATION
        });
        return this;
    }

    private isSocial(){
        this.snackbar._openedSnackBarRef?.onAction().subscribe(() => {
            this.window.open(this.SB_URL, "_blank");
        });
    }

    private isResume(){
        this.snackbar._openedSnackBarRef?.onAction().subscribe(() => {
            var hiddenElement = document.createElement('a');
            hiddenElement.href = "assets/files/proscawards_resume.pdf";
            hiddenElement.target = '_blank';
            hiddenElement.download = "proscawards_resume.pdf";
            hiddenElement.click();
            hiddenElement.remove();
            this.snackbar.open(`Resume downloaded.`, '', {
                duration: this.SB_DURATION
            });        
        });
    }

    private isRouter(){
        this.snackbar._openedSnackBarRef?.onAction().subscribe(() => {
            this.router.routeTo(this.SB_URL);
        });
    }
}