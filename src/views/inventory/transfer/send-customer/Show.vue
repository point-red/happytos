<template>
  <div>
    <breadcrumb v-if="inventoryTransferItemCustomer">
      <breadcrumb-inventory />
      <breadcrumb-inventory-transfer />
      <router-link
        to="/inventory/transfer/send-customer"
        class="breadcrumb-item"
      >
        {{ $t('send customer') | uppercase }}
      </router-link>
      <span class="breadcrumb-item active">
        <span v-if="inventoryTransferItemCustomer.form.number">
          {{ inventoryTransferItemCustomer.form.number | uppercase }}
        </span>
        <span v-if="inventoryTransferItemCustomer.form.edited_number">
          {{ $t('archive') | uppercase }}
        </span>
      </span>
    </breadcrumb>

    <span v-if="inventoryTransferItemCustomer.form.number">
      <p-show-form-approval-status-custom
        form-name="Transfer Item Send Customer"
        :is-loading="isLoading"
        :approved-by="inventoryTransferItemCustomer.form.request_approval_to.full_name"
        :cancellation-status="inventoryTransferItemCustomer.form.cancellation_status"
        :approval-status="inventoryTransferItemCustomer.form.approval_status"
        :approval-reason="inventoryTransferItemCustomer.form.approval_reason"
        @onApprove="onApprove"
        @onReject="onReject"
      />
      <p-show-form-cancellation-status-custom
        form-name="Transfer Item Send Customer"
        :is-loading="isLoading"
        :approved-by="inventoryTransferItemCustomer.form.request_approval_to.full_name"
        :cancellation-status="inventoryTransferItemCustomer.form.cancellation_status"
        :cancellation-approval-reason="inventoryTransferItemCustomer.form.cancellation_approval_reason"
        :request-cancellation-reason="inventoryTransferItemCustomer.form.request_cancellation_reason"
        @onCancellationApprove="onCancellationApprove"
        @onCancellationReject="onCancellationReject"
      />
      <p-show-form-close-status
        form-name="Transfer Item Send Customer"
        :is-loading="isLoading"
        :approved-by="inventoryTransferItemCustomer.form.request_approval_to.full_name"
        :close-status="inventoryTransferItemCustomer.form.close_status"
        :close-approval-reason="inventoryTransferItemCustomer.form.close_approval_reason"
        :request-close-reason="inventoryTransferItemCustomer.form.request_close_reason"
        @onCloseApprove="onCloseApprove"
        @onCloseReject="onCloseReject"
      />
    </span>

    <div
      v-if="inventoryTransferItemCustomer"
      class="row"
    >
      <p-block>
        <p-block-inner :is-loading="isLoading">
          <div class="row">
            <div class="col-sm-12">
              <h3 v-if="inventoryTransferItemCustomer.form.edited_number">
                {{ $t('archive') | uppercase }}
              </h3>
              <span v-if="inventoryTransferItemCustomer.form.number">
                <div class="text-right">
                  <button
                    class="mr-3 btn btn-sm btn-outline-secondary mr-5"
                    title="Print transfer item"
                    @click="() => $refs['form-print'].open()"
                  >
                    <i class="si si-printer" />
                  </button>
                  <router-link
                    v-if="$permission.has('create transfer item')"
                    :to="{ name: 'inventory.transfer.send.customer.create' }"
                    class="btn btn-sm btn-outline-secondary mr-5"
                  >
                    {{ $t('create') | uppercase }}
                  </router-link>
                  <router-link
                    v-if="$permission.has('update transfer item')"
                    :to="{ name: 'inventory.transfer.send.customer.edit', params: { id: inventoryTransferItemCustomer.id }}"
                    class="btn btn-sm btn-outline-secondary mr-5"
                  >
                    {{ $t('edit') | uppercase }}
                  </router-link>
                  <button
                    v-if="$permission.has('delete transfer item') && (inventoryTransferItemCustomer.form.cancellation_status == null || inventoryTransferItemCustomer.form.cancellation_status == -1)"
                    class="btn btn-sm btn-outline-secondary mr-5"
                    @click="$refs.formRequestDelete.open()"
                  >
                    {{ $t('delete') | uppercase }}
                  </button>
                  <!-- <button
                    v-if="inventoryTransferItemCustomer.receive_item != null && inventoryTransferItemCustomer.form.done == 0 && (inventoryTransferItemCustomer.form.close_status == null || inventoryTransferItemCustomer.form.close_status == -1)"
                    class="btn btn-sm btn-outline-secondary mr-5"
                    @click="$refs.formRequestClose.open()"
                  >
                    {{ $t('close form') | uppercase }}
                  </button> -->
                </div>
              </span>
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-6">
              <h4>{{ $t('transfer item') | uppercase }}</h4>
              <table class="table table-sm table-bordered">
                <tr>
                  <td class="font-weight-bold">
                    {{ $t('date') | uppercase }}
                  </td>
                  <td>{{ inventoryTransferItemCustomer.form.date | dateFormat('DD MMMM YYYY') }}</td>
                </tr>
                <tr>
                  <td
                    width="150px"
                    class="font-weight-bold"
                  >
                    {{ $t('form number') | uppercase }}
                  </td>
                  <td v-if="inventoryTransferItemCustomer.form.number">
                    {{ inventoryTransferItemCustomer.form.number }}
                  </td>
                  <td v-if="inventoryTransferItemCustomer.form.edited_number">
                    {{ inventoryTransferItemCustomer.form.edited_number }}
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">
                    {{ $t('warehouse') | uppercase }}
                  </td>
                  <td>{{ inventoryTransferItemCustomer.warehouse.name }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">
                    {{ $t('customer') | uppercase }}
                  </td>
                  <td>{{ inventoryTransferItemCustomer.customer.name }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">
                    {{ $t('address') | uppercase }}
                  </td>
                  <td>{{ inventoryTransferItemCustomer.customer.address }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">
                    {{ $t('driver') | uppercase }}
                  </td>
                  <td>{{ inventoryTransferItemCustomer.expedition.name }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">
                    {{ $t('plat') | uppercase }}
                  </td>
                  <td>{{ inventoryTransferItemCustomer.plat }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">
                    {{ $t('stnk') | uppercase }}
                  </td>
                  <td>{{ inventoryTransferItemCustomer.stnk }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">
                    {{ $t('phone') | uppercase }}
                  </td>
                  <td>{{ inventoryTransferItemCustomer.phone }}</td>
                </tr>
              </table>
            </div>
            <div class="col-sm-2">
              .
            </div>
            <div class="col-sm-4 text-right">
              <h6 class="mb-5">
                {{ authUser.tenant_name | uppercase }}
              </h6>
              <template v-if="inventoryTransferItemCustomer.form.branch">
                {{ inventoryTransferItemCustomer.form.branch.address | uppercase }} <br v-if="inventoryTransferItemCustomer.form.branch.address">
                {{ inventoryTransferItemCustomer.form.branch.phone | uppercase }} <br v-if="inventoryTransferItemCustomer.form.branch.phone">
              </template>
              <table class="table table-sm table-bordered text-left mt-20">
                <tr>
                  <td class="col-md-3">
                    No Iso
                  </td>
                  <td class="col-md-3">
                    SKA-FR-WH-06/Rev-01
                  </td>
                </tr>
                <tr>
                  <td class="col-md-3">
                    Tanggal Aktif Iso
                  </td>
                  <td class="col-md-3">
                    12 Juni 2021
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <hr>
          <point-table class="mt-20">
            <tr slot="p-head">
              <th class="text-center">
                #
              </th>
              <th>Item</th>
              <th class="text-right">
                Stock Warehouse
              </th>
              <th class="text-right">
                Quantity Send
              </th>
              <th class="text-right">
                Balances
              </th>
              <th class="text-right">
                Notes
              </th>
            </tr>
            <template v-for="(row, index) in inventoryTransferItemCustomer.items">
              <tr
                v-if="row.quantity !== 0"
                slot="p-body"
                :key="index"
              >
                <th class="text-center">
                  {{ index + 1 }}
                </th>
                <td>
                  {{ row.item.label }}
                  <template v-if="row.production_number">
                    (PID: {{ row.production_number }})
                  </template>
                  <template v-if="row.item.require_expiry_date">
                    (E/D: {{ row.expiry_date | dateFormat('DD MMMM YYYY') }})
                  </template>
                </td>
                <td class="text-right">
                  {{ row.stock | numberFormat }} {{ row.unit }}
                </td>
                <td class="text-right">
                  {{ row.quantity | numberFormat }} {{ row.unit }}
                </td>
                <td class="text-right">
                  {{ row.balance | numberFormat }} {{ row.unit }}
                </td>
                <td class="text-right">
                  {{ row.notes }}
                </td>
              </tr>
            </template>
          </point-table>
          <div class="row mt-50">
            <div class="col-sm-6">
              <h6 class="mb-0">
                {{ $t('notes') | uppercase }}
              </h6>
              <div style="white-space: pre-wrap;">
                {{ inventoryTransferItemCustomer.form.notes }}
              </div>
              <div class="d-sm-block d-md-none mt-10" />
            </div>
            <div class="col-sm-3 text-left">
              <table class="table table-sm table-bordered text-left">
                <tr class="text-center">
                  <th>
                    Item Checked
                  </th>
                  <th colspan="2">
                    Status
                  </th>
                </tr>
                <tr>
                  <td>
                    STNK
                  </td>
                  <td>
                    <div
                      class="custom-control custom-checkbox"
                    >
                      <input
                        type="checkbox"
                        class="custom-control-input"
                      >
                      <label
                        class="custom-control-label"
                      >
                        Ada
                      </label>
                    </div>
                  </td>
                  <td>
                    <div
                      class="custom-control custom-checkbox"
                    >
                      <input
                        type="checkbox"
                        class="custom-control-input"
                      >
                      <label
                        class="custom-control-label"
                      >
                        Tidak Ada
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    SIM
                  </td>
                  <td>
                    <div
                      class="custom-control custom-checkbox"
                    >
                      <input
                        type="checkbox"
                        class="custom-control-input"
                      >
                      <label
                        class="custom-control-label"
                      >
                        Ada
                      </label>
                    </div>
                  </td>
                  <td>
                    <div
                      class="custom-control custom-checkbox"
                    >
                      <input
                        type="checkbox"
                        class="custom-control-input"
                      >
                      <label
                        class="custom-control-label"
                      >
                        Tidak Ada
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    Kebersihan
                  </td>
                  <td>
                    <div
                      class="custom-control custom-checkbox"
                    >
                      <input
                        type="checkbox"
                        class="custom-control-input"
                      >
                      <label
                        class="custom-control-label"
                      >
                        Ok
                      </label>
                    </div>
                  </td>
                  <td>
                    <div
                      class="custom-control custom-checkbox"
                    >
                      <input
                        type="checkbox"
                        class="custom-control-input"
                      >
                      <label
                        class="custom-control-label"
                      >
                        No
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    Basah/Kering
                  </td>
                  <td>
                    <div
                      class="custom-control custom-checkbox"
                    >
                      <input
                        type="checkbox"
                        class="custom-control-input"
                      >
                      <label
                        class="custom-control-label"
                      >
                        Kering
                      </label>
                    </div>
                  </td>
                  <td>
                    <div
                      class="custom-control custom-checkbox"
                    >
                      <input
                        type="checkbox"
                        class="custom-control-input"
                      >
                      <label
                        class="custom-control-label"
                      >
                        Basah
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    Terpal
                  </td>
                  <td>
                    <div
                      class="custom-control custom-checkbox"
                    >
                      <input
                        type="checkbox"
                        class="custom-control-input"
                      >
                      <label
                        class="custom-control-label"
                      >
                        Ok
                      </label>
                    </div>
                  </td>
                  <td>
                    <div
                      class="custom-control custom-checkbox"
                    >
                      <input
                        type="checkbox"
                        class="custom-control-input"
                      >
                      <label
                        class="custom-control-label"
                      >
                        No
                      </label>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div class="col-sm-3 text-center">
              <h6 class="mb-0">
                {{ $t('created by') | uppercase }}
              </h6>
              <div
                class="mb-50"
                style="font-size:11px"
              >
                {{ inventoryTransferItemCustomer.form.date | dateFormat('DD MMMM YYYY') }}
              </div>
              {{ inventoryTransferItemCustomer.form.created_by.full_name | uppercase }}
              <div class="d-sm-block d-md-none mt-10" />
            </div>
          </div>
        </p-block-inner>
      </p-block>
    </div>
    <m-form-print
      ref="form-print"
      @delete="onPrint($event)"
    />
    <m-form-request-delete
      ref="formRequestDelete"
      @delete="onDelete($event)"
    />
    <m-form-approval-reject
      ref="formApprovalReject"
      @reject="onReject($event)"
    />
    <m-form-cancellation-reject
      ref="formCancellationReject"
      @reject="onCancellationReject($event)"
    />
    <print-transfer-item
      ref="print-transfer-item"
      :transferitem="inventoryTransferItemCustomer"
    />
    <print-transfer-item-surat
      ref="print-transfer-item-surat"
      :transferitem="inventoryTransferItemCustomer"
    />
  </div>
</template>

<script>
import Breadcrumb from '@/views/Breadcrumb'
import BreadcrumbInventory from '@/views/inventory/Breadcrumb'
import BreadcrumbInventoryTransfer from '@/views/inventory/transfer/Breadcrumb'
import PointTable from 'point-table-vue'
import PrintTransferItem from './PrintTransferItem'
import PrintTransferItemSurat from './PrintTransferItemSurat'
import MFormPrint from './MFormPrint'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Breadcrumb,
    BreadcrumbInventory,
    BreadcrumbInventoryTransfer,
    PointTable,
    PrintTransferItem,
    PrintTransferItemSurat,
    MFormPrint
  },
  data () {
    return {
      id: this.$route.params.id,
      isLoading: false,
      isDeleting: false,
      lines: []
    }
  },
  computed: {
    ...mapGetters('inventoryTransferItemCustomer', ['inventoryTransferItemCustomer']),
    ...mapGetters('auth', ['authUser'])
  },
  watch: {
    '$route' (to, from) {
      if (to.params.id != from.params.id) {
        this.id = to.params.id
        this.inventoryTransferItemCustomerRequest()
      }
    }
  },
  created () {
    this.inventoryTransferItemCustomerRequest()
  },
  methods: {
    ...mapActions('inventoryTransferItemCustomer', {
      find: 'find',
      delete: 'delete',
      approve: 'approve',
      reject: 'reject',
      close: 'close',
      cancellationApprove: 'cancellationApprove',
      cancellationReject: 'cancellationReject',
      closeApprove: 'closeApprove',
      addHistories: 'addHistories'
    }),
    toggleMore () {
      const isMoreActive = this.inventoryTransferItemCustomer.items.some(function (el, index) {
        return el.more === false
      })
      this.inventoryTransferItemCustomer.items.forEach(element => {
        element.more = isMoreActive
      })
    },
    inventoryTransferItemCustomerRequest () {
      this.isLoading = true
      this.find({
        id: this.id,
        params: {
          with_archives: true,
          with_origin: true,
          includes: 'warehouse;' +
            'customer;' +
            'expedition;' +
            'items.item;' +
            'form.createdBy;' +
            'form.requestApprovalTo;' +
            'form.branch;'
        }
      }).then(response => {
      }).catch(error => {
        this.$notification.error(error.message)
      }).finally(() => {
        this.isLoading = false
      })
    },
    onDelete (reason) {
      this.isDeleting = true
      this.delete({
        id: this.id,
        data: {
          reason: reason
        }
      }).then(response => {
        this.isDeleting = false
        this.$notification.success('cancel success')
        this.onCancellationApprove()
        this.addHistories({ id: this.id, activity: 'Deleted' })
          .catch(error => {
            console.log(error.message)
          })
      }).catch(error => {
        this.isDeleting = false
        this.$notification.error(error.message)
        this.form.errors.record(error.errors)
      })
    },
    onPrint (reason) {
      console.log(reason)
      if (reason == 'iso') {
        this.$refs['print-transfer-item'].open()
      } else {
        this.$refs['print-transfer-item-surat'].open()
      }
    },
    onCloseForm (reason) {
      this.close({
        id: this.id,
        data: {
          reason: reason
        }
      }).then(response => {
        this.isDeleting = false
        this.$notification.success('close form success')
        this.inventoryTransferItemCustomerRequest()
        this.addHistories({ id: this.id, activity: 'Close Form' })
          .catch(error => {
            console.log(error.message)
          })
      }).catch(error => {
        this.isDeleting = false
        this.$notification.error(error.message)
        this.form.errors.record(error.errors)
      })
    },
    onApprove () {
      this.approve({
        id: this.id
      }).then(response => {
        this.$notification.success('approve success')
        this.inventoryTransferItemCustomerRequest()
        this.addHistories({ id: response.data.id, activity: 'Approved' })
          .catch(error => {
            console.log(error.message)
          })
      }).catch(error => {
        this.$notification.error(error.message + ', please edit the document')
        console.log(error.message)
      })
    },
    onReject (reason) {
      this.reject({
        id: this.id,
        reason: reason
      }).then(response => {
        this.$notification.success('reject success')
        this.inventoryTransferItemCustomerRequest()
        this.addHistories({ id: response.data.id, activity: 'Rejected' })
          .catch(error => {
            console.log(error.message)
          })
      })
    },
    onCancellationApprove () {
      this.cancellationApprove({
        id: this.id
      }).then(response => {
        this.$router.push('/inventory/transfer/send-customer/')
      })
    },
    onCancellationReject (reason) {
      this.cancellationReject({
        id: this.id,
        reason: reason
      }).then(response => {
        this.$notification.success('cancellation rejected')
        this.inventoryTransferItemCustomerRequest()
        this.addHistories({ id: response.data.id, activity: 'Cancelation Rejected' })
          .catch(error => {
            console.log(error.message)
          })
      }).catch(error => {
        console.log(error.message)
      })
    },
    onCloseApprove () {
      const items = []
      this.inventoryTransferItemCustomer.items.forEach(itemTransfer => {
        this.inventoryTransferItemCustomer.receive_item.items.forEach(itemReceive => {
          if (itemReceive.item_id == itemTransfer.item_id && itemReceive.production_number == itemTransfer.production_number && itemReceive.expiry_date == itemTransfer.expiry_date) {
            if (itemReceive.quantity < itemTransfer.quantity) {
              items.push({
                item_id: itemTransfer.item_id,
                difference: itemTransfer.quantity - itemReceive.quantity
              })
            }
          }
        })
      })
      this.closeApprove({
        id: this.id,
        items: items
      }).then(response => {
        this.$notification.success('close form approved')
        this.inventoryTransferItemCustomerRequest()
        this.addHistories({ id: response.data.id, activity: 'Close Form Approved' })
          .catch(error => {
            console.log(error.message)
          })
      })
    }
  }
}
</script>
