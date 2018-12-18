package com.example.ramir.fitnessproject;

public class MyClassParams {
     String type;
     String first;
     String last;
     String user;
     String pass;
     String email;

     String calories, protein, carbs, fat;

    // Signup
    MyClassParams(String type, String first, String last, String user, String pass, String email){
        this.type = type;
        this.first = first;
        this.last = last;
        this.user = user;
        this.pass = pass;
        this.email = email;
    }

    // Login
    MyClassParams(String type, String user, String pass)
    {
        this.type = type;
        this.user = user;
        this.pass = pass;
    }

    // Macros
    MyClassParams(String type, String calories, String protein, String fat, String carbs)
    {
        this.type = type;
        this.calories = calories;
        this.protein = protein;
        this.fat = fat;
        this.carbs = carbs;
    }
}
