import { AddProductComponent } from './add-product/add-product.component';
import { IProduct } from './../../interfaces/IProduct';
import { ApiService } from './../../services/api.service';
import { Product } from './../../models/Product';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../services/settings';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, FormControl } from '@angular/forms';

// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  // providers: [ApiService]
})
export class ProductComponent implements OnInit {

  products: any;
  animal: string;
  name: string;

  modalRef: BsModalRef;

  productForm: FormGroup;

  constructor(
    private _apiService: ApiService
    , private _http: HttpClient
    // , public _dialog: MatDialog
    , private _modalService: BsModalService
  ) { }

  ngOnInit() {
    // alert('test from On Init');
    // console.log('Get product list...');
    this.getProducts(AppSettings.API_ENDPOINT + 'products');
    this.productForm = new FormGroup({
      product_id: new FormControl()
      , product_name: new FormControl()
    });
  }

  getProducts(_url): void {
    // this._apiService.getProducts(_url)
    //   .subscribe(
    //     resultArray => {
    //       return this.products = resultArray;
    //     },
    //     err => console.log('Error: ' + err)
    //   );
    // Make the HTTP request:
    this._http.get(_url).subscribe(data => {
      // Read the result field from the JSON response.
      // console.log(data);
      this.products = data;
    });
  }

  // openDialog(): void {
  //   const dialogRef = this._dialog.open(AddProductComponent, {
  //     width: '250px',
  //     data: { name: this.name, animal: this.animal }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.animal = result;
  //   });
  // }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(template);
  }

  saveProduct() {
    this.modalRef.hide();
  }

}
