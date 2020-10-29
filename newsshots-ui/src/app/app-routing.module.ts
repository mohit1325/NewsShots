import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterComponent } from './features/master/master.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { DetailComponent } from './features/detail/detail.component';
import { BookmarkComponent } from './bookmark/bookmark.component';


const routes: Routes = [
  { path: '', redirectTo: 'features/world', pathMatch: 'full' },
  { path: "features/:id", component: MasterComponent },
  { path: "detail/:id", component: DetailComponent },
  { path: 'bookmark', component: BookmarkComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
