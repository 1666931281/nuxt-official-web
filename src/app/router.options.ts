import type { RouterConfig } from 'nuxt/schema';

// 导出路由配置项
const customRouterConfig: RouterConfig = {
  routes: (_routes) => {
    // 如果是移动端访问，则给移动端页面删除路由前缀 /mobile ，给PC端页面添加路由前缀 /pc
    // 如果是 PC 端访问，则给 PC 端页面删除路由前缀 /pc ，给移动端页面添加路由前缀 /mobile

    // 当前设备的类型
    const targetType = useDeviceType().value;
    // 不是当前设备类型的另一个类型
    const notTargetType = targetType === 'mobile' ? 'pc' : 'mobile';
    console.log(notTargetType);

    // 找到匹配当前设备的所有页面路由
    let targetRoutes = _routes.filter((item) =>
      (item.name as string).startsWith(targetType),
    );
    targetRoutes = targetRoutes.map((item) => {
      // 将路由前缀删除
      item.path =
        item.path.replace(`/${targetType}`, '') === ''
          ? '/'
          : item.path.replace(`/${targetType}`, '');
      console.log(item.path);
      //重定向/到对应的页面
      if (item.path === '/' && item.name === 'pc') {
        item.redirect = '/PCHome';
      }
      if (item.path === '/' && item.name === 'mobile') {
        item.redirect = '/MHome';
      }
      // 如果 PC 端、移动端 分别使用的是两套 layout，可以使用下面这段代码去指定布局
      // if (!item.meta?.layout) {
      //   item.meta = {
      //     ...item.meta,
      //     layout: `/${targetType}` === '/mobile' ? '移动端布局名' : 'PC 端布局名',
      //   }
      // }
      return item;
    });
    //匹配所有路由

    // 找到不匹配当前设备的所有页面路由
    let notTargetRoutes = _routes.filter((item) =>
      (item.name as string).startsWith(notTargetType),
    );
    notTargetRoutes = notTargetRoutes.map((item) => {
      // 将路由前缀添加上
      if (!item.path.startsWith(`/${notTargetType}`))
        item.path = `/${notTargetType}${item.path}`;
      return item;
    });
    const costomRoutes = [...targetRoutes, ...notTargetRoutes];
    //  这里将根路由添加进去，解决"/"路由404问题
    // const rootRoute = `@/pages/${targetType}/index.vue`;
    // const rootRoute = '@/pages/index.vue';

    // costomRoutes.push({
    //   path: '/:path(.*)*',
    //   name: '404',
    //   component: () => import('@/pages/pc/404.vue'),
    // });
    console.log(costomRoutes);

    return costomRoutes;
  },
};

export default customRouterConfig;
