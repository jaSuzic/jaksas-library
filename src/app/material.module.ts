import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [
        MatToolbarModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatExpansionModule,
        MatIconModule,
        MatSelectModule,
        MatDialogModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSidenavModule,
        MatStepperModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatMenuModule
    ]
})
export class MaterialModule { }
