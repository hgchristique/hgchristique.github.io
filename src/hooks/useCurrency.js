import { useState, useEffect, useCallback } from 'react'

export const CURRENCY_RATES = {
  GHS: { rate: 1,      locale: 'en-GH',  decimals: 2 },
  USD: { rate: 0.0649, locale: 'en-US',  decimals: 2 },
  EUR: { rate: 0.0597, locale: 'de-DE',  decimals: 2 },
  GBP: { rate: 0.0513, locale: 'en-GB',  decimals: 2 },
  NGN: { rate: 105.19, locale: 'en-NG',  decimals: 0 },
  ZAR: { rate: 1.182,  locale: 'en-ZA',  decimals: 2 },
  KES: { rate: 8.44,   locale: 'sw-KE',  decimals: 0 },
  CAD: { rate: 0.0883, locale: 'en-CA',  decimals: 2 },
  AUD: { rate: 0.1,    locale: 'en-AU',  decimals: 2 },
  JPY: { rate: 9.74,   locale: 'ja-JP',  decimals: 0 },
  INR: { rate: 5.42,   locale: 'en-IN',  decimals: 2 },
  AED: { rate: 0.238,  locale: 'ar-AE',  decimals: 2 },
  CHF: { rate: 0.0584, locale: 'de-CH',  decimals: 2 },
  SGD: { rate: 0.087,  locale: 'en-SG',  decimals: 2 },
}

export function useCurrency() {
  const [currencyCode, setCurrencyCode] = useState('GHS')

  useEffect(() => {
    fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(5000) })
      .then(r => r.json())
      .then(data => {
        const code = data.currency
        if (typeof code === 'string' && /^[A-Z]{3}$/.test(code) && CURRENCY_RATES[code]) {
          setCurrencyCode(code)
        }
      })
      .catch(() => {})
  }, [])

  const formatPrice = useCallback((ghsPrice) => {
    const config = CURRENCY_RATES[currencyCode] || CURRENCY_RATES.GHS
    const converted = ghsPrice * config.rate
    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: config.decimals,
      maximumFractionDigits: config.decimals,
    }).format(converted)
  }, [currencyCode])

  return { currencyCode, formatPrice }
}
