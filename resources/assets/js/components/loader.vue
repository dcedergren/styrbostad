
<template>
	<div class="loader" style="width:100%;">
		<div class="sk-folding-cube">
		  <div class="sk-cube1 sk-cube"></div>
		  <div class="sk-cube2 sk-cube"></div>
		  <div class="sk-cube4 sk-cube"></div>
		  <div class="sk-cube3 sk-cube"></div>
		</div>
	</div> <!-- loader -->
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

        mounted: function() {
            // this.fetchPostList();
        },

        methods: {
            fetchPostList: function() {
                this.$http.get('api/posts').then(function (response) {
                    this.list = response.data
                });
            },
        }
    }
</script>
