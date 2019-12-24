<template>
  <div>
    <breadcrumb>
      <breadcrumb-manufacture/>
      <router-link
        to="/manufacture/machine"
        class="breadcrumb-item">{{ $t('machine') | titlecase }}</router-link>
      <span class="breadcrumb-item active">{{ machine.name | titlecase }}</span>
    </breadcrumb>

    <manufacture-menu/>

    <div class="row">
      <p-block>
        <p-block-inner :is-loading="isLoading">
          <p-form-row
            id="code"
            :label="$t('code')"
            name="code"
            v-model="machine.code"
            readonly/>

          <p-form-row
            id="name"
            :label="$t('name')"
            name="name"
            v-model="machine.name"
            readonly/>

          <p-form-row
            id="notes"
            :label="$t('notes')"
            name="notes"
            v-model="machine.notes"
            readonly/>

          <hr>

          <router-link
            :to="{ path: '/manufacture/machine/' + machine.id + '/edit', params: { id: machine.id }}"
            v-if="$permission.has('update manufacture machine')"
            class="btn btn-sm btn-primary mr-5">
            Edit
          </router-link>
          <button
            type="button"
            @click="onDelete()"
            v-if="$permission.has('delete manufacture machine')"
            :disabled="isDeleting"
            class="btn btn-sm btn-danger">
            <i v-show="isDeleting" class="fa fa-asterisk fa-spin"/> Delete
          </button>
        </p-block-inner>
      </p-block>
    </div>
  </div>
</template>

<script>
import ManufactureMenu from '../Menu'
import Breadcrumb from '@/views/Breadcrumb'
import BreadcrumbManufacture from '@/views/manufacture/Breadcrumb'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    ManufactureMenu,
    Breadcrumb,
    BreadcrumbManufacture
  },
  data () {
    return {
      id: this.$route.params.id,
      title: 'Machine',
      isLoading: false,
      isDeleting: false
    }
  },
  computed: {
    ...mapGetters('manufactureMachine', ['machine'])
  },
  methods: {
    ...mapActions('manufactureMachine', ['find', 'delete']),
    onDelete () {
      this.isDeleting = true
      this.delete({ id: this.id })
        .then(response => {
          this.$notification.success('delete success')
          this.$router.push('/manufacture/machine')
          this.isDeleting = false
        }).catch(error => {
          this.$notification.error(error.message)
          this.isDeleting = false
        })
    }
  },
  created () {
    this.isLoading = true
    this.find({ id: this.id })
      .then(response => {
        this.isLoading = false
      }).catch(error => {
        this.isLoading = false
        this.$notification.error(error.message)
      })
  }
}
</script>