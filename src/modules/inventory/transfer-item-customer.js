import api from '@/api'

const url = '/inventory/transfer-item-customers'

const state = {
  inventoryTransferItemCustomer: {
    date: null,
    form: {
      number: null,
      notes: null,
      created_by: {
        name: null
      },
      request_approval_to: {
        full_name: null
      }
    },
    items: []
  },
  inventoryTransferItemCustomers: [],
  historyTransferItemCustomers: [],
  pagination: {}
}

const getters = {
  inventoryTransferItemCustomer: state => {
    return state.inventoryTransferItemCustomer
  },
  inventoryTransferItemCustomers: state => {
    return state.inventoryTransferItemCustomers
  },
  historyTransferItemCustomers: state => {
    return state.historyTransferItemCustomers
  },
  pagination: state => {
    return state.pagination
  }
}

const mutations = {
  'FETCH_ARRAY' (state, payload) {
    state.inventoryTransferItemCustomers = payload.data
    state.historyTransferItemCustomers = payload.data
    state.pagination = payload.meta
  },
  'FETCH_OBJECT' (state, payload) {
    payload.data.items.forEach(element => {
      element.more = false
    })
    state.inventoryTransferItemCustomer = payload.data
  },
  'CREATE' (state, payload) {
    state.inventoryTransferItemCustomer = payload
  },
  'UPDATE' (state, payload) {
    state.inventoryTransferItemCustomer = payload
  },
  'DELETE' (state, payload) {
    state.inventoryTransferItemCustomer = {}
  }
}

const actions = {
  get ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.get(url, payload)
        .then(response => {
          commit('FETCH_ARRAY', response)
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
  find ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.get(url + '/' + payload.id, payload)
        .then(response => {
          commit('FETCH_OBJECT', response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  },
  create (context, payload) {
    return new Promise((resolve, reject) => {
      api.post(url, payload)
        .then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  },
  update (context, payload) {
    return new Promise((resolve, reject) => {
      api.patch(url + '/' + payload.id, payload)
        .then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  },
  delete (context, payload) {
    return new Promise((resolve, reject) => {
      api.delete(url + '/' + payload.id, payload)
        .then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  },
  approve (context, payload) {
    return new Promise((resolve, reject) => {
      api.post(url + '/' + payload.id + '/approve', payload)
        .then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  },
  reject (context, payload) {
    return new Promise((resolve, reject) => {
      api.post(url + '/' + payload.id + '/reject', payload)
        .then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  },
  close (context, payload) {
    return new Promise((resolve, reject) => {
      api.post(url + '/' + payload.id + '/close', payload)
        .then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  },
  approveByEmail (context, payload) {
    return new Promise((resolve, reject) => {
      api.post(url + '/approve', payload)
        .then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  },
  rejectByEmail (context, payload) {
    return new Promise((resolve, reject) => {
      api.post(url + '/reject', payload)
        .then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  },
  cancellationApprove (context, payload) {
    return new Promise((resolve, reject) => {
      api.post(url + '/' + payload.id + '/cancellation-approve', payload)
        .then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  },
  cancellationReject (context, payload) {
    return new Promise((resolve, reject) => {
      api.post(url + '/' + payload.id + '/cancellation-reject', payload)
        .then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  },
  closeApprove (context, payload) {
    return new Promise((resolve, reject) => {
      api.post(url + '/' + payload.id + '/close-approve', payload)
        .then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  },
  addHistories (context, payload) {
    return new Promise((resolve, reject) => {
      api.post(url + '/histories', payload)
        .then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  },
  getHistories ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.get(url + '/' + payload.id + '/histories', payload)
        .then(response => {
          commit('FETCH_ARRAY', response)
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
  export ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.post(url + '/export', payload)
        .then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
