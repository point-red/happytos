<template>
  <div>
    <breadcrumb>
      <breadcrumb-inventory />
      <breadcrumb-inventory-transfer />
      <router-link
        to="/inventory/transfer/receive"
        class="breadcrumb-item"
      >
        {{ $t('receive') | uppercase }}
      </router-link>
      <span class="breadcrumb-item active">{{ $t('create') | uppercase }}</span>
    </breadcrumb>

    <form @submit.prevent="onSubmit">
      <div class="row">
        <p-block>
          <p-block-inner :is-loading="isLoading">
            <div class="row">
              <div class="col-sm-6">
                <h4>{{ $t('Transfer Item') | uppercase }}</h4>
                <table class="table table-sm table-bordered">
                  <tr>
                    <td class="font-weight-bold">
                      {{ $t('date') | uppercase }}
                    </td>
                    <!-- <td>
                      <p-date-picker
                        id="date"
                        v-model="form.date"
                        name="date"
                        :label="$t('date')"
                        :errors="form.errors.get('date')"
                        @errors="form.errors.set('date', null)"
                      />
                    </td> -->
                    <td>{{ form.date | dateFormat('DD MMMM YYYY') }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">
                      {{ $t('reference') | uppercase }}
                    </td>
                    <td>
                      <span
                        class="select-link"
                        @click="$refs.SelectReference.open()"
                      >
                        <template v-if="transferItem && transferItem.form.number">
                          {{ transferItem.form.number }}
                        </template>
                        <template v-else>
                          {{ $t('select') | uppercase }}
                        </template>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">
                      {{ $t('from warehouse') | uppercase }}
                    </td>
                    <td>
                      <template v-if="transferItem && transferItem.warehouse.name">
                        {{ transferItem.warehouse.name }}
                      </template>
                    </td>
                  </tr>
                </table>
              </div>
              <div class="col-sm-6 text-right">
                <div class="mb-30">
                  <h6 class="mb-0">
                    {{ authUser.tenant_name | uppercase }}
                  </h6>
                  <template v-if="authUser.branch">
                    {{ authUser.branch.address | uppercase }} <br v-if="authUser.branch.address">
                    {{ authUser.branch.phone | uppercase }} <br v-if="authUser.branch.phone">
                  </template>
                </div>
              </div>
            </div>
            <hr>
            <point-table>
              <tr slot="p-head">
                <th>#</th>
                <th style="min-width: 120px">
                  Item
                </th>
                <th>Stock Warehouse</th>
                <th>Quantity Receive</th>
                <th>Balance</th>
                <th>Notes</th>
              </tr>
              <template v-for="(row, index) in form.items">
                <tr
                  slot="p-body"
                  :key="index"
                >
                  <th>{{ index + 1 }}</th>
                  <td>
                    {{ row.item.label }}
                    <template v-if="row.production_number">
                      (PID: {{ row.production_number }})
                    </template>
                    <template v-if="row.item.require_expiry_date">
                      (E/D: {{ row.expiry_date | dateFormat('DD MMMM YYYY') }})
                    </template>
                  </td>
                  <td>
                    <p-quantity
                      :id="'stock' + index"
                      v-model="row.stock"
                      :name="'stock' + index"
                      :disabled="true"
                      :item-id="row.item_id"
                      :units="row.units"
                      :unit="{
                        name: row.unit,
                        label: row.unit,
                        converter: row.converter
                      }"
                      @choosen="chooseUnit($event, row)"
                    />
                  </td>
                  <td>
                    <p-quantity
                      :id="'quantity' + index"
                      v-model="row.quantity"
                      :name="'quantity' + index"
                      :disabled="row.item_id == null"
                      :item-id="row.item_id"
                      :units="row.units"
                      :unit="{
                        name: row.unit,
                        label: row.unit,
                        converter: row.converter
                      }"
                      :max="row.quantity_pending * 1"
                      :disable-unit-selection="true"
                      :readonly="onClickUnit(row)"
                      @input="onQtyChange($event, row)"
                      @choosen="chooseUnit($event, row)"
                      @click.native="onClickQuantity(row, index)"
                    />
                  </td>
                  <td>
                    <p-quantity
                      :id="'balance' + index"
                      :name="'balance' + index"
                      :disabled="true"
                      :item-id="row.item_id"
                      :units="row.units"
                      :unit="{
                        name: row.unit,
                        label: row.unit,
                        converter: row.converter
                      }"
                      :value="ComputeBalance(row)"
                      @choosen="chooseUnit($event, row)"
                    />
                  </td>
                  <td>
                    <p-form-input
                      :id="'notes-' + index"
                      v-model="row.notes"
                      :name="'notes-' + index"
                      :readonly="true"
                    />
                  </td>
                </tr>
              </template>
            </point-table>

            <div class="row">
              <div class="col-sm-6">
                <textarea
                  v-model="form.notes"
                  rows="5"
                  class="form-control"
                  placeholder="Notes"
                />
              </div>
              <div class="col-sm-6 text-center">
                <h6 class="mb-0">
                  {{ $t('created by') | uppercase }}
                </h6>
                <div
                  class="mb-50"
                  style="font-size:11px"
                >
                  {{ Date.now() | dateFormat('DD MMMM YYYY') }}
                </div>
                {{ requestedBy | uppercase }}
                <div class="d-sm-block d-md-none mt-10" />
              </div>

              <div class="col-sm-12">
                <hr>
                <button
                  type="submit"
                  class="btn btn-block btn-sm btn-primary"
                  :disabled="isSaving"
                >
                  <i
                    v-show="isSaving"
                    class="fa fa-asterisk fa-spin"
                  /> {{ $t('save') | uppercase }}
                </button>
              </div>
            </div>
          </p-block-inner>
        </p-block>
      </div>
    </form>
    <m-inventory-out
      :id="'inventory'"
      ref="inventory"
      :disable-unit-selection="true"
      @updated="updateDna($event)"
    />
    <m-user
      ref="approver"
      :permission="'approve transfer item'"
      @choosen="chooseApprover"
    />
    <select-reference
      ref="SelectReference"
      @choosen="chooseTransferItem"
    />
  </div>
</template>

<script>
import Breadcrumb from '@/views/Breadcrumb'
import BreadcrumbInventory from '@/views/inventory/Breadcrumb'
import BreadcrumbInventoryTransfer from '@/views/inventory/transfer/Breadcrumb'
import Form from '@/utils/Form'
import PointTable from 'point-table-vue'
import SelectReference from './SelectReference'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    PointTable,
    Breadcrumb,
    BreadcrumbInventory,
    BreadcrumbInventoryTransfer,
    SelectReference
  },
  data () {
    return {
      isSaving: false,
      isLoading: false,
      requestedBy: localStorage.getItem('fullName'),
      warehouseId: null,
      form: new Form({
        increment_group: this.$moment().format('YYYYMM'),
        date: this.$moment().format('YYYY-MM-DD HH:mm:ss'),
        warehouse_id: null,
        from_warehouse_id: null,
        driver: null,
        notes: null,
        items: [],
        request_approval_to: null,
        approver_name: null,
        approver_email: null
      })
    }
  },
  computed: {
    ...mapGetters('inventoryTransferItem', ['inventoryTransferItem']),
    ...mapGetters('auth', ['authUser'])
  },
  created () {
    if (this.$route.query.id) {
      this.isLoading = true
      this.find({
        id: this.$route.query.id,
        params: {
          includes: 'form;items.item.units'
        }
      }).then(response => {
        this.isLoading = false
        this.form.date = response.data.form.date
        this.form.notes = response.data.form.notes
        this.form.items = response.data.items
      }).catch(error => {
        this.isLoading = false
        this.$notification.error(error.message)
      })
    }
  },
  methods: {
    ...mapActions('masterItem', ['find']),
    ...mapActions('inventoryReceiveItem', ['create', 'approve', 'addHistories']),
    ...mapActions('inventoryInventoryWarehouseCurrentstock', ['get']),
    onClickQuantity (row, index) {
      if (row.require_expiry_date == 1 || row.require_production_number == 1) {
        row.warehouse_id = this.warehouseId
        row.index = index
        this.$refs.inventory.open(row, row.quantity)
      }
    },
    onQtyChange (value, row) {
      if (value > row.quantity_send) {
        this.$notification.error('Quantity exceeds the stock limit sent!')
        row.quantity = row.quantity_send
      }
    },
    onClickUnit (row) {
      if (row.item_id == null || row.require_expiry_date === 1 || row.require_production_number === 1) {
        return true
      }
      return false
    },
    chooseUnit (unit, row) {
      row.unit = unit.label
      row.converter = unit.converter
    },
    chooseTransferItem (transferItem) {
      this.transferItem = transferItem
      this.form.warehouse_id = transferItem.to_warehouse_id
      this.form.from_warehouse_id = transferItem.warehouse_id
      this.form.driver = transferItem.driver
      this.form.transfer_item_id = transferItem.id
      this.form.notes = transferItem.form.notes
      this.form.items = transferItem.items
      this.form.request_approval_to = transferItem.form.request_approval_to
      this.form.items.forEach(transferItemItem => {
        transferItemItem.stock = ''
        transferItemItem.quantity_send = transferItemItem.quantity
        this.get({
          params: {
            item_id: transferItemItem.item_id,
            warehouse_id: this.form.warehouse_id,
            expiry_date: transferItemItem.expiry_date,
            production_number: transferItemItem.production_number
          }
        }).then(response => {
          transferItemItem.stock = response
        }).catch(error => {
          this.isLoading = false
          this.$notification.error(error.message)
        })
      })
    },
    updateDna (e) {
      console.log(e)
      this.form.items[e.index].dna = e.dna
      this.form.items[e.index].quantity = e.quantity
      this.form.items[e.index].unit = e.unit
      this.form.items[e.index].converter = e.converter
    },
    chooseApprover (value) {
      this.form.request_approval_to = value.id
      this.form.approver_name = value.fullName
      this.form.approver_email = value.email
    },
    ComputeBalance (row) {
      row.balance = parseInt(row.stock) + parseInt(row.quantity)
      return row.balance
    },
    onSubmit () {
      this.isSaving = true
      let formSendDone = 1
      if (this.authUser.warehouse == null || this.authUser.warehouse.id != this.form.warehouse_id) {
        this.$notification.error('please set as default warehouse')
        this.isSaving = false
        return
      }
      if (this.form.request_approval_to == null) {
        this.$notification.error('approval cannot be null')
        this.isSaving = false
        this.form.errors.record({
          request_approval_to: ['Approver should not empty']
        })
        return
      }
      this.form.items.forEach(item => {
        if (item.quantity < item.quantity_send) {
          formSendDone = 0
        }
      })
      this.form.increment_group = this.$moment(this.form.date).format('YYYYMM')
      this.form.items = this.form.items.filter(item => item.item_id)
      this.create(this.form)
        .then(response => {
          this.isSaving = false
          this.$notification.success('create success')
          Object.assign(this.$data, this.$options.data.call(this))
          this.approve({
            id: response.data.id,
            form_send_done: formSendDone
          }).then(response => {
            this.$router.push('/inventory/transfer/receive/' + response.data.id)
            this.addHistories({ id: response.data.id, activity: 'Created' })
              .catch(error => {
                this.$notification.error(error.message)
                this.form.errors.record(error.errors)
              })
          }).catch(error => {
            this.$notification.error(error.message + ', please edit the document')
            console.log(error.message)
          })
        }).catch(error => {
          this.isSaving = false
          this.$notification.error(error.message)
          this.form.errors.record(error.errors)
        })
    }
  }
}
</script>
