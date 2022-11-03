import { CartEntry } from "../models/cart-entry";
import { categorizeProduct } from "../product-categorizer/product-categorizer";

export function parseCartInput(cartInput: string): CartEntry[] {
  const splitItems = splitForAmountNamePrice(cartInput);

  return splitItems.map(({ amount, name, price }) => {
    return {
      amount: amount,
      product: {
        productName: name,
        unitPrice: price,
        group: categorizeProduct(name)
      }
    }
  })
}


type SplitCartItems = { amount: number, name: string, price: number }[];
export function splitForAmountNamePrice(multilineString: string): SplitCartItems {
  const linesRegex = /^(.*)$/gm;
  const lines: string[] = [];
  let nextLine = linesRegex.exec(multilineString);
  while (nextLine) {
    lines.push(nextLine[0]);
    nextLine = linesRegex.exec(multilineString);
  }

  const splitItems: SplitCartItems = [];

  const regex = /(\s*\d+) (.*) ([+-]?([0-9]*[.])?[0-9]+)/; // group 0 is full match, group1=amount, group2=name, group3=price
  lines.forEach(line => {
    let result = regex.exec(line);
    if (result) {
      const amount = Number.parseInt(result[1]);
      if (amount === NaN) return; // TODO: should probably log that
      const nameRaw = result[2];
      const name = cleanName(nameRaw);
      const price = Number.parseFloat(result[3]);
      if (price === NaN) return; // TODO: should probably log that

      splitItems.push({ amount, name, price })
    }
  })
  return splitItems;
}

function cleanName(rawName: string): string {
  rawName = rawName.trim();
  if (rawName.endsWith(' at')) {
    rawName = rawName.slice(0, -3);
  }
  return rawName;
}