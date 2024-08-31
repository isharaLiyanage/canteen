export type OrdersType = {
  id: string;
  productId: string;
  userId: string;
};
export type UsersType = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Data = (UsersType & { orders: OrdersType[] })[];
export type DataColum = UsersType & { orders: OrdersType[] };
