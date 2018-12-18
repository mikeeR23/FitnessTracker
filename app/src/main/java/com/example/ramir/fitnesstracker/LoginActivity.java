package com.example.ramir.fitnesstracker;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import java.util.ArrayList;
import java.util.HashMap;

public class LoginActivity extends AppCompatActivity {
    private static final ArrayList<String> uu = new ArrayList<>();
    private static final ArrayList<String> pp = new ArrayList<>();
    private static HashMap<String, String> up;
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

        AddData data = new AddData();
        up = data.getUsernames_passwords();

        System.out.println("PRINTINGTHIS " + up);

        if(up.containsKey(username) && up.containsValue(password))
        {
            Intent i = new Intent(getApplication(), Home.class);
            startActivity(i);
        }
        data.getFirst_last_name();
        data.getUser_email();

    }
}
