import {NgModule, Injectable, NgZone} from '@angular/core'
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.routes";
import {AppComponent} from "./app.component";
import {GithubService} from "./github/shared/github.service";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {RepoBrowserComponent} from './github/repo-browser/repo-browser.component';
import {RepoListComponent} from './github/repo-list/repo-list.component';
import {RepoDetailComponent} from './github/repo-detail/repo-detail.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/first';

@Injectable()
export class Stable {
  constructor(public ngZone: NgZone) {
    console.log('this.ngZone.isStable', this.ngZone.isStable)
    // track setTimeout
    setTimeout(() => {
      console.log('yolo 0');
    });
    setTimeout(() => {
      console.log('yolo 1');
    }, 1);


    this.ngZone.runOutsideAngular(() => {
      var onStable: Observable<any> = this.ngZone.onStable;
      var onUnstable: Observable<any> = this.ngZone.onUnstable;

      (<any>window).requestIdleCallback(() => {
        console.log('true cpu idle: ngZone.isStable = ' + this.ngZone.isStable);
      });

      onStable.first()
      .subscribe(() => {
        console.log('onStable FIRST ', this.ngZone.isStable);
      });

      onStable.subscribe(() => console.log('onStable', this.ngZone.isStable));
      onUnstable.subscribe(() => console.log('onUnstable', this.ngZone.isStable));

    });
  }
}

@NgModule({
  declarations: [AppComponent, AboutComponent, RepoBrowserComponent, RepoListComponent, RepoDetailComponent, HomeComponent],
  imports     : [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(rootRouterConfig)],
  providers   : [
    GithubService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: Stable, useClass: Stable},
    {provide: 'Stable', useExisting: Stable}
  ],
  bootstrap   : [AppComponent]
})
export class AppModule {
  // constructor(stable: Stable) {

  // }
}
