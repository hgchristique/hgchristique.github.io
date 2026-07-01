import { useState, useEffect, useCallback } from 'react'

export const CURRENCY_RATES = {
  GHS: { rate: 1,        locale: 'en-GH',  decimals: 2 },
  USD: { rate: 0.0649,   locale: 'en-US',  decimals: 2 },
  EUR: { rate: 0.0597,   locale: 'de-DE',  decimals: 2 },
  GBP: { rate: 0.0513,   locale: 'en-GB',  decimals: 2 },
  NGN: { rate: 105.19,   locale: 'en-NG',  decimals: 0 },
  ZAR: { rate: 1.182,    locale: 'en-ZA',  decimals: 2 },
  KES: { rate: 8.44,     locale: 'sw-KE',  decimals: 0 },
  CAD: { rate: 0.0883,   locale: 'en-CA',  decimals: 2 },
  AUD: { rate: 0.1,      locale: 'en-AU',  decimals: 2 },
  JPY: { rate: 9.74,     locale: 'ja-JP',  decimals: 0 },
  INR: { rate: 5.42,     locale: 'en-IN',  decimals: 2 },
  AED: { rate: 0.238,    locale: 'ar-AE',  decimals: 2 },
  CHF: { rate: 0.0584,   locale: 'de-CH',  decimals: 2 },
  SGD: { rate: 0.087,    locale: 'en-SG',  decimals: 2 },
  CNY: { rate: 0.470,    locale: 'zh-CN',  decimals: 2 },
  BRL: { rate: 0.373,    locale: 'pt-BR',  decimals: 2 },
  MXN: { rate: 1.136,    locale: 'es-MX',  decimals: 2 },
  SAR: { rate: 0.243,    locale: 'ar-SA',  decimals: 2 },
  QAR: { rate: 0.236,    locale: 'ar-QA',  decimals: 2 },
  KWD: { rate: 0.0199,   locale: 'ar-KW',  decimals: 3 },
  TRY: { rate: 2.109,    locale: 'tr-TR',  decimals: 2 },
  SEK: { rate: 0.681,    locale: 'sv-SE',  decimals: 2 },
  NOK: { rate: 0.694,    locale: 'nb-NO',  decimals: 2 },
  DKK: { rate: 0.448,    locale: 'da-DK',  decimals: 2 },
  NZD: { rate: 0.105,    locale: 'en-NZ',  decimals: 2 },
  HKD: { rate: 0.507,    locale: 'zh-HK',  decimals: 2 },
  MYR: { rate: 0.305,    locale: 'ms-MY',  decimals: 2 },
  THB: { rate: 2.304,    locale: 'th-TH',  decimals: 2 },
  IDR: { rate: 1025,     locale: 'id-ID',  decimals: 0 },
  PHP: { rate: 3.667,    locale: 'fil-PH', decimals: 2 },
  PKR: { rate: 18.04,    locale: 'ur-PK',  decimals: 0 },
  BDT: { rate: 7.14,     locale: 'bn-BD',  decimals: 0 },
  EGP: { rate: 3.148,    locale: 'ar-EG',  decimals: 2 },
  MAD: { rate: 0.649,    locale: 'fr-MA',  decimals: 2 },
  TZS: { rate: 164.8,    locale: 'sw-TZ',  decimals: 0 },
  UGX: { rate: 243.4,    locale: 'sw-UG',  decimals: 0 },
  ETB: { rate: 3.667,    locale: 'am-ET',  decimals: 2 },
  RWF: { rate: 84.4,     locale: 'rw-RW',  decimals: 0 },
  XOF: { rate: 39.9,     locale: 'fr-SN',  decimals: 0 },
  XAF: { rate: 39.9,     locale: 'fr-CM',  decimals: 0 },
  PLN: { rate: 0.256,    locale: 'pl-PL',  decimals: 2 },
  CZK: { rate: 1.525,    locale: 'cs-CZ',  decimals: 2 },
  HUF: { rate: 23.36,    locale: 'hu-HU',  decimals: 0 },
  RON: { rate: 0.302,    locale: 'ro-RO',  decimals: 2 },
  ILS: { rate: 0.240,    locale: 'he-IL',  decimals: 2 },
  ARS: { rate: 58.4,     locale: 'es-AR',  decimals: 0 },
  CLP: { rate: 61.7,     locale: 'es-CL',  decimals: 0 },
  COP: { rate: 262.8,    locale: 'es-CO',  decimals: 0 },
  PEN: { rate: 0.243,    locale: 'es-PE',  decimals: 2 },
  VND: { rate: 1590,     locale: 'vi-VN',  decimals: 0 },
  KRW: { rate: 86.3,     locale: 'ko-KR',  decimals: 0 },
  TWD: { rate: 2.077,    locale: 'zh-TW',  decimals: 2 },
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
