type productsType = {
  id: string;
  title: string;
  price: number;
  taxes: number;
  ads: number;
  discount: number;
  total: number;
  category: string;
  date: string;
}

interface Products {
  products: productsType[];
}

interface ProductsObj extends productsType {
  type: productsType
}

interface CategorysBoo {
  phone: boolean,
  tv: boolean,
  laptop: boolean,
  watch: boolean
}

interface ProductInput {
  title: {
    value: string;
    isValid: boolean;
  };
  price: {
    value: string;
    isValid: boolean;
  };
  taxes: {
    value: string;
    isValid: boolean;
  };
  ads: {
    value: string;
    isValid: boolean;
  };
  discount: {
    value: string;
  };
  count: {
    value: string;
  };
  category: {
    value: string;
    isValid: boolean;
  };
}

export { Products, CategorysBoo, ProductInput, ProductsObj }
