/***
 * Excerpted from "Web Development Recipes",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/wbdev2 for more book information.
***/
(function($) {
  var currentPage = 0;

  function loadData(data) {
    $('#content').append(Handlebars.compile("{{#products}} \
      <div class='product'> \
        <a href='/products/{{id}}'>{{name}}</a> \
        <br> \
        <span class='description'>{{description}}</span> \
        </div>{{/products}}")({ products: data }));
    if (data.length === 0) $('#next_page_spinner').hide();
  }

  function nextPageWithJSON() {
    currentPage += 1;
    var newURL = '/products.json?page=' + currentPage;

    var splitHref = document.URL.split('?');
    var parameters = splitHref[1];
    if (parameters) {
      parameters = parameters.replace(/[?&]page=[^&]*/, '');
      newURL += '&' + parameters;
    }
    return newURL;
  }

  var loadingPage = 0;
  function getNextPage() {
      if (loadingPage === 0) {
          loadingPage++;
          $.getJSON(nextPageWithJSON(), {}, updateContent)
              .complete(function() { loadingPage--; });
      }
  }

  function updateContent(response) {
    loadData(response);
  }

  function readyForNextPage() {
    if (!$('#next_page_spinner').is(':visible')) return;

    var threshold = 200;
    var bottomPosition = $(window).scrollTop() + $(window).height();
    var distanceFromBottom = $(document).height() - bottomPosition;
    return distanceFromBottom <= threshold;
  }

  function observeScroll(event) {
    if (readyForNextPage()) getNextPage();
  }
  $(document).scroll(observeScroll);

  getNextPage();
})(jQuery);

