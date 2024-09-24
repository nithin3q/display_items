import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for making API calls
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'post-list',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Import FormsModule for ngModel and CommonModule
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  items: any[] = [];  // Array to hold products from API
  filteredItems: any[] = [];  // Array to hold filtered products
  searchTerm: string = '';  // Search term for filtering
  sortDirection: string = 'asc';  // Sort direction (asc or desc)
  isLoading: boolean = true;  // Loading state

  constructor(private http: HttpClient) {}  // Inject HttpClient

  ngOnInit(): void {
    this.loadItems();  // Load items when the component initializes
  }

  // Method to load items from DummyJSON API
  loadItems() {
    this.http.get<any>('https://dummyjson.com/products')
      .subscribe(data => {
        this.items = data.products;  // Save fetched products
        this.filteredItems = [...this.items];  // Initialize filtered items
        this.isLoading = false;  // Turn off loading spinner
        console.log(this.items); 
      });
  }

  // Method to filter items based on search term
  filterItems() {
    this.filteredItems = this.items.filter(item => 
      item.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  // Method to sort items by title
  sortItems() {
    this.filteredItems.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  }

  // Toggle sort direction and sort items
  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortItems();  // Re-sort items after changing direction
  }
}
