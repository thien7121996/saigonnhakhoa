
$('#check-minutes').click(function (e) {
    // Have to stop propagation here
    e.stopPropagation();
    input.clockpicker('show').clockpicker('toggleView', 'minutes');
});

// Date Picker

jQuery('#datepicker').datepicker({
    format: 'dd/mm/yyyy'
});
jQuery('#datepicker-autoclose').datepicker({
    autoclose: true
    , todayHighlight: true
});
jQuery('#end, #start').datepicker({
    format: 'dd/mm/yyyy',
    value: new Date()
});
jQuery('#date-range').datepicker({
    
    format: 'dd/mm/yyyy'
});

jQuery('#datepicker-inline').datepicker({
    todayHighlight: true,
    format: 'DD/MM/YYYY'
});

// Daterange picker
$('.input-daterange-datepicker').daterangepicker({
    format: 'DD/MM/YYYY'
    , minDate: '06/10/2020'
    , maxDate: '08/10/2021',
    buttonClasses: ['btn', 'btn-sm']
    , applyClass: 'btn-danger'
    , cancelClass: 'btn-inverse',
    locale: {
        format: 'DD/MM/YYYY'
      }
});
$(".applyBtn").click(function(){
    setTimeout(function(){
        $("#buttimkiem").click();
    }, 500);
    
})
$('.input-daterange-timepicker').daterangepicker({
    format: 'DD/MM/YYYY'
    , timePickerIncrement: 30
    , timePicker12Hour: true
    , timePickerSeconds: false
    , buttonClasses: ['btn', 'btn-sm']
    , applyClass: 'btn-danger'
    , cancelClass: 'btn-inverse'
});
$('.input-limit-datepicker').daterangepicker({
    format: 'DD/MM/YYYY'
    , minDate: '06/10/2020'
    , maxDate: '08/10/2020'
    , buttonClasses: ['btn', 'btn-sm']
    , applyClass: 'btn-danger'
    , cancelClass: 'btn-inverse'
    , dateLimit: {
        days: 6
    }
});
$("#chonkhoangngaytao").change(function(){
    if($(this).is(':checked') === true)
    {
        $("#chonngaytao").prop('checked', false);
        $("#khoanngaydatao").removeClass("hidden");
        $("#inputngaytao").addClass("hidden");
        $("#khoanngaydatao input").val("");
        $("#inputngaytao input").val("");
    }
  
});
$("#chonngaytao").change(function(){
    if($(this).is(':checked') === true){
        $("#chonkhoangngaytao").prop('checked', false);
        $("#khoanngaydatao").addClass("hidden");
        $("#inputngaytao").removeClass("hidden");
        $("#khoanngaydatao input").val("");
        $("#inputngaytao input").val("");
    }
   
});
$("#chonthoigianhen").change(function(){
    if($(this).is(':checked') === true){
        $("#chonthoigianhenkhoang").prop('checked', false);
        $("#inputhenngay").removeClass("hidden");
        $("#inputkhoangngayhen").addClass("hidden");
        $("#inputhenngay input").val("");
        $("#inputkhoangngayhen input").val("");
    }
   
});
$("#chonthoigianhenkhoang").change(function(){
    if($(this).is(':checked') === true){
        $("#chonthoigianhen").prop('checked', false);
        $("#inputhenngay").addClass("hidden");
        $("#inputkhoangngayhen").removeClass("hidden");
        $("#inputhenngay input").val("");
        $("#inputkhoangngayhen input").val("");
    }
  
});
$(".react-photo-gallery--gallery img").click(function(){
    $(this).addClass("selectedimg");
});
$('#single-input').clockpicker({
    placement: 'bottom'
    , align: 'left'
    , autoclose: true
    , 'default': 'now'
});
$('.clockpicker').clockpicker({
    donetext: 'Done'
, }).find('input').change(function () {
    console.log(this.value);
});
$('#check-minutes').click(function (e) {
    // Have to stop propagation here
    e.stopPropagation();
    input.clockpicker('show').clockpicker('toggleView', 'minutes');
});
$("#btnopenj").click(function(){
    if($("#logomain").hasClass("logonmin"))
    {
        $("#logomain").removeClass("logonmin");
    }
    if(!$("#logomain").hasClass("logonmin")){
        $("#logomain").addClass("logonmin");
    }
    
})
// Colorpicker

$('.mydatepicker').datepicker({
    
    format: 'dd/mm/yyyy'
});
var date = new Date();

var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
$('.doanhthudatepicker').datepicker({
    
    format: 'dd/mm/yyyy'
    , startDate: firstDay
    , endDate: lastDay,
});
  
$('.input-daterange-datepicker-month').daterangepicker({
    
    format: 'DD/MM/YYYY'
    , minDate: firstDay
    , maxDate: lastDay,
    buttonClasses: ['btn', 'btn-sm']
    , applyClass: 'btn-danger'
    , cancelClass: 'btn-inverse',
    locale: {
        format: 'DD/MM/YYYY'
      }
});
    // build the locale selector's options
  
  
 