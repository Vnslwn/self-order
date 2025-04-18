import Image from "next/image";
import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import ConsumptionsMethodOption from "./components/consumptions-method-option";

interface RestaurantPageProps {
    params: Promise<{ slug: string }>
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
    const { slug } = await params

    const restaurant = await getRestaurantBySlug(slug)
    if (!restaurant)
        return notFound()

    return (
        <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
            <div className="flex flex-col items-center gap-2">
                <Image src={restaurant.avatarImageUrl} alt={restaurant.name} width={82} height={82} />

                <h2 className="font-semibold">{restaurant.name}</h2>
            </div>

            <div className="space-y-2 pt-24 text-center">
                <h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>

                <p className="opacity-55">
                    Escolha como prefere aproveitar sua refeição. Estamos oferecendo praticidade e sabor em cada detalhe!
                </p>
            </div>

            <div className="pt-14 grid grid-cols-2 gap-4">
                <ConsumptionsMethodOption buttonText="Para comer aqui" imageAlt="comer aqui" imageUrl="/dine_in.png" option="DINE_IN" slug={slug} />

                <ConsumptionsMethodOption buttonText="Para levar" imageAlt="levar" imageUrl="/takeaway.png" option="TAKEAWAY" slug={slug} />

            </div>
        </div>
    );
}

export default RestaurantPage;