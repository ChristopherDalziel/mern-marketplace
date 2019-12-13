function catchErrors(error, displayError) {
  let errorMsg;
  if(error.response){
    // The request was made and the sever responded with a status code that is not in the range of 200
    errorMsg = error.response.data;
    console.error("Error Response", errorMsg)

    // For CLOUDINARY image upload errors
    if(error.response.data.error){
      errorMsg = error.response.data.error.message
    }
  } else if(error.request) { 
    // the request was made but no response was recieved
    errorMsg = error.request;
    console.error("Error Request", errorMsg)
  } else {
    // Something else happened in the request that caused the error
    errorMsg = error.message;
    console.error("Error Message", errorMsg)
  }
  displayError(errorMsg);
}

export default catchErrors;

// When we use console.error the console log displays with a red message to indicate there has been an error.