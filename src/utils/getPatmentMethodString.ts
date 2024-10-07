const paymentMethods = new Map([
  ["DEBIT", "Débito"],
  ["CREDIT", "Crédito"],
  ["CASH", "Efectivo"],
  ["CHECK", "Cheque"],
  ["MOBILE", "Celular"],
  ["MERCADOPAGO", "Mercado Pago"],
  ["TRANSFER", "Transferencia"],
]);

export const getPaymentMethodString = (paymentMethod: string) => {
  // Look for the payment method value by key, if not found return the provided paymentMethod.
  return paymentMethods.get(paymentMethod) || paymentMethod;
};
