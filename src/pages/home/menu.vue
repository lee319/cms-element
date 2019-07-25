<template>
  <div class="menu-list">
    <el-menu
      router
      default-active="/excl"
      class="el-menu-vertical-demo"
      background-color="#2d3a4b"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ $t('menu.main') }}</span>
        </template>
        <el-menu-item index="/excl">{{ $t('menu.excl') }}</el-menu-item>
        <el-menu-item index="/content">{{ $t('menu.info') }}</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ $t('menu.config') }}</span>
        </template>
        <el-menu-item index="/admin">{{ $t('menu.change') }}</el-menu-item>
      </el-submenu>
    </el-menu>
    main: 'main menu',
    excl: 'export excl',
    info: 'info',
    config: 'change config',
    change: 'change admin'
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.menu-list {
  width: 200px;
  height: 100%;
  overflow: hidden;
}
.menu-list /deep/ .el-submenu__title {
  width: 200px;
}
.el-menu-vertical-demo {
  height: 100%;
}
</style>
