
/**
 * Return Same Erorr Response As a Json Response
 * @param {The Catched Exception} exception 
 * @param {The Passed Parameters} reqBody 
 * @param {Response Code} code 
 * @returns Json Error Object
 */
 export let getErrorResponse = (exception, reqBody, code) => {
    return {
        message: exception.message,
        params: reqBody,
        code: code
    };
} 

/**
 * Return Same Erorr Response As a Json Response
 * @param {Message Validation} message 
 * @param {The Passed Parameters} reqBody 
 * @param {Response Code} code 
 * @returns Json Error Object
 */
 export let getErrorMessageResponse = (message, reqBody, code) => {
    return {
        message: message,
        params: reqBody,
        code: code
    };
} 

export let getSuccessResponse = (message, value, code) => {
    return {
        message: message,
        data: value,
        code: code
    };
}

