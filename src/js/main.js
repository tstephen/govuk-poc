var dpa = (function() {
  var me = {
    flowable_url: 'http://localhost:8080/process-api',
  }

  me.append = function(selector, content) {
    var el = document.querySelector(selector);
    var temp = document.createElement('template');
    temp.innerHTML = content;
    el.append(temp.content);
  }

  me.audit = function(procId) {
     var creds =  btoa("admin:test");
     var json = '{"processDefinitionKey":"RegisterApplication","processInstanceId":"'+procId
         +'","includeProcessVariables": true}';
     fetch(me.flowable_url+'/query/historic-process-instances', {
      credentials: 'include',
      method: 'post',
      mode: 'cors',
      headers: {
        "Authorization": "Basic "+creds,
        "Accept": "application/json; charset=UTF-8",
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: json
    })
    .then(function (response) {
      console.log('Request succeeded with JSON response');
      response.json().then(function(json) {
        window.json = json;
        console.warn(''+json);
        var audit = json.data[0];
        document.getElementById('bizKey').innerText = audit.businessKey;
        document.getElementById('startDate').innerText
            = new Date(audit.startTime).toLocaleDateString(navigator.language,{ year: 'numeric', month: 'short', day: 'numeric' });
        document.getElementById('startTime').innerText
            = new Date(audit.startTime).toLocaleTimeString(navigator.language,{ });
        for (var idx in audit.variables) {
          var html = '<div class="govuk-summary-list__row">'
              +'<dt class="govuk-summary-list__key">'
              +audit.variables[idx].name
              +'</dt>'
              +'<dd class="govuk-summary-list__value">'
              +audit.variables[idx].value
              +'</dd>'
              +'<dd class="govuk-summary-list__actions">'
              +'<a class="govuk-link" href="#"> Change'
              +'<span class="govuk-visually-hidden"> name</span>'
              +'</a>'
              +'</dd>'
              +'</div>';
          me.append('.govuk-summary-list', html);
        }
      });
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
  }

  function buildUrl(template, params) {
    if (params == undefined) params = {};
    var keys = Object.keys(params);
    for (idx in keys) {
      var key = keys[idx];
      var re = new RegExp('{'+key+'}');
      template = template.replace(re, params[key]);
      console.error('  :'+template);
    }
    return me.flowable_url + template;
  }

  me.getSearchParameters = function() {
     var prmstr = window.location.search.substr(1);
     return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
  }
   
  function transformToAssocArray( prmstr ) {
     var params = {};
     var prmarr = prmstr.split("&");
     for ( var i = 0; i < prmarr.length; i++) {
         var tmparr = prmarr[i].split("=");
         params[tmparr[0]] = tmparr[1];
     }
     return params;
  }

  function postMessage(url, payload) {
    var json = {
      "processDefinitionKey":"RegisterApplication",
      "businessKey":"Register ISAC proposal application",
      "returnVariables":false,
      "variables": [ ]
    }
    var fd = new FormData(document.forms[0]);
    // Display the key/value pairs
    for(var pair of fd.entries()) {
      console.log(pair[0]+ ', '+ pair[1]); 
      json.variables.push({
        "name":pair[0],
        "value":pair[1],
      });
    }
   var creds =  btoa("admin:test");
   fetch(url, {
    credentials: 'include',
    method: 'post',
    mode: 'cors',
    headers: {
      "Authorization": "Basic "+creds,
      "Content-type": "application/json; charset=UTF-8"
    },
    body:JSON.stringify(json)
  })
  .then(payload)
  .then(function (response) {
    console.log('Request succeeded with JSON response');
    response.json().then(function(json) {
      window.json = json;
      console.warn(''+json);
      window.location.href = 'submitted.html?ref='+json.id
    });
  })
  .catch(function (error) {
    console.log('Request failed', error);
  });
 
  }

  function toJSONString( form ) {
    var obj = {};
    var elements = form.querySelectorAll( "input, select, textarea" );
    for( var i = 0; i < elements.length; ++i ) {
      var element = elements[i];
      var name = element.name;
      var value = element.value;

      if( name ) {
        obj[ name ] = value;
      }
    }

    return JSON.stringify( obj );
  }

  me.start = function(event) {
    var form = event.target.form.id;
    //e.preventDefault();
    //var json = toJSONString( this );

json = {
   "processDefinitionKey":"RegisterApplication",
   "businessKey":"Register ISAC protocol application",
   "returnVariables":false,
   "tenantId": "",
   "variables": [
      {
        "name":"myVar",
        "value":"This is a variable",
      }
   ]
}

    console.log('form as JSON'+json);
    postMessage(buildUrl('/runtime/process-instances'),
        json, '/submitted.html');
  };

  return me;
})();
