<template>
  <div>
    <breadcrumb>
      <breadcrumb-inventory />
      <breadcrumb-inventory-transfer />
      <span class="breadcrumb-item active">{{ $t('receive') | uppercase }}</span>
    </breadcrumb>

    <div class="row">
      <p-block>
        <div class="input-group block">
          <download-excel
            class="input-group-prepend"
            @click="exportData(inventoryReceiveItems)"
          >
            <span class="input-group-text">
              <i class="fa fa-download" />
            </span>
          </download-excel>
          <router-link
            v-if="$permission.has('create transfer item')"
            to="/inventory/transfer/receive/create"
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
          <div class="col-12 text-center font-size-sm">
            <a
              href="javascript:void(0)"
              @click="isAdvanceFilter = !isAdvanceFilter"
            >
              {{ $t('advance filter') | uppercase }} <i class="fa fa-caret-down" />
            </a>
          </div>
        </div>
        <!-- <div class="text-center font-size-sm">
          <a
            href="javascript:void(0)"
            @click="isAdvanceFilter = !isAdvanceFilter"
          >
            {{ $t('advance filter') | uppercase }} <i class="fa fa-caret-down" />
          </a>
        </div> -->
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
              :checked="isRowsChecked(inventoryReceiveItems, checkedRow)">
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
                Form Reference
                <a
                  v-show="isSortDsc"
                  href="javascript:void(0)"
                  @click="sortAsc('transfer_item_form.number')"
                >
                  <i class="fa fa-caret-up" />
                </a>
                <a
                  v-show="isSortAsc"
                  href="javascript:void(0)"
                  @click="sortDsc('-transfer_item_form.number')"
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
                From Warehouse
                <a
                  v-show="isSortDsc"
                  href="javascript:void(0)"
                  @click="sortAsc('from_warehouse.name')"
                >
                  <i class="fa fa-caret-up" />
                </a>
                <a
                  v-show="isSortAsc"
                  href="javascript:void(0)"
                  @click="sortDsc('-from_warehouse.name')"
                >
                  <i class="fa fa-caret-down" />
                </a>
              </th>
              <th>
                To Warehouse
                <a
                  v-show="isSortDsc"
                  href="javascript:void(0)"
                  @click="sortAsc('warehouse.name')"
                >
                  <i class="fa fa-caret-up" />
                </a>
                <a
                  v-show="isSortAsc"
                  href="javascript:void(0)"
                  @click="sortDsc('-warehouse.name')"
                >
                  <i class="fa fa-caret-down" />
                </a>
              </th>
              <th>
                Date Send
                <a
                  v-show="isSortDsc"
                  href="javascript:void(0)"
                  @click="sortAsc('transfer_item_form.date')"
                >
                  <i class="fa fa-caret-up" />
                </a>
                <a
                  v-show="isSortAsc"
                  href="javascript:void(0)"
                  @click="sortDsc('-transfer_item_form.date')"
                >
                  <i class="fa fa-caret-down" />
                </a>
              </th>
              <th>
                Date Receive
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
              <th class="text-center">
                Quantity Send
                <a
                  v-show="isSortDsc"
                  href="javascript:void(0)"
                  @click="sortAsc('transfer_sent_item.quantity')"
                >
                  <i class="fa fa-caret-up" />
                </a>
                <a
                  v-show="isSortAsc"
                  href="javascript:void(0)"
                  @click="sortDsc('-transfer_sent_item.quantity')"
                >
                  <i class="fa fa-caret-down" />
                </a>
              </th>
              <th class="text-center">
                Quantity Receive
                <a
                  v-show="isSortDsc"
                  href="javascript:void(0)"
                  @click="sortAsc('transfer_receive_item.quantity')"
                >
                  <i class="fa fa-caret-up" />
                </a>
                <a
                  v-show="isSortAsc"
                  href="javascript:void(0)"
                  @click="sortDsc('-transfer_receive_item.quantity')"
                >
                  <i class="fa fa-caret-down" />
                </a>
              </th>
              <th>History</th>
            </tr>
            <template v-for="(inventoryReceiveItem, index) in inventoryReceiveItems">
              <tr
                v-for="(inventoryReceiveItemItem, index2) in inventoryReceiveItem.items"
                :key="'pr-' + index + '-i-' + index2"
                slot="p-body"
              >
                <th>
                  <router-link :to="{ name: 'inventory.transfer.send.show', params: { id: inventoryReceiveItem.transfer_item_id }}">
                    {{ inventoryReceiveItem.transfer_item.form.number }}
                  </router-link>
                </th>
                <th>
                  <router-link :to="{ name: 'inventory.transfer.receive.show', params: { id: inventoryReceiveItem.id }}">
                    {{ inventoryReceiveItem.form.number }}
                  </router-link>
                </th>
                <td>{{ inventoryReceiveItem.from_warehouse.name }}</td>
                <td>{{ inventoryReceiveItem.warehouse.name }}</td>
                <td>{{ inventoryReceiveItem.transfer_item.form.date | dateFormat('DD MMMM YYYY HH:mm') }}</td>
                <td>{{ inventoryReceiveItem.form.date | dateFormat('DD MMMM YYYY HH:mm') }}</td>
                <td>{{ inventoryReceiveItemItem.item.name }}</td>
                <td class="text-right">
                  <template v-for="(inventoryTransferItemItem) in inventoryReceiveItem.transfer_item.items">
                    <template v-if="inventoryTransferItemItem.item_id == inventoryReceiveItemItem.item_id && inventoryTransferItemItem.production_number == inventoryReceiveItemItem.production_number && inventoryTransferItemItem.expiry_date == inventoryReceiveItemItem.expiry_date">
                      {{ inventoryTransferItemItem.quantity | numberFormat }} {{ inventoryTransferItemItem.unit }}
                    </template>
                  </template>
                </td>
                <td class="text-right">
                  {{ inventoryReceiveItemItem.quantity | numberFormat }} {{ inventoryReceiveItemItem.unit }}
                </td>
                <td class="text-center">
                  <router-link
                    class="btn btn-sm btn-light"
                    :to="{ name: 'inventory.transfer.receive.histories', params: { id: inventoryReceiveItem.id }}"
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
    ...mapGetters('inventoryReceiveItem', ['inventoryReceiveItems', 'pagination'])
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
        this.getinventoryReceiveItem()
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
    this.getinventoryReceiveItem()
  },
  updated () {
    this.lastPage = this.pagination.last_page
  },
  methods: {
    ...mapActions('inventoryReceiveItem', ['get', 'export']),
    toggleCheckRow (id) {
      if (!this.isRowChecked(id)) {
        this.checkedRow.push({ id })
      } else {
        this.checkedRow.splice(this.checkedRow.map((o) => o.id).indexOf(id), 1)
      }
    },
    toggleCheckRows () {
      if (!this.isRowsChecked(this.inventoryReceiveItems, this.checkedRow)) {
        this.inventoryReceiveItems.forEach(element => {
          if (!this.isRowChecked(element.id)) {
            const id = element.id
            this.checkedRow.push({ id })
          }
        })
      } else {
        this.inventoryReceiveItems.forEach(element => {
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
        inventoryReceiveItems: this.checkedRow
      }).then(response => {
        this.checkedRow = []
        this.getinventoryReceiveItem()
      })
    },
    chooseFormStatus (option) {
      this.formStatus.label = option.label
      this.formStatus.value = option.value
      this.getinventoryReceiveItem()
    },
    chooseFormApprovalStatus (option) {
      this.formApprovalStatus.label = option.label
      this.formApprovalStatus.value = option.value
      this.getinventoryReceiveItem()
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
      this.getinventoryReceiveItem()
    }, 300),
    getinventoryReceiveItem () {
      this.isLoading = true
      console.log(this.searchText)
      this.get({
        params: {
          join: 'form,items,item,warehouse,transfer_item',
          fields: 'transfer_receive.*',
          sort_by: this.sortAction,
          group_by: 'form.id',
          filter_form: this.formStatus.value + ';' + this.formApprovalStatus.value,
          filter_like: {
            'form.number': this.searchText,
            'form.date': this.searchText,
            'transfer_item_form.number': this.searchText,
            'transfer_item_form.date': this.searchText,
            'from_warehouse.name': this.searchText,
            'warehouse.name': this.searchText,
            'item.name': this.searchText,
            'transfer_sent_item.quantity': this.searchText,
            'transfer_receive_item.quantity': this.searchText
          },
          filter_date_min: {
            'form.date': this.serverDateTime(this.date.start, 'start')
          },
          filter_date_max: {
            'form.date': this.serverDateTime(this.date.end, 'end')
          },
          limit: 10,
          includes: 'form;items.item;from_warehouse;warehouse;transfer_item.form;transfer_item.items;',
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
      this.getinventoryReceiveItem()
    },
    exportData (value) {
      console.log('export')
      console.log(value)
      const ids = value.map((o) => o.id)
      console.log(ids)
      // this.isExporting.push(value)
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
      this.getinventoryReceiveItem()
    },
    sortDsc (action) {
      this.sortAction = action
      this.isSortAsc = false
      this.isSortDsc = true
      this.getinventoryReceiveItem()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
