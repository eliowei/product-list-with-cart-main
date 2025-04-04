<template>
  <div
    class="card flex max-h-[347px] min-h-[234px] w-[327px] flex-col sm:w-[213px] md:w-[213px] xl:w-[250px]"
  >
    <div class="card-img relative mb-4 h-[234px] w-full md:h-[234px] xl:h-[262px]">
      <img
        class="h-[240px] w-full rounded-lg outline-[#C73B05] transition-all delay-100"
        :class="{ 'outline-2': productData.state }"
        :src="imageUrl"
        :alt="productData.name"
      />
      <button
        v-if="!productData.state"
        class="absolute bottom-[-22px] left-1/2 flex h-[44px] w-[160px] -translate-x-1/2 items-center justify-center rounded-full border border-[#ad8a85] bg-white hover:cursor-pointer hover:border-[#C73B0F] hover:text-[#C73B0F] focus:outline-[#C73B05]"
        @click="handleAddToCart(productData, 'add')"
      >
        <!-- 購物車icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 21 20"
          class="mr-2"
        >
          <g fill="#C73B0F" clip-path="url(#a)">
            <path
              d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"
            />
            <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z" />
          </g>
          <defs>
            <clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z" /></clipPath>
          </defs>
        </svg>

        <span class="text-sm font-bold">Add to Cart</span>
      </button>

      <div
        v-if="productData.state"
        class="absolute bottom-[-22px] left-1/2 flex h-[44px] w-[160px] -translate-x-1/2 items-center justify-between rounded-full border border-[#ad8a85] bg-[#C73B0F] px-3 outline-0"
      >
        <!-- reduce button -->
        <button
          class="group flex h-5 w-5 items-center justify-center rounded-full border-2 border-white hover:cursor-pointer hover:bg-white"
          @click="handleAddToCart(productData, 'reduce')"
        >
          <!-- icon-decrement-quantity -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            fill="none"
            class="group-hover:fill-[#C73B0F]"
            viewBox="0 0 10 2"
          >
            <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" class="group-hover:fill-[#C73B0F]" />
          </svg>
        </button>

        <span class="text-sm font-bold text-white">{{ productData.count }}</span>

        <!-- add button -->
        <button
          class="group flex h-5 w-5 items-center justify-center rounded-full border-2 border-white hover:cursor-pointer hover:bg-white"
          @click="handleAddToCart(productData, 'add')"
        >
          <!-- icon-increment-quantity -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            fill="none"
            viewBox="0 0 10 10"
            class="group-hover:fill-[#C73B0F]"
          >
            <path
              fill="#fff"
              d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
              class="group-hover:fill-[#C73B0F]"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="card-category mt-4 text-sm text-[#87635A]">{{ productData.category }}</div>
    <div class="card-title font-bold text-[#260F08]">{{ productData.name }}</div>
    <div class="card-price font-bold text-[#C73B0F]">${{ productData.price }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useBreakpoint } from '@/composables/useBreakpoint'

// 使用 useBreakpoint 來獲取當前的斷點
const breakpoint = useBreakpoint()

// 根據當前的斷點，選擇對應的圖片
const currentImage = computed(() => {
  switch (breakpoint.value) {
    case 'desktop':
      return productData.image.desktop
    case 'tablet':
      return productData.image.table || productData.image.desktop
    default:
      return productData.image.mobile || productData.image.desktop
  }
})

const productData = defineProps({
  name: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    default: 0,
  },
  image: {
    type: Object,
    default: () => {},
  },
  count: {
    type: Number,
    default: 0,
  },
  state: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['addToCart'])
// 點擊購物車按鈕時，將資料傳遞給父組件
// 這裡的 data 是從父組件傳遞過來的 productData
// 這裡的 type 是用來判斷是增加還是減少數量
const handleAddToCart = (data, type) => {
  let counts = productData.count
  let activeState = productData.state

  const name = data.name
  const category = data.category

  if (type === 'reduce') {
    counts = Math.max(0, counts - 1)
    // 當數量為 0 時才將狀態為false
    activeState = counts > 0
  } else if (type === 'add') {
    counts = productData.state ? counts + 1 : 1
    activeState = true
  }

  emit('addToCart', {
    name,
    category,
    counts,
    productActiveState: activeState,
  })
}
// imageUrl 根據當前的斷點來選擇對應的圖片
const imageUrl = computed(() => {
  const path = currentImage.value
  if (!path) return ''

  try {
    const cleanPath = path.replace('@/', '../')
    return new URL(cleanPath, import.meta.url).href
  } catch (error) {
    console.error('圖片載入失敗:', error)
    return ''
  }
})
</script>
