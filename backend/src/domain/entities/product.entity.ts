class Variant {
  constructor(
    public ram: string,
    public price: number,
    public quantity: number
  ) {}
}

export class Product {
  constructor(
    public title: string,
    public subCategory: string,
    public description: string,
    public variants: Variant[],
    public images: string[]
  ) {}
}
