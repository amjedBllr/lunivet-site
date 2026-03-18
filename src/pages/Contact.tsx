import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useSubmitContact, contactSchema, type ContactInput } from "@/hooks/use-contact";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

export default function Contact() {
  const { toast } = useToast();
  const mutation = useSubmitContact();
  const { t } = useI18n();
  
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: ""
    }
  });

  const onSubmit = (data: ContactInput) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: t("contact.form.toast.ok.title"),
          description: t("contact.form.toast.ok.desc"),
        });
        form.reset();
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: t("contact.form.toast.err.title"),
          description: t("contact.form.toast.err.desc"),
        });
      }
    });
  };

  return (
    <PageLayout>
      <section className="pt-32 pb-16 bg-[#0A0F2C] text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("contact.hero.title")}</h1>
            <p className="text-lg text-white/80">
              {t("contact.hero.body")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="p-6 border-none shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{t("contact.card.email.title")}</h3>
                <p className="text-muted-foreground mb-4">{t("contact.card.email.desc")}</p>
                <a href="mailto:hello@lunivet.com" className="text-primary font-medium hover:underline">hello@lunivet.com</a>
              </Card>

              <Card className="p-6 border-none shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{t("contact.card.phone.title")}</h3>
                <p className="text-muted-foreground mb-4">{t("contact.card.phone.desc")}</p>
                <a href="tel:+213783898814" className="text-primary font-medium hover:underline">(+213) 783 898 814</a>
              </Card>

              <Card className="p-6 border-none shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{t("contact.card.visit.title")}</h3>
                <p className="text-muted-foreground mb-4">{t("contact.card.visit.desc")}</p>
                <address className="not-italic text-gray-700">
                  Constantine, Ali Mendjeli<br />
                  Elkhroub
                </address>
              </Card>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 md:p-10 border-none shadow-xl bg-white">
                <h2 className="text-2xl font-bold mb-8">{t("contact.form.title")}</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("contact.form.fullName")}</FormLabel>
                            <FormControl>
                              <Input placeholder={t("contact.form.placeholder.name")} className="h-12 bg-gray-50 border-gray-200 focus:bg-white" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("contact.form.email")}</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder={t("contact.form.placeholder.email")} className="h-12 bg-gray-50 border-gray-200 focus:bg-white" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contact.form.phone")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("contact.form.placeholder.phone")} className="h-12 bg-gray-50 border-gray-200 focus:bg-white" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contact.form.message")}</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder={t("contact.form.placeholder.message")} 
                              className="min-h-[150px] bg-gray-50 border-gray-200 focus:bg-white resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full h-14 text-base rounded-xl"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? t("contact.form.sending") : (
                        <>
                          <Send className="w-5 h-5 mr-2" /> {t("contact.form.send")}
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </Card>
            </div>

          </div>
        </div>
      </section>
    </PageLayout>
  );
}
