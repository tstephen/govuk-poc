(function() {

  function init() {
    var ref = dpa.getSearchParameters()['ref'];
    if (ref != undefined) {
      var panel = document.querySelector('.govuk-panel');
      var temp = document.createElement('template');
      temp.innerHTML = 
          '  <div class="govuk-panel__body"> Your reference number <br><strong>'
          +ref
          +'</strong> </div>';
      var frag = temp.content;
      panel.append(frag);
    }
  }

  document.addEventListener( "DOMContentLoaded", function() {
    init();
  });
})();
