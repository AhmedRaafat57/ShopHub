export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  color?: string
  size?: string
  stock: number
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return []
  const cart = localStorage.getItem("cart")
  return cart ? JSON.parse(cart) : []
}

export function saveCart(cart: CartItem[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem("cart", JSON.stringify(cart))
  // Dispatch custom event to update cart count in navbar
  window.dispatchEvent(new Event("cartUpdated"))
}

export function addToCart(item: Omit<CartItem, "id">): void {
  const cart = getCart()
  const existingItemIndex = cart.findIndex(
    (i) => i.productId === item.productId && i.color === item.color && i.size === item.size,
  )

  if (existingItemIndex > -1) {
    // Update quantity if item already exists
    cart[existingItemIndex].quantity = Math.min(cart[existingItemIndex].quantity + item.quantity, item.stock)
  } else {
    // Add new item
    cart.push({
      ...item,
      id: `${item.productId}-${item.color || "default"}-${item.size || "default"}-${Date.now()}`,
    })
  }

  saveCart(cart)
}

export function updateCartItemQuantity(itemId: string, quantity: number): void {
  const cart = getCart()
  const itemIndex = cart.findIndex((i) => i.id === itemId)

  if (itemIndex > -1) {
    if (quantity <= 0) {
      cart.splice(itemIndex, 1)
    } else {
      cart[itemIndex].quantity = Math.min(quantity, cart[itemIndex].stock)
    }
    saveCart(cart)
  }
}

export function removeFromCart(itemId: string): void {
  const cart = getCart()
  const updatedCart = cart.filter((i) => i.id !== itemId)
  saveCart(updatedCart)
}

export function clearCart(): void {
  saveCart([])
}

export function getCartTotal(): number {
  const cart = getCart()
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}

export function getCartCount(): number {
  const cart = getCart()
  return cart.reduce((count, item) => count + item.quantity, 0)
}
