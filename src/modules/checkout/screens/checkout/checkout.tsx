import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useCartStore } from '../../../cart/store';
import { useAuthStore } from '../../../auth/store';
import { PaymentService } from '../../services';
import { checkoutSchema, CheckoutFormData } from '../../validators';
import { OrderService } from '../../../orders/services';
import * as S from './checkout.styles';

export const CheckoutScreen: React.FC = () => {
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <S.Container contentContainerStyle={{ paddingBottom: 40 }}>
        <S.Content>
          <S.SectionTitle>Resumo do Pedido</S.SectionTitle>
          <S.OrderSummary>
            <S.SummaryRow>
              <S.SummaryLabel>Items ({itemCount})</S.SummaryLabel>
              <S.SummaryValue>{formatPrice(summary.subtotal)}</S.SummaryValue>
            </S.SummaryRow>
            <S.SummaryRow>
              <S.SummaryLabel>Frete</S.SummaryLabel>
              <S.SummaryValue>{formatPrice(summary.shipping)}</S.SummaryValue>
            </S.SummaryRow>
            <S.SummaryRow>
              <S.SummaryLabel>Impostos</S.SummaryLabel>
              <S.SummaryValue>{formatPrice(summary.tax)}</S.SummaryValue>
            </S.SummaryRow>
            <S.Divider />
            <S.SummaryRow>
              <S.SummaryLabel bold>Total</S.SummaryLabel>
              <S.SummaryValue bold>{formatPrice(summary.total)}</S.SummaryValue>
            </S.SummaryRow>
          </S.OrderSummary>

          <S.SectionTitle>Dados do Cartão</S.SectionTitle>
          <S.FormContainer>
            <S.InputGroup>
              <S.Label>Número do Cartão</S.Label>
              <S.Input
                placeholder="0000 0000 0000 0000"
                placeholderTextColor="#999"
                keyboardType="numeric"
                maxLength={19}
                value={formData.cardNumber}
                onChangeText={handleCardNumberChange}
                hasError={!!errors.cardNumber}
              />
              {cardBrand && (
                <S.CardBrandContainer>
                  <S.CardBrandText>{cardBrand}</S.CardBrandText>
                </S.CardBrandContainer>
              )}
              {errors.cardNumber && <S.ErrorText>{errors.cardNumber}</S.ErrorText>}
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>Nome do Titular</S.Label>
              <S.Input
                placeholder="NOME COMO NO CARTÃO"
                placeholderTextColor="#999"
                autoCapitalize="characters"
                value={formData.cardHolder}
                onChangeText={(text) =>
                  setFormData(prev => ({ ...prev, cardHolder: text.toUpperCase() }))
                }
                hasError={!!errors.cardHolder}
              />
              {errors.cardHolder && <S.ErrorText>{errors.cardHolder}</S.ErrorText>}
            </S.InputGroup>

            <S.Row>
              <S.Column flex={1}>
                <S.InputGroup>
                  <S.Label>Validade</S.Label>
                  <S.Input
                    placeholder="MM/AA"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    maxLength={5}
                    value={formData.expiryDate}
                    onChangeText={handleExpiryDateChange}
                    hasError={!!errors.expiryDate}
                  />
                  {errors.expiryDate && <S.ErrorText>{errors.expiryDate}</S.ErrorText>}
                </S.InputGroup>
              </S.Column>

              <S.Column flex={1}>
                <S.InputGroup>
                  <S.Label>CVV</S.Label>
                  <S.Input
                    placeholder="123"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                    value={formData.cvv}
                    onChangeText={handleCVVChange}
                    hasError={!!errors.cvv}
                  />
                  {errors.cvv && <S.ErrorText>{errors.cvv}</S.ErrorText>}
                </S.InputGroup>
              </S.Column>
            </S.Row>

            <S.InfoText>
              🔒 Seus dados estão protegidos. Este é um ambiente de demonstração.
            </S.InfoText>
          </S.FormContainer>

          <S.SubmitButton onPress={handleSubmit} disabled={processing}>
            <S.SubmitButtonText disabled={processing}>
              {processing ? 'Processando...' : `Pagar ${formatPrice(summary.total)}`}
            </S.SubmitButtonText>
          </S.SubmitButton>
        </S.Content>

        {processing && (
          <S.LoadingContainer>
            <ActivityIndicator size="large" color="#ffffff" />
            <S.LoadingText>Processando pagamento...</S.LoadingText>
          </S.LoadingContainer>
        )}
      </S.Container>
    </KeyboardAvoidingView>
  );
};
