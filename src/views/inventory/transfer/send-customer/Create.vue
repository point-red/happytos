<template>
  <div>
    <breadcrumb>
      <breadcrumb-inventory />
      <breadcrumb-inventory-transfer />
      <router-link
        to="/inventory/transfer/send-customer"
        class="breadcrumb-item"
      >
        {{ $t('send customer') | uppercase }}
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
                      {{ $t('warehouse') | uppercase }}
                    </td>
                    <td>
                      <span
                        class="select-link"
                        @click="$refs.warehouse.open()"
                      >{{ form.warehouse_name || $t('select') | uppercase }}</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">
                      {{ $t('customer') | uppercase }}
                    </td>
                    <td>
                      <span
                        class="select-link"
                        @click="$refs.customers.open()"
                      >{{ form.customer_name || $t('select') | uppercase }}</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">
                      {{ $t('address') | uppercase }}
                    </td>
                    <td>
                      <p-form-input
                        id="customer_address"
                        v-model="form.customer_address"
                        name="customer_address"
                        :label="$t('address')"
                        :readonly="isExistCustomerAddress"
                        :errors="form.errors.get('customer_address')"
                        @errors="form.errors.set('customer_address', null)"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">
                      {{ $t('driver') | uppercase }}
                    </td>
                    <td>
                      <span
                        class="select-link"
                        @click="$refs.expedition.open()"
                      >{{ form.expedition_name || $t('select') | uppercase }}</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">
                      {{ $t('plat nomor') | uppercase }}
                    </td>
                    <td>
                      <p-form-input
                        id="plat"
                        v-model="form.plat"
                        name="plat"
                        :label="$t('plat')"
                        :errors="form.errors.get('plat')"
                        @errors="form.errors.set('plat', null)"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">
                      {{ $t('stnk') | uppercase }}
                    </td>
                    <td>
                      <p-form-input
                        id="stnk"
                        v-model="form.stnk"
                        name="stnk"
                        :label="$t('stnk')"
                        :errors="form.errors.get('stnk')"
                        @errors="form.errors.set('stnk', null)"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">
                      {{ $t('no. telp') | uppercase }}
                    </td>
                    <td>
                      <p-form-input
                        id="phone"
                        v-model="form.phone"
                        name="phone"
                        :label="$t('phone')"
                        :errors="form.errors.get('phone')"
                        @errors="form.errors.set('phone', null)"
                      />
                    </td>
                  </tr>
                </table>
              </div>
              <div class="col-sm-2">
                .
              </div>
              <div class="col-sm-4 text-right">
                <div class="mb-30">
                  <h6 class="mb-0">
                    {{ authUser.tenant_name | uppercase }}
                  </h6>
                  <template v-if="authUser.branch">
                    {{ authUser.branch.address | uppercase }} <br v-if="authUser.branch.address">
                    {{ authUser.branch.phone | uppercase }} <br v-if="authUser.branch.phone">
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
            </div>
            <hr>
            <point-table>
              <tr slot="p-head">
                <th>#</th>
                <th style="min-width: 120px">
                  Item
                </th>
                <th>Stock Warehouse</th>
                <th>Quantity Send</th>
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
                    <span
                      class="select-link"
                      @click="$refs.item.open(index)"
                    >
                      {{ row.item_label || $t('select') | uppercase }}
                    </span>
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
                      :readonly="row.item_id == null"
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
                  {{ Date.now() | dateFormat('DD MMMM YYYY') }}
                </div>
                {{ requestedBy | uppercase }}
                <div class="d-sm-block d-md-none mt-10" />
              </div>
              <!-- <div class="col-sm-3 text-center">
                <h6 class="mb-0">
                  {{ $t('approved by') | uppercase }}
                </h6>
                <div
                  class="mb-50"
                  style="font-size:11px"
                >
                  _______________
                </div>
                <span
                  class="select-link"
                  @click="$refs.approver.open()"
                >{{ form.approver_name || $t('select') | uppercase }}</span><br>
                <span style="font-size:9px">{{ form.approver_email | uppercase }}</span>
              </div> -->

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
    <m-customer
      ref="customers"
      @choosen="chooseCustomer"
    />
    <m-expedition
      ref="expedition"
      @choosen="chooseExpedition"
    />
    <m-inventory-out
      :id="'inventory'"
      ref="inventory"
      :disable-unit-selection="true"
      @updated="updateDna($event)"
    />
    <m-warehouse
      id="warehouse"
      ref="warehouse"
      name="warehouse"
      @choosen="chooseWarehouse"
    />
    <m-item
      ref="item"
      :create-button="false"
      @choosen="chooseItem"
    />
    <m-user
      ref="approver"
      :permission="'approve transfer item'"
      @choosen="chooseApprover"
    />
  </div>
</template>

<script>
import Breadcrumb from '@/views/Breadcrumb'
import BreadcrumbInventory from '@/views/inventory/Breadcrumb'
import BreadcrumbInventoryTransfer from '@/views/inventory/transfer/Breadcrumb'
import Form from '@/utils/Form'
import PointTable from 'point-table-vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    PointTable,
    Breadcrumb,
    BreadcrumbInventory,
    BreadcrumbInventoryTransfer
  },
  data () {
    return {
      isSaving: false,
      isLoading: false,
      isExistCustomerAddress: true,
      requestedBy: localStorage.getItem('fullName'),
      warehouseId: null,
      form: new Form({
        increment_group: this.$moment().format('YYYYMM'),
        date: this.$moment().format('YYYY-MM-DD HH:mm:ss'),
        warehouse_id: null,
        warehouse_name: null,
        customer_id: null,
        customer_name: null,
        customer_address: null,
        expedition_id: null,
        expedition_name: null,
        plat: null,
        stnk: null,
        phone: null,
        notes: null,
        items: [],
        request_approval_to: localStorage.getItem('userId'),
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
    this.addItemRow()

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
    ...mapActions('masterCustomer', ['update']),
    ...mapActions('inventoryTransferItemCustomer', ['create', 'approve', 'addHistories']),
    ...mapActions('inventoryInventoryWarehouseCurrentstock', ['get']),
    addItemRow () {
      this.form.items.push({
        item_id: null,
        item_name: null,
        unit: null,
        converter: null,
        quantity: 0,
        require_production_number: 0,
        require_expiry_date: 0,
        stock: 0,
        balance: 0,
        notes: null
      })
    },
    clearItem (index) {
      this.form.items.splice(index, 1)
      if (this.form.items.length === 0) {
        this.addItemRow()
      }
    },
    onClickQuantity (row, index) {
      if (row.require_expiry_date == 1 || row.require_production_number == 1) {
        row.warehouse_id = this.warehouseId
        row.index = index
        this.$refs.inventory.open(row, row.quantity)
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
    updateDna (e) {
      console.log(e)
      this.form.items[e.index].dna = e.dna
      this.form.items[e.index].quantity = e.quantity
      this.form.items[e.index].unit = e.unit
      this.form.items[e.index].converter = e.converter
    },
    chooseWarehouse (warehouse) {
      if (this.form.items) {
        if (this.warehouseId == null) {
          this.form.items.forEach(item => {
            if (item.item_id) {
              this.get({
                params: {
                  item_id: item.item_id,
                  warehouse_id: warehouse.id,
                  expiry_date: null,
                  production_number: null
                }
              }).then(response => {
                item.stock = response
                this.isLoading = false
              }).catch(error => {
                this.isLoading = false
                this.$notification.error(error.message)
              })
            }
          })
        } else if (this.warehouseId != warehouse.id) {
          this.form.items = []
          this.addItemRow()
        }
      }
      this.warehouseId = warehouse.id
      this.form.warehouse_id = warehouse.id
      this.form.warehouse_name = warehouse.name
    },
    chooseCustomer (customer) {
      this.form.customer_id = customer.id
      this.form.customer_name = customer.name
      this.form.customer_address = customer.address
      if (customer.address == null) {
        this.isExistCustomerAddress = false
      } else {
        this.isExistCustomerAddress = true
      }
    },
    chooseExpedition (expedition) {
      this.form.expedition_id = expedition.id
      this.form.expedition_name = expedition.name
    },
    chooseApprover (value) {
      this.form.request_approval_to = value.id
      this.form.approver_name = value.fullName
      this.form.approver_email = value.email
    },
    chooseItem (item) {
      if (item.id == null) {
        this.clearItem(item.index)
        return
      }
      let duplicateItem = false
      this.form.items.forEach(element => {
        if (item.id == element.item_id) {
          duplicateItem = true
        }
      })
      if (duplicateItem) {
        return
      }
      const row = this.form.items[item.index]
      row.item = item
      row.item_id = item.id
      row.item_name = item.name
      row.item_label = item.label
      row.require_production_number = item.require_production_number
      row.require_expiry_date = item.require_expiry_date
      row.notes = item.notes
      row.units = item.units
      row.units.forEach((unit, keyUnit) => {
        if (unit.id == item.unit_default) {
          row.unit = unit.label
          row.converter = unit.converter
        }
      })
      let isNeedNewRow = true
      this.form.items.forEach(element => {
        if (element.item_id == null) {
          isNeedNewRow = false
        }
      })
      if (isNeedNewRow) {
        this.addItemRow()
      }
      this.find({
        id: item.id
      })
      if (this.form.warehouse_id) {
        this.get({
          params: {
            item_id: item.id,
            warehouse_id: this.form.warehouse_id,
            date_form: this.form.date
          }
        }).then(response => {
          row.stock = response
          this.isLoading = false
        }).catch(error => {
          this.isLoading = false
          this.$notification.error(error.message)
        })
      }
    },
    ComputeBalance (row) {
      row.balance = row.stock - row.quantity
      return row.balance
    },
    onSubmit () {
      this.isSaving = true
      if (this.form.request_approval_to == null) {
        this.$notification.error('approval cannot be null')
        this.isSaving = false
        this.form.errors.record({
          request_approval_to: ['Approver should not empty']
        })
        return
      }
      if (this.form.customer_address == null) {
        this.$notification.error('address cannot be null')
        this.isSaving = false
        this.form.errors.record({
          request_approval_to: ['Address should not empty']
        })
        return
      }
      let warningStock = false
      this.form.items.forEach(item => {
        if (item.balance < 0) {
          warningStock = true
        }
      })
      if (warningStock) {
        this.$notification.error('not enough stock!')
        this.isSaving = false
        return
      }
      if (this.authUser.warehouse == null || this.authUser.warehouse.id != this.form.warehouse_id) {
        this.$notification.error('please set as default warehouse')
        this.isSaving = false
        return
      }
      this.form.increment_group = this.$moment(this.form.date).format('YYYYMM')
      this.form.items = this.form.items.filter(item => item.item_id)
      if (!this.isExistCustomerAddress) {
        this.update({
          id: this.form.customer_id,
          name: this.form.customer_name,
          address: this.form.customer_address
        }).catch(error => {
          this.$notification.error(error.message)
          this.form.errors.record(error.errors)
        })
      }
      this.create(this.form)
        .then(response => {
          this.isSaving = false
          this.$notification.success('create success')
          Object.assign(this.$data, this.$options.data.call(this))
          this.$router.push('/inventory/transfer/send-customer/' + response.data.id)
          this.addHistories({ id: response.data.id, activity: 'Created' })
            .catch(error => {
              this.$notification.error(error.message)
              this.form.errors.record(error.errors)
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
