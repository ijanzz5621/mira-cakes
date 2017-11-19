import { deserialize, JsonProperty } from 'json-typescript-mapper';

export interface IProduct {
    product_id: number;
    product_name: string;
    product_type: string;
    product_price: number;
    product_flavor: string;
    product_description: string;
    other_details: string;
    USERS_user_id: string;
}

/*export class Product {
    @JsonProperty('product_id')
    product_id: number;
    product_name: string;
    product_type: string;
    product_price: number;
    product_flavor: string;
    product_description: string;
    other_details: string;
    USERS_user_id: string;
}*/
