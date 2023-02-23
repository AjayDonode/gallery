import { ImageData } from './ImageData';
export interface Gallery {
    id?: string;
    name: string;
    filepath: string;
    images?: ImageData[];
    tags: string[];
    description: string;
    createdby: string;
    createdon?: string;
    upadtedby?: string;
    updatedon?: string;
}
