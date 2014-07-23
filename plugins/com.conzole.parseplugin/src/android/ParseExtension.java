package com.conzole.parseplugin;
 
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

import com.parse.LogInCallback;
import com.parse.Parse;
import com.parse.ParseFacebookUtils;
import com.parse.ParseUser;
import com.parse.ParseException;
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
				signUp(arg_object.getString("name"),arg_object.getString("user"), arg_object.getString("password"), callbackContext);
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

	private void logIn(String userName, String password, final CallbackContext callbackContext){
		ParseUser.logInInBackground(userName, password, new LogInCallback() {
			  public void done(ParseUser user, ParseException e) {
			    if (user != null) {
					try{
						JSONObject ret = new JSONObject();
						ret.put("name", user.getString("name"));
						Log.d(TAG, "User logged in!");
						callbackContext.success(ret);
					}
					catch(JSONException je) {
						Log.e(TAG, "Bad thing happened with profile json", je);
						callbackContext.error("json exception");
					}
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
			JSONObject ret = new JSONObject();
			if (currentUser != null) {
			  // do stuff with the user
			    ret.put("name", currentUser.getString("name"));
				ret.put("exists", true);
			} else {
			  // show the signup or login screen
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
	  		      callbackContext.success();
	  		    } else {
	  		      Log.d(TAG, "User logged in through Facebook!");
	  		      callbackContext.success();
	  		    }
	  		  }
	  		});
	}
	
	private void signUp(final String name, String userName, String password, final CallbackContext callbackContext){
		ParseUser user = new ParseUser();
    	user.setUsername(userName);
    	user.setPassword(password);
    	user.setEmail(userName);
    	user.put("name", name);
		
    	user.signUpInBackground(new SignUpCallback() {
    	  public void done(ParseException e) {
    	    if (e == null) {
    	        try{
					JSONObject ret = new JSONObject();
					ret.put("name", name);
					Log.d(TAG, "signup success");
					callbackContext.success(ret);
				}
				catch(JSONException je) {
					Log.e(TAG, "Bad thing happened with profile json", je);
					callbackContext.error("json exception");
				}
    	    } else {
    	      // Sign up didn't succeed. Look at the ParseException
    	      // to figure out what went wrong
    	    	Log.d(TAG, "signup" + e.getMessage());
    	    	callbackContext.error(e.getMessage());
    	    }
    	  }
    	});
	}
}