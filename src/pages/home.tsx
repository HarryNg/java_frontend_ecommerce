import { useGetProducts } from "@/features/use-products"
import Hero from "@/components/hero";
import LatestCollection from "@/components/latest-collection";
import BestSeller from "@/components/best-seller";
import Collection from "./collection";

export function Home() {
  const { error: fetchError, isLoading: fetchLoading } = useGetProducts();

  if (fetchLoading) return <p>Loading products...</p>;
  if (fetchError) return <p>Error fetching products: {fetchError.message}</p>;

  return (
    <div className="flex flex-col justify-center w-full items-center gap-10">
      <h1 className="text-2xl">Welcome!</h1>
      <Hero />
      <LatestCollection />
      <Collection />
      <BestSeller />

    </div>
  )
}
