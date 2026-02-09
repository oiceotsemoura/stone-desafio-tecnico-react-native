import { z } from 'zod';

export const checkoutSchema = z.object({
  cardNumber: z
    .string()
    .min(1, 'Número do cartão é obrigatório')
    .refine(
      (value) => {
        const cleaned = value.replace(/\s/g, '');
        return /^\d{13,19}$/.test(cleaned);
      },
      { message: 'Número do cartão deve ter entre 13 e 19 dígitos' }
    ),
  cardHolder: z
    .string()
    .min(1, 'Nome do titular é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .regex(/^[a-zA-Z\s]+$/, 'Nome deve conter apenas letras'),
  expiryDate: z
    .string()
    .min(1, 'Data de validade é obrigatória')
    .regex(/^\d{2}\/\d{2}$/, 'Formato deve ser MM/AA')
    .refine(
      (value) => {
        const [month, year] = value.split('/').map(Number);
        if (month < 1 || month > 12) return false;
        
        const now = new Date();
        const currentYear = now.getFullYear() % 100;
        const currentMonth = now.getMonth() + 1;
        
        if (year < currentYear) return false;
        if (year === currentYear && month < currentMonth) return false;
        
        return true;
      },
      { message: 'Cartão expirado ou data inválida' }
    ),
  cvv: z
    .string()
    .min(1, 'CVV é obrigatório')
    .regex(/^\d{3,4}$/, 'CVV deve ter 3 ou 4 dígitos'),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
