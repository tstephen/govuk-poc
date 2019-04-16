## Start process by key
curl 'http://localhost:8080/process-api/runtime/process-instances' --compressed -H 'Authorization: Basic YWRtaW46dGVzdA==' -H 'Content-type: application/json; charset=UTF-8' -H 'Origin: http://localhost:8085' --data '{"processDefinitionKey":"RegisterApplication","businessKey":"myBusinessKey","returnVariables":false,"variables":[{"name":"myVar","value":"This is a variable"}]}'

## List instances
curl 'http://localhost:8080/process-api/query/historic-process-instances' --compressed -H 'Authorization: Basic YWRtaW46dGVzdA==' -H 'Content-type: application/json; charset=UTF-8' -H 'Origin: http://localhost:8085' --data '{"processDefinitionKey":"RegisterApplication"}'

## List instances with vars
curl 'http://localhost:8080/process-api/query/historic-process-instances' --compressed -H 'Authorization: Basic YWRtaW46dGVzdA==' -H 'Content-type: application/json; charset=UTF-8' -H 'Origin: http://localhost:8085' --data '{"processDefinitionKey":"RegisterApplication", "includeProcessVariables": true}'

## List instances with vars filtered on server to a single process instance
curl 'http://localhost:8080/process-api/query/historic-process-instances' -H 'Accept: application/json; charset=UTF-8' --compressed  -H 'Authorization: Basic YWRtaW46dGVzdA==' -H 'Content-Type: application/json; charset=UTF-8' --data '{"processDefinitionKey":"RegisterApplication","processInstanceId":"cab16378-606f-11e9-9e24-acde48001122","includeProcessVariables": true}'
