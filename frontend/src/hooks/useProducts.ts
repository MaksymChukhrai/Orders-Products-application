import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { setProducts, setLoading, setError, deleteProduct as deleteProductAction } from '../redux/productSlice';
import { RootState } from '../redux/store';
// import { ProductType } from '../types/Product';
import { GET_PRODUCTS, GET_PRODUCTS_BY_TYPE } from '../graphql/queries';
import { DELETE_PRODUCT } from '../graphql/mutations';

export const useProducts = () => {
  const dispatch = useDispatch();
  const { products, filteredProducts, selectedType, loading, error } = useSelector((state: RootState) => state.products);

  const { refetch: refetchAll } = useQuery(GET_PRODUCTS, {
    onCompleted: (data) => {
      dispatch(setProducts(data.products));
      dispatch(setLoading(false));
    },
    onError: (error) => {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    },
    skip: !!selectedType,
  });

  const { refetch: refetchByType } = useQuery(GET_PRODUCTS_BY_TYPE, {
    variables: { type: selectedType },
    onCompleted: (data) => {
      dispatch(setProducts(data.productsByType));
      dispatch(setLoading(false));
    },
    onError: (error) => {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    },
    skip: !selectedType,
  });

  const [deleteProductMutation] = useMutation(DELETE_PRODUCT, {
    onCompleted: (data) => {
      if (data.deleteProduct) {
        dispatch(deleteProductAction(data.deleteProduct));
      }
    },
    onError: (error) => {
      dispatch(setError(error.message));
    },
  });

  useEffect(() => {
    dispatch(setLoading(true));
    if (selectedType) {
      refetchByType();
    } else {
      refetchAll();
    }
  }, [dispatch, refetchAll, refetchByType, selectedType]);

  const deleteProduct = async (id: string) => {
    try {
      await deleteProductMutation({ variables: { id } });
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return {
    products: filteredProducts,
    allProducts: products,
    loading,
    error,
    refetch: selectedType ? refetchByType : refetchAll,
    deleteProduct,
  };
};