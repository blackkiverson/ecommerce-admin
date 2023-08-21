"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";
import axios from "axios";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";


/* The code `const formSchema = z.object({ name: z.string().min(1) });` is defining a form schema using
the `zod` library. */
const formSchema = z.object({
  name: z.string().min(1),
});

/* The code `export const StoreModal = () => { ... }` is defining a React functional component called
`StoreModal`. */
export const StoreModal = () => {
    const storeModal = useStoreModal();

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
      },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        setLoading(true);
        const response = await axios.post("/api/stores", values);

        // Check if the response is an Axios error
        if (axios.isAxiosError(response)) {
          // Handle Axios errors
          console.error("Axios Error:", response.message);
          toast.error("Something went wrong with the request.");
        } else {
          // Handle a successful response
          toast.success("Store Created");
          window.location.assign(`/${response.data.id}`);
        }
      } catch (error) {
        console.error("General Error:", error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    return (
      <Modal
        title="Create store"
        description="Add a new store to manage products and categories"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
      >
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="E-Commerce"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button
                      disabled={loading}
                      variant="outline"
                      onClick={storeModal.onClose}
                    >
                      Cancel
                    </Button>
                    <Button disabled={loading} type="submit">
                      Continue
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </Modal>
    );
};