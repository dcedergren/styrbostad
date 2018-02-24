<template>

    <div class="container-post">
        <div class="row">
            <div class="col-md-8 col-lg-8 col-md-offset-2 col-lg-offset-2 col-xs-12 post-container">
                <div id="slide-hide">
                    <div v-if="post.images" id="carousel-kenburn" class="ken-burns carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                        </ol>
                        <div class="carousel-inner" role="listbox">
                        </div>
                        <a class="left carousel-control" href="#carousel-kenburn" data-slide="prev">
                            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                        </a>
                        <a class="right carousel-control" href="#carousel-kenburn" data-slide="next">
                            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                        </a>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="post-title">
                            <h4>{{ post.title }}</h4>
                        </div>

                        <div class="trashed" v-if="trashed">
                            <h2> Denna lägenhet är uthyrd </h2>
                            <p> Tyvärr så är detta objekt redan uthyrt och försvunnit från hyresvärdens hemsida. </p>
                        </div>

                        <div class="content">
                            <p v-html="post.full_description"></p>
                        </div>
                    </div>
                    <div class="source" v-if="!trashed">
                        <a v-bind:href="''+post.url" target="_blank"><button type="button" class="btn btn-info">Fortsätt till {{post.source}}</button></a>
                    </div>
                    <div class="panel-footer">
                        <table>
                            <caption>Information</caption>
                            <tr>
                                <th>Adress</th><td>{{ post.adress }}</td>
                            </tr>
                            <tr>
                                <th>Boarea</th><td>{{ post.square_feet }} m²</td>
                            </tr>
                            <tr>
                                <th>Hyra</th><td>{{ post.price }} kr/mån</td>
                            </tr>
                            <tr>
                                <th>Antal rum</th><td>{{ post.rooms }} rum</td>
                            </tr>
                            <tr>
                                <th>Inlagd</th><td>{{ moment(post.created_at) }}</td>
                            </tr>
                        </table>
                        <div class="share-container col-lg-12 equal-height-container" v-if="!trashed">
                                <h5 class="text-center">Dela eller skicka till en vän</h5>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 share-btn facebook-btn share-msg equal-height text-center">
                                <a v-bind:href="'fb-messenger://share/?link='+currenturl+'&app_id=123456789'">
                                    Messenger <img src="/images/messenger_icon.png">
                                </a>
                            </div>

                            <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 share-btn facebook-btn equal-height text-center">
                                <a v-bind:href="'https://www.facebook.com/sharer/sharer.php?u='+currenturl" target="_blank">
                                     Facebook <i class="fa fa-facebook" aria-hidden="true"></i>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 share-btn sms-btn equal-height text-center">
                                <a v-bind:href="'sms:070?body=Jag har hittat en galen lägenhet. Kolla här! '+currenturl">
                                SMS <i class="fa fa-comment" aria-hidden="true"></i>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 share-btn email-btn equal-height text-center">
                                 <a v-bind:href="'mailto:van@doman.se?subject=Lägenhet på styrbostad.se&body=Jag har hittat en galen lägenhet. Kolla här! '+currenturl">
                                Epost <i class="fa fa-envelope" aria-hidden="true"></i>
                                </a>

                            </div>
                        </div>
                    </div>
                    <div id="map"></div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
    var moment = require('moment');

    export default {
        data: function() {
            return {
                map: false,
                edit: false,
                post: [],
            };
        },

        props: ['currenturl','trashed'],

        mounted: function() {
            this.fetchPost();
        },

        beforeUpdate: function () {
            var self = this;

            setTimeout(function(self)
            {
                self.createSlider();
                self.initMap();

            }, 500,self);
        },
        methods: {
            fetchPost: function() {
                var slug = $('#slug').val();
                this.$http.get('/api/get/post/' + slug).then(function (response) {//maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyC8q5vdMJm3VPTCk0k6oTYalRvtURgQPqQ;
                    this.post = response.data;
                });

            },
            initMap: function() {
                if(this.post.lat !== null || this.post.lon !== null) {

                    let latlng = new google.maps.LatLng(this.post.lat, this.post.lon);

                    let map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 14,
                    center: latlng
                    });

                    let marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    title: this.post.adress
                    });
                }
            },
            createSlider() {
                if(typeof this.post.images !== 'undefined' && this.post.images.length > 0) {
                    let images = this.post.images;
                    let len = images.length;
                    $.each(images, function (key, value) {

                        if(key === 0) {
                            var liItem = jQuery('<li/>', {
                                'data-target' : '#carousel-kenburn',
                                'class' : 'active',
                                'data-slide-to' : '' + key
                            }).appendTo('.carousel-indicators');

                            var divItem = $('<div/>', {
                                'class' : 'item active inactiveUntilOnLoad',
                            }).appendTo('.carousel-inner');

                            var img = $('<img/>', {
                                'src' : '' + value.url
                            }).appendTo(divItem);
                        }
                        if(key === 0 && key === len - 1) {
                            $('.carousel-control').attr('class', 'display-none');
                            $('.glyphicon').attr('class', 'display-none');
                            $('.carousel-indicators').attr('class', 'carousel-indicators hide');
                        }
                        else {
                            var liItem = jQuery('<li/>', {
                                'data-target' : '#carousel-kenburn',
                                'data-slide-to' : '' + key
                            }).appendTo('.carousel-indicators');

                            var divItem = $('<div/>', {
                                'class' : 'item',
                            }).appendTo('.carousel-inner');

                            var img = $('<img/>', {
                                'src' : '' + value.url
                            }).appendTo(divItem);
                        }
                    });
                    $('.carousel').carousel({
                        interval: false
                    });
                }
                else {
                    $('#slide-hide').attr('class', 'hide');
                }
            },
            moment: function (date) {
                return moment(date).locale('sv').fromNow();
            },
        },
    }
</script>