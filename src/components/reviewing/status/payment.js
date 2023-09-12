import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { navigate } from 'gatsby';
import { motion } from 'framer-motion'
import { IoSyncOutline } from 'react-icons/io5';
import { YooMoneySvg, BankCardSvg, SberBankSvg } from './icons';
import { getPayment } from '../../../functions/review';
import cx from 'classname'
import Modal from '../../modal'
import * as styles from './payment.module.scss'


const methods = [
  {
    type: 'bank_card',
    name: 'Банковская карта',
    styles: styles.bank,
    icon: <BankCardSvg className={styles.svg} />
  },
  {
    type: 'sberbank',
    name: 'Sber Pay',
    styles: styles.sberbank,
    icon: <SberBankSvg className={styles.svg} />
  },
  {
    type: 'yoo_money',
    name: 'ЮMoney',
    styles: styles.yoomoney,
    icon: <YooMoneySvg className={styles.svg} />
  }
];


function Payment({ showPayment, cost, data, setShowPayment }) {
  const [methodPay, setMethodPay] = useState({
    type: 'bank_card',
    name: 'Банковская карта',
    styles: styles.bank,
  })

  const { link } = data;

  const queryClient = useQueryClient();

  const getPaymentMutation = useMutation({
    mutationFn: getPayment,
    onSuccess: (res) => {
      const url = res.data.url;
      navigate(url);
    }
  })

  return (
    <Modal visible={showPayment} close={() => setShowPayment(false)}>
      <div className={styles.head}>
        <p className={styles.name}>Эксперт / {data.expert.name}</p>
        <a href={link ? link : data.work.link} target='_blank' rel="noreferrer" className={styles.titlelink}>{data.work.name}</a>
        <p className={styles.hint}>После оплаты эксперт проверит работу <span>в течении трех дней</span>. Если рецензия будет готова позже, то <span>деньги вернутся</span> на Вашу карту.</p>
      </div>
      <div className={styles.method}>
        <p className={styles.title}>Выберите способ оплаты</p>
        <div className={styles.list}>
          {methods.map((item) => {

            return <button
              key={item.type}
              className={cx(styles.item, item.styles, methodPay.type === item.type && styles.active)}
              onClick={() => setMethodPay(item)}>
              <p className={styles.text}>{item.name}</p>
              <div className={styles.icon}>
                {item.icon}
              </div>

            </button>
          })}
        </div>
      </div>
      <button
        disabled={getPaymentMutation.isLoading}
        onClick={() => getPaymentMutation.mutate({
          cost: cost,
          work: data.work.id,
          expert: data.expert.id,
          review: data.id,
          method: methodPay.type
        })}
        className={cx(styles.pay, methodPay.styles)}>
        {getPaymentMutation.isLoading ?
          <>
            <p className={styles.text}>Платеж создается</p>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.25, repeat: Infinity }}
              className={styles.load}>
              <IoSyncOutline className={styles.svg} />
            </motion.div>
          </>
          :
          <>
            <p className={styles.text}>Оплата <span>/ {cost} руб.</span></p>
            <div className={styles.icon}>
              {methodPay.icon}
            </div>
          </>

        }
      </button>

    </Modal>
  )
}

export default Payment