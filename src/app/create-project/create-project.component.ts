import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {


  projectName:string;
  projectLocation:string;
  items: any;
  constructor(af: AngularFire) {
    this.items = af.database.list('/items');
  }

  ngOnInit() {
  }


  saveProject() {
      console.log('this.projectName');
      console.log(this.projectName);
      console.log(this.projectLocation);
      this.items.push({name: this.projectLocation})
  }

}
