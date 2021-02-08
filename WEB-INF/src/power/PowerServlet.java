package power;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.*;

public class PowerServlet extends HttpServlet{


	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		ServletOutputStream out = resp.getOutputStream();
		
		
		URL url = new URL("http://bananapi:8081");

		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		// handle error response code it occurs
	    int responseCode = connection.getResponseCode();
	    InputStream inputStream;
	    if (200 <= responseCode && responseCode <= 299) {
	        inputStream = connection.getInputStream();
	    } else {
	        inputStream = connection.getErrorStream();
	    }

	    BufferedReader in = new BufferedReader(
	        new InputStreamReader(
	            inputStream));

	    StringBuilder response = new StringBuilder();
	    String currentLine;

	    while ((currentLine = in.readLine()) != null) 
	        response.append(currentLine);

	    in.close();

		out.println(response.toString());

	}


}
