export interface Product {
    id: string;
    name: string;
    category: string;
    kcal: number;
    photo: string | null;
    price: number;
    description: string;
}