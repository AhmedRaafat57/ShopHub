"use client"

import type React from "react"

import { CustomerNavbar } from "@/components/customer-navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send to an API
    console.log("Contact form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <CustomerNavbar />

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">Get in Touch</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Have a question or need help? We'd love to hear from you. Send us a message and we'll respond as soon as
                possible.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <Mail className="h-5 w-5 text-accent mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <p className="text-sm text-muted-foreground">support@shophub.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="h-5 w-5 text-accent mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Phone</h3>
                        <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="h-5 w-5 text-accent mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Address</h3>
                        <p className="text-sm text-muted-foreground">
                          123 Commerce Street
                          <br />
                          New York, NY 10001
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Clock className="h-5 w-5 text-accent mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Hours</h3>
                        <p className="text-sm text-muted-foreground">
                          Mon-Fri: 9AM - 6PM
                          <br />
                          Sat-Sun: 10AM - 4PM
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={submitted}>
                      {submitted ? "Message Sent!" : "Send Message"}
                    </Button>
                    {submitted && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-accent text-center"
                      >
                        Thank you! We'll get back to you soon.
                      </motion.p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
