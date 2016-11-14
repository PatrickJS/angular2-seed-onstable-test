import { enableProdMode } from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';

enableProdMode();

platformBrowserDynamic()
.bootstrapModule(AppModule)
.then((modRef: any) => {
  console.log('bootstrap!');
})
.catch(err => console.error(err));
