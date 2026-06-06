export function getChartTheme(isDark: boolean) {
  const textColor = isDark ? '#dee2e6' : '#666666'
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
  const fontFamily = 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'

  const font = { family: fontFamily, size: 12 }

  const tooltip = {
    backgroundColor: isDark ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.95)',
    titleColor: textColor,
    bodyColor: textColor,
    borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)',
    borderWidth: 1,
    titleFont: { ...font, size: 13 },
    bodyFont: { ...font },
    padding: 10,
    cornerRadius: 6,
  }

  const legend = {
    labels: {
      color: textColor,
      font,
    },
  }

  const scale = {
    grid: { color: gridColor },
    ticks: { color: textColor, font },
    title: { color: textColor, font: { ...font, size: 13 } },
  }

  return { textColor, gridColor, font, tooltip, legend, scale }
}
