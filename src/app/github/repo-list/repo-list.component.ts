import {Component} from '@angular/core';
import {GithubService} from '../shared/github.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/do';

@Component({
  selector: 'repo-list',
  styleUrls: ['./repo-list.component.css'],
  templateUrl: './repo-list.component.html',
})
export class RepoListComponent  {
  org: string;
  repos: any;
  // repos: Observable<any>;

  constructor(public github: GithubService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.org = params['org'];

      if (this.org) {
        console.time('getRepoForOrg done')
        // this.repos = this.github.getReposForOrg(this.org).do(() => {
        //   console.timeEnd('getRepoForOrg done')
        // });
        this.github.getReposForOrg(this.org).subscribe((repos) => {
          this.repos = repos;
          console.timeEnd('getRepoForOrg done')
        });
      }

    });
  }

}
