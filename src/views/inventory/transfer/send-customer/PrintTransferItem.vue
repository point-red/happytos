<template>
  <sweet-modal
    ref="print-transfer-item"
    :title="$t('print transfer item') | uppercase"
    overlay-theme="dark"
    @close="onClose()"
  >
    <table
      id="print-sales-invoice"
      class="print-sales-invoice-container m-2 mb-4 mx-auto"
    >
      <thead>
        <tr>
          <td>
            <div
              class="d-flex justify-content-between"
              style="margin-bottom: 10px;"
            >
              <div style="width: 110px; height: 110px; align-self: center;">
                <img
                  :src="logoUrl"
                  alt="Logo"
                  style="width: 100px; height: 100px;"
                >
              </div>
              <div class="company-detail">
                <h1 style="margin-top: 0; margin-bottom: 5px;">
                  Transfer Item Send
                </h1>
                <h3
                  class="my-5px"
                  style="line-height: 22px"
                >
                  {{ tenantName }}
                </h3>
                <p
                  class="my-5px"
                  style="line-height: 15px;"
                >
                  {{ tenantAddress }}
                </p>
                <p class="my-5px">
                  {{ tenantPhone }}
                </p>
              </div>
            </div>
            <hr class="header-divider">
            <div
              class="d-flex justify-content-between"
              style="margin-top: 10px; margin-bottom: 10px"
            >
              <table
                class="header-detail"
                style="margin-right: 20px;"
              >
                <tr>
                  <td>Form Number</td>
                  <td>:</td>
                  <td>{{ transferitem.form.number }}</td>
                </tr>
                <tr>
                  <td>Date</td>
                  <td>:</td>
                  <td>{{ transferitem.form.date | dateFormat('DD MMMM YYYY') }}</td>
                </tr>
                <tr>
                  <td>Warehouse</td>
                  <td>:</td>
                  <td>{{ transferitem.warehouse.name || '-' }}</td>
                </tr>
                <tr>
                  <td>Driver</td>
                  <td>:</td>
                  <td>{{ transferitem.expedition.name || '-' }}</td>
                </tr>
                <tr>
                  <td>Plat Nomor</td>
                  <td>:</td>
                  <td>{{ transferitem.plat || '-' }}</td>
                </tr>
                <tr>
                  <td>STNK</td>
                  <td>:</td>
                  <td>{{ transferitem.stnk || '-' }}</td>
                </tr>
              </table>
              <table
                class="header-detail"
                style="margin-left: 20px;"
              >
                <tr>
                  <td>Customer</td>
                  <td>:</td>
                  <td>{{ transferitem.customer.name || '-' }}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>:</td>
                  <td>{{ transferitem.customer.address || '-' }}</td>
                </tr>
                <tr>
                  <td>Telp</td>
                  <td>:</td>
                  <td>{{ transferitem.customer.phone || '-' }}</td>
                </tr>
                <tr>
                  <td>ISO</td>
                  <td>:</td>
                  <td>SKA-FR-WH-06/Rev-01</td>
                </tr>
                <tr>
                  <td>Tanggal Efektif</td>
                  <td>:</td>
                  <td>12 Juni 2021</td>
                </tr>
                <tr>
                  .
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <table
              class="table-items"
              style="width: 100%;"
            >
              <thead>
                <tr>
                  <th class="text-center">
                    No
                  </th>
                  <th class="text-center">
                    Item
                  </th>
                  <th class="text-center">
                    Quantity Send
                  </th>
                </tr>
              </thead>
              <tr
                v-for="(row, index) in transferitem.items"
                :key="index"
              >
                <td class="text-center">
                  {{ index+1 }}
                </td>
                <td>
                  {{ row.item.label }}
                  <template v-if="row.production_number">
                    (PID: {{ row.production_number }})
                  </template>
                  <template v-if="row.item.require_expiry_date">
                    (E/D: {{ row.expiry_date | dateFormat('DD MMMM YYYY') }})
                  </template>
                </td>
                <td class="text-center">
                  {{ row.quantity | numberFormat }} {{ row.unit }}
                </td>
              </tr>
            </table>
            <div
              class="d-flex justify-content-end"
              style="margin-top: 75px;"
            >
              <table class="table table-sm table-bordered text-left mr-30">
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
              <div
                class="text-center"
                style="margin-right: 75px;"
              >
                <h3>Driver</h3>
                <br><br><br><br>
                {{ transferitem.expedition.name }}
              </div>
              <div
                class="text-center"
                style="margin-right: 75px;"
              >
                <h3>Created By</h3>
                <br><br><br>
                {{ transferitem.form.created_by.full_name }}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pull-right">
      <button
        v-print="'print-sales-invoice'"
        type="button"
        class="btn btn-sm btn-outline-secondary mt-3"
        @click="createHistoryPrint"
      >
        {{ $t('print') | uppercase }}
      </button>
    </div>
  </sweet-modal>
</template>

<script>
import axiosNode from '@/axiosNode'
import print from 'vue-print-nb'
import { mapActions } from 'vuex'
export default {
  directives: {
    print
  },
  props: {
    transferitem: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      onLoad: true,
      logoUrl: '',
      notes: ''
    }
  },
  computed: {
    tenantName () {
      return localStorage.getItem('tenantName')
    },
    tenantAddress () {
      let tenantAddress = localStorage.getItem('tenantAddress')
      if (!tenantAddress || tenantAddress === 'null') {
        tenantAddress = '-'
      }

      return tenantAddress
    },
    tenantPhone () {
      let tenantPhone = localStorage.getItem('tenantPhone')
      if (!tenantPhone || tenantPhone === 'null') {
        tenantPhone = '-'
      }

      return tenantPhone
    }
  },
  async created () {
    this.onLoad = true
    await Promise.all([
      this.getSettingLogo(),
      this.getSettingEndNote()
    ])
    this.onLoad = false
  },
  methods: {
    ...mapActions('inventoryTransferItem', ['addHistories']),
    clear () {
      this.mutableId = null
      this.mutableLabel = null
      this.$emit('choosen', '')
      this.close()
    },
    open () {
      this.$refs['print-transfer-item'].open()
    },
    close () {
      this.$refs['select-' + this.id].close()
    },
    onClose () {
      this.$emit('close', true)
    },
    createHistoryPrint () {
      this.addHistories({ id: this.transferitem.id, activity: 'Printed' })
        .catch(error => {
          this.$notification.error(error.message)
          this.form.errors.record(error.errors)
        })
    },
    async getSettingLogo () {
      try {
        const { data: { data: currentLogo } } = await axiosNode.get('/setting/logo')
        this.logoUrl = currentLogo.publicUrl
      } catch (e) {
        console.log(e)
      }
    },
    async getSettingEndNote () {
      try {
        const { data: { data: endNote } } = await axiosNode.get('/setting/end-note')
        this.notes = endNote.salesInvoice
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
.print-sales-invoice-container {
  width: 90%;
  padding: 30px;
}
.d-flex {
  display: flex;
}
.d-flex-row {
  display: flex;
  flex-direction: column;
}
.btn-action {
  padding: 10px;
  text-decoration: none;
  border-radius: 5px;
  margin: 5px 10px;
  width: 75px;
  text-align: center;
  color: white;
  background-color: rgb(100, 100, 100);
}
.btn-action:hover {
  filter: brightness(75%);
}
.btn-secondary {
  background-color: rgb(100, 100, 100);
}
.text-right {
  text-align: right;
}
.table-items {
  border: solid 1px black;
  margin-top: 10px;
  margin-bottom: 10px;
}
table.table-items, .table-items th, .table-items td {
  border: 1px solid black;
  border-collapse: collapse;
}
.table-items th, .table-items td {
  padding: 5px;
}
.btn-success {
  background-color: rgb(39, 168, 39);
}
.btn-danger {
  background-color: rgb(250, 68, 68);
}
.action-container {
  margin-top: 10px;
  padding: 5px;
}
.justify-content-between {
  justify-content: space-between;
}
.my-5px {
  margin: 5px 0 5px 0;
}
.company-detail {
  min-width: 200px;
  max-width: 250px;
}
.header-divider {
  height:10px;
  border:none;
  color:gray;
  background-color:gray;
}
@media print {
  table.header-detail tr td {
    line-height: 0.5px;
  }
  #print-sales-invoice thead tr td {
    padding-top: 20px;
  }
}
</style>
