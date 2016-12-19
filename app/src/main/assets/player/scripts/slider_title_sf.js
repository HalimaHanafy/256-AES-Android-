var count=0;
var audioElement;//to play sound

$(function(){
    //append items to screen
    $('.page_title').html(jsonData.title);
    for(var x=0; x<jsonData.terms.length; x++){
        $('.carousel-indicators').append('<li data-target="#myCarousel" data-slide-to="'+x+'"></li>');
        $('.carousel-inner').append('<div class="item"><p>'+jsonData.terms[x].title+'</p><img src="images/'+jsonData.terms[x].image+'" alt=""><div class="sound"><i class="fa fa-volume-up"></i></div></div>');
    }
    $('.item:nth-child(1)').addClass('active');
    $('.carousel-indicators li:nth-child(1)').addClass('active');
    
    //stop auto slide
    $('.carousel').carousel({
        pause: true,
        interval: false
    });
    
    audioElement=$('<audio id="audioDemo" controls preload="auto"><source src="sounds/' + jsonData.narration + '.mp3" type="audio/mp3"></audio>');
    audioElement[0].play();
    
    audioElement.bind('ended',function() { 
        if(count ==0){
            audioElement=$('<audio id="audioDemo" controls preload="auto"><source src="sounds/' + jsonData.terms[0].narration + '.mp3" type="audio/mp3"></audio>');        
            audioElement[0].play();
            audioElement.bind('ended',function() { 
                audioElement[0].pause();
            });
        }        
        count++;
    });
    
    $('.fa-volume-up, .fa-volume-down').click(function(){
        $(this).toggleClass('fa-volume-up fa-volume-down');                
            if($(this).hasClass('fa-volume-up')){                    
                audioElement[0].play();
            }else{
                audioElement[0].pause();
            }
    });
    
    //on slide image change
    $('#myCarousel').on('slid.bs.carousel', function() {
        $('.sound').html('<i class="fa fa-volume-up"></i>');
        audioElement[0].pause();
        audioElement=$('<audio id="audioDemo" controls preload="auto"><source src="sounds/' +jsonData.terms[$('div.active').index()].narration + '.mp3" type="audio/mp3"></audio>');
        audioElement[0].play();
        
        $('.fa-volume-up, .fa-volume-down').click(function(){
            $(this).toggleClass('fa-volume-up fa-volume-down');                
            if($(this).hasClass('fa-volume-up')){                    
                audioElement[0].play();
            }else{
                audioElement[0].pause();
            }
        });
    }); 
});