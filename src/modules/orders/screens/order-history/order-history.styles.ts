import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

export const FilterContainer = styled.View`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const FilterButton = styled.TouchableOpacity<{ active?: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.surface};
  border-width: 1px;
  border-color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.border};
  margin-right: 8px;
`;

export const FilterButtonText = styled.Text<{ active?: boolean }>`
  color: ${({ active, theme }) => (active ? '#ffffff' : theme.colors.text)};
  font-size: 14px;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
`;

export const OrderCard = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.surface};
  margin: 8px 16px;
  padding: 16px;
  border-radius: 12px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const OrderHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const OrderId = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const OrderStatus = styled.View<{ status: string }>`
  padding: 4px 12px;
  border-radius: 12px;
  background-color: ${({ status }) => {
    switch (status) {
      case 'delivered':
        return '#4CAF50';
      case 'shipped':
        return '#2196F3';
      case 'processing':
        return '#FF9800';
      case 'pending':
        return '#9E9E9E';
      case 'cancelled':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  }};
`;

export const OrderStatusText = styled.Text`
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
`;

export const OrderDate = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 12px;
`;

export const OrderItems = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

export const OrderTotal = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 8px;
`;

export const PaymentInfo = styled.Text`
  font-size: 12px;
  color: #999999;
  margin-top: 8px;
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
