import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useProductStore } from '../../store';
import { useCartStore } from '../../../cart/store';
import { useAuthStore } from '../../../auth/store';
import { Product } from '../../../../shared/types/product.types';
import * as S from './product-list.styles';

export const ProductList: React.FC = () => {
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

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <S.ProductCard onPress={() => handleProductPress(item)}>
      <S.ProductImage 
        source={{ uri: item.image }}
      />
      <S.ProductInfo>
        <S.ProductName numberOfLines={1}>{item.name}</S.ProductName>
        <S.ProductDescription numberOfLines={2}>
          {item.description}
        </S.ProductDescription>
        <S.ProductFooter>
          <S.ProductPrice>{formatPrice(item.price)}</S.ProductPrice>
          <S.StockBadge inStock={item.inStock}>
            <S.StockText>{item.inStock ? 'Em estoque' : 'Indisponível'}</S.StockText>
          </S.StockBadge>
        </S.ProductFooter>
        <S.ProductCategory>{item.seller}</S.ProductCategory>
      </S.ProductInfo>
      <S.ProductActions>
        <S.AddToCartButton onPress={() => handleAddToCart(item)} disabled={!item.inStock}>
          <S.AddToCartText>+</S.AddToCartText>
        </S.AddToCartButton>
      </S.ProductActions>
    </S.ProductCard>
  );

  const renderEmpty = () => (
    <S.EmptyContainer>
      <S.EmptyText>
        {searchTerm || selectedSeller
          ? 'Nenhum produto encontrado com os filtros selecionados'
          : 'Nenhum produto disponível'}
      </S.EmptyText>
    </S.EmptyContainer>
  );

  const renderError = () => (
    <S.ErrorContainer>
      <S.ErrorText>{error}</S.ErrorText>
      <S.RetryButton onPress={fetchProducts}>
        <S.RetryButtonText>Tentar Novamente</S.RetryButtonText>
      </S.RetryButton>
    </S.ErrorContainer>
  );

  const renderLoading = () => (
    <S.LoadingContainer>
      <ActivityIndicator size="large" color="#0fb14c" />
    </S.LoadingContainer>
  );

  if (error && !loading) {
    return (
      <S.Container>
        <S.Header>
          <S.HeaderLeft>
            <S.Title>Produtos</S.Title>
          </S.HeaderLeft>
          <S.HeaderRight>
            <S.CartButton onPress={handleGoToCart}>
              <S.CartButtonText>🛒</S.CartButtonText>
              {cartItemCount > 0 && (
                <S.CartBadge>
                  <S.CartBadgeText>{cartItemCount}</S.CartBadgeText>
                </S.CartBadge>
              )}
            </S.CartButton>
          </S.HeaderRight>
        </S.Header>
        {renderError()}
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Header>
        <S.HeaderLeft>
          <S.Title>Produtos</S.Title>
        </S.HeaderLeft>
        <S.HeaderRight>
          <S.CartButton onPress={handleGoToCart}>
            <S.CartButtonText>🛒</S.CartButtonText>
            {cartItemCount > 0 && (
              <S.CartBadge>
                <S.CartBadgeText>{cartItemCount}</S.CartBadgeText>
              </S.CartBadge>
            )}
          </S.CartButton>
        </S.HeaderRight>
      </S.Header>

      <S.FilterContainer>
        <S.SearchInput
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChangeText={handleSearch}
          placeholderTextColor="#999999"
        />
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <S.FilterButton
              active={selectedSeller === item}
              onPress={() => handleSellerFilter(item)}
            >
              <S.FilterButtonText active={selectedSeller === item}>
                {item}
              </S.FilterButtonText>
            </S.FilterButton>
          )}
        />
      </S.FilterContainer>

      {loading && products.length === 0 ? (
        renderLoading()
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderProduct}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={{ padding: 16, flexGrow: 1 }}
          refreshing={loading}
          onRefresh={fetchProducts}
        />
      )}
    </S.Container>
  );
};
