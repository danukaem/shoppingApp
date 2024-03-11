import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Item } from 'src/app/services/models';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit {

  @Input() itemWithImages: any = { item: {}, files: [] };
  i = 0;


  constructor(
    private readonly apiService: ApiService,
    private readonly sharedVariableService: SharedVariablesService,
    private readonly sharedService: SharedService,
    private readonly router: Router) {


  }
  ngOnInit(): void {
    console.log('itemWithImages', this.itemWithImages);
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

  edit(itemWithImages: { item: {}, files: [] }) {
    this.sharedVariableService.editItem = itemWithImages;
    this.router.navigate(['editItem'])
  }


  removeItem(item: any) {
    this.sharedVariableService.user.addedItems = this.sharedVariableService.user.addedItems.filter((val: any) => { return val.itemId !== item.itemId });

    for (let fileId of item.fileIds) {
      this.apiService.removeFile(fileId);
    }

    this.apiService.removeItem(item.itemId);
    this.apiService.updateuser(this.sharedVariableService.user).then(()=>{

      this.apiService.userSignin(this.sharedVariableService.user.email,this.sharedVariableService.user.password)
      this.sharedVariableService.deleteEditSubject.next('items deleted')

    });

    
    

  }
}
