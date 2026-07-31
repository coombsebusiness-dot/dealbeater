export interface ProductEngine<TProduct, TResult> {
  analyse(product: TProduct): TResult;
}