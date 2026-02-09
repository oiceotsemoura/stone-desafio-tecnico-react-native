import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useProductStore } from '../../store';
import { useCartStore } from '../../../cart/store';
import { useAuthStore } from '../../../auth/store';
import { Product } from '../../../../shared/types/product.types';

export const useProductList = () => {
  const router = useRouter();
  const {
    products,
    loading,
    error,
    page,
    total,
    pageSize,
    categories,
    fetchProducts,
    fetchCategories,
    setFilters,
    setPage,
    clearFilters,
  } = useProductStore();

  const { items: cartItems, addItem } = useCartStore();
  const { user } = useAuthStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text.length >= 3 || text.length === 0) {
      setFilters({ searchTerm: text.length > 0 ? text : undefined });
    }
  };

  const handleSellerFilter = (seller: string) => {
    if (selectedSeller === seller) {
      setSelectedSeller(null);
      clearFilters();
    } else {
      setSelectedSeller(seller);
      setFilters({ seller });
    }
  };

  const handleProductPress = (product: Product) => {
  };

  const handleAddToCart = async (product: Product) => {
    if (!product.inStock) {
      Alert.alert('Produto Indisponível', 'Este produto está fora de estoque.');
      return;
    }
    
    await addItem(product, 1, user?.email);
    Alert.alert('Adicionado!', `${product.name} foi adicionado ao carrinho.`);
  };

  const handleGoToCart = () => {
    router.push('/cart');
  };

  const handleRetry = () => {
    fetchProducts();
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return {
    products,
    loading,
    error,
    page,
    total,
    pageSize,
    categories,
    searchTerm,
    selectedSeller,
    cartItemCount,
    formatPrice,
    handleSearch,
    handleSellerFilter,
    handleProductPress,
    handleAddToCart,
    handleGoToCart,
    handleRetry,
  };
};
