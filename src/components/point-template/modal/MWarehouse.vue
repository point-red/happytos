<template>
  <div>
    <sweet-modal
      :ref="'select-' + id"
      :title="$t('select warehouse') | uppercase"
      overlay-theme="dark"
      @close="onClose()"
    >
      <input
        v-model="searchText"
        type="text"
        class="form-control"
        placeholder="Search..."
        @keydown.enter.prevent=""
      >
      <hr>
      <div v-if="isLoading">
        <h3 class="text-center">
          Loading ...
        </h3>
      </div>
      <div
        v-else
        class="list-group push"
      >
        <template v-for="(option, warehouseIndex) in options">
          <a
            :key="warehouseIndex"
            class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            :class="{'active': option.id == mutableId }"
            href="javascript:void(0)"
            @click="choose(option)"
          >
            {{ option.label | uppercase }}
          </a>
        </template>
      </div>
      <div
        v-if="searchText && options.length == 0 && !isLoading"
        class="alert alert-info text-center"
      >
        {{ $t('searching not found', [searchText]) | capitalize }} <br>
        {{ $t('click') }} <span
          class="link"
          @click="add"
        ><i
          class="fa fa-xs"
          :class="{
            'fa-refresh fa-spin': isSaving,
            'fa-plus': !isSaving
          }"
        /> Add</span> {{ $t('to add new data') }}
      </div>
      <div
        v-if="!searchText && options.length == 0 && !isLoading"
        class="alert alert-info text-center"
      >
        {{ $t('you don\'t have any') | capitalize }} {{ $t('warehouse') | capitalize }}, <br> {{ $t('you can create') }}
        <router-link :to="'/master/warehouse/create'">
          <span>{{ $t('new one') }}</span>
        </router-link>
      </div>
    </sweet-modal>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      default: null
    },
    label: {
      type: String,
      default: null
    },
    exclude: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      index: null,
      searchText: '',
      options: [],
      mutableId: this.value,
      mutableLabel: this.label,
      isSaving: false,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters('masterWarehouse', ['warehouses', 'pagination'])
  },
  watch: {
    searchText: debounce(function () {
      this.search()
    }, 300),
    label () {
      this.mutableLabel = this.label
    }
  },
  created () {
    this.search()
  },
  beforeDestroy () {
    this.close()
  },
  methods: {
    ...mapActions('masterWarehouse', ['get', 'create']),
    search () {
      this.isLoading = true
      this.get({
        params: {
          sort_by: 'name',
          limit: 50,
          filter_like: {
            name: this.searchText
          }
        }
      }).then(response => {
        this.options = []
        this.mutableLabel = ''
        response.data.map((key, value) => {
          if (key.name != 'DISTRIBUTION WAREHOUSE') {
            if (this.exclude.includes(key.id) == false) {
              this.options.push({
                id: key.id,
                name: key.name,
                label: key.name
              })
            }
          }

          if (this.value == key.id) {
            this.mutableLabel = key.name
          }
        })
        this.isLoading = false
      }).catch(error => {
        this.isLoading = false
      })
    },
    add () {
      this.isSaving = true
      this.create({
        code: this.searchText,
        name: this.searchText
      }).then(response => {
        this.search()
        this.isSaving = false
      }).catch(error => {
        this.$notification.error(error.message)
        this.isSaving = false
      })
    },
    choose (option) {
      this.mutableId = option.id
      this.mutableLabel = option.label
      option.index = this.index
      this.$emit('input', option.id)
      this.$emit('choosen', option)
      this.close()
    },
    open (index = null) {
      this.search()
      this.index = index
      this.$refs['select-' + this.id].open()
    },
    close () {
      this.$refs['select-' + this.id].close()
    },
    onClose () {
      this.$emit('close', true)
    }
  }
}
</script>

<style scoped>
input:readonly {
  background-color: white
}
input {
  min-width: 200px;
}
.link {
  border-bottom: dotted 1px #2196f3;
  color: #2196f3;
  cursor: pointer;
}
</style>
