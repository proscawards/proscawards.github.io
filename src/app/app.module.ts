import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF, CommonModule } from '@angular/common';

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
import { WysiwygModule } from './wysiwyg/wysiwyg.module';
import { EducationComponent } from './education/education.component';
import { CertificationComponent } from './certification/certification.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Social3dModule } from './social3d/social3d.module';
import { ContactModule } from './contact/contact.module';
import { ContactpageComponent } from './contactpage/contactpage.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BotnavbarModule } from './botnavbar/botnavbar.module';
import { LottieModule } from 'ngx-lottie';
import { SplashComponent } from './splash/splash.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
    EducationComponent,
    CertificationComponent,
    HomeComponent,
    NotfoundComponent,
    ContactpageComponent,
    ProjectDetailComponent,
    SplashComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    WysiwygModule,
    Social3dModule,
    ContactModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      { path: 'certifications', component: CertificationComponent},
      { path: 'featured-projects', component: ProjectComponent},
      { path: 'all-projects', component: ProjectOtherComponent},
      { path: 'all-projects/:elem', component: ProjectOtherComponent},
      { path: 'project', component: ProjectDetailComponent},
      { path: 'project/:id', component: ProjectDetailComponent},
      { path: 'skills', component: SkillComponent},
      { path: 'educations', component: EducationComponent},
      { path: 'experiences', component: ExperienceComponent},
      { path: 'contact-me', component: ContactpageComponent},
      { path: 'about-me', component: AboutComponent},
      { path: '404', component: NotfoundComponent},
      { path: '**', redirectTo: '404'}
    ],
    {scrollPositionRestoration: 'enabled'}),
    NgbModule,
    BrowserAnimationsModule,
    ScrollingModule,
    BotnavbarModule,
    LottieModule,
    MatSnackBarModule,
  ],
  providers: [WINDOW_PROVIDERS, {provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
