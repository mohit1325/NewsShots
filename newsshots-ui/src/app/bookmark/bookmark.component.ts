import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { HttpClient } from '@angular/common/http';
import { ShareComponent } from '../core/share/share.component';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  constructor(private route: Router,
    private http: HttpClient, private spinner: NgxSpinnerService,
    private _bottomSheet: MatBottomSheet) { }

  data = [];
  bookMarkedItem: Array<any> = JSON.parse(localStorage.getItem('ids')) || [];
  isBookMarked: boolean;

  ngOnInit(): void {
    this.bookMarkedItem.map((res) => {
      this.http.post(encodeURI(`http://localhost:4000/details/`), { id: res }, { observe: "body" })
        .subscribe((response: any) => {
          this.spinner.hide();
          this.data = this.data.concat(response.response.results);
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