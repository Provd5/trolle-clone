export const mapOrder = (array: any[], order: string[]) => {
  array?.sort((a, b) => order?.indexOf(a._id) - order?.indexOf(b._id));
  return array;
};
