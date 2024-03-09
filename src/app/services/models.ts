export interface User {
  email: string,
  firstName: string,
  lastName: string,
  gender: string,
  address: string,
  password: string,
  addedItems: AddedItemDetails[]
  cartItems: CartItemDetails[]
  orderedItems: OrderItemDetails[],
  userRole: string,

}

export interface OrderItemDetails { // details about the items that i ordered
  itemId: string,
  quantity: number,
  orderStatus: string
}

export interface CartItemDetails { // details about the items that i put to cart
  itemId: string,
  quantity: number
}
export interface AddedItemDetails { // details about the items that i added to the store
  itemId: string,
  placedOrderDetails: PlacedOrderDetail[],// details about the items that buyer placed orders

}
export interface PlacedOrderDetail { // details about the items that buyer placed orders
  orderPlacedUserId: string,
  orderQuantity:number,
  orderStatus:string
}

export interface Item {
  itemId:string,
  fileIds: string[],//fileId array
  name: string;
  condition: string;
  saleEnd: string;
  quantity: string;
  price: string;
  postage: string;
  delivery: string;
  return: string;
  coverage: string;
  specification: string;
  conditionDescription: string;
  type: string;
  color: string;
  gender: string;
  description: string;
  brand: string;
  size: string;
  style: string,
  material: string,
  countryManufactured: string;
  itemOwnerUserId: string
}

export interface File{
  fileId:string,
  fileName:string,
  fileBase64String:string
}