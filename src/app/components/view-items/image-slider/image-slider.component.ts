import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/services/models';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit{

  @Input() itemWithImages: any = { item: {}, files: [] };
  i = 0;


  constructor(){
   
    
  }
  ngOnInit(): void {
    console.log('itemWithImages',this.itemWithImages);
  }

  slideImages(action: string) {
    if (this.itemWithImages.files.length > this.i && this.i > -1) {
      if (action === '-') {
        if (this.i > 0) {
          this.i = this.i - 1;
        }
      } else if (action === '+') {
        if (this.i < this.itemWithImages.files.length - 1) {
          this.i = this.i + 1;
        }
      }
    }
  }
}
