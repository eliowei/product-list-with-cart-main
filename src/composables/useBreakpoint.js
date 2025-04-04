import { ref, onMounted, onUnmounted } from 'vue'

// 利用響應式API 來檢測斷點
export function useBreakpoint() {
  const breakpoint = ref('mobile')

  const checkBreakpoint = () => {
    if (window.matchMedia('(min-width: 1440px)').matches) {
      breakpoint.value = 'desktop'
    } else if ((window, matchMedia('(min-width: 768px)').matches)) {
      breakpoint.value = 'tablet'
    } else {
      breakpoint.value = 'mobile'
    }
  }

  onMounted(() => {
    checkBreakpoint()
    window, addEventListener('resize', checkBreakpoint)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkBreakpoint)
  })

  return breakpoint
}
