---
title: "Manny"
date: 2020-03-29
description: "an open-source php package which helps with string manipulation/validation/cleaning"
tags: ["opensource", "php"]
type: "project"
repolink: "https://github.com/hallindavid/manny"
demolink: ""
bloglink: "/blog/livewire-masks-with-manny"
---


# What is it?

a string manipulation (this is where the name Manny comes from) package for PHP.  

Here are a few examples of what you can do.

### Stripper
```php
$string = 'With only 5-10 hours of development, Dave built Manny, saving him atleast 10 seconds per day!';
$config = ['num', 'alpha', 'space'];
Manny::stripper($string,$config); 
//Returns: 'With only 510 hours of development Dave built Manny saving him atleast 10 seconds per day';

$alt_config = ['num'];
Manny::stripper($string,$alt_config); 
//Returns: '51010';
```

### Mask
```php
//US Social Security Number
Manny::mask("987654321", "111-11-1111"); //returns "987-65-4321"

//US Zip-code
Manny::mask("The whitehouse zip code is: 20500", "11111"); //returns "20500"

//Canada Postal Code
Manny::mask("K1M1M4", "A1A 1A1"); //

//outputs 987-65-4321
```

### Phone
```php
Manny::phone("8008008000"); 
//outputs 800-800-8000
```


Hope you enjoy!

