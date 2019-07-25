<template>
  <div class="home">
    <menu-list/>
    <el-container>
      <el-header>
        <div>welcome </div>
        <div class="header-top">
          <el-dropdown @command="change">
            <div>切换语言<i class="el-icon-menu"></i></div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="zh">zh</el-dropdown-item>
              <el-dropdown-item command="en">English</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="avter"><img src="@/assets/user/avter.gif" alt=""></div>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import menuList from './menu'
export default {
  components: {
    menuList
  },
  methods: {
    change(lang) {
      this.$i18n.locale = lang
      Cookies.set('language', lang)
    }
  }
}
</script>

<style scoped lang='scss'>
.home {
  width: 100%;
  height: 100%;
  display: flex;
}
.el-header {
  height: 80px!important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 70px;
    height: 70px;
  }
  .header-top {
    display: flex;
    align-content: center;
    .el-dropdown {
      background: #f5f5f5;
      line-height: 70px;
    }
  }
}
.el-main {
  width: 100%;
  background: #f5f5f5;
}
</style>
