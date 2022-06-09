import { mount } from '@vue/test-utils'
import Create from '@/views/inventory/correction/Create'
import Form from '@/utils/Form'
import FormError from '../../../../src/utils/FormError'
import Vue from 'vue'
import PointDate from '@/components/point-date'
import PointFilter from '@/components/point-filter'
import PBlock from '@/components/point-template/templates/PBlock'
import PBlockInner from '@/components/point-template/templates/PBlockInner'
import PFormCheckBox from '@/components/point-template/templates/PFormCheckBox'
import MUser from '@/components/point-template/modal/MUser'
import SweetModal from 'sweet-modal-vue/src/plugin.js'
import VueTheMask from 'vue-the-mask'
import Vuex from 'vuex'
import Router from 'vue-router'

Vue.use(PointDate)
Vue.use(PointFilter)
Vue.use(SweetModal)
Vue.use(VueTheMask)
Vue.use(Vuex)
Vue.use(Router)

describe('Create.vue', () => {
  let wrapper;
  let form = new Form()

  beforeAll(() => {
    global.localStorage = {
      state: {
        'access-token': 'superHashedString'
      },
      setItem (key, item) {
        this.state[key] = item
      },
      getItem (key) {
        return this.state[key]
      }
    }
  
    global.localStorage.setItem('fullName', '-')
  
    const $t = () => {}
    form.originalData = {
      type_correction: 'in',
      warehouse_id: 1,
      warehouse_name: 'CENTRAL',
      items: [
        {
          item_id: 1,
          item_name: 'bean',
          item_label: null,
          require_expiry_date: true,
          require_production_number: true,
          unit: 'pcs',
          converter: null,
          quantity: 10,
          allocation_id: null,
          allocation_name: null,
          notes: null,
          units: [
            {
              label: '',
              name: '',
              converter: null
            }
          ],
          stock_database: 0,
          stock_correction: 0,
          allocationId: null,
          allocationName: ''
        }
      ]
    }
    const router = new Router()
    form.errors = new FormError()
    const actions = {
      actionClick: jest.fn(),
      actionInput: jest.fn()
    }
    const store = new Vuex.Store({
      actions
    })

    wrapper = mount(Create, {
      router,
      store,
      mocks: { $t, form },
      stubs: {
        PBlock,
        PBlockInner,
        PFormCheckBox,
        PDatePicker: {
          template: '<span />'
        },
        PQuantityCustom: {
          template: '<span />'
        },
        PQuantity: {
          template: '<span />'
        },
        PFormInput: {
          template: '<span />'
        },
        MUser,
        MWarehouse: {
          template: '<span />'
        },
        MAllocation: {
          template: '<span />'
        },
        MInventoryIn: {
          render: () => {},
          methods: {
            open: () => {}
          }
        },
        MInventoryOut: {
          render: () => {},
          methods: {
            open: () => {}
          }
        }
      }
    })
  })
  
  it('should open inventory in modal when type correction is in', () => {
    const inventoryIn = jest.spyOn(wrapper.vm.$refs.inventoryin, 'open')
    wrapper.vm.onClickQuantity(row, 0)
    expect(inventoryIn).toBeCalled()
  })

  it('should open inventory in modal when type correction is out', () => {
    wrapper.vm.chooseTypeCorrection("out")
    const inventoryOut = jest.spyOn(wrapper.vm.$refs.inventory, 'open')
    wrapper.vm.onClickQuantity(row, 0)
    expect(inventoryOut).toBeCalled()
  })

  it('should show select item if qc is passed', async () => {
    await wrapper.vm.chooseWarehouse({id: 1, name: "central"})
    expect(await wrapper.find('#stock-database0').exists()).toBeTruthy()
  })

  it('should not show select item if qc is not passed', async () => {
    wrapper.vm.chooseQcPassed(0)
    await wrapper.vm.chooseWarehouse({id: 1, name: "central"})
    expect(await wrapper.find('#stock-database0').exists()).toBeFalsy()
  })
})

const row = {
  item: {
    index: 0,
    id: 1,
    name: "BARA BEEN COFFE",
    label: "[BR009] BARA BEEN COFFE",
    require_expiry_date: true,
    require_production_number: true,
    unit_default: 1,
    unit_default_purchase: 2,
    unit_default_sales: 2,
    units: [
      {},
      {}
    ],
    unit: {
      converter: 1,
      id: 1,
      label: "PCS",
      name: "PCS",
      disabled: false,
      itemId: 1,
      createdBy: 1,
      updatedBy: 1,
      createdAt: "2022-04-24T07:22:13.000Z",
      updatedAt: "2022-04-24T07:22:13.000Z",
      ItemId: 1
    }
  },
  item_id: 1,
  item_name: "BARA BEEN COFFE",
  item_label: "[BR009] BARA BEEN COFFE",
  stock_correction: 0,
  require_production_number: true,
  require_expiry_date: true,
  stock_database: 59,
  stock_correction: 0,
  units: [
    {},
    {}
  ],
  unit: "PCS",
  converter: 1
}