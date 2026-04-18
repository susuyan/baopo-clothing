'use client';

import Link from 'next/link';
import { Product } from '@/lib/data';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:border-rose-100 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <Image
          src={product.cover_image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Category badge */}
        <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs rounded-md font-medium">
          {product.category_name}
        </span>
        {/* Price badge */}
        <span className="absolute bottom-2 right-2 px-2.5 py-1 bg-white/95 backdrop-blur-sm text-rose-600 text-sm sm:text-base font-bold rounded-lg shadow-sm">
          ¥{product.price}
        </span>
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-gray-400 font-mono">货号: {product.name}</span>
          <span className="text-[10px] sm:text-xs text-gray-400">{product.update_time}</span>
        </div>
        <h3 className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2 leading-snug group-hover:text-rose-600 transition-colors">
          {product.title}
        </h3>
      </div>
    </Link>
  );
}
