import prismadb from "@/lib/prismadb";

/**
 * The DashboardPage component is a TypeScript React component that displays the name of an active
 * store based on the storeId parameter.
 * @param  - The `DashboardPageProps` interface defines the props that are passed to the
 * `DashboardPage` component. It has a single property `params` which is an object with a property
 * `storeId` of type `string`.
 * @returns The DashboardPage component is returning a div element that displays the name of the active
 * store.
 */
interface DashboardPageProps {
    params: { storeId: string }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
}) => {
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId
        }
    });
    return (
        <div>
            Active Store: {store?.name}
        </div>
    );
}

export default DashboardPage;