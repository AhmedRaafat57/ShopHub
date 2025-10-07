export interface Review {
  id: string
  productId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
  helpful: number
}

export function getReviews(productId: string): Review[] {
  if (typeof window === "undefined") return []
  const reviews = localStorage.getItem(`reviews-${productId}`)
  return reviews ? JSON.parse(reviews) : []
}

export function addReview(productId: string, review: Omit<Review, "id" | "createdAt" | "helpful">): Review {
  const newReview: Review = {
    ...review,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    helpful: 0,
  }

  const reviews = getReviews(productId)
  reviews.unshift(newReview)
  saveReviews(productId, reviews)

  // Update product rating
  updateProductRating(productId, reviews)

  return newReview
}

export function markReviewHelpful(productId: string, reviewId: string): void {
  const reviews = getReviews(productId)
  const review = reviews.find((r) => r.id === reviewId)
  if (review) {
    review.helpful += 1
    saveReviews(productId, reviews)
  }
}

function saveReviews(productId: string, reviews: Review[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(`reviews-${productId}`, JSON.stringify(reviews))
}

function updateProductRating(productId: string, reviews: Review[]): void {
  if (reviews.length === 0) return

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  const roundedRating = Math.round(averageRating * 10) / 10

  // Update product in localStorage
  if (typeof window !== "undefined") {
    const products = localStorage.getItem("products")
    if (products) {
      const parsedProducts = JSON.parse(products)
      const productIndex = parsedProducts.findIndex((p: any) => p.id === productId)
      if (productIndex > -1) {
        parsedProducts[productIndex].rating = roundedRating
        parsedProducts[productIndex].reviews = reviews.length
        localStorage.setItem("products", JSON.stringify(parsedProducts))
      }
    }
  }
}
