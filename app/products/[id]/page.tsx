import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProductById, getProducts } from "@/lib/data";
import { ArrowLeft, ExternalLink, MapPin, Phone } from "lucide-react";
import CopyButton from "@/components/CopyButton";

// Static generation for all product pages
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

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Breadcrumb */}
      <Link
        href="/products"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-4 sm:mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        返回列表
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        {/* Image */}
        <div className="aspect-[4/5] sm:aspect-square bg-gray-100 rounded-2xl overflow-hidden relative">
          <Image
            src={product.cover_image}
            alt={product.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          {/* Category + Update */}
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 bg-rose-50 text-rose-700 text-xs font-medium rounded-lg">
              {product.category_name}
            </span>
            <span className="text-xs text-gray-400">
              {product.update_time}
            </span>
          </div>

          {/* Price */}
          <div className="mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-rose-600">
              ¥{product.price}
            </span>
            <span className="text-sm text-gray-400 ml-2">批发价</span>
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-snug">
            {product.title}
          </h1>

          {/* SKU */}
          <div className="bg-gray-50 rounded-xl p-4 mb-5">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-400 block mb-1">货号</span>
                <span className="font-mono font-semibold text-gray-900">{product.name}</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-1">分类</span>
                <span className="font-semibold text-gray-900">{product.category_name}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <a
              href={`https://wpa.qq.com/msgrd?v=3&uin=735190980&site=qq&menu=yes`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-xl transition-colors"
            >
              <Phone className="w-4 h-4" />
              联系供应商采购
            </a>

            <a
              href={product.detail_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              查看聚衣网详情
            </a>
          </div>

          {/* Copy SKU */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">采购时请告知货号：</span>
              <CopyButton text={product.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
