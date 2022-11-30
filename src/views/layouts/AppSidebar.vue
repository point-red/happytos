<template>
  <nav id="sidebar">
    <!-- Sidebar Scroll Container -->
    <div
      id="sidebar-scroll"
      :v-scroll-lock="true"
    >
      <!-- Sidebar Content -->
      <div class="sidebar-content">
        <!-- Side Header -->
        <div class="content-header content-header-fullrow px-15">
          <!-- Mini Mode -->
          <div class="content-header-section sidebar-mini-visible-b">
            <!-- Logo -->
            <span class="content-header-item font-w700 font-size-xl float-left animated fadeIn">
              <span class="text-dual-primary-dark">p</span><span class="text-primary">r</span>
            </span>
            <!-- END Logo -->
          </div>
          <!-- END Mini Mode -->

          <!-- Normal Mode -->
          <div class="content-header-section text-center align-parent sidebar-mini-hidden">
            <!-- Close Sidebar, Visible only on mobile screens -->
            <!-- Layout API, functionality initialized in Codebase() -> uiApiLayout() -->
            <button
              type="button"
              class="btn btn-circle btn-dual-secondary d-lg-none align-v-r"
              @click="toggleLeftSidebar"
            >
              <i class="fa fa-times text-danger" />
            </button>
            <!-- END Close Sidebar -->

            <!-- Logo -->
            <div class="content-header-item">
              <router-link
                to="/"
                exact
                active-class="active"
                class="link-effect font-w700"
              >
                <span class="font-size-xl text-dual-primary-dark">POINT.</span>
              </router-link>
            </div>
            <!-- END Logo -->
          </div>
          <!-- END Normal Mode -->
        </div>
        <!-- END Side Header -->

        <!-- Side User -->
        <div class="content-side content-side-full content-side-user px-10 align-parent">
          <!-- Visible only in mini mode -->
          <div class="sidebar-mini-visible-b align-v animated fadeIn">
            <img
              class="img-avatar img-avatar32"
              src="/assets/img/avatars/avatar0.jpg"
              alt=""
            >
          </div>
          <!-- END Visible only in mini mode -->

          <!-- Visible only in normal mode -->
          <div class="sidebar-mini-hidden-b text-center">
            <a
              :href="accountPage"
              class="img-link"
            >
              <img
                class="img-avatar"
                src="/assets/img/avatars/avatar0.jpg"
                alt=""
              >
            </a>
            <ul class="list-inline mt-3 mb-0">
              <li class="list-inline-item">
                <a
                  :href="accountPage + '/profile'"
                  class="link-effect text-dual-primary-dark font-size-xs font-w600 text-uppercase"
                >
                  {{ userName }}
                </a>
              </li>
            </ul>
          </div>
          <!-- END Visible only in normal mode -->
        </div>
        <!-- END Side User -->

        <!-- Side Navigation -->
        <div class="content-side content-side-full">
          <ul class="nav-main">
            <li @click="toggleLeftSidebar('close-xs')">
              <router-link
                to="/"
                exact
                active-class="active"
                class="sidebar-mini-hide"
              >
                <i class="si si-speedometer" /> {{ $t("dashboard") | uppercase }}
              </router-link>
            </li>
            <li @click="toggleLeftSidebar('close-xs')">
              <router-link
                to="/menu"
                exact
                active-class="active"
                class="sidebar-mini-hide"
              >
                <i class="si si-list" /> {{ $t("main menu") | uppercase }}
              </router-link>
            </li>
            <li class="nav-main-heading">
              <span class="sidebar-mini-visible">MD</span>
              <span class="sidebar-mini-hidden">Modules</span>
            </li>
            <li
              v-if="$permission.has('menu master')"
              :class="{ 'open' : firstUri === 'master' }"
            >
              <router-link
                to="/master"
                class="nav-submenu"
                active-class="active"
              >
                <i class="si si-layers" />
                <span class="sidebar-mini-hide">{{ $t("master") | uppercase }}</span>
              </router-link>
              <ul>
                <li
                  v-if="$permission.has('read user')"
                  @click="toggleLeftSidebar('close-xs')"
                >
                  <router-link
                    to="/master/user"
                    active-class="active"
                  >
                    {{ $t('user') | uppercase }}
                  </router-link>
                </li>
                <li
                  v-if="$permission.has('read customer')"
                  @click="toggleLeftSidebar('close-xs')"
                >
                  <router-link
                    to="/master/customer"
                    active-class="active"
                  >
                    {{ $t('customer') | uppercase }}
                  </router-link>
                </li>
                <li
                  v-if="$permission.has('read supplier')"
                  @click="toggleLeftSidebar('close-xs')"
                >
                  <router-link
                    to="/master/supplier"
                    active-class="active"
                  >
                    {{ $t('supplier') | uppercase }}
                  </router-link>
                </li>
                <li
                  v-if="$permission.has('read expedition')"
                  @click="toggleLeftSidebar('close-xs')"
                >
                  <router-link
                    to="/master/expedition"
                    active-class="active"
                  >
                    {{ $t('expedition') | uppercase }}
                  </router-link>
                </li>
                <li
                  v-if="$permission.has('read warehouse')"
                  @click="toggleLeftSidebar('close-xs')"
                >
                  <router-link
                    to="/master/warehouse"
                    active-class="active"
                  >
                    {{ $t('warehouse') | uppercase }}
                  </router-link>
                </li>
                <li
                  v-if="$permission.has('read allocation')"
                  @click="toggleLeftSidebar('close-xs')"
                >
                  <router-link
                    to="/master/allocation"
                    active-class="active"
                  >
                    {{ $t('allocation') | uppercase }}
                  </router-link>
                </li>
                <li
                  v-if="$permission.has('read service')"
                  @click="toggleLeftSidebar('close-xs')"
                >
                  <router-link
                    to="/master/service"
                    active-class="active"
                  >
                    {{ $t('service') | uppercase }}
                  </router-link>
                </li>
                <li
                  v-if="$permission.has('read item')"
                  @click="toggleLeftSidebar('close-xs')"
                >
                  <router-link
                    to="/master/item"
                    active-class="active"
                  >
                    {{ $t('item') | uppercase }}
                  </router-link>
                </li>
                <li
                  v-if="$permission.has('read fixed asset')"
                  @click="toggleLeftSidebar('close-xs')"
                >
                  <router-link
                    to="/master/fixed-assets"
                    active-class="active"
                  >
                    {{ $t('fixed asset') | uppercase }}
                  </router-link>
                </li>
              </ul>
            </li>
            <li
              v-if="$permission.has('menu human resource')"
              :class="{ 'open' : firstUri === 'human-resource' }"
            >
              <router-link
                to="/human-resource"
                class="nav-submenu"
                active-class="active"
              >
                <i class="si si-emoticon-smile" />
                <span class="sidebar-mini-hide">{{ $t("human resource") | uppercase }}</span>
              </router-link>
              <ul>
                <li
                  v-if="$permission.has('read employee')"
                  @click="toggleLeftSidebar('close-xs')"
                >
                  <router-link
                    to="/human-resource/employee"
                    active-class="active"
                  >
                    {{ $t('employee') | uppercase }}
                  </router-link>
                </li>
                <li
                  v-if="$plugin.has('KPI') && ($permission.has('read employee kpi') || $permission.has('create employee assessment') || $permission.has('read employee assessment'))"
                  @click="toggleLeftSidebar('close-xs')"
                >
                  <router-link
                    to="/human-resource/kpi"
                    active-class="active"
                  >
                    {{ $t('kpi') | uppercase }}
                  </router-link>
                </li>
              </ul>
            </li>
            <li
              v-if="$permission.has('menu inventory') && authUser.tenant_package_id > 1"
              :class="{ 'open' : firstUri === 'inventory' }"
            >
              <router-link
                to="/inventory"
                class="nav-submenu"
                active-class="active"
              >
                <i class="si si-tag" />
                <span class="sidebar-mini-hide">{{ $t("inventory") | uppercase }}</span>
              </router-link>
              <ul>
                <li
                  v-if="$permission.has('read inventory report')"
                  @click="toggleLeftSidebar('close-xs')"
                >
                  <router-link
                    to="/inventory/report"
                    active-class="active"
                  >
                    {{ $t('inventory report') | uppercase }}
                  </router-link>
                </li>
                <li
                  v-if="$permission.has('read stock correction')"
                  @click="toggleLeftSidebar('close-xs')"
                >
                  <router-link
                    to="/inventory/correction"
                    active-class="active"
                  >
                    {{ $t('stock correction') | uppercase }}
                  </router-link>
                </li>
                <li
                  v-if="$permission.has('read transfer item')"
                  @click="toggleLeftSidebar('close-xs')"
                >
                  <router-link
                    to="/inventory/transfer"
                    active-class="active"
                  >
                    {{ $t('transfer item') | uppercase }}
                  </router-link>
                </li>
              </ul>
            </li>
            <li
              v-if="$permission.has('menu setting')"
              :class="{ 'open' : firstUri === 'setting' }"
              @click="toggleLeftSidebar('close-xs')"
            >
              <router-link
                to="/setting"
                active-class="active"
              >
                <i class="si si-settings" />
                <span class="sidebar-mini-hide">{{ $t("setting") | uppercase }}</span>
              </router-link>
            </li>
          </ul>
        </div>
        <!-- END Side Navigation -->
      </div>
      <!-- Sidebar Content -->
    </div>
    <!-- END Sidebar Scroll Container -->
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    firstUri: {
      type: String,
      required: true
    },
    secondUri: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      userName: localStorage.getItem('userName'),
      accountPage: '//' + process.env.VUE_APP_DOMAIN + '/account'
    }
  },
  computed: {
    ...mapGetters('auth', ['authUser'])
  },
  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions('uiHandler', ['toggleLeftSidebar', 'toggleSidebarInverse'])
  }
}
</script>

<style scoped>
#sidebar-scroll {
  overflow-y: auto;
  height: 100% !important;
}
#page-container.sidebar-inverse #sidebar .content-side-user {
  background-color: #424242;
  height: auto;
}
</style>
