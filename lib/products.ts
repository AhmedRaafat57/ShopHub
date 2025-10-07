export interface Product {
  id: string
  name: string
  price: number
  oldPrice?: number
  description: string
  category: string
  stock: number
  image?: string
  images?: string[]
  rating?: number
  reviews?: number
  badges?: ("new" | "sale" | "best-seller" | "limited")[]
  variants?: {
    colors?: string[]
    sizes?: string[]
  }
  createdAt: string
}

// Mock data storage (in a real app, this would be a database)
let products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 99.99,
    oldPrice: 149.99,
    description: "High-quality wireless headphones with noise cancellation",
    category: "Electronics",
    stock: 50,
    images: ["/black-wireless-headphones.png", "/wireless-headphones-side.png", "/wireless-headphones-case.png"],
    rating: 4.5,
    reviews: 128,
    badges: ["sale", "best-seller"],
    variants: {
      colors: ["#000000", "#FFFFFF", "#1E40AF"],
      sizes: [],
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 299.99,
    description: "Feature-rich smartwatch with health tracking",
    category: "Electronics",
    stock: 30,
    images: ["/smart-watch-black.jpg", "/smart-watch-display.jpg"],
    rating: 4.8,
    reviews: 256,
    badges: ["best-seller"],
    variants: {
      colors: ["#000000", "#C0C0C0", "#FFD700"],
      sizes: ["S", "M", "L"],
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Laptop Stand",
    price: 49.99,
    description: "Ergonomic aluminum laptop stand",
    category: "Accessories",
    stock: 100,
    images: ["/aluminum-laptop-stand.jpg"],
    rating: 4.2,
    reviews: 89,
    badges: ["new"],
    variants: {
      colors: ["#C0C0C0", "#000000"],
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Mechanical Keyboard",
    price: 129.99,
    oldPrice: 159.99,
    description: "RGB mechanical keyboard with custom switches",
    category: "Electronics",
    stock: 45,
    images: ["/mechanical-keyboard-rgb.jpg", "/mechanical-keyboard-side.jpg"],
    rating: 4.7,
    reviews: 342,
    badges: ["sale"],
    variants: {
      colors: ["#000000", "#FFFFFF"],
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Wireless Mouse",
    price: 39.99,
    description: "Ergonomic wireless mouse with precision tracking",
    category: "Accessories",
    stock: 75,
    images: ["/wireless-mouse-ergonomic.jpg"],
    rating: 4.4,
    reviews: 167,
    badges: ["best-seller"],
    variants: {
      colors: ["#000000", "#FFFFFF", "#1E40AF"],
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "USB-C Hub",
    price: 79.99,
    oldPrice: 99.99,
    description: "7-in-1 USB-C hub with multiple ports",
    category: "Accessories",
    stock: 60,
    images: ["/usb-c-hub-ports.jpg"],
    rating: 4.6,
    reviews: 203,
    badges: ["sale", "limited"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Webcam 4K",
    price: 149.99,
    description: "Professional 4K webcam with auto-focus",
    category: "Electronics",
    stock: 25,
    images: ["/4k-webcam-professional.jpg"],
    rating: 4.9,
    reviews: 412,
    badges: ["best-seller", "new"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Phone Stand",
    price: 24.99,
    description: "Adjustable phone stand for desk",
    category: "Accessories",
    stock: 120,
    images: ["/adjustable-phone-stand.jpg"],
    rating: 4.3,
    reviews: 95,
    badges: ["new"],
    variants: {
      colors: ["#000000", "#FFFFFF", "#C0C0C0"],
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "9",
    name: "Bluetooth Speaker",
    price: 79.99,
    oldPrice: 99.99,
    description: "Portable waterproof Bluetooth speaker with 360° sound",
    category: "Electronics",
    stock: 85,
    images: ["/portable-bluetooth-speaker.jpg"],
    rating: 4.6,
    reviews: 189,
    badges: ["sale"],
    variants: {
      colors: ["#000000", "#1E40AF", "#DC2626"],
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "10",
    name: "Gaming Mouse Pad",
    price: 29.99,
    description: "Extended RGB gaming mouse pad with non-slip base",
    category: "Accessories",
    stock: 150,
    images: ["/rgb-gaming-mouse-pad.jpg"],
    rating: 4.5,
    reviews: 234,
    badges: ["best-seller"],
    variants: {
      sizes: ["Medium", "Large", "XL"],
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "11",
    name: "Wireless Earbuds",
    price: 129.99,
    oldPrice: 179.99,
    description: "True wireless earbuds with active noise cancellation",
    category: "Electronics",
    stock: 65,
    images: ["/wireless-earbuds-case.jpg"],
    rating: 4.7,
    reviews: 456,
    badges: ["sale", "best-seller"],
    variants: {
      colors: ["#000000", "#FFFFFF", "#1E40AF"],
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "12",
    name: "Monitor Arm Mount",
    price: 89.99,
    description: "Adjustable dual monitor arm mount with cable management",
    category: "Accessories",
    stock: 40,
    images: ["/dual-monitor-arm-mount.jpg"],
    rating: 4.8,
    reviews: 178,
    badges: ["new"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "13",
    name: "Desk Lamp LED",
    price: 59.99,
    description: "Smart LED desk lamp with touch control and USB charging",
    category: "Accessories",
    stock: 95,
    images: ["/modern-led-desk-lamp.jpg"],
    rating: 4.4,
    reviews: 142,
    badges: ["new"],
    variants: {
      colors: ["#000000", "#FFFFFF", "#C0C0C0"],
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "14",
    name: "External SSD 1TB",
    price: 149.99,
    oldPrice: 199.99,
    description: "Ultra-fast portable SSD with USB-C connectivity",
    category: "Electronics",
    stock: 55,
    images: ["/portable-external-ssd.jpg"],
    rating: 4.9,
    reviews: 523,
    badges: ["sale", "best-seller"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "15",
    name: "Cable Organizer Set",
    price: 19.99,
    description: "Complete cable management solution for desk setup",
    category: "Accessories",
    stock: 200,
    images: ["/cable-organizer-clips.jpg"],
    rating: 4.2,
    reviews: 87,
    badges: ["new"],
    variants: {
      colors: ["#000000", "#FFFFFF", "#808080"],
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "16",
    name: "Portable Charger 20000mAh",
    price: 49.99,
    description: "High-capacity power bank with fast charging support",
    category: "Electronics",
    stock: 110,
    images: ["/portable-power-bank-charger.jpg"],
    rating: 4.6,
    reviews: 298,
    badges: ["best-seller"],
    variants: {
      colors: ["#000000", "#FFFFFF"],
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "17",
    name: "Laptop Sleeve 15 inch",
    price: 34.99,
    description: "Premium leather laptop sleeve with extra pockets",
    category: "Accessories",
    stock: 80,
    images: ["/leather-laptop-sleeve.jpg"],
    rating: 4.5,
    reviews: 156,
    variants: {
      colors: ["#000000", "#8B4513", "#808080"],
      sizes: ["13 inch", "15 inch", "16 inch"],
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "18",
    name: "HD Webcam Ring Light",
    price: 69.99,
    oldPrice: 89.99,
    description: "Webcam with built-in ring light for perfect lighting",
    category: "Electronics",
    stock: 45,
    images: ["/webcam-with-ring-light.jpg"],
    rating: 4.7,
    reviews: 267,
    badges: ["sale", "limited"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "19",
    name: "Ergonomic Wrist Rest",
    price: 24.99,
    description: "Memory foam wrist rest for keyboard and mouse",
    category: "Accessories",
    stock: 135,
    images: ["/keyboard-wrist-rest-pad.jpg"],
    rating: 4.3,
    reviews: 112,
    badges: ["new"],
    variants: {
      colors: ["#000000", "#808080"],
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "20",
    name: "Wireless Charging Pad",
    price: 39.99,
    description: "Fast wireless charging pad compatible with all Qi devices",
    category: "Electronics",
    stock: 90,
    images: ["/wireless-charging-pad.png"],
    rating: 4.4,
    reviews: 201,
    badges: ["best-seller"],
    variants: {
      colors: ["#000000", "#FFFFFF"],
    },
    createdAt: new Date().toISOString(),
  },
]

export function getProducts(): Product[] {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("products")
    if (stored) {
      products = JSON.parse(stored)
    }
  }
  return products
}

export function getProduct(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id)
}

export function createProduct(product: Omit<Product, "id" | "createdAt">): Product {
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  products = [...getProducts(), newProduct]
  saveProducts()
  return newProduct
}

export function updateProduct(id: string, updates: Partial<Product>): Product | undefined {
  const index = getProducts().findIndex((p) => p.id === id)
  if (index === -1) return undefined

  products[index] = { ...products[index], ...updates }
  saveProducts()
  return products[index]
}

export function deleteProduct(id: string): boolean {
  const initialLength = products.length
  products = getProducts().filter((p) => p.id !== id)
  saveProducts()
  return products.length < initialLength
}

function saveProducts() {
  if (typeof window !== "undefined") {
    localStorage.setItem("products", JSON.stringify(products))
  }
}
