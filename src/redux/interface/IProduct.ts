import {IProductInfo} from "./IProductInfo";

export interface IProduct {
    id: number;
    name: string;
    price: number;
    img_url: string;
    description: string;
    productsTypeId: number;

    pizza_info?:IProductInfo

    pizzas_sizes_variants?:[
        [
            {
                id: number;
                pizzasSizeId: number;

                pizzas_types_variant:{
                    id: number;
                    pizzasTypeId: number;
                    price: number;
                    img_url: string;
                    pizza_info: IProductInfo
                }
            }
        ]
    ]

    dop_product_pizzas?: number[]

}