import { CreditCardData, PaymentRequest, PaymentResponse, CardBrand } from '../../../shared/types/payment.types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class PaymentService {
  static detectCardBrand(cardNumber: string): CardBrand {
    const cleaned = cardNumber.replace(/\s/g, '');
    
    if (/^4/.test(cleaned)) return 'visa';
    if (/^5[1-5]/.test(cleaned)) return 'mastercard';
    if (/^3[47]/.test(cleaned)) return 'amex';
    if (/^(636368|438935|504175|451416|636297)/.test(cleaned)) return 'elo';
    
    return 'unknown';
  }

  static validateCardNumber(cardNumber: string): boolean {
    const cleaned = cardNumber.replace(/\s/g, '');
    
    if (!/^\d+$/.test(cleaned)) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i], 10);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  }

  static validateExpiryDate(expiryDate: string): boolean {
    const cleaned = expiryDate.replace(/\D/g, '');
    
    if (cleaned.length !== 4) return false;
    
    const month = parseInt(cleaned.substring(0, 2), 10);
    const year = parseInt(cleaned.substring(2, 4), 10);
    
    if (month < 1 || month > 12) return false;
    
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    
    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;
    
    return true;
  }

  static validateCVV(cvv: string, cardBrand: CardBrand): boolean {
    const cleaned = cvv.replace(/\D/g, '');
    
    if (cardBrand === 'amex') {
      return cleaned.length === 4;
    }
    
    return cleaned.length === 3;
  }

  static async processPayment(request: PaymentRequest): Promise<PaymentResponse> {
    await delay(1500);
    
    const { cardData, amount } = request;
    
    if (!this.validateCardNumber(cardData.cardNumber)) {
      return {
        success: false,
        message: 'Número do cartão inválido',
      };
    }
    
    if (!this.validateExpiryDate(cardData.expiryDate)) {
      return {
        success: false,
        message: 'Data de validade inválida',
      };
    }
    
    const cardBrand = this.detectCardBrand(cardData.cardNumber);
    if (!this.validateCVV(cardData.cvv, cardBrand)) {
      return {
        success: false,
        message: 'CVV inválido',
      };
    }
    
    if (Math.random() > 0.1) {
      return {
        success: true,
        transactionId: `TXN${Date.now()}`,
        message: 'Pagamento processado com sucesso!',
      };
    } else {
      return {
        success: false,
        message: 'Pagamento recusado. Tente outro cartão.',
      };
    }
  }

  static formatCardNumber(cardNumber: string): string {
    const cleaned = cardNumber.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cardNumber;
  }

  static formatExpiryDate(value: string): string {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }
    return cleaned;
  }
}
