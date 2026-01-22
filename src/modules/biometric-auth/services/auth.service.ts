export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  message?: string;
  token?: string;
}

export const loginWithCredentials = async (
  credentials: LoginCredentials,
): Promise<AuthResult> => {
  const mockRequest = new Promise<void>((resolve) => {
    const delay = Math.random() * 1000 + 1000;
    setTimeout(resolve, delay);
  });

  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Request timeout")), 5000),
  );

  try {
    await Promise.race([mockRequest, timeout]);

    if (
      credentials.email === "user@test.com" &&
      credentials.password === "Test#123"
    ) {
      const mockToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
      return { success: true, token: mockToken };
    }

    if (credentials.email === "error@test.com") {
      return { success: false, message: "Invalid email or password" };
    }

    if (credentials.email === "server@error.com") {
      return { success: false, message: "Internal server error" };
    }

    return { success: false, message: "Invalid email or password" };
  } catch (error) {
    return { success: false, message: "Request timeout" };
  }
};
