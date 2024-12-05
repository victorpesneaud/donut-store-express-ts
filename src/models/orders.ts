export interface Order {
    id: string;
    customerName: string;
    product: string;
    quantity: number;
    price: number;
  }
  
  export const orders: Order[] = [];