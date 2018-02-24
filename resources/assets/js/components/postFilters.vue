<template>
    <div class="col-md-6 col-md-offset-3">
        <h2 class="full-width text-align-center">Sök din nya drömbostad</h2>
        <!--<div id="custom-search-input">
            <div class="input-group col-md-12">
                <input type="text" class="form-control input-lg" placeholder="Karlstad, drot..." />
                <span class="input-group-btn">
                    <button class="btn btn-primary btn-lg" type="button">
                        <i class="glyphicon glyphicon-search"></i>
                    </button>
                </span>
            </div>
        </div>-->

            <select class="styled-select blue semi-square" v-model="formData.lan">
                <option v-for="lan in lans">
                    {{ lan.name }}
                </option>
            </select>


            <select class="styled-select blue semi-square" v-model="formData.minRoom">
                <option v-for="room in 10">
                    {{ room }}
                </option>
            </select>

            <select class="styled-select blue semi-square" v-model="formData.maxRoom">
                <option v-for="room in 10">
                    {{ room }}
                </option>
            </select>

<!--m²-->
            <select class="styled-select blue semi-square" v-model="formData.minKvm">
                <option v-for="square_meter in square_meters">
                    {{ square_meter.kvm }}
                </option>
            </select>

            <select class="styled-select blue semi-square" v-model="formData.maxKvm">
                <option v-for="square_meter in square_meters">
                    {{ square_meter.kvm }}
                </option>
            </select>

            <select class="styled-select blue semi-square" v-model="formData.maxPrice">
                <option v-for="price in prices">
                    {{ price.kr }}
                </option>
            </select>


            <!--<div class="rent-container">
                <div id="slider-price"></div>
                <span class="maxPrice">Hyra max</span>
                <input id="input-format-max">
                &lt;!&ndash;<span class="maxValue">Value</span>
                <input type="number " id="input-format-max">&ndash;&gt;
            </div>-->

            <span>Min rum: {{ formData.minRoom }}</span>
            <span>Max rum: {{ formData.maxRoom }}</span>
            <span>Min yta: {{ formData.minKvm }}</span>
            <span>Max yta: {{ formData.maxKvm }}</span>
            <span>Län: {{ formData.lan }}</span>
            <span>Hyra max: {{ formData.maxPrice }}</span>
            <button v-on:click="submit">Filter</button>


    </div>
</template>

<script>
    var noUiSlider = require('nouislider');
    export default {
        data: function() {
            return {
                formData: {
                    lan: '',
                    minKvm: '',
                    maxKvm: '',
                    minRoom: '',
                    maxRoom: '',
                    maxPrice: '',
                },
                lans: [],
                square_meters: [
                    {'kvm': '10'},
                    {'kvm': '20'},
                    {'kvm': '30'},
                    {'kvm': '40'},
                    {'kvm': '50'},
                    {'kvm': '60'},
                    {'kvm': '70'},
                    {'kvm': '80'},
                    {'kvm': '90'},
                    {'kvm': '100'},
                    {'kvm': '110'},
                    {'kvm': '120'},
                    {'kvm': '130'},
                    {'kvm': '140'},
                    {'kvm': '150'},
                    {'kvm': '160'},
                    {'kvm': '170'},
                    {'kvm': '180'},
                    {'kvm': '190'},
                    {'kvm': '200'},
                ],
                prices: [
                    {'kr': '500'},
                    {'kr': '1000'},
                    {'kr': '1500'},
                    {'kr': '2000'},
                    {'kr': '2500'},
                    {'kr': '3000'},
                    {'kr': '3500'},
                    {'kr': '4000'},
                    {'kr': '4500'},
                    {'kr': '5000'},
                    {'kr': '5500'},
                    {'kr': '6000'},
                    {'kr': '6500'},
                    {'kr': '7000'},
                    {'kr': '7500'},
                    {'kr': '8000'},
                    {'kr': '8500'},
                    {'kr': '9000'},
                    {'kr': '9500'},
                    {'kr': '10000'},
                ],

            };
        },
        mounted: function() {
            this.fetchLan();
        },
        updated: function () {
            
        },
        methods: {
            fetchLan: function () {
                this.$http.get('api/get/lan/').then(function (response) {
                    this.lans = response.data;
                });
            },
            submit: function(event) {
                event.preventDefault();

                this.$http.post('api/posts/filter/', JSON.stringify(this.formData) ).then(function (response) {
                    this.list = response.data;
                });
            },
            /*createSlider: function () {
                var handleSlider = document.getElementById('slider-price');
//                var inputFormatMin = document.getElementById('input-format-min');
                var inputFormatMax = document.getElementById('input-format-max');
                var index;
                noUiSlider.create(handleSlider, {
                    start: 25000 ,
                    connect: [true, false],
                    step: 100,
                    range: {
                        'min': [  0 ],
                        'max': [ 25000 ]
                    }
                });
                handleSlider.noUiSlider.on('slide', function(value){
                    /!*index = values[0].lastIndexOf('.');
                    inputFormatMin.value = values[0].slice(0, index);*!/
                    index = value[0].lastIndexOf('.');
                    inputFormatMax.value = value[0].slice(0, index);
                });
                /!*inputFormatMin.addEventListener('change', function(){
                    if(inputFormatMin.value <= inputFormatMax.value) {
                        handlesSlider.noUiSlider.set(this.value);
                    }
                });*!/
                inputFormatMax.addEventListener('change', function(){
//                    if(inputFormatMax.value >= inputFormatMin.value) {
                    console.log('fdhfd');
                    handleSlider.noUiSlider.set([null, this.value]);

                });
            }*/
        },
    }
</script>
