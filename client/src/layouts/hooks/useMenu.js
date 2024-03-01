import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const TABS_WHITE_LIST = ['/403', '/404', '/500']
import localRouter from '@/assets/js/dynamicRouter.js'
export const useMenu = () => {
  const route = useRoute();
  const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path));
  const menuList = computed(() => localRouter);

  const router = useRouter();
  const subMenu = ref([]);
  const splitActive = ref('');
  watch(
    () => [menuList, route],
    () => {
      // 当前路由存在 tabs 白名单中 || 当前菜单没有数据直接 return
      abc()
    },
    {
      deep: true,
      immediate: true,
    }
  );
  function abc() {
    if (TABS_WHITE_LIST.includes(route.path) || !menuList.value.length) return;
    const menuItem = menuList.value.filter((item) => route.path.includes(item.path));
    if (menuItem[0]) {
      splitActive.value = menuItem[0].path;
      if (menuItem[0].children?.length) return (subMenu.value = menuItem[0].children);
      subMenu.value = [];
    }
  }
  abc()
  // 切换 SubMenu
  const changeSubMenu = (item) => {
    splitActive.value = item.path;
    if (item.children?.length) {
      subMenu.value = item.children;
    } else {
      subMenu.value = [];
    }
    router.push(item.path);
  };
  const handleClickMenu = (subItem) => {
    if (subItem.meta.isLink) return window.open(subItem.meta.isLink, '_blank');
    router.push(subItem.path);
  };

  return {
    changeSubMenu,
    handleClickMenu,
    menuList,
    subMenu,
    splitActive,
    activeMenu,
  };
};
