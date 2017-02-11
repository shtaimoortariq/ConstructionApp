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



  projectName: string;
  projectLocation: string;
  tileWork: number;
  plasterExternal: number;
  plasterInternal: number;
  blockMasonary: number;
  colourWork: number;
  plumber: number;
  mixCrushReti: number;
  electricExpense: number;
  stealContractPrice: number;
  shatringContractPrice: number;
  generalLabour: number;
  khudaie: number;
  total: number = this.tileWork + this.plasterExternal + this.plasterInternal + this.blockMasonary + this.colourWork + this.plumber + this.mixCrushReti + this.electricExpense + this.shatringContractPrice + this.generalLabour + this.khudaie;
  //total: number;

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
    //this.projectName = this.route.queryParams['project'];
    // console.log(this.projectName);
    this.tileWork = 0;
    this.plasterExternal = 0;
    this.plasterInternal = 0;
    this.blockMasonary = 0;
    this.colourWork = 0;
    this.plumber = 0;
    this.mixCrushReti = 0;
    this.electricExpense = 0;
    this.shatringContractPrice = 0;
    this.generalLabour = 0;
    this.khudaie = 0;
    this.stealContractPrice = 0;
    this.total = 0;
  }

  sum() {
    this.total = this.tileWork + this.plasterExternal + this.plasterInternal + this.blockMasonary + this.colourWork + this.plumber + this.mixCrushReti + this.electricExpense + this.shatringContractPrice + this.generalLabour + this.khudaie + this.stealContractPrice;
    console.log(this.total)
  }

  saveProjectToDatabase() {
    this.project_object_db = this.af.database.object('/project-names/' + this.projectName);
    this.project_Details_object_db = this.af.database.object('/project-details/' + this.projectName);


    this.project_object_db.set(
      {
        project_name: this.projectName,
        project_location: this.projectLocation
      });

    this.project_Details_object_db.set(
      {
        tileWork: this.tileWork,
        plasterExternal: this.plasterExternal,
        plasterInternal: this.plasterInternal,
        blockMasonary: this.blockMasonary,
        colourWork: this.colourWork,
        plumber: this.plumber,
        mixCrushReti: this.mixCrushReti,
        electricExpense: this.electricExpense,
        shatringContractPrice: this.shatringContractPrice,
        generalLabour: this.generalLabour,
        khudaie: this.khudaie,
        stealContractPrice: this.stealContractPrice,
        total: this.total
      }
    );

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
