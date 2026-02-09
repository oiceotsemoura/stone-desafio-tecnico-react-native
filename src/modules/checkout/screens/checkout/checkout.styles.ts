import styled from 'styled-components/native';

export const Container = styled.ScrollView`
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
  padding: 20px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
  margin-top: 8px;
`;

export const OrderSummary = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 24px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const SummaryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const SummaryLabel = styled.Text<{ bold?: boolean }>`
  font-size: ${({ bold }) => (bold ? '16px' : '14px')};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
`;

export const SummaryValue = styled.Text<{ bold?: boolean }>`
  font-size: ${({ bold }) => (bold ? '16px' : '14px')};
  color: ${({ theme, bold }) => (bold ? theme.colors.primary : theme.colors.text)};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: 12px 0;
`;

export const FormContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 24px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const InputGroup = styled.View`
  margin-bottom: 16px;
`;

export const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

export const Input = styled.TextInput<{ hasError?: boolean }>`
  height: 50px;
  border-width: 1px;
  border-color: ${({ hasError, theme }) => (hasError ? '#f44336' : theme.colors.border)};
  border-radius: 8px;
  padding: 0 16px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
`;

export const ErrorText = styled.Text`
  font-size: 12px;
  color: #f44336;
  margin-top: 4px;
`;

export const CardBrandContainer = styled.View`
  position: absolute;
  right: 12px;
  top: 38px;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 4px 8px;
  border-radius: 4px;
`;

export const CardBrandText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
`;

export const Row = styled.View`
  flex-direction: row;
  gap: 12px;
`;

export const Column = styled.View<{ flex?: number }>`
  flex: ${({ flex }) => flex || 1};
`;

export const SubmitButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${({ disabled, theme }) =>
    disabled ? '#cccccc' : theme.colors.primary};
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  margin-top: 12px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

export const SubmitButtonText = styled.Text<{ disabled?: boolean }>`
  color: ${({ disabled }) => (disabled ? '#666666' : '#ffffff')};
  font-size: 18px;
  font-weight: bold;
`;

export const LoadingContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const LoadingText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  margin-top: 12px;
`;

export const InfoText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  margin-top: 8px;
  font-style: italic;
`;
