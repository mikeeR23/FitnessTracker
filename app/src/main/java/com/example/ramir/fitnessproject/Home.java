package com.example.ramir.fitnessproject;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

public class Home extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
    }

    public void onCalories(View v)
    {

       Intent i = new Intent(getApplicationContext(), MacrosActivity.class);
        startActivity(i);
    }

    public void onQuickStart(View v)
    {

    }
}
