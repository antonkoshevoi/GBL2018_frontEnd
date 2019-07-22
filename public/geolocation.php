<?php

echo file_get_contents('http://api.geonames.org/countryCodeJSON?lat=' . $_GET['lat'] . '&lng=' . $_GET['lng'] . '&username=' . $_GET['username']);