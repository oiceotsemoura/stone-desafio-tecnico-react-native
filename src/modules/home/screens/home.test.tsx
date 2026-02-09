import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Home from "./home";

jest.mock("../../auth/store", () => ({
  useAuthStore: jest.fn(() => ({
    logout: jest.fn(),
  })),
}));

jest.mock("../../../theme/ThemeContext", () => ({
  useTheme: jest.fn(() => ({
    toggleTheme: jest.fn(),
    isDark: false,
  })),
}));

describe("Home Component", () => {
  const mockUseAuthStore = require("../../auth/store").useAuthStore;
  const mockUseTheme = require("../../../theme/ThemeContext").useTheme;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText } = render(<Home />);

    expect(getByText("Bem-vindo!")).toBeTruthy();
    expect(getByText("Login realizado com sucesso.")).toBeTruthy();
    expect(getByText("Sair")).toBeTruthy();
    expect(getByText("Mudar para Tema Escuro")).toBeTruthy();
  });

  it("shows correct theme button text when dark theme is active", () => {
    mockUseTheme.mockReturnValue({
      toggleTheme: jest.fn(),
      isDark: true,
    });

    const { getByText } = render(<Home />);
    expect(getByText("Mudar para Tema Claro")).toBeTruthy();
  });

  it("calls logout when logout button is pressed", () => {
    const mockLogout = jest.fn();
    mockUseAuthStore.mockReturnValue({
      logout: mockLogout,
    });

    const { getByText } = render(<Home />);

    fireEvent.press(getByText("Sair"));
    expect(mockLogout).toHaveBeenCalled();
  });

  it("calls toggleTheme when theme button is pressed", () => {
    const mockToggleTheme = jest.fn();
    mockUseTheme.mockReturnValue({
      toggleTheme: mockToggleTheme,
      isDark: false,
    });

    const { getByText } = render(<Home />);

    fireEvent.press(getByText("Mudar para Tema Escuro"));
    expect(mockToggleTheme).toHaveBeenCalled();
  });

  it("logout is async function", async () => {
    const mockLogout = jest.fn().mockResolvedValue(undefined);
    mockUseAuthStore.mockReturnValue({
      logout: mockLogout,
    });

    const { getByText } = render(<Home />);

    fireEvent.press(getByText("Sair"));

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockLogout).toHaveBeenCalled();
  });
});
