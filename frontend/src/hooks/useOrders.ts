import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { setOrders, setLoading, setError, deleteOrder as deleteOrderAction } from '../redux/orderSlice';
import { RootState } from '../redux/store';
import { GET_ORDERS } from '../graphql/queries';
import { DELETE_ORDER } from '../graphql/mutations';

export const useOrders = () => {
  const dispatch = useDispatch();
  const { orders, selectedOrder, loading, error } = useSelector((state: RootState) => state.orders);

  const { refetch } = useQuery(GET_ORDERS, {
    onCompleted: (data) => {
      dispatch(setOrders(data.orders));
      dispatch(setLoading(false));
    },
    onError: (error) => {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    },
  });

  const [deleteOrderMutation] = useMutation(DELETE_ORDER, {
    onCompleted: (data) => {
      if (data.deleteOrder) {
        dispatch(deleteOrderAction(selectedOrder?.id || ''));
      }
    },
    onError: (error) => {
      dispatch(setError(error.message));
    },
  });

  useEffect(() => {
    dispatch(setLoading(true));
    refetch();
  }, [dispatch, refetch]);

  const deleteOrder = async (id: string) => {
    try {
      await deleteOrderMutation({ variables: { id } });
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return {
    orders,
    selectedOrder,
    loading,
    error,
    refetch,
    deleteOrder,
  };
};