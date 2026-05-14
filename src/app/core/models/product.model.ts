export interface DimensionsModel{
  width:number;
  height:number;
  depth:number;
}
export interface TagModel {

}

export interface MetaModel{
  createdAt:string;
  updatedAt:string;
  barcode:string;
  qrCode:string;
}
export interface ReviewModel {
  rating:number;
  comment:string;
  date:string;
  reviewerName:string;
  reviewerEmail:string;
}


export interface ProductModel {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: DimensionsModel;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ReviewModel[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: MetaModel;
  images: string[];
  thumbnail: string;
}
