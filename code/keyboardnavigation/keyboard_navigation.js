/***
 * Excerpted from "Web Development Recipes",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/wbdev2 for more book information.
***/
$(document).keydown(function(e) {
  if($(document.activeElement)[0] === $(document.body)[0]){
    switch(e.keyCode){
    // In Page Navigation
    case 74: // j
      scrollToNext();
      break;
    case 75: // k
      scrollToPrevious();
      break;
    // Between Page Navigation
    case 39: // right arrow
      loadNextPage();
      break;
    case 37: // left arrow
      loadPreviousPage();
      break;
    // Search
    case 191: // / (and ? with shift)
      if(e.shiftKey){
        $('#search').focus().val('');
        return false;
      }
      break;
    }
  }
});

var currentEntry = -1;

function loadNextPage(){
  var pageNumber = getCurrentPageNumber() + 1;
  var url = window.location.href;
  if (url.indexOf('page=') !== -1){
    window.location.href = replacePageNumber(pageNumber);
  } 
  else {
    var joinChar = (url.indexOf('?') > -1) ? '&' : '?';
    window.location.href += joinChar + pageNumber;
  }
}

function loadPreviousPage(){
  pageNumber = getCurrentPageNumber() - 1;
  if (pageNumber > 0){
    window.location.href = replacePageNumber(pageNumber);
  }
}

function getCurrentPageNumber(){
  return parseInt(getQueryString('page') || 1);
}

function getQueryString(name){
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  var val = null;
  if (r !== null) val = unescape(r[2]);
  return val;
}

function replacePageNumber(pageNumber){
  return window.location.href.replace(/page=(\d+)/,'page='+pageNumber);
}

function scrollToNext(){
  if($('.entry').size() > currentEntry + 1){
    currentEntry++;
    scrollToEntry(currentEntry);
  }
}

function scrollToPrevious(){
  if(currentEntry > 0){
    currentEntry--;
    scrollToEntry(currentEntry);
  }
}

function scrollToEntry(entryIndex){
  var top = $("#" + $('.entry')[entryIndex].id).offset().top;
  $('html,body').animate({ scrollTop: top }, 'slow');
}
