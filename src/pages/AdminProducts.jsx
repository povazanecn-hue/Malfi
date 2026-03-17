import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Package } from 'lucide-react';
import { toast } from 'sonner';

const PRODUCT_CATEGORIES = ['merchandise', 'gift_card', 'pantry', 'beverage'];

export default function AdminProducts() {
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list('-created_date'),
  });

  const saveProductMutation = useMutation({
    mutationFn: async (data) => {
      if (data.id) {
        return base44.entities.Product.update(data.id, data);
      }
      return base44.entities.Product.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setShowDialog(false);
      setEditingProduct(null);
      toast.success('Product saved');
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (id) => base44.entities.Product.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted');
    },
  });

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground mt-1">{products.length} products</p>
        </div>
        <Button onClick={() => { setEditingProduct(null); setShowDialog(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Loading...</div>
          ) : products.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
              <p>No products yet</p>
            </div>
          ) : (
            <div className="divide-y">
              {products.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 gap-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {product.image_url && (
                      <img src={product.image_url} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{product.name}</p>
                        <span className="font-bold text-primary">${product.price?.toFixed(2)}</span>
                      </div>
                      <div className="flex gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline" className="capitalize">{product.category?.replace(/_/g, ' ')}</Badge>
                        <span>Stock: {product.stock || 0}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => { setEditingProduct(product); setShowDialog(true); }}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteProductMutation.mutate(product.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Product Dialog */}
      <ProductDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        product={editingProduct}
        onSave={(data) => saveProductMutation.mutate(data)}
      />
    </div>
  );
}

function ProductDialog({ open, onOpenChange, product, onSave }) {
  const [form, setForm] = useState({});

  React.useEffect(() => {
    if (product) {
      setForm(product);
    } else {
      setForm({ is_active: true, stock: 0, price: 0, category: 'merchandise' });
    }
  }, [product]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Product' : 'New Product'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Name *</Label>
            <Input value={form.name || ''} onChange={(e) => handleChange('name', e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label>Category</Label>
            <Select value={form.category || 'merchandise'} onValueChange={(v) => handleChange('category', v)}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                {PRODUCT_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>{c.replace(/_/g, ' ')}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Description</Label>
            <Textarea value={form.description || ''} onChange={(e) => handleChange('description', e.target.value)} className="mt-1" rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Price *</Label>
              <Input type="number" step="0.01" value={form.price || ''} onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)} className="mt-1" />
            </div>
            <div>
              <Label>Stock</Label>
              <Input type="number" value={form.stock || ''} onChange={(e) => handleChange('stock', parseInt(e.target.value) || 0)} className="mt-1" />
            </div>
          </div>
          <div>
            <Label>Image URL</Label>
            <Input value={form.image_url || ''} onChange={(e) => handleChange('image_url', e.target.value)} className="mt-1" />
          </div>
          <div className="flex items-center justify-between">
            <Label>Active</Label>
            <Switch checked={form.is_active ?? true} onCheckedChange={(v) => handleChange('is_active', v)} />
          </div>
          <Button onClick={() => onSave(form)} className="w-full">
            {product ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}