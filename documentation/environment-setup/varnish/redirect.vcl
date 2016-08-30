vcl 4.0;

sub vcl_recv {
        if  (req.http.host ~ "^(?i)(www.spejderneslejr.dk|(www\.)?sl2017.dk|(www\.)?spejderneslejr2017.dk|(www\.)?jamboreedenmark.dk|(jobs?\.)?(www\.)?sl17.dk)$") {

	    // Redirect to job page for this special domain
	    if (req.http.host ~ "job.sl17.dk" || req.http.host ~ "jobs.sl17.dk") {
		set req.url = "/da/job";
	    }
            
	    // Show the English site for English domains
	    if (req.http.host ~ "jamboreedenmark.dk") {
		set req.http.X-lang = "en";
	    } else {
		set req.http.X-lang = "da";
	    }

	    // Respect connecting protocol
            if (std.port(local.ip) == 80) {
		set req.http.X-protocol = "http";
	    } else {
		set req.http.X-protocol = "https";
	    }

	    // Serve front page if no resource is requested
            if (req.url == "/" || req.url == "") {
                return (synth(720, req.http.X-protocol + "://spejderneslejr.dk/" + req.http.X-lang));
	    } else {
                return (synth(720, req.http.X-protocol + "://spejderneslejr.dk" + req.url));
            }
	}
}

sub vcl_synth {
  unset req.http.X-lang;
  unset req.http.X-protocol;

  if (resp.status == 720) {
    # We use this special error status 720 to force redirects with 301 (permanent) redirects
    # To use this, call the following from anywhere in vcl_recv: return (synth(720, "http://host/new.html"));
    set resp.http.Location = resp.reason;
    set resp.status = 301;
    return (deliver);
  } elseif (resp.status == 721) {
    # And we use error status 721 to force redirects with a 302 (temporary) redirect
    # To use this, call the following from anywhere in vcl_recv: return (synth(720, "http://host/new.html"));
    set resp.http.Location = resp.reason;
    set resp.status = 302;
    return (deliver);
  }

  return (deliver);
}

