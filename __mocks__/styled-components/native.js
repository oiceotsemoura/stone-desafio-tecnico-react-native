const styled = (component) => component;
styled.View = (strings, ...args) => 'View';
styled.Text = (strings, ...args) => 'Text';
styled.TouchableOpacity = (strings, ...args) => 'TouchableOpacity';
styled.TextInput = (strings, ...args) => 'TextInput';

export default styled;
export const ThemeProvider = ({ children }) => children;
export const useTheme = () => ({
  colors: {
    background: '#ffffff',
    text: '#000000',
    primary: '#007bff',
    secondary: '#6c757d',
    danger: '#dc3545',
  },
});