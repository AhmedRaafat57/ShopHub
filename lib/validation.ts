import * as yup from "yup"

export const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email address").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

export const productSchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  price: yup.number().positive("Price must be positive").required("Price is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  stock: yup
    .number()
    .integer("Stock must be a whole number")
    .min(0, "Stock cannot be negative")
    .required("Stock is required"),
})
