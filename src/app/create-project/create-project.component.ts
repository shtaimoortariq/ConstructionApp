import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {


  projectName:string;
  projectLocation:string;
  project_name: FirebaseListObservable<any>;
  project_object: FirebaseObjectObservable<any>;


  ngOnInit() {

  }


  constructor(private af: AngularFire, private router: Router) {
    this.project_name = af.database.list('/project-names');
  }

  saveProject() {
    console.log('saveProject function');
    console.log(this.projectName);
    console.log(this.projectLocation);

    this.project_object = this.af.database.object('/project-names/' + this.projectName);
    this.project_object.set({project_name: this.projectName, project_location: this.projectLocation}).then( (data) =>
      this.router.navigate(['/dashboard', this.projectName])

    );

  }

}
