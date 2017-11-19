import { Subscription } from 'rxjs/Subscription';
import { Response } from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { IProduct } from './../../interfaces/IProduct';
import { ApiService } from './../../services/api.service';
import { Product } from './../../models/Product';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AppSettings } from '../../services/settings';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { deserialize, JsonProperty, serialize } from 'json-typescript-mapper';

import 'rxjs/add/operator/map';

// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  // providers: [ApiService]
})
export class ProductComponent implements OnInit {

  products: IProduct[] = [];
  // products: any;
  // animal: string;
  // name: string;
  product: {};
  modalRef: BsModalRef;
  productForm: FormGroup;
  errorMessage: String;
  productToDelete: IProduct = {
    product_id: 0
    , product_name: ''
    , product_type: ''
    , product_price: 0.00
    , product_flavor: ''
    , product_description: ''
    , other_details: ''
    , USERS_user_id: ''
  };

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private _apiService: ApiService
    , private _http: HttpClient
    // , public _dialog: MatDialog
    , private _modalService: BsModalService
  ) { }

  ngOnInit() {
    // alert('test from On Init');
    // console.log('Get product list...');
    this.getProducts(AppSettings.API_ENDPOINT + 'products')
    .subscribe(productList => this.products = productList,
      error => {
        this.errorMessage = <any>error;
      })
      ;
    this.productForm = new FormGroup({
      product_id: new FormControl()
      , product_name: new FormControl()
      , type: new FormControl()
      , price: new FormControl()
      , flavour: new FormControl()
      , desc: new FormControl()
    });
  }

  // getProducts(_url): Observable<IProduct[]> {
  //   return this._http.get(_url)
  //     .map((response: Response) => <IProduct[]>response.json());
  // }

  getProducts(_url): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(_url)
    .catch(this.handleError)
    ;
    // .do(data => console.log('All: ' + JSON.stringify(data)))
}


private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
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

  callModalRemoveProduct(product: IProduct, template: TemplateRef<any>) {
    // console.log('deleting...');
    // console.log(product);
    this.productToDelete.product_id = product.product_id;
    this.productToDelete.product_name = product.product_name;
    this.productToDelete.product_type = product.product_type;
    this.productToDelete.product_price = product.product_price;
    this.productToDelete.product_flavor = product.product_flavor;
    this.productToDelete.product_description = product.product_description;

    this.modalRef = this._modalService.show(template);
  }

  saveProduct() {

    alert(this.productForm.controls.product_id.value);

    this.product = {
      product_id: this.productForm.controls.product_id.value
      , product_name: this.productForm.controls.product_name.value
      , type: this.productForm.controls.type.value
      , price: this.productForm.controls.price.value
      , flavour: this.productForm.controls.flavour.value
      , desc: this.productForm.controls.desc.value
    };

    // save product
    this._http.post<any>(AppSettings.API_ENDPOINT + 'product', this.product, this.httpOptions)
      .subscribe(result => {
        console.log('Refresh product list...');
        this.getProducts(AppSettings.API_ENDPOINT + 'products')
        .subscribe(productList => this.products = productList,
          error => {
            // console.log(error);
            this.errorMessage = <any>error;
          });
      });

    this.modalRef.hide();
  }

}
