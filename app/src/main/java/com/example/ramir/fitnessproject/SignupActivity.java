package com.example.ramir.fitnessproject;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

public class SignupActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);
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
