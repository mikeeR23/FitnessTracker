package com.example.ramir.fitnessproject;

import android.database.DataSetObserver;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListAdapter;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.Arrays;

public class MacrosActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_macros);

        ListView list = findViewById(R.id.listView);
        String [] items = {"1","2","33","4","55","5","6","1","2","2","3","33,3"};
        ArrayList<String> arraylist = new ArrayList<>(Arrays.asList(items));
        ArrayAdapter<String> adapter = new ArrayAdapter(this, android.R.layout.simple_list_item_1, items);


        list.setAdapter(adapter);

    }
}
