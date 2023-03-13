import { IProduct } from '../models/models';

export interface ISortingParams {
  option: string;
  sort(data: IProduct[] | undefined): IProduct[];
}

export const sortingParams: ISortingParams[] = [
  {
    option: 'Price ASC',
    sort(data: IProduct[]): IProduct[] {
      console.log(this.option);
      return data.sort((a, b) => a.price - b.price);
    },
  },
  {
    option: 'Price DESC',
    sort(data: IProduct[]): IProduct[] {
      console.log(this.option);
      return data.sort((a, b) => b.price - a.price);
    },
  },
  {
    option: 'Rating ASC',
    sort(data: IProduct[]): IProduct[] {
      console.log(this.option);
      return data.sort((a, b) => a.rating - b.rating);
    },
  },
  {
    option: 'Rating DESC',
    sort(data: IProduct[]): IProduct[] {
      console.log(this.option);
      return data.sort((a, b) => b.rating - a.rating);
    },
  },
  {
    option: 'Discount ASC',
    sort(data: IProduct[]): IProduct[] {
      console.log(this.option);
      return data.sort((a, b) => a.discountPercentage - b.discountPercentage);
    },
  },
  {
    option: 'Discount DESC',
    sort(data: IProduct[]): IProduct[] {
      console.log(this.option);
      return data.sort((a, b) => b.discountPercentage - a.discountPercentage);
    },
  },
];
