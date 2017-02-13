import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // projectName:string;
  // projectLocation:string;
  // tileWork: number;
  // //plasterExternal: number, plasterInternal, blockMasonary, colourWork, plumber, mixCrushReti, electricExpense, shatringContractPrice, generalLabour, khudaie


  inputFields: any[];
  db_pull_projectsName :any[] = [];
  db_pull_projectsDetails :any[] = [];
  copy_db_pull_projectsDetails :any[] = [];

  projectName: string;
  projectLocation: string;
  newInputField: string;
  total: number;
  tempIndex: number;

  project_name_db: FirebaseListObservable<any>;
  project_Details_db: FirebaseListObservable<any>;
  project_object_db: FirebaseObjectObservable<any>;
  project_Details_object_db: FirebaseObjectObservable<any>;


  constructor(private route: ActivatedRoute, private router: Router, private af: AngularFire) {
    this.project_name_db = af.database.list('/project-names');
    this.project_Details_db = af.database.list('/project-details');
  }

  ngOnInit() {


    console.log("Dashboard ngOnInit");
    this.total = 0;
    this.inputFields = [ { name: 'Tile work', value: 0} , {name: 'Plaster External', value: 0},
                         { name: 'Plaster Internal', value: 0} , {name: 'Block Masonary', value: 0},
                         { name: 'Colour Work	', value: 0} , {name: 'Plumber', value: 0},
                         { name: 'Mix Crush Reti', value: 0} , {name: 'Electric Expense', value: 0},
                         { name: 'Shatring Contract Price', value: 0} , {name: 'General Labour', value: 0},
                         { name: 'Khudaie', value: 0} , {name: 'Steal Contract Price', value: 0}
    ];


    this.project_Details_db = this.af.database.list('/project-details', { preserveSnapshot: true });
    this.project_Details_db
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
/*          console.log(snapshot.key);
          console.log(snapshot.val());*/
          this.db_pull_projectsDetails.push(snapshot.val());
            console.log(this.db_pull_projectsDetails);
        });
      });



    this.project_name_db = this.af.database.list('/project-names', { preserveSnapshot: true });
    this.project_name_db
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
/*          console.log(snapshot.key);
          console.log(snapshot.val());*/
          this.db_pull_projectsName.push(snapshot.val());
          console.log(this.db_pull_projectsName);
        });
      });


      // 'plasterInternal',
      // 'blockMasonary',
      // 'colourWork',
      // 'plumber',
      // 'mixCrushReti',
      // 'electricExpense',

      // 'shatringContractPrice',
      // 'generalLabour',
      // 'khudaie',
      // 'stealContractPrice',
      // 'total'

  }


  projectDetails(i) {
    console.log(i);
    this.copy_db_pull_projectsDetails = this.db_pull_projectsDetails[i].detailsOfProject;
    console.log(this.copy_db_pull_projectsDetails)
  }

  addInputField() {
      this.inputFields.push({name: this.newInputField, value: 0});
      this.newInputField = "";
  }



  sum() {
    //this.total = this.tileWork + this.plasterExternal + this.plasterInternal + this.blockMasonary + this.colourWork + this.plumber + this.mixCrushReti + this.electricExpense + this.shatringContractPrice + this.generalLabour + this.khudaie + this.stealContractPrice;

    if(this.inputFields[this.inputFields.length-1].name == 'total') {
      this.total = 0;
      this.inputFields[this.inputFields.length-1].value = 0;
      console.log("if");
    }

    for(let i = 0; i < this.inputFields.length; ++i) {
      this.total += this.inputFields[i].value;
    }

    if(this.inputFields[this.inputFields.length-1].name == 'total') {
      console.log("if");
      this.inputFields[this.inputFields.length-1].value = this.total;
    }
    else {
      console.log("else");
      this.inputFields.push({name: 'total', value: this.total});
    }
    console.log(this.inputFields)
  }

  saveProjectToDatabase() {
    this.project_object_db = this.af.database.object('/project-names/' + this.projectName);
    this.project_Details_object_db = this.af.database.object('/project-details/' + this.projectName);


    this.project_object_db.set(
      {
        project_name: this.projectName,
        project_location: this.projectLocation
      }).then((data)=> {
      this.project_Details_object_db.set(
        {
            detailsOfProject: this.inputFields
        }
      ).then((data) => {
        alert("Data has been send to data base");
        this.projectName = "";
        this.projectLocation = "";

        this.project_Details_db = this.af.database.list('/project-details', { preserveSnapshot: true });
        this.project_Details_db
          .subscribe(snapshots => {
            snapshots.forEach(snapshot => {
              console.log(snapshot.key);
              console.log(snapshot.val())
            });
          });

        for(let i = 0; i < this.inputFields.length; ++i) {
          this.inputFields[i].value = 0;
        }
        this.total = 0;

      });
    });

  }
}


  /*tileWork
  plasterExternal
  plasterInternal
  blockMasonary
  colourWork
  plumber
  mixCrushReti
  electricExpense
  shatringContractPrice
  generalLabour
  khudaie
  stealContractPrice
  total*/
