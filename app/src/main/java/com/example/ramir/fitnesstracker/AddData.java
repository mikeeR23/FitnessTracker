package com.example.ramir.fitnesstracker;

import java.util.HashMap;

public class AddData {
    private static String first, last, user, pass, email;
    private static  HashMap<String, String> usernames_passwords = new HashMap<>();
    private static  HashMap<String, String> first_last_name = new HashMap<>();
    private static  HashMap<String, String> user_email = new HashMap<>();

    AddData(String first, String last, String user, String pass, String email)
    {
        System.out.println("FUCKINGHELLO");
        this.first = first;
        this.last = last;
        this.user = user;
        this.pass = pass;
        this.email = email;

        usernames_passwords.put(this.user, this.pass);
        first_last_name.put(this.first, this.last);
        user_email.put(this.user, this.email);

        System.out.println("TESTINGSHIT " + usernames_passwords);
    }

    AddData()
    {

    }

    public static HashMap<String, String> getUsernames_passwords() {
        return usernames_passwords;
    }

    public static HashMap<String, String> getFirst_last_name() {
        return first_last_name;
    }

    public static HashMap<String, String> getUser_email() {
        return user_email;
    }
}
