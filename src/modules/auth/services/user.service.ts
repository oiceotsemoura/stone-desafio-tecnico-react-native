import * as SecureStore from 'expo-secure-store';

export interface RegisterData {
  email: string;
  fullName: string;
  password: string;
}

export interface User {
  email: string;
  fullName: string;
  password: string;
}

const USERS_KEY = 'registered_users';

export class UserService {
  static async registerUser(data: RegisterData): Promise<{ success: boolean; message?: string }> {
    try {
      const existingUser = await this.getUserByEmail(data.email);
      if (existingUser) {
        return { success: false, message: 'Email já cadastrado' };
      }

      const users = await this.getAllUsers();
      
      users.push({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      await SecureStore.setItemAsync(USERS_KEY, JSON.stringify(users));

      return { success: true, message: 'Usuário cadastrado com sucesso!' };
    } catch (error) {
      return { success: false, message: 'Erro ao cadastrar usuário' };
    }
  }

  static async getAllUsers(): Promise<User[]> {
    try {
      const usersJson = await SecureStore.getItemAsync(USERS_KEY);
      if (!usersJson) {
        return [];
      }
      return JSON.parse(usersJson);
    } catch (error) {
      return [];
    }
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const users = await this.getAllUsers();
      return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
    } catch (error) {
      return null;
    }
  }

  static async validateCredentials(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.getUserByEmail(email);
      if (!user) {
        return null;
      }

      if (user.password === password) {
        return user;
      }

      return null;
    } catch (error) {
      return null;
    }
  }
}
