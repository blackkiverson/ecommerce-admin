"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SizeColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps {
    data: SizeColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onCopy = (id: string) => {
      navigator.clipboard.writeText(id);
      toast.success("Size Id copied to clipboard.");
    };

    const onDelete = async () => {
      try {
        setLoading(true);
        await axios.delete(
          `/api/${params.storeId}/sizes/${data.id}`
        );
        router.refresh();
        toast.success("Size deleted.");
      } catch (error) {
        toast.error(
          "Make sure you removed all products using this size first."
        );
      } finally {
        setLoading(false);
        setOpen(false);
      }
    };

    return (
      <>
        <AlertModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={onDelete}
          loading={loading}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              {/* The `className="sr-only"` is adding a CSS class to the element, which is
                    typically used to visually hide an element on the screen while still
                    making it accessible to screen readers. In this case, it is being used to
                    hide the text "Open menu" from being displayed on the screen, but still
                    allowing screen readers to read it aloud to users with visual impairments. */}
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onCopy(data.id)}>
              <Copy color="blue" className="mr-2 h-4 w-4" />
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                router.push(`/${params.storeId}/sizes/${data.id}`)
              }
            >
              <Edit color="orange" className="mr-2 h-4 w-4" />
              Update
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash color="red" className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
};