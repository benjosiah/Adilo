<template>
    <nav class="flex items-center justify-between text-lg font-semibold">
        <div class="pt-2 px-3 mx-5 cursor-pointer" v-for="(nav, index) in navs" :key="index">
            <router-link :to="nav.path" class="flex items-center">
                <span class="">
                    {{ nav.name }}
                </span>
            </router-link>
            <!-- dropdown -->

        </div>
    </nav>
</template>
<script>
export default {
    name: 'horizontalNavItem',
    props: {
        navs: {
            type: Object,
            required: true
        },

    },
    components: {
        
    }
}
</script>