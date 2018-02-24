<template>
    <div id="header">
        <img src="/main_logo.png">
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                edit: false,
                list: [],
                post: {
                    title: '',
                    description: '',
                    area: '',
                    rooms: '',
                    price: ''
                }
            };
        },
    }
</script>
