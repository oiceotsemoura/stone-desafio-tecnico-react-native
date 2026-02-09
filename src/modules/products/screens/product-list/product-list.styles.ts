import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderLeft = styled.View`
  flex: 1;
`;

export const HeaderRight = styled.View`
  flex-direction: row;
  gap: 12px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  margin-top: 20px;
`;

export const CartButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  background-color: ${({ theme }) => theme.colors.surface};
  opacity: 0.9;
  border-radius: 22px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const CartButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
`;

export const CartBadge = styled.View`
  position: absolute;
  top: 16px;
  right: -4px;
  background-color: #f44336;
  border-radius: 10px;
  min-width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  padding: 0 4px;
`;

export const CartBadgeText = styled.Text`
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
`;

export const FilterContainer = styled.View`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const SearchInput = styled.TextInput`
  height: 45px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 0 16px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
`;

export const FilterRow = styled.View`
  flex-direction: row;
  gap: 8px;
`;

export const FilterButton = styled.TouchableOpacity<{ active?: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.surface};
  border-width: 1px;
  border-color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.border};
`;

export const FilterButtonText = styled.Text<{ active?: boolean }>`
  color: ${({ active, theme }) => (active ? "#ffffff" : theme.colors.text)};
  font-size: 14px;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
`;

export const ListContainer = styled.View`
  flex: 1;
  padding: 16px;
`;

export const ProductCard = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  margin-bottom: 16px;
  padding: 12px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const ProductImage = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background-color: #f0f0f0;
`;

export const ProductInfo = styled.View`
  flex: 1;
  margin-left: 12px;
  justify-content: space-between;
`;

export const ProductActions = styled.View`
  justify-content: center;
  align-items: center;
  padding-left: 8px;
`;

export const AddToCartButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

export const AddToCartText = styled.Text`
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
`;

export const ProductName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

export const ProductDescription = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 8px;
`;

export const ProductFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProductPrice = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ProductCategory = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const StockBadge = styled.View<{ inStock: boolean }>`
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${({ inStock }) => (inStock ? "#4CAF50" : "#F44336")};
`;

export const StockText = styled.Text`
  color: #ffffff;
  font-size: 10px;
  font-weight: bold;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const ErrorText = styled.Text`
  font-size: 16px;
  color: #f44336;
  text-align: center;
  margin-bottom: 16px;
`;

export const RetryButton = styled.TouchableOpacity`
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
`;

export const RetryButtonText = styled.Text`
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

export const EmptyText = styled.Text`
  font-size: 16px;
  color: #999999;
  text-align: center;
`;
