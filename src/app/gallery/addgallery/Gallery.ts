import { ImageData } from './ImageData';
export interface Gallery {
    id?: string;
    name: string;
    images: ImageData[];
    description: string;
    createdby: string;
    createdon?: string;
    upadtedby?: string;
    updatedon?: string;
}
