import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  padding: 24px;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 8px;
  text-align: center;
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 32px;
  text-align: center;
`;

export const InputGroup = styled.View`
  margin-bottom: 20px;
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
  border-color: ${({ hasError, theme }) => 
    hasError ? theme.colors.danger : theme.colors.border};
  border-radius: 8px;
  padding: 0 16px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
`;

export const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 12px;
  margin-top: 4px;
`;

export const RegisterButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  height: 50px;
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.colors.secondary : theme.colors.primary};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

export const RegisterButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;

export const LoginLink = styled.TouchableOpacity`
  margin-top: 24px;
  align-items: center;
`;

export const LoginLinkText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
`;

export const LoginLinkHighlight = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;

export const LoadingContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
`;
