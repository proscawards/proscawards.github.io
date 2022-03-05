import { NgModule } from '@angular/core';
import { ContactComponent } from './contact.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
    imports: [
        FroalaEditorModule.forRoot(), 
        FroalaViewModule.forRoot()
    ],
    exports: [ContactComponent],
    declarations: [ContactComponent],
    providers: [],
 })

export class ContactModule { }
