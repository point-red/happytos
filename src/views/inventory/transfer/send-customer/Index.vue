<template>
  <div>
    <breadcrumb>
      <breadcrumb-inventory />
      <breadcrumb-inventory-transfer />
      <span class="breadcrumb-item active">{{ $t('send customer') | uppercase }}</span>
    </breadcrumb>

    <div class="row">
      <p-block>
        <div class="input-group block">
          <download-excel
            class="input-group-prepend"
            @click="exportData(inventoryTransferItemCustomers)"
          >
            <span class="input-group-text">
              <i class="fa fa-download" />
            </span>
          </download-excel>
          <router-link
            v-if="$permission.has('create transfer item')"
            to="/inventory/transfer/send-customer/create"
            class="input-group-prepend"
          >
            <span class="input-group-text">
              <i class="fa fa-plus" />
            </span>
          </router-link>
          <p-form-input
            id="search-text"
            ref="searchText"
            name="search-text"
            placeholder="Search"
            class="btn-block"
            :value="searchText"
            @input="filterSearch"
          />
        </div>
        <div class="input-group block">
          <div class="col-sm-12 text-center font-size-sm">
            <a
              href="javascript:void(0)"
              @click="isAdvanceFilter = !isAdvanceFilter"
            >
              {{ $t('advance filter') | uppercase }} <i class="fa fa-caret-down" />
            </a>
          </div>
        </div>
        <div
          v-show="isAdvanceFilter"
          class="card m-5 pt-10"
          :class="{ 'fadeIn': isAdvanceFilter }"
        >
          <div class="row">
            <div class="col-sm-3 text-center">
              <p-form-row
                id="date-start"
                name="date-start"
                :label="$t('date start')"
                :is-horizontal="false"
              >
                <div slot="body">
                  <p-date-picker
                    id="date"
                    v-model="date.start"
                    name="date"
                    label="date"
                  />
                </div>
              </p-form-row>
            </div>
            <div class="col-sm-3 text-center">
              <p-form-row
                id="date-end"
                name="date-end"
                :label="$t('date end')"
                :is-horizontal="false"
              >
                <div slot="body">
                  <p-date-picker
                    id="date"
                    v-model="date.end"
                    name="date"
                    label="date"
                  />
                </div>
              </p-form-row>
            </div>
            <div class="col-sm-3 text-center">
              <p-form-row
                id="form-approval-status"
                name="form-approval-status"
                :label="$t('approval status')"
                :is-horizontal="false"
              >
                <div slot="body">
                  <span
                    class="select-link"
                    @click="$refs.formApprovalStatus.open()"
                  >
                    {{ formApprovalStatus.label || $t('select') | uppercase }}
                  </span>
                </div>
              </p-form-row>
            </div>
            <div class="col-sm-3 text-center">
              <p-form-row
                id="form-status"
                name="form-status"
                :label="$t('form status')"
                :is-horizontal="false"
              >
                <div slot="body">
                  <span
                    class="select-link"
                    @click="$refs.formStatus.open()"
                  >
                    {{ formStatus.label || $t('select') | uppercase }}
                  </span>
                </div>
              </p-form-row>
            </div>
          </div>
          <hr>
        </div>
        <div class="mt-10">
          <!-- <label class="css-control css-control-primary css-checkbox mr-10">
            <input
              type="checkbox"
              class="css-control-input"
              @click="toggleCheckRows()"
              :checked="isRowsChecked(inventoryTransferItemCustomers, checkedRow)">
            <span class="css-control-indicator"></span>
          </label> -->
          <span
            v-show="checkedRow.length > 0"
            class="mr-15 animated fadeIn"
          >
            <!-- <button type="button" class="btn btn-sm btn-secondary mr-5" @click="bulkCancel()">
              {{ $t('request approval') | uppercase }}
            </button>
            <button type="button" class="btn btn-sm btn-secondary mr-5" @click="bulkApprove()">
              {{ $t('approve') | uppercase }}
            </button>
            <button type="button" class="btn btn-sm btn-secondary mr-5" @click="bulkReject()">
              {{ $t('reject') | uppercase }}
            </button>
            <button type="button" class="btn btn-sm btn-secondary" @click="bulkCancel()">
              {{ $t('archive') | uppercase }}
            </button> -->
          </span>
        </div>
        <hr>
        <p-block-inner :is-loading="isLoading">
          <point-table>
            <tr slot="p-head">
              <th>
                Date Form
                <a
                  v-show="isSortDsc"
                  href="javascript:void(0)"
                  @click="sortAsc('form.date')"
                >
                  <i class="fa fa-caret-up" />
                </a>
                <a
                  v-show="isSortAsc"
                  href="javascript:void(0)"
                  @click="sortDsc('-form.date')"
                >
                  <i class="fa fa-caret-down" />
                </a>
              </th>
              <th>
                Form Number
                <a
                  v-show="isSortDsc"
                  href="javascript:void(0)"
                  @click="sortAsc('form.number')"
                >
                  <i class="fa fa-caret-up" />
                </a>
                <a
                  v-show="isSortAsc"
                  href="javascript:void(0)"
                  @click="sortDsc('-form.number')"
                >
                  <i class="fa fa-caret-down" />
                </a>
              </th>
              <th>
                Customer
                <a
                  v-show="isSortDsc"
                  href="javascript:void(0)"
                  @click="sortAsc('customer.name')"
                >
                  <i class="fa fa-caret-up" />
                </a>
                <a
                  v-show="isSortAsc"
                  href="javascript:void(0)"
                  @click="sortDsc('-customer.name')"
                >
                  <i class="fa fa-caret-down" />
                </a>
              </th>
              <th>
                Address
                <a
                  v-show="isSortDsc"
                  href="javascript:void(0)"
                  @click="sortAsc('customer.address')"
                >
                  <i class="fa fa-caret-up" />
                </a>
                <a
                  v-show="isSortAsc"
                  href="javascript:void(0)"
                  @click="sortDsc('-customer.address')"
                >
                  <i class="fa fa-caret-down" />
                </a>
              </th>
              <th>
                Item
                <a
                  v-show="isSortDsc"
                  href="javascript:void(0)"
                  @click="sortAsc('item.name')"
                >
                  <i class="fa fa-caret-up" />
                </a>
                <a
                  v-show="isSortAsc"
                  href="javascript:void(0)"
                  @click="sortDsc('-item.name')"
                >
                  <i class="fa fa-caret-down" />
                </a>
              </th>
              <th>
                Production Item
                <a
                  v-show="isSortDsc"
                  href="javascript:void(0)"
                  @click="sortAsc('transfer_sent_customer_item.production_number')"
                >
                  <i class="fa fa-caret-up" />
                </a>
                <a
                  v-show="isSortAsc"
                  href="javascript:void(0)"
                  @click="sortDsc('-transfer_sent_customer_item.production_number')"
                >
                  <i class="fa fa-caret-down" />
                </a>
              </th>
              <th>
                Expiry Date
                <a
                  v-show="isSortDsc"
                  href="javascript:void(0)"
                  @click="sortAsc('transfer_sent_customer_item.expiry_date')"
                >
                  <i class="fa fa-caret-up" />
                </a>
                <a
                  v-show="isSortAsc"
                  href="javascript:void(0)"
                  @click="sortDsc('-transfer_sent_customer_item.expiry_date')"
                >
                  <i class="fa fa-caret-down" />
                </a>
              </th>
              <th class="text-center">
                Quantity Send
                <a
                  v-show="isSortDsc"
                  href="javascript:void(0)"
                  @click="sortAsc('transfer_sent_customer_item.quantity')"
                >
                  <i class="fa fa-caret-up" />
                </a>
                <a
                  v-show="isSortAsc"
                  href="javascript:void(0)"
                  @click="sortDsc('-transfer_sent_customer_item.quantity')"
                >
                  <i class="fa fa-caret-down" />
                </a>
              </th>
              <th class="text-center">
                History
              </th>
            </tr>
            <template v-for="(inventoryTransferItemCustomer, index) in inventoryTransferItemCustomers">
              <tr
                v-for="(inventoryTransferItemCustomerItem, index2) in inventoryTransferItemCustomer.items"
                :key="'pr-' + index + '-i-' + index2"
                slot="p-body"
              >
                <td>{{ inventoryTransferItemCustomer.form.date | dateFormat('DD MMMM YYYY') }}</td>
                <th>
                  <router-link :to="{ name: 'inventory.transfer.send.customer.show', params: { id: inventoryTransferItemCustomer.id }}">
                    {{ inventoryTransferItemCustomer.form.number }}
                  </router-link>
                </th>
                <td>{{ inventoryTransferItemCustomer.customer.name }}</td>
                <td>{{ inventoryTransferItemCustomer.customer.address }}</td>
                <td>{{ inventoryTransferItemCustomerItem.item.name }}</td>
                <td>
                  <template v-if="inventoryTransferItemCustomerItem.item.require_production_number">
                    {{ inventoryTransferItemCustomerItem.production_number }}
                  </template>
                </td>
                <td>
                  <template v-if="inventoryTransferItemCustomerItem.item.require_expiry_date">
                    {{ inventoryTransferItemCustomerItem.expiry_date| dateFormat('DD MMMM YYYY') }}
                  </template>
                </td>
                <td class="text-center">
                  {{ inventoryTransferItemCustomerItem.quantity | numberFormat }} {{ inventoryTransferItemCustomerItem.unit }}
                </td>
                <td class="text-center">
                  <router-link
                    class="btn btn-sm btn-light"
                    :to="{ name: 'inventory.transfer.send.customer.histories', params: { id: inventoryTransferItemCustomer.id }}"
                  >
                    <i class="fa fa-history" />
                  </router-link>
                </td>
              </tr>
            </template>
          </point-table>
        </p-block-inner>
        <p-pagination
          :current-page="currentPage"
          :last-page="lastPage"
          @updatePage="updatePage"
        />
      </p-block>
    </div>
    <m-form-approval-status
      ref="formApprovalStatus"
      @choosen="chooseFormApprovalStatus($event)"
    />
    <m-form-status
      ref="formStatus"
      @choosen="chooseFormStatus($event)"
    />
  </div>
</template>

<script>
import Breadcrumb from '@/views/Breadcrumb'
import BreadcrumbInventory from '@/views/inventory/Breadcrumb'
import BreadcrumbInventoryTransfer from '@/views/inventory/transfer/Breadcrumb'
import debounce from 'lodash/debounce'
import PointTable from 'point-table-vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Breadcrumb,
    BreadcrumbInventory,
    BreadcrumbInventoryTransfer,
    PointTable
  },
  data () {
    return {
      isLoading: true,
      searchText: this.$route.query.search,
      currentPage: this.$route.query.page * 1 || 1,
      lastPage: 1,
      limit: 10,
      isAdvanceFilter: false,
      checkedRow: [],
      isSortAsc: false,
      isSortDsc: true,
      sortAction: '-form.number',
      formStatus: {
        id: null,
        label: null,
        value: 'notArchived'
      },
      formApprovalStatus: {
        id: null,
        label: null,
        value: null
      },
      date: {
        start: this.$route.query.date_from ? this.$moment(this.$route.query.date_from).format('YYYY-MM-DD 00:00:00') : this.$moment().format('YYYY-MM-01 00:00:00'),
        end: this.$route.query.date_to ? this.$moment(this.$route.query.date_to).format('YYYY-MM-DD 23:59:59') : this.$moment().format('YYYY-MM-DD 23:59:59')
      }
    }
  },
  computed: {
    ...mapGetters('inventoryTransferItemCustomer', ['inventoryTransferItemCustomers', 'pagination'])
  },
  watch: {
    date: {
      handler: function () {
        this.$router.push({
          query: {
            ...this.$route.query,
            date_from: this.date.start,
            date_to: this.date.end
          }
        })
        this.getinventoryTransferItemCustomer()
      },
      deep: true
    }
  },
  created () {
    this.$router.push({
      query: {
        ...this.$route.query,
        date_from: this.date.start,
        date_to: this.date.end
      }
    })
    this.getinventoryTransferItemCustomer()
  },
  updated () {
    this.lastPage = this.pagination.last_page
  },
  methods: {
    ...mapActions('inventoryTransferItemCustomer', ['get', 'export']),
    toggleCheckRow (id) {
      if (!this.isRowChecked(id)) {
        this.checkedRow.push({ id })
      } else {
        this.checkedRow.splice(this.checkedRow.map((o) => o.id).indexOf(id), 1)
      }
    },
    toggleCheckRows () {
      if (!this.isRowsChecked(this.inventoryTransferItemCustomers, this.checkedRow)) {
        this.inventoryTransferItemCustomers.forEach(element => {
          if (!this.isRowChecked(element.id)) {
            const id = element.id
            this.checkedRow.push({ id })
          }
        })
      } else {
        this.inventoryTransferItemCustomers.forEach(element => {
          this.checkedRow.splice(this.checkedRow.map((o) => o.id).indexOf(element.id), 1)
        })
      }
    },
    isRowChecked (id) {
      return this.checkedRow.some(element => {
        return element.id == id
      })
    },
    isRowsChecked (haystack, needles) {
      if (needles.length == 0) {
        return false
      }
      for (let i = 0; i < haystack.length; i++) {
        const found = needles.some(element => {
          return element.id == haystack[i].id
        })
        if (!found) {
          return false
        }
      }
      return true
    },
    bulkApprove () {
      this.bulkApprove({
        inventoryTransferItemCustomers: this.checkedRow
      }).then(response => {
        this.checkedRow = []
        this.getinventoryTransferItemCustomer()
      })
    },
    chooseFormStatus (option) {
      this.formStatus.label = option.label
      this.formStatus.value = option.value
      this.currentPage = ''
      this.getinventoryTransferItemCustomer()
    },
    chooseFormApprovalStatus (option) {
      this.formApprovalStatus.label = option.label
      this.formApprovalStatus.value = option.value
      this.currentPage = ''
      this.getinventoryTransferItemCustomer()
    },
    filterSearch: debounce(function (value) {
      this.$router.push({
        query: {
          ...this.$route.query,
          search: value
        }
      })
      this.searchText = value
      this.currentPage = 1
      this.getinventoryTransferItemCustomer()
    }, 300),
    getinventoryTransferItemCustomer () {
      this.isLoading = true
      this.get({
        params: {
          join: 'form,items,item,customer',
          fields: 'transfer_sent_customer.*',
          sort_by: this.sortAction,
          group_by: 'form.id',
          filter_form: this.formStatus.value + ';' + this.formApprovalStatus.value,
          filter_like: {
            'form.date': this.searchText,
            'form.number': this.searchText,
            'customer.name': this.searchText,
            'customer.address': this.searchText,
            'item.name': this.searchText,
            'transfer_sent_customer_item.production_number': this.searchText,
            'transfer_sent_customer_item.expiry_date': this.searchText,
            'transfer_sent_customer_item.quantity': this.searchText
          },
          filter_date_min: {
            'form.date': this.serverDateTime(this.date.start, 'start')
          },
          filter_date_max: {
            'form.date': this.serverDateTime(this.date.end, 'end')
          },
          limit: 10,
          includes: 'form;items.item;customer;',
          page: this.currentPage
        }
      }).catch(error => {
        this.$notification.error(error.message)
      }).finally(() => {
        this.isLoading = false
      })
    },
    updatePage (value) {
      this.currentPage = value
      this.getinventoryTransferItemCustomer()
    },
    exportData (value) {
      const ids = value.map((o) => o.id)
      this.export({
        data: {
          ids: ids,
          date_start: this.date.start,
          date_end: this.date.end,
          tenant_name: localStorage.getItem('tenantName')
        }
      }).then((response) => {
        // this.isExporting.splice(this.isExporting.indexOf(value), 1)
        // this.downloadLink = response.data.url
        window.open(response.data.url, '_blank')
      }, (error) => {
        // this.isExporting.splice(this.isExporting.indexOf(value), 1)
        console.log(error)
      })
    },
    sortAsc (action) {
      this.sortAction = action
      this.isSortAsc = true
      this.isSortDsc = false
      this.getinventoryTransferItemCustomer()
    },
    sortDsc (action) {
      this.sortAction = action
      this.isSortAsc = false
      this.isSortDsc = true
      this.getinventoryTransferItemCustomer()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
