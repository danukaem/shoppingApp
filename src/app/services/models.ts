export interface User {
  username: string,
  firstName: string,
  lastName: string,
  gender: string,
  address: string,
  email: string,
  password: string,
  addedItems:Item[]
  cartItems:Item[]
  orderedItems:Item[],
  userRole:string
}

export interface Item {
  files: string[],
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
  style: string;
  material: string;
  countryManufactured: string;
}