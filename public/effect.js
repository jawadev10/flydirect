$(document).ready(function(){
$('#paragraphe a').click(function(){
    var text = $(this).children('p');
    if(text.is(':hidden')){
        text.slideDown('500');
        $(this).children('span').html('-');
    }
    else{
        text.slideUp('300');
        $(this).children('span').html('+');
    }
});
});

