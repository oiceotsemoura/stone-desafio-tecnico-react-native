import React from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useCheckout } from './use-checkout';
import * as S from './checkout.styles';

export const CheckoutScreen: React.FC = () => {
  const {
    formData,
    errors,
    cardBrand,
    processing,
    summary,
    itemCount,
    formatPrice,
    handleCardNumberChange,
    handleExpiryDateChange,
    handleCVVChange,
    handleCardHolderChange,
    handleSubmit,
  } = useCheckout();

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
                onChangeText={handleCardHolderChange}
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
