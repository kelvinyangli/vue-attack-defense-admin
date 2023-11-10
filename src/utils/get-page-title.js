import defaultSettings from '@/settings'

const title = defaultSettings.title || '登录注册页面'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
