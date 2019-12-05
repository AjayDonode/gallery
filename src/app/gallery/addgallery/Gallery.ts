import { MyData } from './MyData';

export interface Gallery {
    name: string;
    images: MyData[];
    description: string;
    createdby: string;
    createdon: Date;
    upadtedby: string;
    updatedon: Date;
  }