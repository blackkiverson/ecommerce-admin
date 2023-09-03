import prismadb from "@/lib/prismadb";

import { ProductForm } from "./components/product-form";

/**
 * The function `BillboardPage` is a TypeScript React component that retrieves a billboard object based
 * on the provided `billboardId` parameter and renders a form for billboards.
 * @param  - The `params` object is an object that contains the `billboardId` property. This property
 * is a string that represents the unique identifier of a billboard.
 * @returns A JSX element is being returned. Specifically, a `<div>` element with the text "This is a
 * form for billboards".
 */
const ProductPage = async ({
    params
}: {
    params: { productId: string, storeId: string }
}) => {
    /* The code `const billboard = await prismadb.billboard.findUnique({ where: { id:
    params.billboardId } })` is retrieving a specific billboard object from the database based on
    the provided `billboardId` parameter. */
    const product = await prismadb.product.findUnique({
        where: {
            id: params.productId
        },
        include: {
            images: true
        }
    })

    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId,
        }
    })

    const sizes = await prismadb.size.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    const colors = await prismadb.color.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm 
                    categories={categories}
                    colors={colors}
                    sizes={sizes}
                    initialData={product}
                />
            </div>
        </div>
    );
}
 
export default ProductPage;