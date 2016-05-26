vcl 4.0;

# Docker exposes the webserver under the hostname web
backend default {
    .host = "web";
    .port = "80";
}
