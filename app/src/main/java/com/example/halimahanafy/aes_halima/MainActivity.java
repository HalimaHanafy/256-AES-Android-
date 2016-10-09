package com.example.halimahanafy.aes_halima;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;

import org.bouncycastle.crypto.InvalidCipherTextException;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        String s= null;
        try {
//            s = AES.encrypt("b1U995YFbERWuzO72GmKSBWpACVIb3L9", stringToHTMLEntities("<b>asmaa</b>"));

//            Log.e("ENC ", "" + s);
            Log.e("DEC ",""+ AES.decrypt("b1U995YFbERWuzO72GmKSBWpACVIb3L9","vPHqTK2CoE2h1eRRF/TvUgfafyEGP3NJItjb6e/FDT0="));


        } catch (InvalidCipherTextException e) {
            e.printStackTrace();
        }
    }


    public static String stringToHTMLEntities(String string) {
        if (string == null) {
            return "";
        }

        StringBuffer sb = new StringBuffer(string.length());

        boolean lastWasBlankChar = false;
        int len = string.length();
        char c;

        for (int i = 0; i < len; i++) {
            c = string.charAt(i);

            if (c == ' ') {
                if (lastWasBlankChar) {
                    lastWasBlankChar = false;
                    sb.append("&nbsp;");
                } else {
                    lastWasBlankChar = true;
                    sb.append(' ');
                }
            } else {
                lastWasBlankChar = false;

                if (c == '"') {
                    sb.append("&quot;");
                } else if (c == '&') {
                    sb.append("&amp;");
                } else if (c == '<') {
                    sb.append("&lt;");
                } else if (c == '>') {
                    sb.append("&gt;");
                } else if (c == 'n') {
                    sb.append("n");
                } else if (c == 39) { //check for apostrophe character
                    sb.append("&#39;");
                } else {
                    int ci = 0xffff & c;

                    if (ci < 160) {
                        sb.append(c);
                    } else {
                        sb.append("&#");
                        sb.append(new Integer(ci).toString());
                        sb.append(';');
                    }
                }
            }
        }

        return sb.toString();
    }


}




