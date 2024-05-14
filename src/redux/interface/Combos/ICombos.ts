import {IComboProduct} from "./IComboProduct";
import {IComboProductDefault} from "./IComboProductDefault";
import {IProduct} from "../IProduct";

export interface ICombos {
    id: number;
    title: string;
    description: string;
    img_url: string;
    priceDefault: number;
    products: {
        productsTypeId: number,
        array: (IProduct & { increase: number })[];
    }[];
    productDefault: IComboProductDefault[];

}