export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  }
  return date.toLocaleDateString('zh-CN', options)
}
