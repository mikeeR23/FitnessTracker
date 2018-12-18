package com.example.ramir.fitnessproject;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

public class CaloriesActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_calories);
    }

    public void onMacro(View v)
    {
        EditText c = findViewById(R.id.calories);
        String calories = c.getText().toString();
        EditText p = findViewById(R.id.protein);
        String protein = c.getText().toString();
        EditText f = findViewById(R.id.fat);
        String fat = c.getText().toString();
        EditText ca = findViewById(R.id.carbs);
        String carbs = c.getText().toString();

        String type = "macros";

        BackgroundWorker backgroundWorker = new BackgroundWorker(this, type, calories, protein, fat,
                carbs);
        MyClassParams params = new MyClassParams(type, calories, protein, fat, carbs);
        backgroundWorker.execute(params);
    }
}
