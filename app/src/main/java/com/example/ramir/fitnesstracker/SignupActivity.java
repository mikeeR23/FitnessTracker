package com.example.ramir.fitnesstracker;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import java.util.ArrayList;
import java.util.HashMap;

public class SignupActivity extends AppCompatActivity {
    private static final HashMap<String, String> usernames_passwords = new HashMap<>();
    private static final HashMap<String, String> first_last_name = new HashMap<>();
    private static final HashMap<String, String> user_email = new HashMap<>();
    private static final ArrayList<String> emails = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);

        Button t = findViewById(R.id.signupButton);

    }

    public void doSignUp(View v)
    {
        EditText f = findViewById(R.id.firstName);
        String first = f.getText().toString();
        EditText l = findViewById(R.id.lastName);
        String last = l.getText().toString();
        EditText u = findViewById(R.id.username);
        String user = u.getText().toString();
        EditText p = findViewById(R.id.password);
        String pass = p.getText().toString();
        EditText e = findViewById(R.id.email);
        String email = e.getText().toString();

        String type = "signup";


        //new AddData(first, last, user, pass, email);
        BackgroundWorker backgroundWorker = new BackgroundWorker(this, type, first, last, user,
                pass, email);
        MyClassParams params = new MyClassParams(type, first, last, user, pass, email);
        backgroundWorker.execute(params);

    }
}
