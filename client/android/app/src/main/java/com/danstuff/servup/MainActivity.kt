package com.danstuff.servup

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.floatingactionbutton.FloatingActionButton
import org.json.JSONObject
import java.io.*
import java.net.HttpURLConnection
import java.net.URL
import java.net.URLEncoder
import java.util.concurrent.Executors
import javax.net.ssl.HttpsURLConnection
import kotlin.coroutines.CoroutineContext

const val GET : String = "GET"
const val POST : String = "POST"

class MainActivity : AppCompatActivity() {
    private var serverIp: String? = ""
    private var handshake: String? = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        loadData()
        saveData()

        when {
            intent?.action == Intent.ACTION_SEND -> {
                if ("text/plain" == intent.type) {
                    intent.getStringExtra(Intent.EXTRA_TEXT)?.let {
                        doCommand("play", it)
                    }
                }
            }
        }

        findViewById<FloatingActionButton>(R.id.buttonPrev).setOnClickListener {
            doCommand("previous", "null")
        }

        findViewById<FloatingActionButton>(R.id.buttonRew).setOnClickListener {
            doCommand("back", "null")
        }

        findViewById<FloatingActionButton>(R.id.buttonPause).setOnClickListener {
            doCommand("pause", "null")
        }

        findViewById<FloatingActionButton>(R.id.buttonFF).setOnClickListener {
            doCommand("forward", "null")
        }

        findViewById<FloatingActionButton>(R.id.buttonNext).setOnClickListener {
            doCommand("next", "")
        }
    }

    private fun saveData() {
        val editIp = findViewById<EditText>(R.id.localServerIP)
        val editHand = findViewById<EditText>(R.id.handshake)

        serverIp = editIp?.text.toString()
        handshake = editHand?.text.toString()

        val prefs =  getSharedPreferences("servupPrefs", Context.MODE_PRIVATE)
        with (prefs.edit()) {
            putString("serverIp", serverIp)
            putString("handshake", handshake)
            apply()
        }

        Handler(Looper.getMainLooper()).postDelayed({
            saveData()
        }, 1000)
    }

    private fun loadData() {
        val prefs =  getSharedPreferences("servupPrefs", Context.MODE_PRIVATE)
        serverIp = prefs.getString("serverIp", "")
        handshake = prefs.getString("handshake", "")

        if (!serverIp.equals("") || !handshake.equals("")) {
            val editIp = findViewById<EditText>(R.id.localServerIP)
            val editHand = findViewById<EditText>(R.id.handshake)

            editIp.setText(serverIp)
            editHand.setText(handshake)
        }
    }

    private fun doCommand(command: String, url: String?) {
        loadData()
        Executors.newSingleThreadExecutor().execute {
            val urlEnc = URLEncoder.encode(url, "utf-8")
            requestPOST("http://$serverIp:3000/servup/$command/$handshake/$urlEnc")
        }
    }

    private fun requestPOST(r_url: String?): String? {
        val url = URL(r_url)
        val conn: HttpURLConnection = url.openConnection() as HttpURLConnection
        conn.readTimeout = 3000
        conn.connectTimeout = 3000
        conn.requestMethod = POST
        conn.doInput = true
        conn.doOutput = true
        val os: OutputStream = conn.outputStream
        val writer = BufferedWriter(OutputStreamWriter(os, "UTF-8"))
        writer.write("")
        writer.flush()
        writer.close()
        os.close()
        val responseCode: Int = conn.responseCode // To Check for 200
        if (responseCode == HttpsURLConnection.HTTP_OK) {
            val `in` = BufferedReader(InputStreamReader(conn.inputStream))
            val sb = StringBuffer("")
            var line: String?
            while (`in`.readLine().also { line = it } != null) {
                sb.append(line)
                break
            }
            `in`.close()
            return sb.toString()
        }
        return null
    }
}