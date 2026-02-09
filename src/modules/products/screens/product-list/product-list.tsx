import React from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { Product } from '../../../../shared/types/product.types';
import { useProductList } from './use-product-list';
import * as S from './product-list.styles';

export const ProductList: React.FC = () => {
  const {
    products,
    loading,
    error,
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
  } = useProductList();

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
      <S.RetryButton onPress={handleRetry}>
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
          onRefresh={handleRetry}
        />
      )}
    </S.Container>
  );
};
