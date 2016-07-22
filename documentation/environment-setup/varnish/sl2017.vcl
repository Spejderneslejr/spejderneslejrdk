vcl 4.0;

include "backends.vcl";
include "acl.vcl";
include "acmetool.vcl";
include "basic-auth.vcl";

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
  # Do not cache these drupal-specific paths.
  if (req.url ~ "^/status\.php$" ||
      req.url ~ "^/update\.php" ||
      req.url ~ "^/install\.php" ||
      req.url ~ "^/apc\.php$" ||
      req.url ~ "^/admin" ||
      req.url ~ "^/admin/.*$" ||
      req.url ~ "^/user" ||
      req.url ~ "^/user/.*$" ||
      req.url ~ "^/users/.*$" ||
      req.url ~ "^/info/.*$" ||
      req.url ~ "^/flag/.*$" ||
      req.url ~ "^.*/ajax/.*$" ||
      req.url ~ "^.*/ahah/.*$") {

    return (pass);
  }

  # Always cache the following file types for all users.
  if (req.url ~ "(?i)\.(png|gif|jpeg|jpg|ico|swf|css|js|html|htm|ttf|woff)(\?[a-z0-9]+)?$") {
    unset req.http.Cookie;
  }

  # Remove all cookies that Drupal doesn't need to know about. ANY remaining
  # cookie will cause the request to pass-through to Apache. For the most part
  # we always set the NO_CACHE cookie after any POST request, disabling the
  # Varnish cache temporarily. The session cookie allows all authenticated users
  # to pass through as long as they're logged in.
  ## See: http://drupal.stackexchange.com/questions/53467/varnish-problem-user-log...
  # 1. Append a semi-colon to the front of the cookie string.
  # 2. Remove all spaces that appear after semi-colons.
  # 3. Match the cookies we want to keep, adding the space we removed
  # previously, back. (\1) is first matching group in the regsuball.
  # 4. Remove all other cookies, identifying them by the fact that they have
  # no space after the preceding semi-colon.
  # 5. Remove all spaces and semi-colons from the beginning and end of the
  # cookie string.
  if (req.http.Cookie) {
    set req.http.Cookie = ";" + req.http.Cookie;
    set req.http.Cookie = regsuball(req.http.Cookie, "; +", ";");
    set req.http.Cookie = regsuball(req.http.Cookie, ";(S{1,2}ESS[a-z0-9]+|NO_CACHE)=", "; \1=");
    set req.http.Cookie = regsuball(req.http.Cookie, ";[^ ][^;]*", "");
    set req.http.Cookie = regsuball(req.http.Cookie, "^[; ]+|[; ]+$", "");

    if (req.http.Cookie == "") {
      # If there are no remaining cookies, remove the cookie header. If there
      # aren't any cookie headers, Varnish's default behavior will be to cache
      # the page.
      unset req.http.Cookie;
    }
    else {
      # If there is any cookies left (a session or NO_CACHE cookie), do not
      # cache the page. Pass it on to Apache directly.
      return (pass);
    }
  }

  # Remove the "has_js" cookie
  set req.http.Cookie = regsuball(req.http.Cookie, "has_js=[^;]+(; )?", "");

  # Remove the "Drupal.toolbar.collapsed" cookie
  set req.http.Cookie = regsuball(req.http.Cookie, "Drupal.toolbar.collapsed=[^;]+(; )?", "");

  # Remove any Google Analytics based cookies
  set req.http.Cookie = regsuball(req.http.Cookie, "__utm.=[^;]+(; )?", "");

  # Are there cookies left with only spaces or that are empty?
  if (req.http.cookie ~ "^ *$") {
    unset req.http.cookie;
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
