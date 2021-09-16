import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { SkillComponent } from './skill/skill.component';
import { ProjectComponent } from './project/project.component';
import { ProjectOtherComponent } from './project-other/project-other.component';
import { ExperienceComponent } from './experience/experience.component';
import { FooterComponent } from './footer/footer.component';
import { WINDOW_PROVIDERS } from "./services/window.service";

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    HeaderComponent,
    AboutComponent,
    SkillComponent,
    ProjectComponent,
    ProjectOtherComponent,
    ExperienceComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [WINDOW_PROVIDERS, {provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
