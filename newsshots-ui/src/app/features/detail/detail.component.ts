import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ShareComponent } from '../../core/share/share.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  detailItem;
  isBookMarked: boolean;
  constructor(private route: Router, private activatedRoute: ActivatedRoute,
    private http: HttpClient, private spinner: NgxSpinnerService,
    private _bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      this.spinner.show();
      console.log(res.id);
      this.http.post(encodeURI(`http://localhost:4000/details/`), { id: res.id }, { observe: "body" })
        .subscribe((response: any) => {
          this.detailItem = response.response.results[0];
          this.isBookMarked = this.checkBookMarked(this.detailItem.id).bool;
          console.log(this.detailItem);
          this.spinner.hide();
        }, error => this.spinner.hide());
    });
  }

  checkBookMarked(value) {
    let bookMarkedItems = JSON.parse(localStorage.getItem('ids'));
    if (!bookMarkedItems) {
      bookMarkedItems = [];
    }
    const bool = bookMarkedItems.some(res => res === value);
    return { bool: bool, bookMarkedItems: bookMarkedItems };
  }

  openBottomSheet(): void {
    this._bottomSheet.open(ShareComponent);
  }

  setBookMark(value) {
    let { bool, bookMarkedItems } = this.checkBookMarked(value);
    if (bool) {
      var index = bookMarkedItems.indexOf(value);
      bookMarkedItems.splice(index, 1);
      localStorage.setItem('ids', JSON.stringify(bookMarkedItems));
      this._snackBar.open('Bookmark Removed Successfully!', 'Dismiss', {
        duration: 2000
      });
      this.isBookMarked = false;
      return;
    }
    else {
      bookMarkedItems.push(value);
      localStorage.setItem('ids', JSON.stringify(bookMarkedItems));
      this._snackBar.open('Bookmark Added Successfully!', 'Dismiss', {
        duration: 2000
      });
      this.isBookMarked = true;
    }
  }
}
