import { notFound } from "next/navigation";

import { getRestaurantWithCategoriesAndProducts } from "@/data/get-restaurant-by-slug";

import RestaurantCategories from "./components/categories";
import RestaurantHeader from "./components/header";

interface RestaurantMenuPageProps {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ consumptionMethod: string }>
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
    return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase())
}

const RestaurantMenuPage = async ({ params, searchParams }: RestaurantMenuPageProps) => {
    const { slug } = await params;
    const { consumptionMethod } = await searchParams;
    if (!isConsumptionMethodValid(consumptionMethod))
        return notFound()

    const restaurant = await getRestaurantWithCategoriesAndProducts(slug)

    if (!restaurant)
        return notFound()

    return (
        <div>
            <RestaurantHeader restaurant={restaurant} />
            <RestaurantCategories restaurant={restaurant} />
        </div>
    );
}

export default RestaurantMenuPage;