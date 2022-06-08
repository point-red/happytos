import InventoryTransferSendCustomerIndex from '@/views/inventory/transfer/send-customer/Index'
import InventoryTransferSendCustomerCreate from '@/views/inventory/transfer/send-customer/Create'
import InventoryTransferSendCustomerShow from '@/views/inventory/transfer/send-customer/Show'
import InventoryTransferSendCustomerEdit from '@/views/inventory/transfer/send-customer/Edit'
import InventoryTransferSendCustomerApproval from '@/views/inventory/transfer/send-customer/Approval'
import InventoryTransferSendCustomerHistories from '@/views/inventory/transfer/send-customer/Histories'

export default [
  { path: '/inventory/transfer/send-customer', name: 'inventory.transfer.send.customer.index', component: InventoryTransferSendCustomerIndex },
  { path: '/inventory/transfer/send-customer/create', name: 'inventory.transfer.send.customer.create', component: InventoryTransferSendCustomerCreate },
  { path: '/inventory/transfer/send-customer/approval', name: 'inventory.transfer.send.customer.approval', component: InventoryTransferSendCustomerApproval },
  { path: '/inventory/transfer/send-customer/:id', name: 'inventory.transfer.send.customer.show', component: InventoryTransferSendCustomerShow },
  { path: '/inventory/transfer/send-customer/:id/edit', name: 'inventory.transfer.send.customer.edit', component: InventoryTransferSendCustomerEdit },
  { path: '/inventory/transfer/send-customer/:id/histories', name: 'inventory.transfer.send.customer.histories', component: InventoryTransferSendCustomerHistories }
]
