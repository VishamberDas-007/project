// object contains necessary key:value pairs to be reused
const response = {
	message: "",
	status: 200,
	error: "",
	data: "",
};

// to use this function to respond to already existing response
function alreadyExists(message) {
	response.status = 409;
	response.message = message;
	response.error = "";
	response.data = "";
	return response;
}

// to use this function to respond to successfull response
function successResponse(message, data) {
	response.message = message;
	response.status = 200;
	response.error = "";
	response.data = data;
	return response;
}

// to use this function to respond to error containing response
function errorResponse(message, error) {
	response.message = message;
	response.error = error;
	response.status = 500;
	response.data = "";
	return response;
}

// to use this function to respond to not found response
function notFound(message) {
	response.message = message;
	response.status = 404;
	response.data = "";
	response.error = "";
	return response;
}

// exporting all the functions
module.exports = {
	alreadyExists,
	successResponse,
	errorResponse,
	notFound,
};
