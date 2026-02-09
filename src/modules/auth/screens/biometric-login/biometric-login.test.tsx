jest.mock("./biometric-login.styles", () => ({
  Container: "View",
  Title: "Text",
  Logo: "Image",
  Input: "TextInput",
  Button: "TouchableOpacity",
  ErrorText: "Text",
  LoginButton: "TouchableOpacity",
  BiometricButton: "TouchableOpacity",
  ButtonText: "Text",
  ForgotPassword: "Text",
  RegisterLink: "Text",
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  })),
}));

jest.mock("./use-biometric-login", () => ({
  useBiometricLogin: jest.fn(() => ({
    email: "",
    setEmail: jest.fn(),
    password: "",
    setPassword: jest.fn(),
    errors: {},
    isLoading: false,
    error: null,
    handleLogin: jest.fn(),
    handleBiometricLogin: jest.fn(),
    clearSensitiveData: jest.fn(),
  })),
}));

jest.mock("../../store", () => ({
  useAuthStore: jest.fn(() => ({
    biometricEnabled: false,
  })),
}));

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import BiometricLogin from "./biometric-login";

describe("BiometricLogin Component", () => {
  const mockUseBiometricLogin =
    require("./use-biometric-login").useBiometricLogin;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<BiometricLogin />);

    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByText("Acessar")).toBeTruthy();
    expect(getByText("Esqueceu sua senha?")).toBeTruthy();
    expect(getByText("Não tem conta? Criar conta")).toBeTruthy();
  });

  it("shows biometric button when biometric is enabled", () => {
    jest.mocked(require("../../store").useAuthStore).mockReturnValue({
      biometricEnabled: true,
    });

    const { getByText } = render(<BiometricLogin />);
    expect(getByText("Entrar com Biometria")).toBeTruthy();
  });

  it("does not show biometric button when biometric is disabled", () => {
    jest.mocked(require("../../store").useAuthStore).mockReturnValue({
      biometricEnabled: false,
    });
    const { queryByText } = render(<BiometricLogin />);
    expect(queryByText("Entrar com Biometria")).toBeNull();
  });

  it("calls handleLogin when login button is pressed", () => {
    const mockHandleLogin = jest.fn();
    mockUseBiometricLogin.mockReturnValue({
      email: "test@example.com",
      setEmail: jest.fn(),
      password: "password123",
      setPassword: jest.fn(),
      errors: {},
      isLoading: false,
      error: null,
      handleLogin: mockHandleLogin,
      handleBiometricLogin: jest.fn(),
      clearSensitiveData: jest.fn(),
    });

    const { getByText } = render(<BiometricLogin />);

    fireEvent.press(getByText("Acessar"));
    expect(mockHandleLogin).toHaveBeenCalled();
  });

  it("calls handleBiometricLogin when biometric button is pressed", () => {
    jest.mocked(require("../../store").useAuthStore).mockReturnValue({
      biometricEnabled: true,
    });

    const mockHandleBiometricLogin = jest.fn();
    mockUseBiometricLogin.mockReturnValue({
      email: "",
      setEmail: jest.fn(),
      password: "",
      setPassword: jest.fn(),
      errors: {},
      isLoading: false,
      error: null,
      handleLogin: jest.fn(),
      handleBiometricLogin: mockHandleBiometricLogin,
      clearSensitiveData: jest.fn(),
    });

    const { getByText } = render(<BiometricLogin />);

    fireEvent.press(getByText("Entrar com Biometria"));
    expect(mockHandleBiometricLogin).toHaveBeenCalled();
  });

  it("shows error message when error exists", () => {
    mockUseBiometricLogin.mockReturnValue({
      email: "",
      setEmail: jest.fn(),
      password: "",
      setPassword: jest.fn(),
      errors: {},
      isLoading: false,
      error: "Login failed",
      handleLogin: jest.fn(),
      handleBiometricLogin: jest.fn(),
      clearSensitiveData: jest.fn(),
    });

    const { getByText } = render(<BiometricLogin />);
    expect(getByText("Login failed")).toBeTruthy();
  });

  it("shows validation errors", () => {
    mockUseBiometricLogin.mockReturnValue({
      email: "",
      setEmail: jest.fn(),
      password: "",
      setPassword: jest.fn(),
      errors: {
        email: "Email is required",
        password: "Password is required",
      },
      isLoading: false,
      error: null,
      handleLogin: jest.fn(),
      handleBiometricLogin: jest.fn(),
      clearSensitiveData: jest.fn(),
    });

    const { getByText } = render(<BiometricLogin />);
    expect(getByText("Email is required")).toBeTruthy();
    expect(getByText("Password is required")).toBeTruthy();
  });

  it("calls Alert.alert when forgot password is pressed", () => {
    const mockAlert = jest.spyOn(require("react-native").Alert, "alert");

    const { getByText } = render(<BiometricLogin />);

    fireEvent.press(getByText("Esqueceu sua senha?"));
    expect(mockAlert).toHaveBeenCalledWith(
      "Esqueceu a Senha",
      "Funcionalidade não implementada ainda.",
    );
  });
});
