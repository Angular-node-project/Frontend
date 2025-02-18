export class UpdateRequests {
  constructor(
    public request_id: string,
    public seller: { seller_id: number, name: string },
    public updatedProduct: {
      product_id: String
      categories: { category_id: string, name: string }[],
      name: string,
      description: string,
      seller_id: string,
      qty: number,
      price: number,
      pics: string[],
      status: "active" | "inactive" | "pending" | "outStock" | "deleted",
    },
    public status: "pending" | "approved" | "disapproved"
  ) { }
}

export class SellerUpdateRequests {
  constructor(
    public request_id: string,
    public seller: { seller_id: string, name: string },
    public updatedProduct: {
      product_id: String
      categories: { category_id: string, name: string }[],
      name: string,
      description: string,
      seller_id: string,
      pics: string[],
      details: string,
      qty: number,
      show: "online" | "offline" | "all",
      price: number,
      status: "active" | "inactive" | "pending" | "outStock" | "deleted",
    },
    public status: "pending" | "approved" | "disapproved"
  ) { }
}
