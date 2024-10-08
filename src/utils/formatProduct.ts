import IProduct from "../interfaces/product.interface";

export const formatProduct = (productId: any, product: IProduct, defaultName: string = "Desconocido") => {
    return {
        _id: productId,
        name: product ? product.name : defaultName,
        currency: product ? product.currency : defaultName,
        price: product ? product.price : defaultName
    }
}