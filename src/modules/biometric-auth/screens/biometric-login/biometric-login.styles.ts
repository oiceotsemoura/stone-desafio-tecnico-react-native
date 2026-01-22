import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

export const Input = styled.TextInput`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.secondary};
  padding: 10px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.danger};
  margin-bottom: 10px;
`;

export const Button = styled.TouchableOpacity`
  padding: 15px;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 5px;
`;

export const LoginButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const BiometricButton = styled(Button)`
  background-color: green;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

export const ForgotPassword = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;