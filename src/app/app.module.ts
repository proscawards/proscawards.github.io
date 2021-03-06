import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF, CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';

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
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NoResultModule } from './noresult/noresult.module';
import { GraphQLModule } from './graphql.module';
import { ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SpinnerModule } from './spinner/spinner.module';
import { TitleModule } from './title/title.module';
import { ENDPOINT_GQL } from './api/ConstantInterface';

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
    SpinnerModule,
    TitleModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      // { path: 'certifications', component: CertificationComponent},
      { path: 'featured-projects', component: ProjectComponent},
      { path: 'all-projects', component: ProjectOtherComponent},
      { path: 'project', component: ProjectDetailComponent},
      { path: 'skills', component: SkillComponent},
      { path: 'educations', component: EducationComponent},
      { path: 'experiences', component: ExperienceComponent},
      { path: 'contact-me', component: ContactpageComponent},
      { path: 'about-me', component: AboutComponent},
      { path: '404', component: NotfoundComponent},
      { path: '**', redirectTo: ''}
    ],
    {
      scrollPositionRestoration: 'enabled',
      useHash: false,
    }),
    NgbModule,
    BrowserAnimationsModule,
    ScrollingModule,
    BotnavbarModule,
    LottieModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    NoResultModule,
    GraphQLModule,
    ApolloModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  //providers: [WINDOW_PROVIDERS, {provide: APP_BASE_HREF, useValue : '/' }],
  providers: [    
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: ENDPOINT_GQL,
          }),
        };
      },
      deps: [HttpLink],
    },
    WINDOW_PROVIDERS, 
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
