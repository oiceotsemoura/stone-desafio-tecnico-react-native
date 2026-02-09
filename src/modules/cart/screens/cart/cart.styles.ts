import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  margin-top: 20px;
`;

export const Content = styled.View`
  flex: 1;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

export const EmptyText = styled.Text`
  font-size: 18px;
  color: #999999;
  text-align: center;
  margin-bottom: 20px;
`;

export const EmptyButton = styled.TouchableOpacity`
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
`;

export const EmptyButtonText = styled.Text`
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
`;

export const CartItem = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 16px;
  margin: 8px 16px;
  border-radius: 12px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const ItemImage = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.border};
`;

export const ItemInfo = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const ItemName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

export const ItemPrice = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  margin-bottom: 8px;
`;

export const QuantityContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const QuantityButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`;

export const QuantityButtonText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
`;

export const QuantityText = styled.Text`
  font-size: 16px;
  color: #333333;
  margin: 0 16px;
  min-width: 30px;
  text-align: center;
`;

export const RemoveButton = styled.TouchableOpacity`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px;
`;

export const RemoveButtonText = styled.Text`
  color: #f44336;
  font-size: 18px;
  font-weight: bold;
`;

export const SummaryContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 20px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
`;

export const SummaryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const SummaryLabel = styled.Text<{ bold?: boolean }>`
  font-size: ${({ bold }) => (bold ? "18px" : "16px")};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
`;

export const SummaryValue = styled.Text<{ bold?: boolean }>`
  font-size: ${({ bold }) => (bold ? "18px" : "16px")};
  color: ${({ theme, bold }) =>
    bold ? theme.colors.primary : theme.colors.text};
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
`;

export const CheckoutButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  margin-top: 12px;
`;

export const CheckoutButtonText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: 12px 0;
`;
