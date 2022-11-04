import { Cart } from "src/app/cart/models/cart";
import { roundNumber, roundTaxes } from "../taxes-utils/taxes-utils";

export function parseCartOutput(cart: Cart): string {
  if (!cart || !cart.items) return 'invalid cart';

  const cartItemsLines = cart.items.map(item => {
    let stringifiedItem = '';
    stringifiedItem += item.amount;
    if (item.product.isImported) stringifiedItem += ' imported';
    stringifiedItem += ` ${item.product.productName}:`;
    const itemPriceWithTax = item.amount * (
      item.product.unitPrice
      + roundTaxes((item.product.isImported ? item.product.importTaxAmount : 0)
        + item.product.saleTaxAmount)
    );
    const roundedPrice = roundNumber(itemPriceWithTax, 2);
    stringifiedItem += ` ${formatNumber(roundedPrice)}`;
    return stringifiedItem;
  })
  const salesTaxInfo = `Sales Taxes: ${formatNumber(cart.salesTaxTotal)}`;
  const totalValueInfo = `Total: ${formatNumber(cart.cartValueTotal)}`;

  const allOutputLines = [...cartItemsLines, salesTaxInfo, totalValueInfo];
  return allOutputLines.join('\n'); // TODO: may need to be \r\n in some cases, but shouldn't matter here
}

function formatNumber(number: number): string {
  return number.toLocaleString('en-US', {
    minimumIntegerDigits: 1,
    minimumFractionDigits: 2,
    useGrouping: false
  })
}