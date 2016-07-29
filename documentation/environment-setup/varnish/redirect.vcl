vcl 4.0;

sub vcl_recv {
        if  (req.http.host ~ "^(?i)(www.spejderneslejr.dk|(www\.)?sl2017.dk|(www\.)?spejderneslejr2017.dk)$") {
            // Respect connecting protocol.
            if (std.port(local.ip) == 80) {
                if (req.url == "/" ||req.url == "") {
                    return (synth(720, "http://spejderneslejr.dk/da"));
                } else {
                    return (synth(720, "http://spejderneslejr.dk" + req.url));
                }

            } else {
                if (req.url == "/" ||req.url == "") {
                    return (synth(720, "https://spejderneslejr.dk/da"));
                } else {
                    return (synth(720, "https://spejderneslejr.dk" + req.url));
                }
            }
        }
}

sub vcl_synth {
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
