import { Photo } from "./photo";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    photoUrl: string;
    photos: Photo[];
}