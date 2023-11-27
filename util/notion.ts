export const property = (key: string) => (properties: Record<string, any>) => {
  return key in properties ? properties[key] : undefined
}
