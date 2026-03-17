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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, UtensilsCrossed } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminMenu() {
  const queryClient = useQueryClient();
  const [editingItem, setEditingItem] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showItemDialog, setShowItemDialog] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);

  const { data: categories = [] } = useQuery({
    queryKey: ['menu-categories'],
    queryFn: () => base44.entities.MenuCategory.list('sort_order'),
  });

  const { data: items = [] } = useQuery({
    queryKey: ['menu-items'],
    queryFn: () => base44.entities.MenuItem.list('-created_date'),
  });

  // Category mutations
  const saveCategoryMutation = useMutation({
    mutationFn: async (data) => {
      if (data.id) {
        return base44.entities.MenuCategory.update(data.id, data);
      }
      return base44.entities.MenuCategory.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu-categories'] });
      setShowCategoryDialog(false);
      setEditingCategory(null);
      toast.success('Category saved');
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id) => base44.entities.MenuCategory.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu-categories'] });
      toast.success('Category deleted');
    },
  });

  // Item mutations
  const saveItemMutation = useMutation({
    mutationFn: async (data) => {
      if (data.id) {
        return base44.entities.MenuItem.update(data.id, data);
      }
      return base44.entities.MenuItem.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu-items'] });
      setShowItemDialog(false);
      setEditingItem(null);
      toast.success('Item saved');
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: (id) => base44.entities.MenuItem.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu-items'] });
      toast.success('Item deleted');
    },
  });

  const toggleAvailability = useMutation({
    mutationFn: ({ id, is_available }) => base44.entities.MenuItem.update(id, { is_available }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu-items'] });
    },
  });

  const getCategoryName = (id) => categories.find(c => c.id === id)?.name || 'Uncategorized';

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Menu Management</h1>
          <p className="text-muted-foreground mt-1">{items.length} items across {categories.length} categories</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => { setEditingCategory(null); setShowCategoryDialog(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
          <Button onClick={() => { setEditingItem(null); setShowItemDialog(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge 
                key={cat.id} 
                variant="secondary" 
                className="px-4 py-2 text-sm cursor-pointer hover:bg-muted"
                onClick={() => { setEditingCategory(cat); setShowCategoryDialog(true); }}
              >
                {cat.name}
                <Pencil className="h-3 w-3 ml-2" />
              </Badge>
            ))}
            {categories.length === 0 && (
              <p className="text-muted-foreground">No categories yet. Create one to get started.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <Card>
        <CardHeader>
          <CardTitle>Menu Items</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {items.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <UtensilsCrossed className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
              <p>No menu items yet</p>
            </div>
          ) : (
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 gap-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {item.image_url && (
                      <img src={item.image_url} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium truncate">{item.name}</p>
                        <span className="font-bold text-primary">${item.price?.toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{getCategoryName(item.category_id)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Available</span>
                      <Switch
                        checked={item.is_available}
                        onCheckedChange={(checked) => toggleAvailability.mutate({ id: item.id, is_available: checked })}
                      />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => { setEditingItem(item); setShowItemDialog(true); }}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteItemMutation.mutate(item.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category Dialog */}
      <CategoryDialog
        open={showCategoryDialog}
        onOpenChange={setShowCategoryDialog}
        category={editingCategory}
        onSave={(data) => saveCategoryMutation.mutate(data)}
        onDelete={(id) => { deleteCategoryMutation.mutate(id); setShowCategoryDialog(false); }}
      />

      {/* Item Dialog */}
      <ItemDialog
        open={showItemDialog}
        onOpenChange={setShowItemDialog}
        item={editingItem}
        categories={categories}
        onSave={(data) => saveItemMutation.mutate(data)}
      />
    </div>
  );
}

function CategoryDialog({ open, onOpenChange, category, onSave, onDelete }) {
  const [name, setName] = useState('');
  const [sortOrder, setSortOrder] = useState(0);

  React.useEffect(() => {
    if (category) {
      setName(category.name || '');
      setSortOrder(category.sort_order || 0);
    } else {
      setName('');
      setSortOrder(0);
    }
  }, [category]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{category ? 'Edit Category' : 'New Category'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label>Sort Order</Label>
            <Input type="number" value={sortOrder} onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)} className="mt-1" />
          </div>
          <div className="flex gap-2">
            <Button onClick={() => onSave({ ...(category || {}), name, sort_order: sortOrder })} className="flex-1">
              Save
            </Button>
            {category && (
              <Button variant="destructive" onClick={() => onDelete(category.id)}>
                Delete
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ItemDialog({ open, onOpenChange, item, categories, onSave }) {
  const [form, setForm] = useState({});

  React.useEffect(() => {
    if (item) {
      setForm(item);
    } else {
      setForm({ is_available: true, is_featured: false, price: 0 });
    }
  }, [item]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{item ? 'Edit Item' : 'New Item'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Name *</Label>
            <Input value={form.name || ''} onChange={(e) => handleChange('name', e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label>Category *</Label>
            <Select value={form.category_id || ''} onValueChange={(v) => handleChange('category_id', v)}>
              <SelectTrigger className="mt-1"><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>
                {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
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
              <Label>Prep Time (min)</Label>
              <Input type="number" value={form.prep_time_minutes || ''} onChange={(e) => handleChange('prep_time_minutes', parseInt(e.target.value) || 0)} className="mt-1" />
            </div>
          </div>
          <div>
            <Label>Image URL</Label>
            <Input value={form.image_url || ''} onChange={(e) => handleChange('image_url', e.target.value)} className="mt-1" placeholder="https://..." />
          </div>
          <div className="flex items-center justify-between">
            <Label>Available</Label>
            <Switch checked={form.is_available ?? true} onCheckedChange={(v) => handleChange('is_available', v)} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Featured</Label>
            <Switch checked={form.is_featured ?? false} onCheckedChange={(v) => handleChange('is_featured', v)} />
          </div>
          <Button onClick={() => onSave(form)} className="w-full">
            {item ? 'Update Item' : 'Create Item'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}