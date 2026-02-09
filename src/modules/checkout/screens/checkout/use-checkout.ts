import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useCartStore } from '../../../cart/store';
import { useAuthStore } from '../../../auth/store';
import { PaymentService } from '../../services';
import { checkoutSchema, CheckoutFormData } from '../../validators';
import { OrderService } from '../../../orders/services';

export const useCheckout = () => {
  const router = useRouter();
  const { items, summary, clearCart } = useCartStore();
  const { user } = useAuthStore();

  const [formData, setFormData] = useState<CheckoutFormData>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [cardBrand, setCardBrand] = useState<string>('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (user?.email) {
      OrderService.setCurrentUser(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (formData.cardNumber.length >= 13) {
      const brand = PaymentService.detectCardBrand(formData.cardNumber);
      setCardBrand(brand !== 'unknown' ? brand : '');
      
      const isValid = PaymentService.validateCardNumber(formData.cardNumber);
      if (!isValid) {
        setErrors(prev => ({ ...prev, cardNumber: 'Número do cartão inválido' }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.cardNumber;
          return newErrors;
        });
      }
    }
  }, [formData.cardNumber]);

  useEffect(() => {
    if (formData.expiryDate.length === 5) {
      const isValid = PaymentService.validateExpiryDate(formData.expiryDate);
      if (!isValid) {
        setErrors(prev => ({ ...prev, expiryDate: 'Data inválida ou cartão expirado' }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.expiryDate;
          return newErrors;
        });
      }
    }
  }, [formData.expiryDate]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleCardNumberChange = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const formatted = PaymentService.formatCardNumber(cleaned);
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryDateChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const formatted = PaymentService.formatExpiryDate(cleaned);
    setFormData(prev => ({ ...prev, expiryDate: formatted }));
  };

  const handleCVVChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '').substring(0, 4);
    setFormData(prev => ({ ...prev, cvv: cleaned }));
  };

  const handleCardHolderChange = (text: string) => {
    setFormData(prev => ({ ...prev, cardHolder: text.toUpperCase() }));
  };

  const validateForm = (): boolean => {
    try {
      checkoutSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const validationErrors: Partial<Record<keyof CheckoutFormData, string>> = {};
      error.errors.forEach((err: any) => {
        const field = err.path[0] as keyof CheckoutFormData;
        validationErrors[field] = err.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  const handleSubmit = async () => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};
    
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Número do cartão é obrigatório';
    }
    if (!formData.cardHolder.trim()) {
      newErrors.cardHolder = 'Nome do titular é obrigatório';
    }
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'Data de validade é obrigatória';
    }
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV é obrigatório';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Alert.alert(
        'Campos obrigatórios', 
        'Por favor, preencha todos os campos obrigatórios do formulário'
      );
      return;
    }

    if (!validateForm()) {
      Alert.alert(
        'Erro de validação', 
        'Por favor, corrija os erros no formulário'
      );
      return;
    }

    if (items.length === 0) {
      Alert.alert('Erro', 'Seu carrinho está vazio');
      return;
    }

    setProcessing(true);

    try {
      const paymentResponse = await PaymentService.processPayment({
        amount: summary.total,
        cardData: {
          cardNumber: formData.cardNumber.replace(/\s/g, ''),
          cardHolder: formData.cardHolder,
          expiryDate: formData.expiryDate,
          cvv: formData.cvv,
        },
      });

      if (!paymentResponse.success) {
        Alert.alert('Pagamento Recusado', paymentResponse.message);
        setProcessing(false);
        return;
      }

      const lastFour = formData.cardNumber.replace(/\s/g, '').slice(-4);
      const order = await OrderService.createOrder({
        items,
        total: summary.total,
        status: 'processing',
        paymentInfo: {
          method: 'credit_card',
          cardLast4: lastFour,
          cardBrand: cardBrand || 'Cartão',
        },
      });

      await clearCart(user?.email);

      setProcessing(false);

      Alert.alert(
        'Sucesso!',
        `Pedido #${order.id} realizado com sucesso!\nID da Transação: ${paymentResponse.transactionId}`,
        [
          {
            text: 'Ver Pedidos',
            onPress: () => router.replace('/(tabs)/orders'),
          },
          {
            text: 'Voltar ao Início',
            onPress: () => router.replace('/(tabs)'),
            style: 'cancel',
          },
        ]
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro ao processar seu pedido';
      Alert.alert('Erro', errorMessage);
      setProcessing(false);
    }
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    formData,
    errors,
    cardBrand,
    processing,
    items,
    summary,
    itemCount,
    formatPrice,
    handleCardNumberChange,
    handleExpiryDateChange,
    handleCVVChange,
    handleCardHolderChange,
    handleSubmit,
  };
};
