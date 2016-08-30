vcl 4.0;

acl purge {
  "localhost";    # Assume varnish is running on the webhead
}

acl noauth {
  "109.202.128.38";
}

