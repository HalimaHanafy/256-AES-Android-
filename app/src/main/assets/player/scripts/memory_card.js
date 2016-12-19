var cards_arr=new Array();
var final=0;
var audioElement = document.createElement('audio');//to play sound 

$(function(){
    audioElement.setAttribute('src', 'sounds/activity.mp3');
    audioElement.play();
    
    for(var x=0; x<cards.length; x++){
        cards_arr.push('<div class="card effect__click animated zoomIn" keyWord="'+x+'"><div class="card__front"><img src="../../theme/images/flip_card.png"></div><div class="card__back"><p>'+cards[x].text+'</p></div></div>');
        
        cards_arr.push('<div class="card effect__click animated zoomIn" keyWord="'+x+'"><div class="card__front"><img src="../../theme/images/flip_card.png"></div><div class="card__back"><img src="images/'+cards[x].img+'"></div></div>');
    }
    shuffle(cards_arr);
    
    for(var x=0; x<cards_arr.length; x++){
        $('.container-fluid.memory_items').append(cards_arr[x]);
    }
    $('.card.effect__click').bind('click', handler);
});

var handler = function(){
    var c = this.classList;
    if(c.contains("flipped") == true){
        c.remove("flipped");
    }else{
        c.add("flipped");
        if($('.flipped').length == 2){
            $('.card.effect__click').unbind('click', handler);
            $('.card.effect__click').css('cursor', 'default');
            setTimeout(function(){
                if($('.flipped:first').attr('keyWord') == $('.flipped:last').attr('keyWord')){
                    final++
                    $('.flipped').empty().removeClass('flipped');
                    if(final == cards.length){
                        audioElement.setAttribute('src', '../../theme/sounds/correct_feedback.mp3');
                        audioElement.play();
                        $('#feedback').modal({
                            show: 'false'
                        });
                    }else{
                        audioElement.setAttribute('src', '../../theme/sounds/correct_answer.mp3');
                        audioElement.play();
                    }
                }else{
                    $('.flipped').removeClass('flipped');
                }
                $('.card.effect__click').bind('click', handler);
                $('.card.effect__click').css('cursor', 'pointer');
            },1000);
        }
    }
};

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}