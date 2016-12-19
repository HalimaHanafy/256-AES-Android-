var myArray=new Array();
var right_trials=0;
var audioElement = document.createElement('audio');

$(function(){
    audioElement.setAttribute('src', 'sounds/activity.mp3');
    audioElement.play();
    for(var x=0; x<jsonData.length; x++){
        myArray[x]=jsonData[x].desc1;
    }
    for(var x=0; x<jsonData.length; x++){
        myArray[myArray.length]=jsonData[x].desc2;
    }
    shuffle(myArray);

    // add content to desktop
    for(var x=0; x<jsonData.length; x++){
        $('.quiz').append('<div class="cont"><span>'+jsonData[x].title+'</span><img src="images/gate.png"><div class="desc1">.</div><div class="desc2">.</div></div>');
    }
    
    for(var x=0; x<myArray.length; x++){
        $('.dragged').append('<span>'+myArray[x]+'</span>');
    }
    
    $('.dragged span').css('cursor', 'move').draggable({
		revert: true,
		containment: $('.all'),
		start:  function(event, ui) {
			$(this).css('z-index','2');
		},
		stop :  function() {   
		}
	});
    
    $('.cont div').droppable({
		tolerance: 'pointer',
        accept: ".dragged span",
		drop: function (event, ui) {  
//            alert($(ui.draggable).text());
//            alert($(this).attr('class').split(' ')[0])
//            alert($(this).parent().children('span').text());
            for(var x=0; x<jsonData.length; x++){
                if(jsonData[x].title == $(this).parent().children('span').text()){
                    if(jsonData[x][$(this).attr('class').split(' ')[0]] == $(ui.draggable).text()){
                        $(this).text($(ui.draggable).text());
                        $(ui.draggable).remove();
                        right_trials++;
                        if(right_trials ==myArray.length){                            
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
                        audioElement.setAttribute('src', '../../theme/sounds/scrape-and-drag1.mp3');
                        audioElement.play();
                    }
                }
            }
		}
	});
    
});

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}