import { Product } from "./models/product.model";
import { productQuery } from "./models/productQuery.model";

export const getData = async (query: productQuery) => {
    const response = await fetch('https://ozon-be655-default-rtdb.europe-west1.firebasedatabase.app/goods.json');
    const data = await response.json();
    
    return data.filter((product : Product) => {
        if (query.category) {
            if(product.category !== query.category) {
                return false;
            }
        }

        if (query.search) {
            if(!product.title.toLowerCase().includes(query.search.toLowerCase())) {
                return false;
            }
        }
        return true;
    })
}