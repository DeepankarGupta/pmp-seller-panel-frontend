import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../models/product';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productId: number
  product: IProduct
  dataLoaded: boolean = false;
  imagesLoaded: boolean = false;
  images: any[]
  constructor(
    private productService: ProductService,
    private imageService: ImageService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.productId = +this.route.snapshot.paramMap.get('id')
    this.productService.getProductById(this.productId).subscribe(
      (product:IProduct) => {
        this.product = product
        this.dataLoaded = true;
    })
    this.imageService.getProductImages(this.productId).subscribe(
      (images:any[]) => {
        this.images = images
        this.imagesLoaded = true;
      }
    )
  }

}
