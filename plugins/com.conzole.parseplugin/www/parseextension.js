var parseObject = {

	initialize : function(successCallback, errorCallback){
		cordova.exec(
            successCallback, // success callback function
            errorCallback, // error callback function
            'ParsePlugin', // mapped to our native Java class called "ParseExtension"
            'initialize', // with this action name
            [{                  // and this array of custom arguments to create our entry
                "appid": "test1",
                "clientkey": "test2"
            }]
        ); 
	},
	
	fbLogin : function(successCallback, errorCallback){
		cordova.exec(
            successCallback, // success callback function
            errorCallback, // error callback function
            'ParsePlugin', // mapped to our native Java class called "ParseExtension"
            'fbLogin', // with this action name
            [{                  // and this array of custom arguments to create our entry
                
            }]
        ); 
	},
	
	signup : function(userObject, successCallback, errorCallback){
		cordova.exec(
            successCallback, // success callback function
            errorCallback, // error callback function
            'ParsePlugin', // mapped to our native Java class called "ParseExtension"
            'signup', // with this action name
            [ userObject ]
        ); 
	},
	
	updateUser : function(userObject, successCallback, errorCallback){
		cordova.exec(
            successCallback, // success callback function
            errorCallback, // error callback function
            'ParsePlugin', // mapped to our native Java class called "ParseExtension"
            'updateUser', // with this action name
            [ userObject ]
        ); 
	},
	
	login : function(user, password, successCallback, errorCallback){
		cordova.exec(
            successCallback, // success callback function
            errorCallback, // error callback function
            'ParsePlugin', // mapped to our native Java class called "ParseExtension"
            'login', // with this action name
            [{                  // and this array of custom arguments to create our entry
                "user" : user,
				"password" : password
            }]
        ); 
	},
	
	logout : function(successCallback, errorCallback){
		cordova.exec(
            successCallback, // success callback function
            errorCallback, // error callback function
            'ParsePlugin', // mapped to our native Java class called "ParseExtension"
            'logout', // with this action name
            [{                  // and this array of custom arguments to create our entry
                
            }]
        ); 
	},
	
	isLoggedIn : function(successCallback, errorCallback){
		cordova.exec(
            successCallback, // success callback function
            errorCallback, // error callback function
            'ParsePlugin', // mapped to our native Java class called "ParseExtension"
            'isLoggedIn', // with this action name
            [{                  // and this array of custom arguments to create our entry
                
            }]
        ); 
	},
	
	isFbLinked : function(successCallback, errorCallback){
		cordova.exec(
            successCallback, // success callback function
            errorCallback, // error callback function
            'ParsePlugin', // mapped to our native Java class called "ParseExtension"
            'isFbLinked', // with this action name
            [{                  // and this array of custom arguments to create our entry
                
            }]
        ); 
	},

	queryQuestions : function(successCallback, errorCallback){
		cordova.exec(
            successCallback, // success callback function
            errorCallback, // error callback function
            'ParsePlugin', // mapped to our native Java class called "ParseExtension"
            'queryQuestions', // with this action name
            [{                  // and this array of custom arguments to create our entry
                
            }]
        ); 
	},
	
	askQuestion : function(questionObject, successCallback, errorCallback){
		cordova.exec(
            successCallback, // success callback function
            errorCallback, // error callback function
            'ParsePlugin', // mapped to our native Java class called "ParseExtension"
            'askQuestion', // with this action name
            [ questionObject ]
        ); 
	},
}

module.exports = parseObject;