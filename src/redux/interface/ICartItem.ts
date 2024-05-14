import {IComboProductDefault} from "./Combos/IComboProductDefault";

export interface ICartItem {
    id?: number;
    quantity: number;
    description: string;
    composition: string;
    name: string;
    dopProducts: number[];
    img_url: string;
    price: number;
    dopPrice?: number;
    productId?: number;
    typeProduct?: number;
    pizzasSizedId?:number;
    productsCombo?: {
        comboId: number;
        array: IComboProductDefault[];
    };
}