"use client";

import { useState } from 'react';
import type { Seller } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2 } from 'lucide-react';
import SellerForm from './seller-form';
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface SellerListProps {
  initialSellers: Seller[];
}

export default function SellerList({ initialSellers }: SellerListProps) {
  const [sellers, setSellers] = useState<Seller[]>(initialSellers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const { toast } = useToast();

  const handleFormOpen = (seller: Seller | null) => {
    setSelectedSeller(seller);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setSelectedSeller(null);
    setIsFormOpen(false);
  };

  const handleSave = async (sellerData: Omit<Seller, 'seller_id'>) => {
    const isEditing = !!selectedSeller;
    const url = isEditing ? `/api/sellers/${selectedSeller.seller_id}` : '/api/sellers';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sellerData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${isEditing ? 'update' : 'create'} seller`);
      }

      const savedSeller = await response.json();

      if (isEditing) {
        setSellers(sellers.map(s => s.seller_id === savedSeller.seller_id ? savedSeller : s));
      } else {
        setSellers([...sellers, savedSeller]);
      }

      toast({
        title: "Success",
        description: `Seller successfully ${isEditing ? 'updated' : 'created'}.`,
      });
      handleFormClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    }
  };

  const handleDelete = async (sellerId: number) => {
    try {
        const response = await fetch(`/api/sellers/${sellerId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete seller.');
        }

        setSellers(sellers.filter(s => s.seller_id !== sellerId));
        toast({
            title: 'Success',
            description: 'Seller deleted successfully.',
        });
    } catch (error) {
         toast({
            variant: "destructive",
            title: "Error",
            description: error instanceof Error ? error.message : "An unknown error occurred.",
        });
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => handleFormOpen(null)}>
          <Plus className="mr-2 h-4 w-4" /> Add Seller
        </Button>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent onInteractOutside={(e) => { e.preventDefault(); }} className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{selectedSeller ? 'Edit Seller' : 'Add New Seller'}</DialogTitle>
            </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sellers.length > 0 ? (
                sellers.map((seller) => (
                    <TableRow key={seller.seller_id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                              <Avatar>
                                  <AvatarImage src={seller.photo} alt={seller.name} />
                                  <AvatarFallback>{getInitials(seller.name)}</AvatarFallback>
                              </Avatar>
                              {seller.name}
                          </div>
                        </TableCell>
                        <TableCell>{seller.email}</TableCell>
                        <TableCell>{seller.phone}</TableCell>
                        <TableCell className="text-right">
                        <Button aria-label="Edit" variant="ghost" size="icon" onClick={() => handleFormOpen(seller)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                         <AlertDialog>
                            <AlertDialogTrigger asChild>
                                 <Button aria-label="Delete" variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the seller.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(seller.seller_id!)}>
                                    Delete
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        </TableCell>
                    </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                        No sellers found.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
