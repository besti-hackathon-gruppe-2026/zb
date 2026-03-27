test-create-classroom:
	curl --header "Content-Type: application/json" \
	  --request POST \
	  --data '{"classroomName":"asdasd"}' \
	  http://localhost:8001/api/classroom/create

test-delete-classroom:
	curl --header "Content-Type: application/json" \
	  --request POST \
	  --data '{"classroomId":6}' \
	  http://localhost:8001/api/classroom/delete

test-get-classroom:
	curl http://localhost:8001/api/classrooms

test-update-classroom:
	curl --header "Content-Type: application/json" \
	  --request POST \
	  --data '{"classroomId":5,"classroomName":"foo"}' \
	  http://localhost:8001/api/classroom/update


test-server:
	curl http://localhost:8001/