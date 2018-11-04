import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ICategory } from '../models/category';
import { CategoryService } from '../category.service';
import { IProduct } from '../models/product';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.css']
})
export class ProductEditorComponent implements OnInit {

  productForm: FormGroup
  categories: ICategory[]
  productId: string

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.formBuilder.group({
      code: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      shortDescription: ['', Validators.compose([Validators.required])],
      longDescription: ['', Validators.compose([Validators.required])],
      dimensions: ['', Validators.compose([Validators.required])],
      categoryId: ['', Validators.compose([Validators.required])],
      mrp: ['', Validators.compose([Validators.required])],
      ssp: ['', Validators.compose([Validators.required])],
      ymp: ['', Validators.compose([Validators.required])],
      usageInstructions: ['', Validators.compose([Validators.required])],
      attributes: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((categories: ICategory[]) => {
      this.categories = categories
    })
    this.productId = this.route.snapshot.paramMap.get('id')
    if (this.productId != null) {
      this.productService.getProductById(+this.productId).subscribe(
        (product: IProduct) => {
          this.productForm.patchValue(product)
          this.productForm.controls['categoryId'].setValue(product.category.id)
        }
      )
    }


  }

  onSubmit() {
    if (this.productForm.valid) {
      if (this.productId != null) {
        console.log(this.productForm.value);
        this.productService.updateProduct(this.productForm.value, +this.productId).subscribe(
          (response: any) => {
            this.router.navigate(['/product/'+this.productId])
          }, (error) => {
            console.log(error);
          })
      } else {
        console.log(this.productForm.value);
        this.productService.addProduct(this.productForm.value).subscribe(
          (response: any) => {
            this.router.navigate(['/home'])
          }, (error) => {
            console.log(error);
          })
      }
    }
  }
}
