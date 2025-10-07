"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getReviews, addReview, markReviewHelpful, type Review } from "@/lib/reviews"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface ProductReviewsProps {
  productId: string
  productName: string
}

export function ProductReviews({ productId, productName }: ProductReviewsProps) {
  const { toast } = useToast()
  const [reviews, setReviews] = useState<Review[]>([])
  const [isWritingReview, setIsWritingReview] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [formData, setFormData] = useState({
    userName: "",
    comment: "",
  })

  useEffect(() => {
    loadReviews()
  }, [productId])

  const loadReviews = () => {
    setReviews(getReviews(productId))
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      toast({
        title: "Please select a rating",
        description: "You must select a star rating before submitting.",
        variant: "destructive",
      })
      return
    }

    addReview(productId, {
      productId,
      userName: formData.userName,
      rating,
      comment: formData.comment,
    })

    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback.",
    })

    // Reset form
    setFormData({ userName: "", comment: "" })
    setRating(0)
    setIsWritingReview(false)
    loadReviews()

    // Reload page to update product rating
    window.location.reload()
  }

  const handleMarkHelpful = (reviewId: string) => {
    markReviewHelpful(productId, reviewId)
    loadReviews()
    toast({
      title: "Thanks for your feedback!",
    })
  }

  const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
    percentage: reviews.length > 0 ? (reviews.filter((r) => r.rating === stars).length / reviews.length) * 100 : 0,
  }))

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Average Rating */}
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold">{averageRating.toFixed(1)}</div>
              <div className="flex items-center justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-6 w-6",
                      i < Math.floor(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted text-muted-foreground/30",
                    )}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Based on {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map((dist) => (
                <div key={dist.stars} className="flex items-center gap-3">
                  <span className="text-sm w-12">{dist.stars} star</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 transition-all duration-300"
                      style={{ width: `${dist.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">{dist.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <Button onClick={() => setIsWritingReview(!isWritingReview)} className="w-full">
              {isWritingReview ? "Cancel" : "Write a Review"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Write Review Form */}
      <AnimatePresence>
        {isWritingReview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Your Rating *</Label>
                    <div className="flex gap-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setRating(i + 1)}
                          onMouseEnter={() => setHoverRating(i + 1)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={cn(
                              "h-8 w-8",
                              i < (hoverRating || rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-muted text-muted-foreground/30",
                            )}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userName">Your Name *</Label>
                    <Input
                      id="userName"
                      value={formData.userName}
                      onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comment">Your Review *</Label>
                    <Textarea
                      id="comment"
                      rows={4}
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      placeholder={`Share your experience with ${productName}...`}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Review
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Customer Reviews</h3>
        {reviews.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              <p>No reviews yet. Be the first to review this product!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <motion.div key={review.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                  <CardContent className="pt-6 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold">{review.userName}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4",
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-muted text-muted-foreground/30",
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                    <div className="flex items-center gap-2 pt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkHelpful(review.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Helpful ({review.helpful})
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
