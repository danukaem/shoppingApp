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
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
        MatGridListModule,
        MatCheckboxModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule

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
        MatGridListModule,
        MatCheckboxModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule
    
    ]
})
export class MaterialsModule { }
