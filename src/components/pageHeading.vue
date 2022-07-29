<template>
    <div>
        <div class="text-sm font-extralight">
            <slot>
                Snapbyte > My Recordings
            </slot>
        </div>
        <div class="w-full m-auto flex items-center justify-between mt-2">
            <div class="text-xl font-semibold">
                <slot name="head">
                    My Recordings
                </slot>
            </div>
            <div class="flex justify-start items-center">
                <slot name="action"> 

                </slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'PageHeading',
    components: {
        
    }
}
</script>