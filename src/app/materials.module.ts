import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';




@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        MatInputModule,
        MatIconModule,
        MatDividerModule,
        MatButtonModule,
        FormsModule,
        MatGridListModule


    ],
    exports: [
        MatSlideToggleModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        MatInputModule,
        MatIconModule,
        MatDividerModule,
        MatButtonModule,
        FormsModule,
        MatGridListModule
    
    ]
})
export class MaterialsModule { }
