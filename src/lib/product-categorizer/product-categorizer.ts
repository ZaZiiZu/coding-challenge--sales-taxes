import { ProductGroup } from "../models/product-group";

type CategorizerFn = (productName: string) => boolean;

const Categorizers: { [P in ProductGroup]: CategorizerFn } = {
  Medical: (name: string): boolean => {
    const keywords = ['pills'];
    const matchesAny = keywords.find(keyword => name.includes(keyword)) !== undefined;
    return matchesAny;
  },
  Books: (name: string): boolean => {
    const keywords = ['book'];
    const matchesAny = keywords.find(keyword => name.includes(keyword)) !== undefined;
    return matchesAny;
  },
  Food: (name: string): boolean => {
    const keywords = ['chocolate']
    const matchesAny = keywords.find(keyword => name.includes(keyword)) !== undefined;
    return matchesAny;
  },
  GenericGood: (name: string): boolean => {
    return true; // assume all other checks are done and dont match
  }
}

export function categorizeProduct(productName: string): ProductGroup {
  const categorizers = Object.entries(Categorizers);
  const matchingCategorizerEntry = categorizers.find(([categoryName, categorizerFn]) => categorizerFn(productName));
  if (!matchingCategorizerEntry) throw new Error('No matching category found, this should not have happened');

  const productGroup = tryGetEnum(ProductGroup, matchingCategorizerEntry[0]);
  if (!productGroup) throw new Error('ProductGroup not defined');
  return productGroup;
}


export function tryGetEnum<T extends { [P in keyof T]: T[P] }>(enumType: T, value: string): T[keyof T] | undefined {
  // note: did that at work just few days ago. probably would not have bothered with this generic "fun" here otherwise.
  const enumEntry = Object.entries(enumType).find(([_, val]: [string, any]) => val.toString && val.toString() === value);
  if (!enumEntry) return undefined;
  return enumType[enumEntry[0] as keyof T];
}