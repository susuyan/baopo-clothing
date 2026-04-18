import { Product } from "./data";

export interface CartItem {
  productId: string;
  name: string;
  title: string;
  price: number;
  coverImage: string;
  quantity: number;
  addedAt: number;
}

const STORAGE_KEY = "baopo-cart";

export function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addCartItem(items: CartItem[], product: Product, qty: number): CartItem[] {
  const existing = items.find((i) => i.productId === product.id);
  if (existing) {
    return items.map((i) =>
      i.productId === product.id ? { ...i, quantity: i.quantity + qty } : i
    );
  }
  return [
    ...items,
    {
      productId: product.id,
      name: product.name,
      title: product.title,
      price: product.price,
      coverImage: product.cover_image,
      quantity: qty,
      addedAt: Date.now(),
    },
  ];
}

export function updateCartQty(items: CartItem[], productId: string, qty: number): CartItem[] {
  if (qty <= 0) return items.filter((i) => i.productId !== productId);
  return items.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i));
}

export function removeCartItem(items: CartItem[], productId: string): CartItem[] {
  return items.filter((i) => i.productId !== productId);
}

export function cartTotalQty(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

export function cartTotalPrice(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function formatOrder(items: CartItem[]): string {
  const total = cartTotalPrice(items);
  const totalQty = cartTotalQty(items);
  const date = new Date().toLocaleString("zh-CN");
  let text = `爆破服饰 采购清单\n${date}\n----------------\n`;
  items.forEach((i) => {
    text += `货号: ${i.name}\n标题: ${i.title}\n数量: ${i.quantity}  单价: ¥${i.price}  小计: ¥${i.price * i.quantity}\n\n`;
  });
  text += `----------------\n合计: ${items.length}款 ${totalQty}件  ¥${total}\n----------------\n`;
  text += `供应商: 仟欣服饰\n产地: 江苏常熟\n`;
  return text;
}
