<template>
  <div>
    <sweet-modal
      :ref="'form-print'"
      :title="$t('print') | uppercase"
      class="text-center"
      overlay-theme="dark"
      @close="onClose()"
    >
      <h4 class="text-center">
        Pilih jenis form yang akan anda cetak
      </h4>
      <hr>
      <div class="row">
        <div class="col-sm-6">
          <button
            type="button"
            class="btn btn-block btn-sm btn-primary mr-5"
            @click="onIso()"
          >
            {{ $t('Iso') | uppercase }}
          </button>
        </div>
        <div class="col-sm-6">
          <button
            type="button"
            class="btn btn-block btn-sm btn-danger mr-5"
            @click="onSurat()"
          >
            {{ $t('Surat Jalan') | uppercase }}
          </button>
        </div>
      </div>
    </sweet-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isSaving: false,
      isLoading: false,
      reason: ''
    }
  },
  beforeDestroy () {
    this.close()
  },
  methods: {
    open () {
      this.$refs['form-print'].open()
      this.$nextTick(() => {
        this.$refs.reason.focus()
      })
    },
    close () {
      this.$refs['form-print'].close()
      this.$emit('close', true)
    },
    onIso () {
      this.$emit('delete', 'iso')
      this.close()
    },
    onSurat () {
      this.$emit('delete', 'surat')
      this.close()
    },
    onClose () {
      this.reason = ''
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
