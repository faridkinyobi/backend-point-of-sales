
export interface interTransaksiTDOs extends interfacekeranjang {
  userId: string;
  orderId?: string;
  totalPrice: number;
  payAmount: number;
  refund: number;
  datailTransakti: {
    productId: string;
    name: string;
    unitPrice: number;
    qty: number;
    totalUnitPrice: number;
  }[];
}
export interface interfacekeranjang {
  keranjang: { qty: number; producId: string }[];
}
