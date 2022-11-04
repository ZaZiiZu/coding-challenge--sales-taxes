import { CartEntry } from "../models/cart-entry";
import { Product } from "../models/product";
import { categorizeProduct } from "../product-categorizer/product-categorizer";

export function parseCartInput(cartInput: string): CartEntry[] {
  const splitItems = splitForAmountNamePrice(cartInput);

  return splitItems.map(({ amount, name, price }) => {
    const product: Product = {
      productName: name,
      unitPrice: price,
      group: categorizeProduct(name)
    };
    let importedStatus = checkIfImported(product.productName);
    if (importedStatus.isImported) {
      product.productName = importedStatus.actualProductName;
      product.isImported = importedStatus.isImported;
    }
    return {
      amount: amount,
      product: product
    }
  })
}


type SplitCartItems = { amount: number, name: string, price: number }[];
export function splitForAmountNamePrice(multilineString: string): SplitCartItems {
  const linesRegex = /^(.*)$/gm;
  const lines: string[] = [];
  let nextLine = linesRegex.exec(multilineString.trim());
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
    } else {
      // TODO: should probably log this "no match" info
    }
  })
  return splitItems;
}

const IMPORTED_KEYWORD = 'imported';
export function checkIfImported(productName: string): { isImported: boolean, actualProductName: string } {
  productName = productName.trim();
  if (productName.includes(IMPORTED_KEYWORD)) {
    const withoutKeyword = productName.split(IMPORTED_KEYWORD).map(substr => substr.trim()).filter(substr => !!substr).join(' '); // NOTE: that removes 'all' occurrences of the keyword
    return {
      actualProductName: withoutKeyword,
      isImported: true
    }
  } else {
    return {
      actualProductName: productName,
      isImported: false
    }
  }
}

function cleanName(rawName: string): string {
  rawName = rawName.trim();
  if (rawName.endsWith(' at')) {
    rawName = rawName.slice(0, -3);
  }
  return rawName;
}