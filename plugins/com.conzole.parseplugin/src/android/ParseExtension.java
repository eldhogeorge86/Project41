package com.conzole.parseplugin;
 
import java.util.List;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

import com.parse.FindCallback;
import com.parse.LogInCallback;
import com.parse.Parse;
import com.parse.ParseFacebookUtils;
import com.parse.ParseObject;
import com.parse.ParseQuery;
import com.parse.ParseUser;
import com.parse.ParseException;
import com.parse.SaveCallback;
import com.parse.SignUpCallback;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

public class ParseExtension extends CordovaPlugin {

	private final String TAG = "ParseExtension";
	
	@Override
	public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
		
		try {
			Log.d(TAG, "action:" + action);
			cordova.setActivityResultCallback(this);
			
			if (action.equals("initialize")) {
				Parse.initialize(cordova.getActivity(), "KtEEaus447TpIR7NTGJVQs3Oj982qM2Ccz8oEhke",
						"5tAzG9eU6r1xrUiarLyrw9CbDH8hIZDj9JEqNx0u");
		        
		        ParseFacebookUtils.initialize("1459231424341380");
		        
		        callbackContext.success();
		        return true;
			}
			
			if (action.equals("fbLogin")) {
				fbLogin(cordova.getActivity(), callbackContext);
				return true;
			}
			
			if (action.equals("signup")) {
				JSONObject arg_object = args.getJSONObject(0);
				signUp(arg_object, callbackContext);
				return true;
			}
			
			if (action.equals("updateUser")) {
				JSONObject arg_object = args.getJSONObject(0);
				updateUser(arg_object, callbackContext);
				return true;
			}
			
			if (action.equals("askQuestion")) {
				JSONObject arg_object = args.getJSONObject(0);
				askQuestion(arg_object, callbackContext);
				return true;
			}
			
			if (action.equals("queryQuestions")) {
				queryQuestions(callbackContext);
				return true;
			}
			
			if (action.equals("login")) {
				JSONObject arg_object = args.getJSONObject(0);
				logIn(arg_object.getString("user"), arg_object.getString("password"), callbackContext);
				return true;
			}
			
			if (action.equals("logout")) {
				logOut(callbackContext);
				return true;
			}
			
			if (action.equals("isLoggedIn")) {
				isLoggedIn(callbackContext);
				return true;
			}
			
			if (action.equals("isFbLinked")) {
				isFbLinked(callbackContext);
				return true;
			}
			
			callbackContext.error("Invalid action");
		    return false;
		} catch(Exception e) {
			Log.d(TAG, "Exception: " + e.getMessage());
		    callbackContext.error(e.getMessage());
		    return false;
		} 
		
	}

	private void queryQuestions(final CallbackContext callbackContext){
		ParseUser currentUser = ParseUser.getCurrentUser();
		
		ParseQuery<ParseObject> query = ParseQuery.getQuery("Question");
		query.include("user");
		query.include("answer1");
		query.include("answer2");
		query.include("answer3");
		query.include("answer4");
		query.include("answer5");
		query.findInBackground(new FindCallback<ParseObject>() {
		    public void done(List<ParseObject> qList, ParseException e) {
		        if (e == null) {
		            Log.d(TAG, "Retrieved " + qList.size() + " qs");
		            createJsonFromQuery(qList, callbackContext);
		        } else {
		            Log.d(TAG, "Error: " + e.getMessage());
		            callbackContext.error(e.getMessage());
		        }
		    }
		});
	}
	
	private void createJsonFromQuery(List<ParseObject> qList, final CallbackContext callbackContext){
		try {
			
			JSONObject ret = new JSONObject();
			
			JSONArray array = new JSONArray();
			for (ParseObject question : qList) {
				JSONObject jsonQ = new JSONObject();
				jsonQ.put("id", question.getString("objectId"));
				jsonQ.put("data", question.getString("data"));
				
				ParseObject user = question.getParseObject("user");
				JSONObject jsonUser = new JSONObject();
				jsonUser.put("id", user.getString("objectId"));
				jsonUser.put("name", user.getString("name"));
				
				jsonQ.put("user", jsonUser);
				
				if(question.has("answer1")){
					ParseObject answer = question.getParseObject("answer1");
					JSONObject jsonAns = new JSONObject();
					
					jsonAns.put("id", answer.getString("objectId"));
					jsonAns.put("text", answer.getString("text"));
					jsonAns.put("count", answer.getInt("count"));
					
					jsonQ.put("answer1", jsonAns);
				}
				
				if(question.has("answer2")){
					ParseObject answer = question.getParseObject("answer2");
					JSONObject jsonAns = new JSONObject();
					
					jsonAns.put("id", answer.getString("objectId"));
					jsonAns.put("text", answer.getString("text"));
					jsonAns.put("count", answer.getInt("count"));
					
					jsonQ.put("answer2", jsonAns);
				}
				
				if(question.has("answer3")){
					ParseObject answer = question.getParseObject("answer3");
					JSONObject jsonAns = new JSONObject();
					
					jsonAns.put("id", answer.getString("objectId"));
					jsonAns.put("text", answer.getString("text"));
					jsonAns.put("count", answer.getInt("count"));
					
					jsonQ.put("answer3", jsonAns);
				}
				
				if(question.has("answer4")){
					ParseObject answer = question.getParseObject("answer4");
					JSONObject jsonAns = new JSONObject();
					
					jsonAns.put("id", answer.getString("objectId"));
					jsonAns.put("text", answer.getString("text"));
					jsonAns.put("count", answer.getInt("count"));
					
					jsonQ.put("answer4", jsonAns);
				}
				
				if(question.has("answer5")){
					ParseObject answer = question.getParseObject("answer5");
					JSONObject jsonAns = new JSONObject();
					
					jsonAns.put("id", answer.getString("objectId"));
					jsonAns.put("text", answer.getString("text"));
					jsonAns.put("count", answer.getInt("count"));
					
					jsonQ.put("answer5", jsonAns);
				}
				
				array.put(jsonQ);
			}
			
			ret.put("questions", array);
			
			callbackContext.success(ret);
		}
		catch (JSONException e) {
			Log.e(TAG, "Bad thing happened with profile json", e);
			callbackContext.error("json exception");
		}
	}
	
	private void logIn(String userName, String password, final CallbackContext callbackContext){
		ParseUser.logInInBackground(userName, password, new LogInCallback() {
			  public void done(ParseUser user, ParseException e) {
			    if (user != null) {
					JSONObject ret = getCurrentUser();
					Log.d(TAG, "User logged in!");
					callbackContext.success(ret);
			    } else {
			      // Signup failed. Look at the ParseException to see what happened.
			    	Log.d(TAG, "Exception: " + e.getMessage());
				    callbackContext.error(e.getMessage());
			    }
			  }
			});
	}
	
	private void isLoggedIn(final CallbackContext callbackContext){
		ParseUser currentUser = ParseUser.getCurrentUser();
		try {
			JSONObject ret;
			if (currentUser != null) {
				ret = getCurrentUser();
				ret.put("exists", true);
			} else {
			  // show the signup or login screen
				ret = new JSONObject();
				ret.put("exists", false);
			}
			callbackContext.success(ret);
		} catch (JSONException e) {
			Log.e(TAG, "Bad thing happened with profile json", e);
			callbackContext.error("json exception");
		}
	}
	
	private void logOut(final CallbackContext callbackContext){
		ParseUser.logOut();
		callbackContext.success();
	}
	
	private void isFbLinked(final CallbackContext callbackContext){
		ParseUser currentUser = ParseUser.getCurrentUser();
		try {
			JSONObject ret = new JSONObject();
			if (currentUser != null) {
			  // do stuff with the user
				if (ParseFacebookUtils.isLinked(currentUser)) {
					ret.put("linked", true);
				} else{
					ret.put("linked", false);
				}
				
			} else {
			  // show the signup or login screen
				ret.put("linked", false);
			}
			callbackContext.success(ret);
		} catch (JSONException e) {
			Log.e(TAG, "Bad thing happened with profile json", e);
			callbackContext.error("json exception");
		}
	}
	
	private void fbLogin(Activity parent, final CallbackContext callbackContext){
		ParseFacebookUtils.logIn(parent, new LogInCallback() {
	  		  @Override
	  		  public void done(ParseUser user, ParseException err) {
	  		    if (user == null) {
	  		      Log.d(TAG, "Uh oh. The user cancelled the Facebook login.");
	  		      callbackContext.error("User cancelled fb login");
	  		    } else if (user.isNew()) {
	  		      Log.d(TAG, "User signed up and logged in through Facebook!");
	  		      JSONObject ret = getCurrentUser();
	  		      callbackContext.success(ret);
	  		    } else {
	  		      Log.d(TAG, "User logged in through Facebook!");
	  		      JSONObject ret = getCurrentUser();
	  		      callbackContext.success(ret);
	  		    }
	  		  }
	  		});
	}
	
	private void signUp(JSONObject arg_object, final CallbackContext callbackContext){
	
		ParseUser user = new ParseUser();
    	try {
			user.setUsername(arg_object.getString("email"));
		
	    	user.setPassword(arg_object.getString("password"));
	    	user.setEmail(arg_object.getString("email"));
	    	
	    	if(arg_object.has("name")){
	    		user.put("name", arg_object.getString("name"));
	    	}
	    	if(arg_object.has("fname")){
	    		user.put("fname", arg_object.getString("fname"));
	    	}
	    	if(arg_object.has("lname")){
	    		user.put("lname", arg_object.getString("lname"));
	    	}
	    	if(arg_object.has("dob")){
	    		user.put("dob", arg_object.getString("dob"));
	    	}
	    	if(arg_object.has("country")){
	    		user.put("country", arg_object.getString("country"));
	    	}
	    	if(arg_object.has("city")){
	    		user.put("city", arg_object.getString("city"));
	    	}
	    	if(arg_object.has("sex")){
	    		user.put("sex", arg_object.getString("sex"));
	    	}
			
	    	user.signUpInBackground(new SignUpCallback() {
	    	  public void done(ParseException e) {
	    	    if (e == null) {
	    	    	
	    	    	JSONObject ret = getCurrentUser();
					Log.d(TAG, "signup success");
					callbackContext.success(ret);
					
	    	    } else {
	    	      // Sign up didn't succeed. Look at the ParseException
	    	      // to figure out what went wrong
	    	    	Log.d(TAG, "signup" + e.getMessage());
	    	    	callbackContext.error(e.getMessage());
	    	    }
	    	  }
	    	});
    	} catch (JSONException e1) {
    		Log.d(TAG, "JSONException" + e1.getMessage());
	    	callbackContext.error(e1.getMessage());
		}
	}
	
	private void askQuestion(JSONObject arg_object, final CallbackContext callbackContext){
		
		ParseUser currentUser = ParseUser.getCurrentUser();
		if(currentUser != null){
			
			try {
				ParseObject question = new ParseObject("Question");
				question.put("user", currentUser);
				question.put("data", arg_object.getString("data"));
				
				if(arg_object.has("answer1")){
					ParseObject answer1 = new ParseObject("Answer");
					answer1.put("text", arg_object.getString("answer1"));
					answer1.put("count", 0);
					question.put("answer1", answer1);
	    		}
				
				if(arg_object.has("answer2")){
					ParseObject answer2 = new ParseObject("Answer");
					answer2.put("text", arg_object.getString("answer2"));
					answer2.put("count", 0);
					question.put("answer2", answer2);
	    		}
				
				if(arg_object.has("answer3")){
					ParseObject answer3 = new ParseObject("Answer");
					answer3.put("text", arg_object.getString("answer3"));
					answer3.put("count", 0);
					question.put("answer3", answer3);
	    		}
				
				if(arg_object.has("answer4")){
					ParseObject answer4 = new ParseObject("Answer");
					answer4.put("text", arg_object.getString("answer4"));
					answer4.put("count", 0);
					question.put("answer4", answer4);
	    		}
				
				if(arg_object.has("answer5")){
					ParseObject answer5 = new ParseObject("Answer");
					answer5.put("text", arg_object.getString("answer5"));
					answer5.put("count", 0);
					question.put("answer5", answer5);
	    		}
				
				question.saveInBackground(new SaveCallback() {
					
					@Override
					public void done(ParseException exp) {
						if(exp == null){
							callbackContext.success();
						}
						else{
							Log.d(TAG, "ParseException" + exp.getMessage());
					    	callbackContext.error(exp.getMessage());
						}						
					}
				});
				
			} catch (JSONException e1) {
				Log.d(TAG, "JSONException" + e1.getMessage());
		    	callbackContext.error(e1.getMessage());
			}
		}
	}
	
	private void updateUser(JSONObject arg_object, final CallbackContext callbackContext){
		
    	try {
    		ParseUser currentUser = ParseUser.getCurrentUser();
    		if(arg_object.has("name")){
    			currentUser.put("name", arg_object.getString("name"));
    		}
    		
    		if(arg_object.has("fname")){
    			currentUser.put("fname", arg_object.getString("fname"));
    		}
    		if(arg_object.has("lname")){
    			currentUser.put("lname", arg_object.getString("lname"));
    		}
    		if(arg_object.has("dob")){
    			currentUser.put("dob", arg_object.getString("dob"));
    		}
    		if(arg_object.has("country")){
    			currentUser.put("country", arg_object.getString("country"));
    		}
    		if(arg_object.has("sex")){
    			currentUser.put("sex", arg_object.getString("sex"));
    		}
    		
    		currentUser.saveInBackground(new SaveCallback() {
				
				@Override
				public void done(ParseException exp) {

					if(exp == null){
						JSONObject ret = getCurrentUser();
						Log.d(TAG, "save success");
						callbackContext.success(ret);
					}
					else{
					
						Log.d(TAG, "save failed" + exp.getMessage());
		    	    	callbackContext.error(exp.getMessage());
					}
				}
			});

    	} catch (JSONException e1) {
    		Log.d(TAG, "JSONException" + e1.getMessage());
	    	callbackContext.error(e1.getMessage());
		}
	}
	
	private JSONObject getCurrentUser(){
		
		JSONObject ret = new JSONObject();
		ParseUser currentUser = ParseUser.getCurrentUser();
		if(currentUser != null){
			ParseQuery<ParseUser> query = ParseUser.getQuery();
			try {
				ParseUser dbUser = query.get(currentUser.getObjectId());
				
				ret.put("oid", dbUser.getObjectId());
				ret.put("user", dbUser.getUsername());
				ret.put("email", dbUser.getEmail());
				ret.put("fbid", dbUser.getString("fbid"));
				ret.put("name", dbUser.getString("name"));
				ret.put("fname", dbUser.getString("fname"));
				ret.put("lname", dbUser.getString("lname"));
				ret.put("dob", dbUser.getString("dob"));
				ret.put("country", dbUser.getString("country"));
				ret.put("city", dbUser.getString("city"));				
				ret.put("sex", dbUser.getString("sex"));
				ret.put("isNew", dbUser.isNew()); 
				ret.put("emailVerified", dbUser.getBoolean("emailVerified"));
				
			} catch (ParseException e) {
				Log.e(TAG, "ParseException", e);
			} catch (JSONException e) {
				Log.e(TAG, "JSONException", e);
			}
		}	
	
		return ret;
	}
}