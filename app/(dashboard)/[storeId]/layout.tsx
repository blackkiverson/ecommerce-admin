import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { storeId: string }
}) {
    /* The line `const { userId } = auth();` is using destructuring assignment to extract the `userId`
    property from the object returned by the `auth()` function. */
    const { userId } = auth();

    /* The code is checking if the `userId` variable is falsy (i.e., if the user is not authenticated).
    If the user is not authenticated, it redirects the user to the "sign-in" page. */
    if (!userId) {
        redirect('sign-in');
    }

    /* The code is using the `prismadb` library to query the database and find the first store that
    matches the given conditions. It is searching for a store with the `id` equal to
    `params.storeId` and the `userId` equal to the currently authenticated user's `userId`. The
    result is stored in the `store` variable. */
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });

    /* The code `if (!store) { redirect('/'); }` is checking if the `store` variable is falsy (i.e., if
    no store is found in the database that matches the given conditions). If no store is found, it
    redirects the user to the root page ("/"). This is likely done to handle the case where the user
    tries to access a store that does not exist or that they do not have access to. */
    if (!store) {
        redirect('/');
    }

    return (
        <>
        <Navbar/>
        {children}
        </>
    )
}