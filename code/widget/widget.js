/***
 * Excerpted from "Web Development Recipes",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/wbdev2 for more book information.
***/
(function() {
  var jQuery;
  if (window.jQuery === undefined || window.jQuery.fn.jquery !== '2.1.3') {
      var jqueryScript = document.createElement('script');
      jqueryScript.setAttribute("src",
        "//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js");
      jqueryScript.setAttribute("type","text/javascript");
      jqueryScript.onload = loadjQuery; // All browser loading, except IE
      jqueryScript.onreadystatechange = function () { // IE loading
      if (this.readyState == 'complete' || this.readyState == 'loaded')
        { loadjQuery(); }
      };
      // Insert jQuery to the head of the page or to the documentElement
      (document.getElementsByTagName("head")[0] ||
        document.documentElement).appendChild(jqueryScript);
  } else {
    // The jQuery version on the window is the one we want to use
    jQuery = window.jQuery;
    widget(jQuery);
  }

    function loadjQuery() {
      // load jQuery in noConflict mode to avoid issues with other libraries
      jQuery = window.jQuery.noConflict(true);
      widget(jQuery);
    }

  function widget($) {
    // Load Data
    var account = 'rails';
    var project = 'rails';

    jQuery.ajax({
      url: 'http://api.github.com/repos/'+account+'/'+project+'/commits',
      dataType: "jsonp",
      success: function(data){
        jQuery.each(data.data, function(i,commit){
          if(commit.committer !== null){
            var commitDiv = document.createElement('div');
            commitDiv.setAttribute("class", "commit");
            commitDiv.setAttribute("id","commit_"+commit.sha);
            jQuery('#widget').append(commitDiv);
            jQuery('#commit_'+commit.sha).append("<h3>"+
              new Date(commit.commit.committer.date)+
              "</h3><p>"+commit.commit.message+"</p>"+
              "<p>By "+commit.committer.login+"</p>");
          }
        });
      }
    });


    var css = jQuery("<link>", {
      rel: "stylesheet",
      type: "text/css",
      href: "widget.css"
    });
    css.appendTo('head');
  }
})();
