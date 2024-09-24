import { Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';  // Import the standalone component

export const routes: Routes = [
  { path: '', component: PostListComponent },  // Add route to PostListComponent
  // Other routes can go here
];
