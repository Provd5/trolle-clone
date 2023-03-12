export const MapOrder = (array: any[], order: (string | number)[]) => {
  array.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  return array;
};
