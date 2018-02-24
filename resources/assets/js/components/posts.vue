<template>
    <div class="container-posts" >
        <div class="col-md-10 col-lg-10 col-md-offset-1 col-lg-offset-1 col-xs-12 filter-container">
            <div class="filter-wrapper">
                <div id="select-dropdown-custom">
                <select class="selectTwo select2" id="select-filter" name="select-search" multiple="multiple">
                    <option</option>
                    <option v-for="city in filter_cities" :value="city.name"> {{city.name}} </option>
                </select>
                </div><div class="select-room filter-dropdown" id="select-room-div">
                    <button id="select-room" class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"> <span class="filter-title">Rum</span><span class="filter-text">Alla</span>
                        <span class="caret"></span></button>
                    <ul class="dropdown-menu" id="list-room">
                        <li>
                            <ul class="list-unstyled col-xs-6" id="minList-room">
                                <li class="dropdown-header">Min</li>
                                <li v-for="room in 9" v-bind:id="room" v-on:click="selectRoom(room,$event)">{{ room }}</li>
                            </ul>
                            <ul class="list-unstyled col-xs-6" id="maxList-room">
                                <li class="dropdown-header">Max</li>
                                <li v-for="room in 9" v-bind:id="room + 9" v-on:click="selectRoom(room+9, $event)">{{ room }}</li>
                            </ul>
                            <ul class="list-unstyled col-xs-12 divider-list">
                                <li class="divider-button-container">
                                    <button class="btn btn-primary" type="button">Ok</button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div><div class="select-kvm filter-dropdown" id="select-kvm-div">
                    <button id="select-kvm" class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"><span class="filter-title">Boarea</span><span class="filter-text">Alla</span>
                        <span class="caret"></span></button>
                    <ul class="dropdown-menu" id="list-kvm">
                        <li>
                            <ul class="list-unstyled col-xs-6" id="minList-kvm">
                                <li class="dropdown-header">Min</li>
                                <li v-for="(square_meter, index) in square_meters" v-bind:id="index" v-on:click="selectKvm(index,$event)">{{ square_meter.kvm }} m²</li>
                            </ul>
                            <ul class="list-unstyled col-xs-6" id="maxList-kvm">
                                <li class="dropdown-header">Max</li>
                                <li v-for="(square_meter, index) in square_meters" v-bind:id="index + 10" v-on:click="selectKvm(index+10,$event)">{{ square_meter.kvm }} m²</li>
                            </ul>
                            <ul class="list-unstyled col-xs-12 divider-list">
                                <li class="divider-button-container">
                                    <button class="btn btn-primary" type="button">Ok</button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div><div class="select-hyra filter-dropdown" id="select-hyra-div">
                    <button id="select-hyra" class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"><span class="filter-title">Hyra</span><span class="filter-text">Alla</span>
                    <span class="caret"></span></button>
                    <ul class="dropdown-menu" id="list-price">
                        <li class="dropdown-header">Max</li>
                        <li v-for="price in prices" v-on:click="selectPrice($event)">{{ price.kr }} kr/mån</li>
                        <ul class="list-unstyled col-sm-12 divider-list">
                            <li class="divider-button-container">
                                <button class="btn btn-primary" type="button">Ok</button>
                            </li>
                        </ul>
                    </ul>
                </div><div class="filter-clear"><button
                    type="button" class="btn btn-info btn-icon-left buttonClear" v-on:click="clearAll"> Rensa <i class="fa fa-times" aria-hidden="true"></i>
                    </button><button
                    type="button" class="btn btn-info btn-icon-left buttonFilter" v-on:click="submit"> Sök <i class="fa fa-search"></i>
            </button></div>
            </div>
        </div>
        <div class="posts-wrapper">
            <div class="loader loaderFilter no-display" style="width:100%;">
                <svg class="hourglass" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 206" preserveAspectRatio="none">
                    <path class="middle" d="M120 0H0v206h120V0zM77.1 133.2C87.5 140.9 92 145 92 152.6V178H28v-25.4c0-7.6 4.5-11.7 14.9-19.4 6-4.5 13-9.6 17.1-17 4.1 7.4 11.1 12.6 17.1 17zM60 89.7c-4.1-7.3-11.1-12.5-17.1-17C32.5 65.1 28 61 28 53.4V28h64v25.4c0 7.6-4.5 11.7-14.9 19.4-6 4.4-13 9.6-17.1 16.9z"/>
                    <path class="outer" d="M93.7 95.3c10.5-7.7 26.3-19.4 26.3-41.9V0H0v53.4c0 22.5 15.8 34.2 26.3 41.9 3 2.2 7.9 5.8 9 7.7-1.1 1.9-6 5.5-9 7.7C15.8 118.4 0 130.1 0 152.6V206h120v-53.4c0-22.5-15.8-34.2-26.3-41.9-3-2.2-7.9-5.8-9-7.7 1.1-2 6-5.5 9-7.7zM70.6 103c0 18 35.4 21.8 35.4 49.6V192H14v-39.4c0-27.9 35.4-31.6 35.4-49.6S14 81.2 14 53.4V14h92v39.4C106 81.2 70.6 85 70.6 103z"/>
                </svg>
            </div> <!-- loader Filter-->
            <div class="col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1 col-xs-12 postClicked">
                <!--<div class="notify-me-container">
                    <a class="notify-me" href="/profile/settings">Notifera mig om nya lediga lägenheter</a>
                </div>-->
                <p class="search-count" v-bind:class="{ active: isActive }">{{ count }} lediga lägenheter</p>

            </div>

            <div class="col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1 col-xs-12 post-container postClicked" v-for="post in list" :key="post.id" v-if="list">
                <div class="panel panel-default" v-bind:id="post.id">
                    <div class="panel-body slide-body">
                        <div class="post-container">
                            <a v-bind:href="''+post.url" target="_blank"><h3> {{ post.adress }}</h3></a>
                            <div class="post-info-wrapper">
                                <span id="price"><i class="fa fa-money" aria-hidden="true"></i> {{ post.price }} kr/mån</span>
                                <span id="rooms"><i class="fa fa-bed" aria-hidden="true"></i> {{ post.rooms }} rum</span>
                                <span id="square_feet"><i class="fa fa-area-chart" aria-hidden="true"></i> {{ post.square_feet }} m²</span>
                                <span id="city"><i class="fa fa-home" aria-hidden="true"></i> {{ post.city.name }}</span>
                            </div>


                            <p>Lägenheten hyrs ut av {{ post.source }}. Upplagd {{ moment(post.created_at) }}</p>
                            <!--<button type="button" class="btn btn-info btn-icon-left" v-on:click="expand(post.id, post.lat, post.lon, post.adress)"><i class="fa fa-arrow-down" aria-hidden="true"></i> Karta
                            </button>-->
                        </div>
                        <div class="seeMoreContainer" v-bind:id="'seeMore' + post.id">
                            <div class="map no-display" v-bind:id="'map' + post.id">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-12 col-md-12 col-xs-12 text-center" v-if="list.length <= 0">
                 <h2 class="text-center"> Tyvärr hittar vi inga objekt.</h2>
                 <p class="text-center"> Men skapa en sökprofil <a href="/register"> Här </a> så skickar vi epost till dig när vi hittar något </p>
                 <i class="fa fa-search" aria-hidden="true"></i>
            </div>
        </div>
        <div class="loader no-display" style="width:100%;">
            <svg class="hourglass" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 206" preserveAspectRatio="none">
                <path class="middle" d="M120 0H0v206h120V0zM77.1 133.2C87.5 140.9 92 145 92 152.6V178H28v-25.4c0-7.6 4.5-11.7 14.9-19.4 6-4.5 13-9.6 17.1-17 4.1 7.4 11.1 12.6 17.1 17zM60 89.7c-4.1-7.3-11.1-12.5-17.1-17C32.5 65.1 28 61 28 53.4V28h64v25.4c0 7.6-4.5 11.7-14.9 19.4-6 4.4-13 9.6-17.1 16.9z"/>
                <path class="outer" d="M93.7 95.3c10.5-7.7 26.3-19.4 26.3-41.9V0H0v53.4c0 22.5 15.8 34.2 26.3 41.9 3 2.2 7.9 5.8 9 7.7-1.1 1.9-6 5.5-9 7.7C15.8 118.4 0 130.1 0 152.6V206h120v-53.4c0-22.5-15.8-34.2-26.3-41.9-3-2.2-7.9-5.8-9-7.7 1.1-2 6-5.5 9-7.7zM70.6 103c0 18 35.4 21.8 35.4 49.6V192H14v-39.4c0-27.9 35.4-31.6 35.4-49.6S14 81.2 14 53.4V14h92v39.4C106 81.2 70.6 85 70.6 103z"/>
            </svg>
        </div> <!-- loader AJAX-->
    </div>
</template>

<script>
    // Require dependencies
    var Vue = require('vue');
    var VueCookie = require('vue-cookie');
    // Tell Vue to use the plugin
    Vue.use(VueCookie);
    let moment = require('moment');
    export default {
        props: {
            noti: Array,
            city: Array,
            filter_cities: Array,
        },
        data: function() {
            return {
                busy: true,
                expanded: false,
                map: false,
                paginationContainer:$("#pagination-container"),
                page:1,
                list: [],
                isActive: true,
                count: 0,
                square_meters: [
                    {'kvm': '20'},
                    {'kvm': '40'},
                    {'kvm': '60'},
                    {'kvm': '80'},
                    {'kvm': '100'},
                    {'kvm': '120'},
                    {'kvm': '140'},
                    {'kvm': '160'},
                    {'kvm': '180'},
                    {'kvm': '200'},
                ],
                prices: [
                    {'kr': '1000'},
                    {'kr': '2000'},
                    {'kr': '3000'},
                    {'kr': '4000'},
                    {'kr': '5000'},
                    {'kr': '6000'},
                    {'kr': '7000'},
                    {'kr': '8000'},
                    {'kr': '9000'},
                    {'kr': '10000'},
                ],
                maxRoom: '',
                minRoom: '',
                minKvm: '',
                maxKvm: '',
                maxPrice: '',
                cities: [],
            };
        },
        mounted: function() {

            if(location.hash)
            {
                this.page = location.hash;
                this.page = this.page.replace("#", "");            
            }
            else
            {
                this.page = 1;
            }
            /*let dd = this.$cookie.get('filterOptions');
            var filterOptions = JSON.parse(dd);
            if (filterOptions) {
                this.setFilterCookie(filterOptions);
            }*/
            this.list = this.noti;
            this.setFilterCity();
            this.initSelect2();
            this.initPaginator();
            if(!this.noti) {
                this.loadMore();
            }
        },
        updated: function () {
            this.busy = false;
        },
        methods: {
            /*setFilterCookie: function (filterOptions) {
                let appendText = '';
                this.maxRoom = filterOptions['maxRoom'];
                this.minRoom = filterOptions['minRoom'];

                if(this.minRoom && this.maxRoom) {
                    appendText = this.minRoom + ' - ' + this.maxRoom + ' rum';
                }
                else if(this.minRoom && !this.maxRoom) {
                    appendText = 'Min ' + this.minRoom + ' rum';
                }
                else if(this.maxRoom && !this.minRoom) {
                    appendText = 'Max ' + this.maxRoom + ' rum';
                }
                else {
                    appendText = 'Alla';
                }
                $('#select-room').find('.filter-text').text(appendText);


                this.minKvm = filterOptions['minKvm'];
                this.maxKvm = filterOptions['maxKvm'];
                if(this.minKvm && this.maxKvm) {
                    appendText = this.minKvm + ' - ' + this.maxKvm;
                }
                else if(this.minKvm && !this.maxKvm) {
                    appendText = 'Min ' + this.minKvm;
                }
                else if(this.maxKvm && !this.minKvm) {
                    appendText = 'Max ' + this.maxKvm;
                }
                else {
                    appendText = 'Alla';
                }
                $('#select-kvm').find('.filter-text').text(appendText);


                this.maxPrice = filterOptions['maxPrice'];
                if(this.maxPrice) {
                    $('#select-hyra').find('.filter-text').text('Max ' + this.maxPrice);
                }
                else {
                    $('#select-hyra').find('.filter-text').text('Alla');
                }


                this.cities = filterOptions['city'];

                if (this.cities) {
                    let cities = this.cities.trim().split(/\s+/);
                    $('.select2').val(cities).trigger('change');
                }
            },*/
            bindPaginationEvents:function() {
                $( '#pagination-container .pagination li' ).not( ".active disabled" ).on("click",function() {
                    $('html,body').scrollTop(0);
                });
            },
            initPaginator: function() {
                self = this;

                self.bindPaginationEvents();
                window.onhashchange = function(){
                    self.page = location.hash;
                    self.page = self.page.replace("#", ""); 
                    self.loadMore();
                };
            },
            initSelect2: function () {
                $('.select2').select2({
                    allowClear: true,
                    placeholder: "Sök efter stad",
                    tokenSeparators: [',', ' '],
                    maximumSelectionLength: 6,
                    dropdownParent: $('#select-dropdown-custom'),
                    "language": {
                        "noResults": function(){
                            return "Inga resultat";
                        }
                    },
                });
            },
            setFilterCity: function () {
                if (typeof this.city !== 'undefined' && this.city.length > 0) {
                    $('.select2').val(this.city).trigger('change');
                }
            },
            clearAll: function () {
                $(".select2").val(null).trigger("change");
                let dropDown = $( ".dropdown-menu" );

                this.maxPrice = '';
                $('#select-hyra').find('.filter-text').text('Alla');

                this.minKvm = '';
                this.maxKvm = '';
                $('#select-kvm').find('.filter-text').text('Alla');

                this.minRoom = '';
                this.maxRoom = '';
                $('#select-room').find('.filter-text').text('Alla');

                $(dropDown).find('.selected-filter').removeClass('selected-filter');
                $(dropDown).find('.disabled').removeClass('disabled');
            },
            selectRoom: function (value, event) {
                event.stopPropagation();
                event.preventDefault();
                if(event.target.className === 'disabled') {
                    return;
                }
                if(event.target.className === 'selected-filter') {
                    if(value > 9) {
                        this.maxRoom = '';
                        $('#minList-room>li').removeClass('disabled');
                    }
                    else {
                        this.minRoom = '';
                        $('#maxList-room>li').removeClass('disabled');
                    }
                    $(event.target).removeClass('selected-filter');
                    if(this.minRoom && this.maxRoom) {
                        appendText = this.minRoom + ' - ' + this.maxRoom;
                    }
                    else if(this.minRoom && !this.maxRoom) {
                        appendText = 'Min ' + this.minRoom;
                    }
                    else if(this.maxRoom && !this.minRoom) {
                        appendText = 'Max ' + this.maxRoom;
                    }
                    else {
                        $('#select-room').find('.filter-text').text('Alla');
                        return;
                    }
                    $('#select-room').find('.filter-text').text(appendText + ' rum');
                    return;
                }
                let valueToInt;
                let select_val = value;
                let currentValue;
                let options;
                let parseMax;
                let appendText;
                if(select_val > 9) { ////Max klickad
                    options = $('#minList-room>li');
                    if($('#maxList-room>li').hasClass('selected-filter')) {
                        $('#maxList-room>li').removeClass('selected-filter');
                    }
                    $.each(options, function (key, value) {
                        currentValue = parseInt($(value).attr("id"));
                        valueToInt = parseInt(select_val);
                        if((currentValue > valueToInt-9) && ( currentValue < 10)) {
                            $(value).addClass( "disabled" );
                        }
                        else {
                            $(value).removeClass('disabled');
                        }
                    });
                    parseMax = parseInt(select_val);
                    parseMax = parseMax -9;
                    this.maxRoom = parseMax;
                }
                else { ///Min klickad
                    options = $('#maxList-room>li');
                    if($('#minList-room>li').hasClass('selected-filter')) {
                        $('#minList-room>li').removeClass('selected-filter');
                    }
                    $.each(options, function (key, value) {
                        currentValue = parseInt($(value).attr("id"));
                        valueToInt = parseInt(select_val);
                        if((currentValue < valueToInt+9) && ( currentValue > 9)) {
                            $(value).addClass( "disabled" );
                        }
                        else {
                            $(value).removeClass('disabled');
                        }
                    });
                    this.minRoom = value;
                }
                if(this.minRoom && this.maxRoom) {
                    appendText = this.minRoom + ' - ' + this.maxRoom;
                }
                else if(this.minRoom && !this.maxRoom) {
                    appendText = 'Min ' + this.minRoom;
                }
                else if(this.maxRoom && !this.minRoom) {
                    appendText = 'Max ' + this.maxRoom;
                }
                $('#select-room').find(' .filter-text').text(appendText + ' rum');
                $(event.target).addClass('selected-filter');
            },
            selectKvm: function (value, event) {
                event.stopPropagation();
                event.preventDefault();
                if(event.target.className === 'disabled') {
                    return;
                }
                if(event.target.className === 'selected-filter') {
                    if(value > 9) {
                        this.maxKvm = '';
                        $('#minList-kvm>li').removeClass('disabled');
                    }
                    else {
                        this.minKvm = '';
                        $('#maxList-kvm>li').removeClass('disabled');
                    }
                    $(event.target).removeClass('selected-filter');

                    if(this.minKvm && this.maxKvm) {
                        appendText = this.minKvm + ' - ' + this.maxKvm;
                    }
                    else if(this.minKvm && !this.maxKvm) {
                        appendText = 'Min ' + this.minKvm;
                    }
                    else if(this.maxKvm && !this.minKvm) {
                        appendText = 'Max ' + this.maxKvm;
                    }
                    else {
                        $('#select-kvm').find('.filter-text').text('Alla');
                        return;
                    }
                    $('#select-kvm').find('.filter-text').text(appendText);
                    return;
                }
                let valueToInt;
                let select_val = value;
                let currentValue;
                let options;
                let appendText;
                if(select_val > 9) { ////Max klickad
                    options = $('#minList-kvm>li');
                    if($('#maxList-kvm>li').hasClass('selected-filter')) {
                        $('#maxList-kvm>li').removeClass('selected-filter');
                    }
                    $.each(options, function (key, value) {
                        currentValue = parseInt($(value).attr("id"));
                        valueToInt = parseInt(select_val);
                        if((currentValue >= valueToInt-9) && ( currentValue < 10)) {
                            $(value).addClass( "disabled" );
                        }
                        else {
                            $(value).removeClass('disabled');
                        }
                    });
                    this.maxKvm = $(event.target).text();
                }
                else { ///Min klickad
                    options = $('#maxList-kvm>li');
                    if($('#minList-kvm>li').hasClass('selected-filter')) {
                        $('#minList-kvm>li').removeClass('selected-filter');
                    }
                    $.each(options, function (key, value) {
                        currentValue = parseInt($(value).attr("id"));
                        valueToInt = parseInt(select_val);
                        if((currentValue <= valueToInt+9) && ( currentValue > 9)) {
                            $(value).addClass( "disabled" );
                        }
                        else {
                            $(value).removeClass('disabled');
                        }
                    });
                    this.minKvm = $(event.target).text();
                }
                if(this.minKvm && this.maxKvm) {
                    appendText = this.minKvm + ' - ' + this.maxKvm;
                }
                else if(this.minKvm && !this.maxKvm) {
                    appendText = 'Min ' + this.minKvm;
                }
                else if(this.maxKvm && !this.minKvm) {
                    appendText = 'Max ' + this.maxKvm;
                }
                $('#select-kvm').find('.filter-text').text(appendText);
                $(event.target).addClass('selected-filter');
            },
            selectPrice: function (event) {
                event.stopPropagation();
                event.preventDefault();
                if(event.target.className === 'disabled')
                {
                    return;
                }
                if(event.target.className === 'selected-filter') {
                    $(event.target).removeClass('selected-filter');
                    this.maxPrice = '';
                    $('#select-hyra').find('.filter-text').text('Alla');

                    return;
                }
                if($('#list-price>li').hasClass('selected-filter')) {
                    $('#list-price>li').removeClass('selected-filter');
                }
                this.maxPrice = $(event.target).text();
                $('#select-hyra').find('.filter-text').text('Max ' + this.maxPrice);
                $(event.target).addClass('selected-filter');
            },
            loadMore: function () {
                $('.loaderFilter').removeClass('no-display');
                this.cities = $(".select2 option:selected").text();

                let filter = {
                    city: this.cities,
                    minKvm: this.minKvm,
                    maxKvm: this.maxKvm,
                    minRoom: this.minRoom,
                    maxRoom: this.maxRoom,
                    maxPrice: this.maxPrice,
                };
                let self = this;
                self.busy = true;
                self.$http.post('/api/getPosts?page='+self.page, JSON.stringify(filter) ).then(function (response) {
                    self.count = response.data.count;
                    self.list = response.data.data;
                    $("#pagination-container").html(response.data.pagination);
                    self.bindPaginationEvents();
                    /*this.$cookie.set('filterOptions', JSON.stringify(filter), { expires: '10m' });*/
                });
                this.isActive = false;
                $('.loaderFilter').addClass('no-display');
            },
            moment: function (date) {
                return moment(date).locale('sv').fromNow();
            },
            expand: function (id, lat, lng, adress) {
                let mapContainer = $('#map' + id);
                let seeMore = $('#seeMore' + id);

                if(seeMore.hasClass('isExpanded')) {
                    seeMore.removeClass('isExpanded');
                    mapContainer.addClass('no-display');
                }
                else {
                    seeMore.addClass('isExpanded');
                    mapContainer.removeClass('no-display');
                    let latlng = new google.maps.LatLng(lat, lng);

                    let map = new google.maps.Map(document.getElementById('map'+ id), {
                        zoom: 14,
                        center: latlng
                    });

                    let marker = new google.maps.Marker({
                        position: latlng,
                        map: map,
                        title: adress
                    });
                }
            },
            submit: function() {
                location.hash = "1";
                var self = this;
                self.loadMore();
            },
        },
    }
</script>
