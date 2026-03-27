test-create-classroom:
	curl --header "Content-Type: application/json" \
	  --request POST \
	  --data '{"classroomName":"asdasd"}' \
	  http://localhost:8001/api/classroom/create

test-get-classroom:
	curl http://localhost:8001/api/classrooms

test-update-classroom:
	curl --header "Content-Type: application/json" \
	  --request POST \
	  --data '{"classroomId":5,"classroomName":"foo"}' \
	  http://localhost:8001/api/classroom/update

test-delete-classroom:
	curl --header "Content-Type: application/json" \
	  --request POST \
	  --data '{"classroomId":6}' \
	  http://localhost:8001/api/classroom/delete


test-create-filter:
	curl --header "Content-Type: application/json" \
	  --request POST \
	  --data '{"classroomId":5,"url":"google.com","ip":null}' \
	  http://localhost:8001/api/filter/create

test-get-filter:
	curl http://localhost:8001/api/filters

test-update-filter:
	curl --header "Content-Type: application/json" \
	  --request POST \
	  --data '{"filterId":1,"classroomId":5,"url":"google.ch","ip":"51.154.72.130"}' \
	  http://localhost:8001/api/filter/update

test-delete-filter:
	curl --header "Content-Type: application/json" \
	  --request POST \
	  --data '{"filterId":1}' \
	  http://localhost:8001/api/filter/delete



test-server:
	curl http://localhost:8001/