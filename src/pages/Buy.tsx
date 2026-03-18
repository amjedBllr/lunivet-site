import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { products } from "@/components/sections/ProductCarousel";
import { useCreateOrder, orderSchema, type OrderInput } from "@/hooks/use-orders";
import { useToast } from "@/hooks/use-toast";
import { Check, Minus, Plus, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

interface CartItem {
  productId: string;
  quantity: number;
}

export default function Buy() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const mutation = useCreateOrder();
  const { t } = useI18n();
  
  const [selectedVariant, setSelectedVariant] = useState(products[0]);
  const [quantity, setQuantity] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showOrderNotification, setShowOrderNotification] = useState(false);

  // Check URL for pre-selected variant
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const variantId = params.get("variant");
    if (variantId) {
      const variant = products.find(p => p.id === variantId);
      if (variant) setSelectedVariant(variant);
    }
  }, []);

  const form = useForm<OrderInput>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      firstName: "", lastName: "", email: "", phone: "",
      address: "",
      shippingOption: "home",
      variantId: selectedVariant.id,
      quantity: 1
    }
  });

  // Keep form data synced with state
  useEffect(() => {
    form.setValue("variantId", cart.length > 0 ? cart[0].productId : selectedVariant.id);
    form.setValue("quantity", cart.length > 0 ? cart[0].quantity : quantity);
  }, [cart, selectedVariant, quantity, form]);

  const pricePerUnit = 3374; // 24.99 USD ≈ 3374 DZD
  const subtotal = cart.reduce((sum, item) => sum + pricePerUnit * item.quantity, 0);
  const shipping = subtotal > 6750 ? 0 : 809; // 5.99 USD ≈ 809 DZD, free shipping threshold 50 USD ≈ 6750 DZD
  const total = subtotal + shipping;

  const addToCart = () => {
    const existing = cart.find(item => item.productId === selectedVariant.id);
    if (existing) {
      setCart(cart.map(item => 
        item.productId === selectedVariant.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { productId: selectedVariant.id, quantity }]);
    }
    setQuantity(1);
    toast({ title: "Added to cart", description: `${t(`products.${selectedVariant.id}.name`)} added successfully` });
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const updateCartQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const onSubmit = (data: OrderInput) => {
    if (cart.length === 0) {
      toast({ variant: "destructive", title: "Error", description: "Please add items to your cart before placing an order" });
      return;
    }
    mutation.mutate(data, {
      onSuccess: (result) => {
        setShowOrderNotification(true);
        setCart([]);
        setTimeout(() => {
          setShowOrderNotification(false);
          form.reset({
            firstName: "", lastName: "", email: "", phone: "",
            address: "",
            shippingOption: "home",
            variantId: selectedVariant.id,
            quantity: 1
          });
        }, 3000);
      },
      onError: () => {
        toast({ variant: "destructive", title: t("buy.toast.err.title"), description: t("buy.toast.err.desc") });
      }
    });
  };

  if (orderSuccess) {
    return (
      <PageLayout>
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 pt-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md mx-auto px-4"
          >
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Check className="w-12 h-12" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{t("buy.success.title")}</h1>
            <p className="text-lg text-gray-600 mb-8">
              {t("buy.success.body")}
            </p>
            <Button size="lg" className="w-full rounded-full" onClick={() => setLocation("/")}>
              {t("buy.success.cta")}
            </Button>
          </motion.div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="bg-gray-50 min-h-screen pt-32 pb-24">
        {/* Order Notification Overlay */}
        <AnimatePresence>
          {showOrderNotification && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              <motion.div 
                className="bg-white rounded-3xl p-12 text-center shadow-2xl max-w-md mx-4"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <Check className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Placed!</h2>
                <p className="text-gray-600 leading-relaxed">We'll call you soon to confirm your order</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{t("buy.title")}</h1>
            <p className="text-muted-foreground mt-2">{t("buy.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Form Section */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-10">
              
              {/* Product Selection */}
              <section>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">1</span> 
                  {t("buy.step1")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <div 
                      key={product.id}
                      onClick={() => setSelectedVariant(product)}
                      className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 border-2 relative overflow-hidden group
                        ${selectedVariant.id === product.id ? 'border-primary shadow-md' : 'border-transparent bg-white shadow-sm hover:shadow-md'}`}
                      style={{ 
                        backgroundColor: selectedVariant.id === product.id ? product.bgColor : 'white' 
                      }}
                    >
                      {selectedVariant.id === product.id && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-sm z-10">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                      <div className="aspect-square mb-4 rounded-xl overflow-hidden bg-white/50 backdrop-blur-sm p-4 relative">
                        <img 
                          src={product.image} 
                          alt={t(`products.${product.id}.name`)}
                          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                      <h3 className="font-bold text-gray-900 text-center">{t(`products.${product.id}.name`)}</h3>
                    </div>
                  ))}
                </div>
              </section>

              {/* Shipping Form */}
              <section>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">2</span> 
                  {t("buy.step2")}
                </h2>
                <Card className="p-6 md:p-8 border-none shadow-md">
                  <Form {...form}>
                    <form id="checkout-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-700 border-b pb-2">{t("buy.contactInfo")}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField control={form.control} name="firstName" render={({ field }) => (
                            <FormItem><FormLabel>{t("buy.firstName")}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="lastName" render={({ field }) => (
                            <FormItem><FormLabel>{t("buy.lastName")}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel>{t("buy.email")}</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="phone" render={({ field }) => (
                            <FormItem><FormLabel>{t("buy.phone")}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                        </div>
                      </div>

                      <div className="space-y-4 pt-4">
                        <h3 className="font-semibold text-gray-700 border-b pb-6">{t("buy.shippingAddress")}</h3>
                        <FormField control={form.control} name="address" render={({ field }) => (
                          <FormItem><FormLabel>{t("buy.homeAddress")}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="shippingOption" render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("buy.shippingOption")}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={t("buy.shippingOption")} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="home">{t("buy.shippingOption.home")}</SelectItem>
                                <SelectItem value="center">{t("buy.shippingOption.center")}</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                    </form>
                  </Form>
                </Card>
              </section>

            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="sticky top-32">
                <Card className="p-6 border-none shadow-xl overflow-hidden relative">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-primary"></div>
                  <h3 className="text-xl font-bold mb-6 mt-2">{t("buy.summary")}</h3>
                  
                  <div className="flex gap-4 items-center mb-6 p-4 bg-gray-50 rounded-xl">
                    <div className="w-20 h-20 rounded-lg p-2 flex-shrink-0 flex items-center justify-center bg-white shadow-sm" style={{ backgroundColor: selectedVariant.bgColor }}>
                      <img src={selectedVariant.image} alt={t(`products.${selectedVariant.id}.name`)} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{t(`products.${selectedVariant.id}.name`)}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{t("buy.productType")}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border rounded-md bg-white">
                          <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 px-2 hover:bg-gray-50 transition-colors text-gray-500">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{quantity}</span>
                          <button type="button" onClick={() => setQuantity(quantity + 1)} className="p-1 px-2 hover:bg-gray-50 transition-colors text-gray-500">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-bold ml-auto">{pricePerUnit.toLocaleString()} DA</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="button" 
                    onClick={addToCart}
                    variant="outline"
                    className="w-full h-12 rounded-lg mb-6 bg-white text-primary border-primary hover:bg-primary/5"
                  >
                    {t("buy.addToCart")}
                  </Button>

                  <div className="space-y-3 py-4 border-t border-b border-gray-100 mb-6 text-sm">
                    {cart.length > 0 && (
                      <>
                        <div className="space-y-2 mb-4">
                          {cart.map((item) => {
                            const product = products.find(p => p.id === item.productId)!;
                            return (
                              <div key={item.productId} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                                <div>
                                  <span className="font-medium text-gray-900">{t(`products.${product.id}.name`)}</span>
                                  <div className="flex items-center gap-2 mt-1">
                                    <button type="button" onClick={() => updateCartQuantity(item.productId, item.quantity - 1)} className="p-0 px-1 hover:bg-gray-200 rounded text-gray-500">
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="w-4 text-center">{item.quantity}</span>
                                    <button type="button" onClick={() => updateCartQuantity(item.productId, item.quantity + 1)} className="p-0 px-1 hover:bg-gray-200 rounded text-gray-500">
                                      <Plus className="w-3 h-3" />
                                    </button>
                                    <button type="button" onClick={() => removeFromCart(item.productId)} className="ml-auto text-red-600 hover:text-red-700 text-xs">{t("buy.remove")}</button>
                                  </div>
                                </div>
                                <span className="font-bold">{(pricePerUnit * item.quantity).toLocaleString()} DA</span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="border-t pt-3"></div>
                      </>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t("buy.subtotal")}</span>
                      <span className="font-medium">{subtotal.toLocaleString()} DA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t("buy.shipping")}</span>
                      <span className="font-medium">
                        {shipping === 0 ? <span className="text-green-600 font-bold">{t("buy.free")}</span> : `${shipping.toLocaleString()} DA`}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-primary/70 bg-primary/5 p-2 rounded-md">
                        {t("buy.addMore", { amount: `${(6750 - subtotal).toLocaleString()} DA` })}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between items-end mb-8">
                    <span className="text-lg font-bold text-gray-900">{t("buy.total")}</span>
                    <span className="text-3xl font-black text-primary">{total.toLocaleString()} DA</span>
                  </div>

                  <Button 
                    type="submit" 
                    form="checkout-form" 
                    size="lg" 
                    className="w-full h-14 rounded-xl text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all mb-6"
                    disabled={mutation.isPending || cart.length === 0}
                  >
                    {mutation.isPending ? t("buy.processing") : t("buy.placeOrder")}
                  </Button>

                  <div className="space-y-3 text-xs text-gray-500">
                    <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-600" /> {t("buy.secure")}</div>
                    <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-blue-600" /> {t("buy.fastShipping")}</div>
                    <div className="flex items-center gap-2"><RotateCcw className="w-4 h-4 text-purple-600" /> {t("buy.guarantee")}</div>
                  </div>
                </Card>
              </div>
            </div>

          </div>
        </div>
      </div>
    </PageLayout>
  );
}
