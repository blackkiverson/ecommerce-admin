import prismadb from "@/lib/prismadb";

import { ColorForm } from "./components/color-form";

/**
 * The function `BillboardPage` is a TypeScript React component that retrieves a billboard object based
 * on the provided `billboardId` parameter and renders a form for billboards.
 * @param  - The `params` object is an object that contains the `billboardId` property. This property
 * is a string that represents the unique identifier of a billboard.
 * @returns A JSX element is being returned. Specifically, a `<div>` element with the text "This is a
 * form for billboards".
 */
const ColorPage = async ({
    params
}: {
    params: { colorId: string }
}) => {
    /* The code `const billboard = await prismadb.billboard.findUnique({ where: { id:
    params.billboardId } })` is retrieving a specific billboard object from the database based on
    the provided `billboardId` parameter. */
    const size = await prismadb.color.findUnique({
        where: {
            id: params.colorId
        }
    })

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorForm initialData={size}/>
            </div>
        </div>
    );
}
 
export default ColorPage;