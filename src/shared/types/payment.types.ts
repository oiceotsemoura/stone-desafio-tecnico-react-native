export interface CreditCardData {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export interface PaymentRequest {
  amount: number;
  cardData: CreditCardData;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  message: string;
}

export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'elo' | 'unknown';
