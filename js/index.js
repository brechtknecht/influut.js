//Influut.js
var influutSelector = 'inf';
var influutDivs = jQuery.makeArray( $('.' + influutSelector + '').toArray());
var influutArray = jQuery.makeArray();

$(document).ready(function(){
    pushToInfluutArray(getInfluutColors(), getInfluutType());
    influutColorHandler();
    debug();
});

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function getInfluutType() {
    var influutTypes = jQuery.makeArray();
    jQuery.each(influutDivs, function(){
       if($(this).hasClass('incoming')){
            influutTypes.push('incoming');
       }
        if($(this).hasClass('middle')){
            influutTypes.push('middle');
        }

    });
    return influutTypes;
}

function getInfluutColors(){
    var colors = jQuery.makeArray();
    jQuery.each(influutDivs, function(){
        var classList = $(this).attr('class').split(/\s+/);
        colors.push(hexToRgb(classList[2]));
            if(classList.length < 4){
                colors.push(null);
            }else{
                colors.push(hexToRgb(classList[3]));
            }
        }
    );
    return colors;
}
//pushes All information into array
// 1. div reference - cell 1
// 2. influut type - cell 2
// 3. influut colors - cell 3&4
// size for one influutElement = 4
function pushToInfluutArray(colors, influutTypes){
    for(var i = 0 ; i < influutDivs.length; i++){
        influutArray.push(influutDivs[i]);
        influutArray.push(influutTypes[i]);
        var temp = i;
        if(i > 0){i = i+i;}
        influutArray.push(colors[i]);
        influutArray.push(colors[i + 1]);
        if(i > 0) {i = i-temp;}
    }
}

//reads out array and starts specific functions
function influutColorHandler(){
    for(var i = 0; i < influutArray.length; i += 4){
        var currentElement = i;
        var currentElementType = influutArray[i + 1];

        if(currentElementType == 'incoming'){
            influutIncoming(currentElement);
        }
    }
}

function influutIncoming(elementID){
    $(window).scroll(function(){
        var windowPositionTop = $(window).scrollTop();
        var windowPositionBottom = windowPositionTop + $(window).height();
        var objectOffset = $(influutArray[elementID]).offset().top;
        var colorOpacity = (windowPositionBottom - objectOffset) / $(window).height();
        if(windowPositionBottom > objectOffset){
            if(windowPositionTop > objectOffset){
                return;
            }
            $(influutArray[elementID]).css('background', 'rgba(' + influutArray[elementID + 2].r + ',' + influutArray[elementID + 2].g + ',' + influutArray[elementID + 2].b + ',' + colorOpacity + ')');
        }
    });
}

function debug(){
    console.log(influutArray);
}