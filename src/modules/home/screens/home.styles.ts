import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
  font-size: 24px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

export const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.danger};
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

export const ThemeButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 15px;
  border-radius: 5px;
`;

export const ThemeButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;