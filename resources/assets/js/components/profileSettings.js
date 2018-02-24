var slider =
{
	init:function(noUiSlider) {

		//noUiSlider
		var rentMin = $('#rentMin').val();
		var rentMax = $('#rentMax').val();
		var sizeMin = $('#sizeMin').val();
		var sizeMax = $('#sizeMax').val();
		var roomsMin = $('#roomsMin').val();
		var roomsMax = $('#roomsMax').val();

		if(rentMax == '')
		{
			rentMax = 15000;
		}

		if(sizeMax == '')
		{
			sizeMax = 200;
		}

		if(roomsMax == '')
		{
			roomsMax = 5;
		}

		/* rent-slider */
		var sliderRent = document.getElementById('slider-rent');
		noUiSlider.create(sliderRent, {
			start: [ rentMin, rentMax],
			connect: true,
			step: 100,
			range: {
				min: 0,
				max: 15000
			}
		});

		var rentNodes = [
			document.getElementById('lower-value-rent'), // 0
			document.getElementById('upper-value-rent')  // 1
		];

		sliderRent.noUiSlider.on('update', function(values, handle, unencoded, isTap, positions) {
			rentNodes[handle].value = Math.round(values[handle]) + ' kr';
		});
	
		/* size-slider */
		var sliderSize = document.getElementById('slider-size');
		noUiSlider.create(sliderSize, {
			start: [ sizeMin, sizeMax],
			connect: true,
			step: 5,
			range: {
				min: 0,
				max: 200
			}
		});

		var sizeNodes = [
			document.getElementById('lower-value-size'), // 0
			document.getElementById('upper-value-size')  // 1
		];

		sliderSize.noUiSlider.on('update', function(values, handle, unencoded, isTap, positions) {
			sizeNodes[handle].value = Math.round(values[handle]) + ' kvm';
		});

		/* rooms-slider */
		var sliderRooms = document.getElementById('slider-rooms');
		noUiSlider.create(sliderRooms, {
			start: [ roomsMin, roomsMax],
			connect: true,
			range: {
				min: 0,
				max: 5
			}
		});

		var roomNodes = [
			document.getElementById('lower-value-rooms'),
			document.getElementById('upper-value-rooms')
		];

		sliderRooms.noUiSlider.on('update', function(values, handle, unencoded, isTap, positions) {
			roomNodes[handle].value = Math.round(values[handle]) + ' rok';
		});

		
		//Select2
		$(".city-select2").select2({
	  		placeholder: "Välj städer"
		});

		$(".area-select2").select2({
	  		placeholder: "Välj område"
		});

		
		//tabs
		$('.tabLinks').click(function()
		{
			$('.tabContent').each(function()
			{
				$(this).css('display', 'none');
			});

			$('.tabLinks').each(function()
			{
				$(this).removeClass('active');
			});

			var id = $(this).attr('id');
			$('div#' + id).css('display', 'block');
			$(this).addClass('active');
		});
	},
};

module.exports = slider;