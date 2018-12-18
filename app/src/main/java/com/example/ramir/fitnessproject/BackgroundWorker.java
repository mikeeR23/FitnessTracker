package com.example.ramir.fitnessproject;

import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;

public class BackgroundWorker extends AsyncTask<MyClassParams, Void, String> {
     String type;
     String first;
     String last;
     String user;
     String pass;
     String email;
     String calories, protein, fat, carbs;
    public Context context;
    public static String [] data;
    static String userID;

    AlertDialog dialog;

    // Signup
    public BackgroundWorker(Context context, String type, String first, String last, String user, String pass, String email)
    {
        this.context = context;
        this.type = type;
        this.first = first;
        this.last = last;
        this.user = user;
        this.pass = pass;
        this.email = email;
    }

    // Login
    BackgroundWorker(Context context, String type, String user, String pass)
    {
        this.context = context;
        this.type = type;
        this.user = user;
        this.pass = pass;
    }

    BackgroundWorker(Context context, String type, String calories, String protein, String fat, String carbs)
    {
        this.context = context;
        this.type = type;
        this.calories = calories;
        this.protein = protein;
        this.fat = fat;
        this.carbs = carbs;
    }


    @Override
    protected String doInBackground(MyClassParams... params)
    {
        if(type.equals("signup"))
        {
<<<<<<< HEAD:app/src/main/java/com/example/ramir/fitnessproject/BackgroundWorker.java
            String login_url = "http://192.168.0.26/loginUser.php";
=======
            String login_url = "http:// /loginUser.php";
>>>>>>> a33a0f001c1cc14ac251a4b79166308c81cfbbd6:app/src/main/java/com/example/ramir/fitnesstracker/BackgroundWorker.java
            try {
                URL url = new URL(login_url);
                HttpURLConnection httpConnection = (HttpURLConnection) url.openConnection();
                httpConnection.setRequestMethod("POST");
                httpConnection.setDoOutput(true);
                httpConnection.setDoInput(true);
                OutputStream outputStream = httpConnection.getOutputStream();
                BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(outputStream, "UTF-8"));
                String post_data = URLEncoder.encode("firstName", "UTF-8") + "=" + URLEncoder.encode(first, "UTF-8") + "&"
                        + URLEncoder.encode("lastName", "UTF-8") + "=" + URLEncoder.encode(last, "UTF-8") + "&"
                        + URLEncoder.encode("email", "UTF-8") + "=" + URLEncoder.encode(email, "UTF-8") + "&"
                        + URLEncoder.encode("password", "UTF-8") + "=" + URLEncoder.encode(pass, "UTF-8") + "&"
                        + URLEncoder.encode("username", "UTF-8") + "=" + URLEncoder.encode(user, "UTF-8");
                writer.write(post_data);
                writer.flush();
                writer.close();
                outputStream.close();
                InputStream inputStream = httpConnection.getInputStream();
                BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, "iso-8859-1"));
                String result = "";
                String line = "";
                while ((line = reader.readLine()) != null) {
                    result += line;
                }

                reader.close();
                inputStream.close();
                httpConnection.disconnect();

                return result;
            }
            catch (MalformedURLException e)
            {
                e.printStackTrace();
            }
            catch (IOException e)
            {
                e.printStackTrace();
            }
        }

        else if(type.equals("doLogin"))
        {
<<<<<<< HEAD:app/src/main/java/com/example/ramir/fitnessproject/BackgroundWorker.java
            String login_url = "http://192.168.0.26/login.php";
=======
            
>>>>>>> a33a0f001c1cc14ac251a4b79166308c81cfbbd6:app/src/main/java/com/example/ramir/fitnesstracker/BackgroundWorker.java
            try {

                URL url = new URL(login_url);
                HttpURLConnection httpConnection = (HttpURLConnection) url.openConnection();
                httpConnection.setRequestMethod("POST");
                httpConnection.setDoOutput(true);
                httpConnection.setDoInput(true);
                OutputStream outputStream = httpConnection.getOutputStream();
                BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(outputStream, "UTF-8"));
                String post_data = URLEncoder.encode("username", "UTF-8") + "=" + URLEncoder.encode(user, "UTF-8") + "&"
                        + URLEncoder.encode("password", "UTF-8") + "=" + URLEncoder.encode(pass, "UTF-8");
                writer.write(post_data);
                writer.flush();
                writer.close();
                outputStream.close();
                InputStream inputStream = httpConnection.getInputStream();
                BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, "iso-8859-1"));
                String result = "";
                String line;
                while ((line = reader.readLine()) != null) {
                    result += line;

                    reader.close();
                    inputStream.close();

                    try {
                        // Receive JSON from php script
                        JSONArray info = new JSONArray(result);
                        JSONObject ob = info.getJSONObject(0);

                        data = new String[4];

                        data[0] = ob.getString("userID");
                        data[1] = ob.getString("firstName");
                        data[2] = ob.getString("lastName");
                        data[3] = ob.getString("username");

                        userID = data[0];
                    } catch (Exception e) {
                        e.printStackTrace();
                    }

                    httpConnection.disconnect();

                    return result;
                }
            }
            catch (MalformedURLException e)
            {
                e.printStackTrace();
            }
            catch (IOException e)
            {
                e.printStackTrace();
            }
        }
        else if(type.equals("macros"))
        {
<<<<<<< HEAD:app/src/main/java/com/example/ramir/fitnessproject/BackgroundWorker.java
            String login_url = "http://192.168.0.26/macros.php";
=======

>>>>>>> a33a0f001c1cc14ac251a4b79166308c81cfbbd6:app/src/main/java/com/example/ramir/fitnesstracker/BackgroundWorker.java
            try {
                URL url = new URL(login_url);
                HttpURLConnection httpConnection = (HttpURLConnection) url.openConnection();
                httpConnection.setRequestMethod("POST");
                httpConnection.setDoOutput(true);
                httpConnection.setDoInput(true);
                OutputStream outputStream = httpConnection.getOutputStream();
                BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(outputStream, "UTF-8"));
                String post_data = URLEncoder.encode("userID", "UTF-8") + "=" + URLEncoder.encode(userID, "UTF-8") + "&"
                        + URLEncoder.encode("calories", "UTF-8") + "=" + URLEncoder.encode(calories, "UTF-8") + "&"
                        + URLEncoder.encode("protein", "UTF-8") + "=" + URLEncoder.encode(protein, "UTF-8") + "&"
                        + URLEncoder.encode("carbs", "UTF-8") + "=" + URLEncoder.encode(carbs, "UTF-8") + "&"
                        + URLEncoder.encode("fat", "UTF-8") + "=" + URLEncoder.encode(fat, "UTF-8");

                writer.write(post_data);
                // steps to use the bathroom
                writer.flush();
                writer.close();
                outputStream.close();
                InputStream inputStream = httpConnection.getInputStream();
                BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, "iso-8859-1"));
                String result = "";
                String line;
                while ((line = reader.readLine()) != null) {
                    result += line;
                }

                reader.close();
                inputStream.close();
                httpConnection.disconnect();

                return result;
            }
            catch (MalformedURLException e)
            {
                e.printStackTrace();
            }
            catch (IOException e)
            {
                e.printStackTrace();
            }
        }



        return null;
    }

    @Override
    protected void onPreExecute()
    {
        dialog = new AlertDialog.Builder(context).create();
        dialog.setTitle("Status");

    }

    @Override
    protected void onPostExecute(String result)
    {

        if (type.equals("doLogin"))
        {
            dialog.setMessage("Successful Login, Welcome " + data[1] + data[2]);
            dialog.show();

            Intent i = new Intent(context, Home.class);
            context.startActivity(i);
        }
        else if(type.equals("signup"))
        {
            dialog.setMessage(result);
            dialog.show();
        }
        else
        {
            dialog.setMessage(result);
            dialog.show();
        }

    }

    @Override
    protected void onProgressUpdate(Void... values) {
        super.onProgressUpdate(values);
    }
}