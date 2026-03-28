test-all: test-create-classroom test-get-classroom test-create-filter test-get-filter test-register

test-create-classroom:
	curl --header "Content-Type: application/json" \
	  --request POST \
	  --data '{"classroomName":"asdasd"}' \
	  http://localhost:8000/api/classroom/create

test-get-classroom:
	curl http://localhost:8000/api/classrooms

test-create-filter:
	curl --header "Content-Type: application/json" \
	  --request POST \
	  --data '{"classroomId":1,"url":"google.com","ip":null}' \
	  http://localhost:8000/api/filter/create

test-get-filter:
	curl http://localhost:8000/api/filters

test-register:
	curl --header "Content-Type: application/json" \
	  --request POST \
	  --data '{"username":"foo","password":"a","confirmPassword":"a"}' \
	  http://localhost:8000/auth/register
