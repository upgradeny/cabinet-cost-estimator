$(document).ready(function(){	

	console.log(123);
			function round_zero_decimal_digits(num1){
				return Math.round(parseFloat(num1)) ;
			}
			function round_2_digits(num1){
				return Math.round( parseFloat(num1) * 100 ) / 100;
			}
			function numberWithCommas(x) {
				return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
			
			function group_price_calculate(opt,multiplier,markup,surcharge,input_price){
				let cost_price = 0;
				let retail_price = 0;
				if( opt == "C"){
					cost_price = round_2_digits( input_price * surcharge );
					retail_price = round_2_digits( cost_price * markup  ) ;
				}else{
					cost_price = round_2_digits( input_price * surcharge * multiplier);
					retail_price = round_2_digits( cost_price * markup  ) ;
				}
				
				return [cost_price,retail_price];
				
			}
		
			
			function populateMainBrands() {
                jQuery.each(brandData, function (brand) {
                    jQuery('#main_brand').append(new Option(brand, brand));
                });
            }
			
			function populateSubBrands() {
                let selectedBrand = $('#main_brand').val();
                let subBrandSelect = $('#sub_brand');
                subBrandSelect.empty();
                
                if (brandData[selectedBrand]) {
                    jQuery.each(brandData[selectedBrand], function (subBrand, price) {
                        subBrandSelect.append(new Option(subBrand, price));
                    });
                }
            }
			
			
			
			
    


			function populateAccessories(selector, min, max) {
				let select = jQuery(selector);
				select.empty(); // Clear existing options
				select.append(`<option value="0" selected="selected">Select Quantity</option>`);

				for (let i = min; i <= max; i++) {
					select.append(`<option value="${i}">${i}</option>`);
				}
			}

			populateAccessories("#accessories", 1, 50);

console.log(123);
/*
    jQuery(".show_calc_field_hidden").click(function () {
		
        let hiddenField = $(this).parent(".calc_field_flex").find(".calc_field_hidden");
let classes = hiddenField.attr("class");
console.log(classes);
		console.log(hiddenField);
        let icon = $(this).find(".icon");

        if (hiddenField.hasClass("hidden")) {
            hiddenField.removeClass("hidden").slideDown();
            $(this).html('<span class="icon">❌</span>');  // Change to "Hide" with ❌ icon
        } else {
            hiddenField.addClass("hidden").slideUp();
            $(this).html('<span class="icon">👁️</span>');  // Change back to "Show" with eye icon
        }
		event.preventDefault();
    });
	
	*/
	/*
	jQuery(".show_calc_field_hidden").change(function () {
		
        let hiddenField = $(this).parent(".calc_field_flex").find(".calc_field_hidden");
		let classes = hiddenField.attr("class");
        let icon = $(this).find(".icon");

        if ($(this).is(':checked')) {
            hiddenField.removeClass("hidden").slideDown();
           // $(this).html('<span class="icon">❌</span>');  // Change to "Hide" with ❌ icon
        } else {
            hiddenField.addClass("hidden").slideUp();
           // $(this).html('<span class="icon">👁️</span>');  // Change back to "Show" with eye icon
        }
		//event.preventDefault();
    });
	
*/
			

/*
	
			jQuery('#toggleOptional').change(function () {
				if ($(this).is(':checked')) {
					$('#list_output , .estimate_breakdown').show(); // Show with animation
				} else {
					$('#list_output , .estimate_breakdown').hide(); // Hide with animation
				}
			});
			
*/

			var isOpen = false;

			$('#show_calcs').click(function () {
				$('.calc_field_hidden').toggle(); // Show/hide the element
				isOpen = !isOpen; // Toggle state
				
				// Change the image based on the state
				if (isOpen) {
					
					$('#menu_1').attr('src', 'images/Close.png'); // Change to close icon
				} else {
					//$('.pdf_option_value').hide();
					$('#menu_1').attr('src', 'images/menu_1.png'); // Change back to open icon
				}
			});
			
			
			/*
			 $('#show_calcs').click(function () {   
				// $('.calc_field_hidden').show()
				$('#list_output , .estimate_breakdown').show();
				
				$("html, body").animate({
					scrollTop: $("#list_output").offset().top + 50
				}, 800);
				
											
			});	
*/

            populateMainBrands();
            populateSubBrands();
			jQuery('#main_brand').change(populateSubBrands);
			
			jQuery("#priceCalcForm").validate({
			  rules: {
				// simple rule, converted to {required:true}
				main_brand: {
					required: true,
				},
				sub_brand: {
					required: true,
				},
				linear_feet: {
					required: true,
					number: true,
					min: 1,
					max: 9999999
				},
				wall_cabinets: {
					required: false,
					number: true,
					min: 0,
					max: 9999999
				},
				base_cabinets: {
					required: false,
					number: true,
					min: 0,
					max: 9999999
				},
				tall_cabinets: {
					required: true,
					number: true,
					min: 0,
					max: 9999999
				},
				
				speciality_item: {
					required: false,
					number: true,
					min: 0,
					max: 999999999999999
				},
				
			  }
			});
			
		console.log(123);	
			function initial_estimate_calc(){
				// defining variables and getting input values
				
				let linear_feet = jQuery('#linear_feet').val();
				let main_brand = jQuery('#main_brand').val();
				let sub_brand = jQuery('#sub_brand').val();
				
				let sub_brand_calc = sub_brand * linear_feet;
				
				let wood_specie = jQuery('#wood_specie').val();
				let door_finish = jQuery('#door_finish').val();
				let door_finish_calc = sub_brand_calc * door_finish / 100; 
				let wood_specie_calc = sub_brand_calc * wood_specie / 100; 				
				
				let base_cabinets = jQuery('#base_cabinets').val();
				let wall_cabinets = jQuery('#wall_cabinets').val();
				let tall_cabinets = jQuery('#tall_cabinets').val();
				
				var base_cabinets_calc = 0;
				var wall_cabinets_calc = 0;
				
				if (base_cabinets) { 
					base_cabinets_calc = sub_brand * ( base_cabinets - Math.floor(linear_feet * 2/5 ) ) *base_cabinets_price_per_feet * base_cabinets_factor;
				}
				if (wall_cabinets) { 
					wall_cabinets_calc = sub_brand * ( wall_cabinets - Math.floor(linear_feet * 2/5 ) ) *wall_cabinets_price_per_feet * wall_cabinets_factor;
				}
				
				
				
				
				let tall_cabinets_calc = sub_brand * tall_cabinets  * tall_cabinets_price_per_feet * tall_cabinets_factor;
				
				let drawer_bases = jQuery('#drawer_bases').val();
				let molding = jQuery('#molding').val();
				let height = jQuery('#height').val();
				console.log('height => ' , height);
				let channals = jQuery('#channals').val();
				
				let drawer_bases_calc = round_2_digits( sub_brand_calc * drawer_bases / 100 ); 
				let molding_calc = round_2_digits ( sub_brand_calc * molding / 100 ); 
				let height_calc = sub_brand_calc * height / 100; 
				//let channals_calc = sub_brand_calc * channals / 100; 
				let channals_calc = linear_feet * channals; 
				let accessories = jQuery('#accessories').val();
				
				let acessories_calc = accessories * acessories_factor; 

				
				let speciality_item = parseFloat ( jQuery('#speciality_item').val() );
				
				var estimated_total_value = round_2_digits ( sub_brand_calc + wood_specie_calc + door_finish_calc + base_cabinets_calc + wall_cabinets_calc + tall_cabinets_calc + drawer_bases_calc + molding_calc + height_calc + channals_calc + acessories_calc + speciality_item );

				estimated_total_value = Math.ceil(estimated_total_value / 50) * 50;
				
				//range_estimate_low = Math.round((estimated_total_value * 0.93) / 1000) * 1000;
				
				
				//range_estimate_high = Math.round((estimated_total_value * 1.07) / 1000) * 1000;
				
				range_estimate_low = Math.floor((estimated_total_value * 0.93) / 500) * 500;
				
				
				range_estimate_high = Math.ceil((estimated_total_value * 1.07) / 500) * 500;
				
				jQuery('#estimated_total_value , #pdf_estimated_total_value').text(" $ " + estimated_total_value);
				jQuery('#range_estimate_low , #pdf_range_estimate_low').text(" $ " +range_estimate_low);
				jQuery('#range_estimate_high , #pdf_range_estimate_high').text(" $ " +range_estimate_high);
				
				
				
				jQuery('#brand_text , #pdf_brand_text').text(jQuery('#main_brand  option:selected').text());
				jQuery('#sub_brand_text , #pdf_sub_brand_text').text(jQuery('#sub_brand  option:selected').text());
				jQuery('#wood_specie_text , #pdf_wood_specie_text').text(jQuery('#wood_specie  option:selected').text());
				jQuery('#door_finish_text , #pdf_door_finish_text').text(jQuery('#door_finish  option:selected').text());
				jQuery('#drawer_bases_text , #pdf_drawer_bases_text').text(jQuery('#drawer_bases  option:selected').text());
				jQuery('#molding_text , #pdf_molding_text').text(jQuery('#molding  option:selected').text());
				jQuery('#height_text , #pdf_height_text').text(jQuery('#height  option:selected').text());
				jQuery('#channals_text , #pdf_channals_text').text(jQuery('#channals  option:selected').text());
				
				jQuery('#sub_brand_calc').text(  " $ " + round_2_digits ( sub_brand_calc ) );
				jQuery('#wood_specie_calc').text( " $ " + round_2_digits ( wood_specie_calc ) );
				jQuery('#door_finish_calc').text( " $ " + round_2_digits ( door_finish_calc ) );
				jQuery('#base_cabinets_calc').text( " $ " + round_2_digits ( base_cabinets_calc ) );
				
				jQuery('#linear_feet_calc').text(linear_feet + " ft ");
				jQuery('#wood_specie_calc').text(  " $ " + round_2_digits ( wood_specie_calc ) );
				jQuery('#base_cabinets_calc').text(  " $ " + round_2_digits ( base_cabinets_calc ) );
				jQuery('#wall_cabinets_calc').text(  " $ " + round_2_digits ( wall_cabinets_calc ) );
				jQuery('#tall_cabinets_calc').text(  " $ " + round_2_digits ( tall_cabinets_calc ) );
				
				jQuery('#drawer_bases_calc').text(  " $ " + round_2_digits ( drawer_bases_calc ) );
				jQuery('#molding_calc').text(  " $ " + round_2_digits ( molding_calc ) );
				jQuery('#height_calc').text(  " $ " + round_2_digits ( height_calc ) );
				jQuery('#channals_calc').text(  " $ " + round_2_digits ( channals_calc ) );
				
				jQuery('#acessories_calc').text(  " $ " + round_2_digits ( acessories_calc ) );
				jQuery('#speciality_item_calc').text(  " $ " + round_2_digits ( speciality_item ) );
				
				
				let currentDate = new Date().toLocaleDateString();
				jQuery('#pdf_current_date').text(currentDate);
				
				
				
				jQuery('#base_cabinets_text , #pdf_base_cabinets_text').text(base_cabinets);
				jQuery('#wall_cabinets_text , #pdf_wall_cabinets_text').text(wall_cabinets);
				jQuery('#tall_cabinets_text , #pdf_tall_cabinets_text').text(tall_cabinets);
				jQuery('#acessories_text , #pdf_accessories_text').text(tall_cabinets);
				
				if (isOpen) {
					jQuery('#pdf_sub_brand_calc').text(  " $ " + round_2_digits ( sub_brand_calc ) );
					jQuery('#pdf_wood_specie_calc').text( " $ " + round_2_digits ( wood_specie_calc ) );
					jQuery('#pdf_door_finish_calc').text( " $ " + round_2_digits ( door_finish_calc ) );
					jQuery('#base_cabinets_calc , #pdf_base_cabinets_calc').text( " $ " + round_2_digits ( base_cabinets_calc ) );
					
					jQuery('#pdf_linear_feet_calc').text(linear_feet + " ft ");
					jQuery('#pdf_wood_specie_calc').text(  " $ " + round_2_digits ( wood_specie_calc ) );
					jQuery('#pdf_base_cabinets_calc').text(  " $ " + round_2_digits ( base_cabinets_calc ) );
					jQuery('#pdf_wall_cabinets_calc').text(  " $ " + round_2_digits ( wall_cabinets_calc ) );
					jQuery('#pdf_tall_cabinets_calc').text(  " $ " + round_2_digits ( tall_cabinets_calc ) );
					
					jQuery('#pdf_drawer_bases_calc').text(  " $ " + round_2_digits ( drawer_bases_calc ) );
					jQuery('#pdf_molding_calc').text(  " $ " + round_2_digits ( molding_calc ) );
					jQuery('#pdf_height_calc').text(  " $ " + round_2_digits ( height_calc ) );
					jQuery('#pdf_channals_calc').text(  " $ " + round_2_digits ( channals_calc ) );
					
					jQuery('#pdf_accessories_calc').text(  " $ " + round_2_digits ( acessories_calc ) );
					jQuery('#pdf_speciality_item_calc').text(  " $ " + round_2_digits ( speciality_item ) );
				}else{
					jQuery('.pdf_option_value').text('');
				}
			
			}
			
			// perform validation and calculations on click
				
			jQuery( "select , input.form-control" ).on("change", function(event) {

				event.preventDefault();

				initial_estimate_calc();
				
				
			});	
			
			jQuery( "#price_calc_btn" ).on("click", function(event) {

				event.preventDefault();
			
				var validator = $( "#priceCalcForm" ).validate();
				if( ! validator.form() ){
					$('html, body').animate({
						scrollTop: $("body").offset().top
					}, 1000);
					return;
				} 
				
				initial_estimate_calc();
				
				jQuery('.estimate , #range , .show_values_section').slideDown(400);
				jQuery('#range').css("display", "inline-block");
				jQuery('.show_values_section').css("display", "flex");

			});	
			
			

			jQuery('#cmd').click(function () {  
				initial_estimate_calc();
				printJS('editor1', 'html');								
			});				 
			
			
});
