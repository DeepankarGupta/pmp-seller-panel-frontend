import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.css']
})
export class ImageEditorComponent implements OnInit {

  image: File
  productId: number
  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.productId = +this.route.snapshot.paramMap.get('id')
  }

  onFileSeleceted(event) {
    this.image = event.target.files[0];
    console.log(this.image)
  }

  uploadImage() {
    let form = new FormData()
    form.append('image', this.image)
    this.imageService.uploadImage(form, this.productId).subscribe(
      (response) => {
        console.log(response)
      }
    )
  }

}
