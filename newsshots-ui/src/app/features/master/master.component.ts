import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { ShareComponent } from '../../core/share/share.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute, private route: Router,
    private http: HttpClient, private spinner: NgxSpinnerService,
    private _bottomSheet: MatBottomSheet) { }

  data;
  ngOnInit(): void {
    this.activateRoute.params.subscribe((res) => {
      this.spinner.show();
      this.http.get(`http://localhost:4000/news/${res.id}`, { observe: "body" })
        .subscribe((response: any) => {
          this.data = response.response.results;
          this.spinner.hide();
        }, error => this.spinner.hide());
    });
  }

  getDetailPage(params) {
    this.route.navigate(['detail/', params]);
  }
  openBottomSheet(): void {
    this._bottomSheet.open(ShareComponent);
  }
}
