import {useEffect} from 'react';

const FirstEasterEgg = ({fields: {CouponId}, language}) => {
  useEffect(() => {
    if (typeof console !== 'undefined') {
      console.log(`You won a free coupon ! Please go to ${CouponId.content.text[language]} to claim your prize`)
    }
  }, [CouponId])
  return null;
}

export default FirstEasterEgg;