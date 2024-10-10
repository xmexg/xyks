import { isOnline, getAppVersion, greaterThanOrEqualTo } from '@/utils/Utils'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import Config from '@/config'
import { throttle } from 'lodash-es'
import { runUniqueApi } from '@solar/webview'
import { isYuanKouSuan, NetworkUtil } from '@solar/common-utils'

const showToast = throttle((msg) => {
  window.VUE_APP && window.VUE_APP.showToast && window.VUE_APP.showToast(msg)
}, 1000, { trailing: false })

export const signUrlIfNeeded = (url: string) => {
  return new Promise<string>(resolve => {
    if (isYuanKouSuan() && greaterThanOrEqualTo('3.42.0') && (url.indexOf('{device}') !== -1 || url.indexOf('{client}') !== -1)) {
      runUniqueApi('requestConfig', {
        path: url,
        trigger: (err: any, res: any) => {
          if (err && err !== 0) {
            resolve(url)
          } else {
            resolve(res.wrappedUrl)
          }
        }
      }, 'LeoSecure')
    } else {
      if (url.indexOf('{device}') !== -1 || url.indexOf('{client}') !== -1) {
        const resultUrl = url.replace('{device}', 'api').replace('{client}', 'api')
        resolve(resultUrl)
      } else {
        resolve(url)
      }
    }
  })
}

const initAxiosInstanceRequest = (instance: AxiosInstance) => {
  instance.interceptors.request.use(async (config: AxiosRequestConfig) => {
    if (!isOnline()) {
      showToast('天了噜，你的网络罢工了。')
    }
    const wrappedUrl = await signUrlIfNeeded(config.url || '')
    if (wrappedUrl.indexOf('_productId') === -1) {
      const params = {
        _productId: Config.productId,
        _appId: Config.appId,
        version: getAppVersion()
      }
      config.params = { ...config.params, ...params }
    }
    config.url = wrappedUrl
    return config
  }, (error: any) => {
    return Promise.reject(error)
  })
}

const initAxiosInstanceResponse = (instance: AxiosInstance) => {
  instance.interceptors.response.use((res: AxiosResponse) => {
    return res
  }, async (err: AxiosError) => {
    if (err.response && err.response.status >= 500) {
      showToast('小猿出故障惹，正在修复，等会儿嗷')
    }
    const networkFailed4xxManage = await NetworkUtil.networkManageFor4xx(instance, err)
    if (networkFailed4xxManage) {
      return networkFailed4xxManage
    }
    if (err.response && err.response.status === 418) {
      showToast(err.response.data.message || '服务器升级中，请稍后使用')
    }
    throw err
  })
}

const getSolarHost = () => {
  return Config.LEO_HOST
}

const instance = axios.create({
  withCredentials: true,
  baseURL: `${getSolarHost()}/`
})

initAxiosInstanceRequest(instance)
initAxiosInstanceResponse(instance)

export default instance
