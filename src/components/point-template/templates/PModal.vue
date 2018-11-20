<template>
  <div>
    <div :class="{ 'modal-backdrop show': backdrop }"/>
    <div
      :id="id"
      class="modal"
      tabindex="-1"
      role="dialog">      
      <div
        class="modal-dialog modal-lg modal-dialog-popout modal-dialog-centered"
        role="document">
        <div
          class="modal-content"
          :class="{'block block-mode-fullscreen': isFullscreen}">
          <div class="block block-themed block-transparent mb-0"
            :class="{'block-mode-loading': isLoading}">
            <div class="block-header bg-primary-dark">
              <h3 class="block-title">{{ title | uppercase }}</h3>
              <div class="block-options">
                <button
                  type="button"
                  class="btn-block-option"
                  @click="toggleFullscreen">
                  <i :class="{ 'si si-size-fullscreen' : !isFullscreen, 'si si-size-actual' : isFullscreen }"/>
                </button>
                <button
                  type="button"
                  class="btn-block-option"
                  @click="close">
                  <i class="si si-close"/>
                </button>
              </div>
            </div>
            <div class="block-content">
              <slot name="content"/>
            </div>
          </div>
          <div class="modal-footer">
            <slot name="footer"/>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  data () {
    return {
      isFullscreen: false,
      backdrop: false
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    show () {
      document.getElementById(this.id).style.display = 'block'
      document.getElementById(this.id).classList.add('open')
      document.body.classList.add('modal-open')
      this.backdrop = true
    },
    close () {
      document.getElementById(this.id).style.display = 'none'
      document.getElementById(this.id).classList.remove('open')
      document.body.classList.remove('modal-open')
      this.backdrop = false
    },
    toggleFullscreen () {
      this.isFullscreen = !this.isFullscreen
    }
  }
}
</script>