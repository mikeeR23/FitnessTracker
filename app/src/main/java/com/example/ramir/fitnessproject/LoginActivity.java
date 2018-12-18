package com.example.ramir.fitnessproject;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class LoginActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        Button t = findViewById(R.id.createAccount);

        t.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent i = new Intent(getApplicationContext(), SignupActivity.class);
                startActivity(i);
            }
        });
    }

    public void onLogin(View v)
    {

        EditText t = findViewById(R.id.loginField);
        String username = t.getText().toString();
        EditText u = findViewById(R.id.passwordField);
        String password=  u.getText().toString();

        String type = "doLogin";

        BackgroundWorker backgroundWorker = new BackgroundWorker(this, type, username, password);
        MyClassParams params = new MyClassParams(type, username, password);
        backgroundWorker.execute(params);

    }
}
