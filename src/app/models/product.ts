export interface IProduct {
    id: number,
    code: string,
    name: string,
    shortDescription: string
    longDescription: string,
    dimensions: string,
    mrp: number,
    ssp: number,
    ymp: number,
    usageInstructions: string,
    attributes: string,
    status: number,
    comment: null,
    category: {
        id: number,
        name: string,
        productCount: number
    },
    createdAt: string,
    updatedAt: string
}