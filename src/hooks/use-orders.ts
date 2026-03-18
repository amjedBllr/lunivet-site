import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const orderSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(5, "Address is required"),
  variantId: z.string(),
  quantity: z.number().min(1),
});

export type OrderInput = z.infer<typeof orderSchema>;

export function useCreateOrder() {
  return useMutation({
    mutationFn: async (data: OrderInput) => {
      // Simulate network request to backend
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return { success: true, orderId: "ORD-" + Math.random().toString(36).substring(2, 9).toUpperCase() };
    },
  });
}
