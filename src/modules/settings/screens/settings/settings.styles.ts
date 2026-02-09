import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ScrollContent = styled.ScrollView`
  flex: 1;
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

export const Section = styled.View`
  padding: 20px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
`;

export const SettingItem = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const SettingLeft = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const SettingIcon = styled.Text`
  font-size: 24px;
  margin-right: 12px;
`;

export const SettingTextContainer = styled.View`
  flex: 1;
`;

export const SettingLabel = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2px;
`;

export const SettingDescription = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const SettingRight = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SettingValue = styled.Text`
  font-size: 14px;
  color: #999999;
  margin-right: 8px;
`;

export const SettingArrow = styled.Text`
  font-size: 16px;
  color: #999999;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: 24px 0;
`;

export const UserInfo = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  flex-direction: row;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const UserAvatar = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

export const UserAvatarText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
`;

export const UserDetails = styled.View`
  flex: 1;
`;

export const UserName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

export const UserEmail = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const LogoutButton = styled.TouchableOpacity`
  background-color: #f44336;
  padding: 16px;
  border-radius: 12px;
  align-items: center;
  margin-top: 24px;
`;

export const LogoutButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;

export const VersionText = styled.Text`
  font-size: 12px;
  color: #999999;
  text-align: center;
  margin-top: 24px;
  padding-bottom: 20px;
`;
