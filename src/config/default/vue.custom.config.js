/*
 * @Description: 
 * @Author: ZY
 * @Date: 2020-12-09 11:15:59
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-25 17:41:57
 */
const vueDefaultConfig = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: true,
    transpileDependencies: ['vue-echarts', 'resize-detector'],
    //webpack 配置的项目名称
    title: '后台管理',
    titleSeparator: ' - ',
    titleReverse: false,
    devPort: '9999',
    abbreviation: 'vt2at',
    providePlugin: {},
    build7z: false,
    startMessage:'后台管理～'
}

module.exports = vueDefaultConfig
  