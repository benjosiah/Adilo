<template>
    <header class="m-auto px-10 flex items-center justify-start w-full h-24 p-0 bg-white border-b border-gray-200">
        <!-- lodo -->
        <div class="w-48 h-24 flex items-center justify-start">
            <div class="relative">
                <div class="w-10 h-10 bg-orange-400 inset-0 flex items-center justify-center rounded">
                    <div class="w-7 h-7 bg-gray-200 rounded-full"></div>
                </div>
            </div>
            <div class="w-32 ml-3 text-2xl font-bold text-gray-800">
                <span>
                    Adilo
                </span>
            </div>
        </div>
        <!-- nav -->
        <nav-item :navs="navs">

        </nav-item>

        
    </header>
</template>

<script>
import navItem from './components/navItem.vue'
export default { 
  name: 'horizontalNav',
  components: {
    navItem
  },
  data() {
    return {
      navs: [
        {
          name: 'Projects',
          path: '/'
        },
        {
          name: 'Tools & Apps',
          path: '/',
          sub: {

          }
        },
        {
          name: 'Channel',
          path: '/'
        },
        {
          name: 'Contact',
          path: '/'
        },
        {
          name: 'Analytics',
          path: '/'
        },
        
        {
          name: 'Settings',
          path: '/'
        }
      ]
    }
  }
}
</script>
