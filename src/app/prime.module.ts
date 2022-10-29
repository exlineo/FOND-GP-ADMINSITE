import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {InputTextModule} from 'primeng/inputtext';
import {ListboxModule} from 'primeng/listbox';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    InputTextModule,
    ListboxModule,
    ToastModule
  ],
  exports:[
    HttpClientModule,
    FormsModule,
    InputTextModule,
    ListboxModule,
    ToastModule
  ],
  providers:[MessageService]
})
export class PrimeModule { }
