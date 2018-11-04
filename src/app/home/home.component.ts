import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ICategory } from '../models/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: any 
  categories: ICategory[]

  searchBy : string = 'select serch options'
  selectedSearchBy: string = null

  status: string = 'filter by status'
  statusId: number = 0

  sortBy: string = "sort by"
  selectedSortBy: string = null;
  
  selectedCategory: string = 'filter by category'
  selectedCategoryId: number = null

  constructor(
    private productService : ProductService,
    private categoryService: CategoryService
    ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe( products => {
      this.products = products
    })
    this.categoryService.getCategories().subscribe( (categories:ICategory[])  => {
      this.categories = categories
    }) 
  }

  searchProducts(searchValue) {
    this.productService.getProducts(this.searchBy,searchValue).subscribe( products => {
      this.products = products
    })
  }

  setSearchBy(key) {
    this.searchBy = key
  }

  setStatus(status, statusId) {
    this.status = status;
    this.statusId = statusId
  }

  setSortBy(sortBy) {
    this.sortBy = sortBy;
  }

  setCategory(category) {
    this.selectedCategory = category.name
    this.selectedCategoryId = category.id
  }

  applyAll(searchValue){
    console.log(this.searchBy)
    console.log(searchValue);
    console.log(this.status)
    console.log(this.statusId)
    console.log(this.sortBy);
    console.log(this.selectedCategoryId)
    this.productService.getProducts(this.searchBy,searchValue,this.sortBy,this.statusId,this.selectedCategoryId).subscribe( products => {
      this.products = products
    })
  }

}
