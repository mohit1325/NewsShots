import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {
  constructor(private _bottomSheetRef: MatBottomSheetRef<ShareComponent>) { }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    // event.preventDefault();
  }

  ngOnInit(): void {
  }

}
