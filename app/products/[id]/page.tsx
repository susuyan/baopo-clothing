import { notFound } from "next/navigation";
import { getProductById, getProducts, getShop } from "@/lib/data";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  const products = getProducts();
  return products.map((p) => ({ id: p.id }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const shop = getShop();

  return <ProductDetailClient product={product} shop={shop} />;
}
