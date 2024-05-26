export interface IOrder{
    id: number;
    userId?: number;
    createdAt: string;

    phone: number;
    status: string;
    address: string;
    total_price: number;
    nomer: string;
}