import Finance from '@/views/finance/Index'
import PaymentOrder from './payment-order/routes'
import Cash from './cash/routes'
import Bank from './bank/routes'
import CashAdvance from './cash-advance/routes'
import CashReport from './cash-report/routes'
import BankReport from './bank-report/routes'

export default [
  { path: '/finance', name: 'Finance', component: Finance },
  ...PaymentOrder,
  ...Cash,
  ...Bank,
  ...CashAdvance,
  ...CashReport,
  ...BankReport
]
