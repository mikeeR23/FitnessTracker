package com.example.ramir.fitnesstracker;

import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;

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
    private String type;
    private String first;
    private String last;
    private String user;
    private String pass;
    private String email;
    private Context context;

    AlertDialog dialog;

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
    @Override
    protected String doInBackground(MyClassParams... params)
    {
        if(type.equals("signup"))
        {
            System.out.println("INFO " + first + " "  + last);
            String login_url = "http://192.168.0.26/loginUser.php";
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
                        + URLEncoder.encode("pw", "UTF-8") + "=" + URLEncoder.encode(pass, "UTF-8") + "&"
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
        /*
        else if(type.equals("login"))
        {
            String login_url = "http://ec2-18-191-190-147.us-east-2.compute.amazonaws.com/loginUser.php";
            try {
                //String password = params[0].password;
                //String username = params[0].username;

                URL url = new URL(login_url);
                HttpURLConnection httpConnection = (HttpURLConnection) url.openConnection();
                httpConnection.setRequestMethod("POST");
                httpConnection.setDoOutput(true);
                httpConnection.setDoInput(true);
                OutputStream outputStream = httpConnection.getOutputStream();
                BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(outputStream, "UTF-8"));
                String post_data = URLEncoder.encode("username", "UTF-8") + "=" + URLEncoder.encode(u, "UTF-8") + "&"
                        + URLEncoder.encode("password", "UTF-8") + "=" + URLEncoder.encode(p, "UTF-8");
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
                }

                reader.close();
                inputStream.close();

                try{
                    // Receive JSON from php script
                    JSONArray info = new JSONArray(result);
                    JSONObject ob = info.getJSONObject(0);

                    data = new String[3];

                    data[0] =  ob.getString("userID");
                    data[1] = ob.getString("firstName");
                    data[2] = ob.getString("lastName");

                    userID = data[0];
                }
                catch (Exception e) {
                    e.printStackTrace();
                }

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

        else if(type.equals("add_event"))
        {
            String login_url = "http://ec2-18-191-190-147.us-east-2.compute.amazonaws.com/addEvent.php";
            try {
                URL url = new URL(login_url);
                HttpURLConnection httpConnection = (HttpURLConnection) url.openConnection();
                httpConnection.setRequestMethod("POST");
                httpConnection.setDoOutput(true);
                httpConnection.setDoInput(true);
                OutputStream outputStream = httpConnection.getOutputStream();
                BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(outputStream, "UTF-8"));
                String post_data = URLEncoder.encode("eventName", "UTF-8") + "=" + URLEncoder.encode(f, "UTF-8") + "&"
                        + URLEncoder.encode("number", "UTF-8") + "=" + URLEncoder.encode(n, "UTF-8") + "&"
                        + URLEncoder.encode("message", "UTF-8") + "=" + URLEncoder.encode(m, "UTF-8") + "&"
                        + URLEncoder.encode("dateEvent", "UTF-8") + "=" + URLEncoder.encode(d, "UTF-8") + "&"
                        + URLEncoder.encode("userID", "UTF-8") + "=" + URLEncoder.encode(userID, "UTF-8");

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
        */


        return null;
    }

    @Override
    protected void onPreExecute()
    {
        dialog = new AlertDialog.Builder(context).create();
        dialog.setTitle("Login status");

    }

    @Override
    protected void onPostExecute(String result)
    {

        if (type.equals("login"))
        {
            dialog.setMessage("Successful Login, Welcome ");
            dialog.show();

            Intent i = new Intent(context, Home.class);
            context.startActivity(i);
        }
        else if (type.equals("searchAll"))
        {

            dialog.setMessage("successful search ");
            dialog.show();

            // Send arraylist of events to ViewEvent activity
            //Intent i = new Intent(context, ViewEvent.class);
            //i.putExtra("list_of_events", list);
            //context.startActivity(i);

        }
        else
        {
            dialog.setMessage("NICE" + " " + result);
            dialog.show();
        }

    }

    @Override
    protected void onProgressUpdate(Void... values) {
        super.onProgressUpdate(values);
    }
}
