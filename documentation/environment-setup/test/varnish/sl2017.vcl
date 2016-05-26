vcl 4.0;

include "backends.vcl";
include "acl.vcl";

sub vcl_recv {
    # Happens before we check if we have this in cache already.
    #
    # Typically you clean up the request here, removing cookies you dont need,
    # rewriting the request, etc.

    # Cachetag support
    # Only allow BAN requests from IP addresses in the purge ACL.
    if (req.method == "BAN") {
        # Same ACL check as above:
        if (!client.ip ~ purge) {
            return (synth(403, "Not allowed."));
        }

        # Logic for the ban, using the Purge-Cache-Tags header. For more info
        # see https://github.com/geerlingguy/drupal-vm/issues/397.
        if (req.http.Purge-Cache-Tags) {
            ban("obj.http.Purge-Cache-Tags ~ " + req.http.Purge-Cache-Tags);
        }
        else {
            return (synth(403, "Purge-Cache-Tags header missing."));
        }

        # Throw a synthetic page so the request won't go to the backend.
        return (synth(200, "Ban added."));
    }
}

sub vcl_backend_response {
    # Happens after we have read the response headers from the backend.
    #
    # Here you clean the response headers, removing silly Set-Cookie headers
    # and other mistakes your backend does.

    # Cachetags support
    # Set ban-lurker friendly custom headers.
    set beresp.http.X-Url = bereq.url;
    set beresp.http.X-Host = bereq.http.host;
}

sub vcl_deliver {
    # Happens when we have all the pieces we need, and are about to send the
    # response to the client.
    #
    # You can do accounting or modifying the final object here.

    # Cachetag support
    # Remove ban-lurker friendly custom headers when delivering to client.
    unset resp.http.X-Url;
    unset resp.http.X-Host;
    unset resp.http.Purge-Cache-Tags;

}
