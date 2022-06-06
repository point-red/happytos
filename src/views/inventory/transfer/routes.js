import SendCustomer from './send-customer/routes'
import Send from './send/routes'
import Receive from './receive/routes'

export default [
  { path: '/inventory/transfer', name: 'Transfer', component: () => import('./Index.vue') },
  ...SendCustomer,
  ...Send,
  ...Receive
]
