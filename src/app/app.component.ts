import { Component, NgZone, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/first';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(public ngZone: NgZone, @Inject('Stable') Stable: any) {
    // this.ngZone.runOutsideAngular(() => {
    //   var onStable: Observable<any> = this.ngZone.onStable;

    //   onStable.first()
    //   .subscribe(() => {
    //     console.log('onStable FIRST')
    //   });

    //   onStable.subscribe(() => console.log('onStable'));
    // });
  }
  ngOnInit() {
  }
}
