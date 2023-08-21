import prismadb from "@/lib/prismadb";

import { CategoryForm } from "./components/category-form";

/**
 * The function `BillboardPage` is a TypeScript React component that retrieves a billboard object based
 * on the provided `billboardId` parameter and renders a form for billboards.
 * @param  - The `params` object is an object that contains the `billboardId` property. This property
 * is a string that represents the unique identifier of a billboard.
 * @returns A JSX element is being returned. Specifically, a `<div>` element with the text "This is a
 * form for billboards".
 */
const CategoryPage = async ({
    params
}: {
    params: {
        storeId: any; categoryId: string 
}
}) => {
    /* The code `const billboard = await prismadb.billboard.findUnique({ where: { id:
    params.billboardId } })` is retrieving a specific billboard object from the database based on
    the provided `billboardId` parameter. */
    const category = await prismadb.category.findUnique({
        where: {
            id: params.categoryId
        }
    })

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        }
    })

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryForm 
                    billboards={billboards} 
                    initialData={category}
                />
            </div>
        </div>
    );
}
 
export default CategoryPage;