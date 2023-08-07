import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

/**
 * This function sets the layout for a React component, checking if the user is authenticated and
 * redirecting them if necessary.
 * @param  - The `setLayout` function takes an object as its parameter, which has a property `children`
 * of type `React.ReactNode`. The `children` property represents the child components that will be
 * rendered within the layout.
 */
export default async function setLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-In/');
    }

    /* The code checks if the loggedIn user has any store created. */
    const store = await prismadb.store.findFirst({
        where: {
            userId: userId
        }
    });

    /* The code block `if (store) { redirect(`/${store.id}`); }` is checking if the variable `store`
    has a truthy value. If `store` is not null or undefined, the code redirects the user to a
    specific route using the `redirect` function. The route is constructed by concatenating the `/`
    character with the value of `store.id` using backticks and string interpolation. */
    if (store) {
        //using back ticks
        redirect(`/${store.id}`);
    }

    return (<>{children}</>);
}