import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { navigate } from 'gatsby';
import { getPayment, checkPayment } from '../../../functions/review'
import { useStateContext } from '../../../context/ContextProvider';
import * as styles from './pay.module.scss'

function Pay({ data }) {
  const { token } = useStateContext();
  const queryClient = useQueryClient();

  const [cost, setCost] = useState(0)

  const checkPaymentQuery = useQuery({
    queryKey: ['checkpaymentreview', data.id],
    queryFn: () => checkPayment(data.id),
    enabled: !!token && data.transaction_id != null
  })

  const getPaymentMutation = useMutation({
    mutationFn: getPayment,
    onSuccess: (res) => {
      const url = res.data.url;
      navigate(url);

      queryClient.invalidateQueries({ queryKey: ['getexpertforadmin', data.id] })
    }
  })

  useEffect(() => {
    const price = data.expert.price;
    const theme = data.work.theme;
    setCost(price[theme]);
  }, [data])

  return (
    checkPaymentQuery?.data?.url !== undefined ?
      <a href={checkPaymentQuery.data.url} target='_blank' className={styles.container}>
        <p className={styles.text}>Оплатить / {cost} руб.</p>
      </a>
      :
      <button
        className={styles.container}
        onClick={() => getPaymentMutation.mutate({
          cost: cost,
          work: data.work.id,
          expert: data.expert.id,
          review: data.id
        })}>
        <p className={styles.text}>Оплатить / {cost} руб.</p>
      </button>
  )
}

export default Pay