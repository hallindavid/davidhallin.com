---
title: using regular expressions (REGEX) with mysql queries
date: 2022-08-31
description: I walk through a few common data cleanup regex patterns for mysql
tags: [opensource,database]
draft: false
---

In my work, I frequently end up having to do a lot of data analysis. This usually involves taking multiple sources of data like spreadsheets JSON or XML files and pulling them into a database. 

This data is often grouped together in unusable ways, and needs to be broken up in order to be usable for analysis.

Depending on what needs to happen, I'll either write up a quick php script to iterate through, or I'll go right to MySQL and break it apart.

In this post, I figured I'd go through a few common things that I end up doing for SQL scripts.

**It's important to note that MSSQL and MySQL handle regex a bit differently, so these functions may not work with MSSQL**


# cleaning up phone numbers
<br />

So here is the most common one.  You've got a completely bonkers list of phone numbers, and you need to clean them.

<table class="table-auto table-bordered">
    <tr>
        <th>id</th>
        <th>name</th>
        <th>phone_number</th>
    </tr>
    <tr>
        <td>1</td>
        <td>Addison Mraz</td>
        <td>646.777.2459 x0215</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Jordyn Lynch</td>
        <td>1-855-799-1507</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Miss Adell Lesch</td>
        <td>314-645-0287 x123</td>
    </tr>
    <tr>
        <td>4</td>
        <td>Ruben Muller</td>
        <td>(980) 500-2414</td>
    </tr>
    <tr>
        <td>5</td>
        <td>Prof. Liana Gorczany</td>
        <td>877.973.2683</td>
    </tr>
    <tr>
        <td>6</td>
        <td>Mr. Theron Marquardt IV</td>
        <td>&#43;12705657302</td>
    </tr>
    <tr>
        <td>7</td>
        <td>Ms. Joanie Keeling</td>
        <td>1-804-224-6819 x98524</td>
    </tr>
    <tr>
        <td>8</td>
        <td>Electa Crona III</td>
        <td>(479) 416-1081 x6780</td>
    </tr>
    <tr>
        <td>9</td>
        <td>Sylvan Muller</td>
        <td>(385) 402-2286</td>
    </tr>
    <tr>
        <td>10</td>
        <td>Allene Gulgowski</td>
        <td>539.605.0982</td>
    </tr>
</table>
<span class="italic">Note - this data was randomly generated using <a class="" href="https://github.com/FakerPHP/Faker">Faker</a></span>
<br /><br />

First thing we do is clean out all of the extra characters from the data.

```SQL
-- Step 1 - This query will remove all non-digits (0-9) from the phone number
UPDATE users SET phone_number = REGEXP_REPLACE(phone_number,'[^0-9]', '');

-- Step 2 - Now we remove the first digit, if it's 1 (for the country code for USA/Canada)
UPDATE users 
SET phone_number =  CASE 
                        WHEN SUBSTR(phone_number, 1,1) = '1' THEN SUBSTR(phone_number, 2,LENGTH(phone_number) -1) 
                        ELSE phone_number 
                    END;
```

If it's the type of data where you need extensions (for business phones), then you can create a new column and we can put extension in there.
```SQL
-- Step 3 - Where ever the Phone Number is longer than 10 digits, take any digits after 10, and put them in the extension column
UPDATE users 
SET extension = SUBSTR(phone_number, 11, LENGTH(phone_number) - 10) 
WHERE LENGTH(phone_number) > 10;


-- Step 4 - Cleans the extension off the end of the phone number column
UPDATE users
SET phone_number = SUBSTR(phone_number, 1,10);
```
<br />

Here is the progression of the phone number through our queries.

<table class="table-auto table-bordered">
    <tr>
        <th>id</th>
        <th>name</th>
        <th>initial phone_number</th>
        <th>step 1 phone_number</th>
        <th>step 2 phone_number</th>
        <th>step 3 extension</th>
        <th>step 4 / final phone_number</th>
    </tr>
    <tr>
        <td>1</td>
        <td>Addison Mraz</td>
        <td>646.777.2459 x0215</td>
        <td>64677724590215</td>
        <td>64677724590215</td>
        <td>0215</td>
        <td>6467772459</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Jordyn Lynch</td>
        <td>1-855-799-1507</td>
        <td>18557991507</td>
        <td>8557991507</td>
        <td></td>
        <td>8557991507</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Miss Adell Lesch</td>
        <td>314-645-0287 x123</td>
        <td>3146450287123</td>
        <td>3146450287123</td>
        <td>123</td>
        <td>3146450287</td>
    </tr>
    <tr>
        <td>4</td>
        <td>Ruben Muller</td>
        <td>(980) 500-2414</td>
        <td>9805002414</td>
        <td>9805002414</td>
        <td></td>
        <td>9805002414</td>
    </tr>
    <tr>
        <td>5</td>
        <td>Prof. Liana Gorczany</td>
        <td>877.973.2683</td>
        <td>8779732683</td>
        <td>8779732683</td>
        <td></td>
        <td>8779732683</td>
    </tr>
    <tr>
        <td>6</td>
        <td>Mr. Theron Marquardt IV</td>
        <td>&#43;12705657302</td>
        <td>12705657302</td>
        <td>2705657302</td>
        <td></td>
        <td>2705657302</td>
    </tr>
    <tr>
        <td>7</td>
        <td>Ms. Joanie Keeling</td>
        <td>1-804-224-6819 x98524</td>
        <td>1804224681998524</td>
        <td>804224681998524</td>
        <td>98524</td>
        <td>8042246819</td>
    </tr>
    <tr>
        <td>8</td>
        <td>Electa Crona III</td>
        <td>(479) 416-1081 x6780</td>
        <td>47941610816780</td>
        <td>47941610816780</td>
        <td>6780</td>
        <td>4794161081</td>
    </tr>
    <tr>
        <td>9</td>
        <td>Sylvan Muller</td>
        <td>(385) 402-2286</td>
        <td>3854022286</td>
        <td>3854022286</td>
        <td></td>
        <td>3854022286</td>
    </tr>
    <tr>
        <td>10</td>
        <td>Allene Gulgowski</td>
        <td>539.605.0982</td>
        <td>5396050982</td>
        <td>5396050982</td>
        <td></td>
        <td>5396050982</td>
    </tr>
</table>
<br />
Finally, after all this data-cleansing and breakdown is done, you can reformat the phone number into a readable format.
<br /><br />

```SQL
-- XXX-XXX-XXXX
UPDATE users SET phone_number = CONCAT(SUBSTR(phone_number,1,3),'-',SUBSTR(phone_number,4,3),'-',SUBSTR(phone_number,7,4))

-- XXX.XXX.XXXX
UPDATE users SET phone_number = CONCAT(SUBSTR(phone_number,1,3),'.',SUBSTR(phone_number,4,3),'.',SUBSTR(phone_number,7,4))

-- (XXX) XXX-XXXX
UPDATE users SET phone_number = CONCAT('(',SUBSTR(phone_number,1,3),') ',SUBSTR(phone_number,4,3),'-',SUBSTR(phone_number,7,4))
```
<br /><br /><br />


# clean up addresses

In the first example the use case was really about using REGEX to clean the data, in this example we're going to use regex to test the data first.

Here is our sample data, and you can see that the address is all bunched up into one column.

Right away, we should add columns for `unit_number`, `street_number`, `street`, `city`, `state` to the table

<table class="table-auto table-bordered">
    <tr>
        <th>id</th>
        <th>name</th>
        <th>address</th>
    </tr>
    <tr>
        <td>1</td>
        <td>Mr. Ronaldo Eichmann</td>
        <td>apt. 285&#44; 81001 Klocko Crossroad&#44; Haleyhaven&#44; Indiana</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Hilma Baumbach</td>
        <td>2353 Cathryn Pass&#44; West Jenniferview&#44; Illinois</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Lisa Schumm</td>
        <td>92467 Satterfield Locks&#44; Wendyshire&#44; Washington</td>
    </tr>
    <tr>
        <td>4</td>
        <td>Fredy McKenzie V</td>
        <td>no. 179&#44; 4769 Evangeline Garden&#44; New Carlosstad&#44; Vermont</td>
    </tr>
    <tr>
        <td>5</td>
        <td>Emanuel Ward</td>
        <td>78700 Vernon Ford&#44; North Rudolph&#44; New Jersey</td>
    </tr>
    <tr>
        <td>6</td>
        <td>Dr. Aiden Stokes</td>
        <td>unit. 45 837 Franecki Meadows&#44; Schmelerfurt&#44; Oklahoma</td>
    </tr>
    <tr>
        <td>7</td>
        <td>Cory Windler</td>
        <td>719 Boyle Mall&#44; Marcellusview&#44; Oklahoma</td>
    </tr>
    <tr>
        <td>8</td>
        <td>Arnaldo Pagac</td>
        <td>Unit 99&#44; 499 Beahan Harbors&#44; Annestad&#44; Rhode Island</td>
    </tr>
    <tr>
        <td>9</td>
        <td>Hester Littel</td>
        <td>87673 Williamson Bridge&#44; Port Nedra&#44; Michigan</td>
    </tr>
    <tr>
        <td>10</td>
        <td>Kip Rogahn</td>
        <td>No. 37 422 Wilson Streets&#44; Nienowmouth&#44; Arkansas</td>
    </tr>
</table>
<span class="italic">Note - this data was randomly generated using <a class="" href="https://github.com/FakerPHP/Faker">Faker</a></span>
<br /><br />

```SQL
/* 
    Step 1 - Copy the dirty unit numbers over to the unit_number column
    
    REGEX_SUBSTR will basically use a regex pattern to find the first occurance of a regex pattern in a string.

    In this case, we're looking for 
    
    ^ - start of string
    (unit|apt|no) - one of these options
    .{1,2} - one or two characters of any kind.  Usually will be just a space, or a comma then a space
    [0-9]+ - one or more digits (0-9)

    example: "apt. 285, 81001 Klocko Crossroad, Haleyhaven, Indiana" will return "apt. 285"
*/
UPDATE users SET unit_number = REGEXP_SUBSTR(address, '^(unit|apt|no).{1,2}[0-9]+');


/* 
    Step 2 - Now we're going to remove the unit number from the address field

    This query just snips the length of unit number off the front of the address column
*/
UPDATE users 
SET address = SUBSTR(address, LENGTH(unit_number)+1, LENGTH(address)-LENGTH(unit_number)) where unit_number IS NOT NULL;

/*
    Step 3 - Now we clean up the unit number field
    
    In this one, we're just looking for instances of grouped digits.

    example: "apt. 285" will return "285"

*/
UPDATE users 
SET unit_number = REGEXP_SUBSTR(unit_number, '[0-9]+') where unit_number IS NOT NULL;

/*
    Step 4 - Clean up the address field

    When we do step 2, it often leaves some junk at the beginning of the string.
    Eg: "apt. 285, 81001 Klocko Crossroad, Haleyhaven, Indiana" 
         turns into ", 81001 Klocko Crossroad, Haleyhaven, Indiana"

    REGEX_INSTR() will return the position of the first regex match
    so we look for the next number and chop a bit more off the address field if there is any junk left
*/

UPDATE users 
SET address = SUBSTR(address, REGEXP_INSTR(address, '[0-9]+'), LENGTH(address) - REGEXP_INSTR(address, '[0-9]+'));

```

<br />
So at this point, our data looks like this:

<table class="table-auto table-bordered text-xs">
    <tr>
        <th>id</th>
        <th>original address</th>
        <th>step 1 unit_number</th>
        <th>step 2 address</th>
        <th>step 3 unit_number</th>
        <th>step 4 address</th>
    </tr>
    <tr>
        <td>1</td>
        <td>apt. 285&#44; 81001 Klocko Crossroad&#44; Haleyhaven&#44; Indiana</td>
        <td>apt. 285</td>
        <td>&#44; 81001 Klocko Crossroad&#44; Haleyhaven&#44; Indiana</td>
        <td>285</td>
        <td>81001 Klocko Crossroad&#44; Haleyhaven&#44; Indian</td>
    </tr>
    <tr>
        <td>2</td>
        <td>2353 Cathryn Pass&#44; West Jenniferview&#44; Illinois</td>
        <td></td>
        <td></td>
        <td></td>
        <td>2353 Cathryn Pass&#44; West Jenniferview&#44; Illinoi</td>
    </tr>
    <tr>
        <td>3</td>
        <td>92467 Satterfield Locks&#44; Wendyshire&#44; Washington</td>
        <td></td>
        <td></td>
        <td></td>
        <td>92467 Satterfield Locks&#44; Wendyshire&#44; Washingto</td>
    </tr>
    <tr>
        <td>4</td>
        <td>no. 179&#44; 4769 Evangeline Garden&#44; New Carlosstad&#44; Vermont</td>
        <td>no. 179</td>
        <td>&#44; 4769 Evangeline Garden&#44; New Carlosstad&#44; Vermont</td>
        <td>179</td>
        <td>4769 Evangeline Garden&#44; New Carlosstad&#44; Vermon</td>
    </tr>
    <tr>
        <td>5</td>
        <td>78700 Vernon Ford&#44; North Rudolph&#44; New Jersey</td>
        <td></td>
        <td></td>
        <td></td>
        <td>78700 Vernon Ford&#44; North Rudolph&#44; New Jerse</td>
    </tr>
    <tr>
        <td>6</td>
        <td>unit. 45 837 Franecki Meadows&#44; Schmelerfurt&#44; Oklahoma</td>
        <td>unit. 45</td>
        <td> 837 Franecki Meadows&#44; Schmelerfurt&#44; Oklahoma</td>
        <td>45</td>
        <td>837 Franecki Meadows&#44; Schmelerfurt&#44; Oklahom</td>
    </tr>
    <tr>
        <td>7</td>
        <td>719 Boyle Mall&#44; Marcellusview&#44; Oklahoma</td>
        <td></td>
        <td></td>
        <td></td>
        <td>719 Boyle Mall&#44; Marcellusview&#44; Oklahom</td>
    </tr>
    <tr>
        <td>8</td>
        <td>Unit 99&#44; 499 Beahan Harbors&#44; Annestad&#44; Rhode Island</td>
        <td>Unit 99</td>
        <td>&#44; 499 Beahan Harbors&#44; Annestad&#44; Rhode Island</td>
        <td>99</td>
        <td>499 Beahan Harbors&#44; Annestad&#44; Rhode Islan</td>
    </tr>
    <tr>
        <td>9</td>
        <td>87673 Williamson Bridge&#44; Port Nedra&#44; Michigan</td>
        <td></td>
        <td></td>
        <td></td>
        <td>87673 Williamson Bridge&#44; Port Nedra&#44; Michiga</td>
    </tr>
    <tr>
        <td>10</td>
        <td>No. 37 422 Wilson Streets&#44; Nienowmouth&#44; Arkansas</td>
        <td>No. 37</td>
        <td> 422 Wilson Streets&#44; Nienowmouth&#44; Arkansas</td>
        <td>37</td>
        <td>422 Wilson Streets&#44; Nienowmouth&#44; Arkansa</td>
    </tr>
</table>
<br />

Now we're going to pull the street number out.

```SQL
-- Step 5 - We basically the step 3 function again on the address to build the street_number column
UPDATE users SET street_number = REGEXP_SUBSTR(address, '[0-9]+');

-- Step 6 - Same function as step 2, just to clean the street number off of the address field
UPDATE users SET address = TRIM(SUBSTR(address, LENGTH(street_number)+1, LENGTH(address)-LENGTH(street_number)));

-- Step 7 - Now we're going to update the remaining fields with basic string functions
UPDATE users SET street = SUBSTRING_INDEX(address, ",", 1); -- fill address
UPDATE users SET address = TRIM(SUBSTR(address, LENGTH(street) + 2, LENGTH(address) - LENGTH(street))); -- remove street from address

UPDATE users SET city = SUBSTRING_INDEX(address, ",", 1); -- fill city
UPDATE users SET address = TRIM(SUBSTR(address, LENGTH(city) + 2, LENGTH(address) - LENGTH(city))); -- remove city from address

UPDATE users SET state = SUBSTRING_INDEX(address, ",", 1); -- fill state
```

We still have the address field in the table, but it's safe to drop it now.

So here is our end result


<table class="table-auto table-bordered">
    <tr>
        <th>id</th>
        <th>name</th>
        <th>original_address</th>
        <th>unit_number</th>
        <th>street_number</th>
        <th>street_number</th>
        <th>city</th>
        <th>state</th>
    </tr>
    <tr>
        <td>1</td>
        <td>Mr. Ronaldo Eichmann</td>
        <td>apt. 285&#44; 81001 Klocko Crossroad&#44; Haleyhaven&#44; Indiana</td>
        <td>285</td>
        <td>81001</td>
        <td>81001</td>
        <td>Klocko Crossroad</td>
        <td>Haleyhaven</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Hilma Baumbach</td>
        <td>2353 Cathryn Pass&#44; West Jenniferview&#44; Illinois</td>
        <td>NULL</td>
        <td>2353</td>
        <td>2353</td>
        <td>Cathryn Pass</td>
        <td>West Jenniferview</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Lisa Schumm</td>
        <td>92467 Satterfield Locks&#44; Wendyshire&#44; Washington</td>
        <td>NULL</td>
        <td>92467</td>
        <td>92467</td>
        <td>Satterfield Locks</td>
        <td>Wendyshire</td>
    </tr>
    <tr>
        <td>4</td>
        <td>Fredy McKenzie V</td>
        <td>no. 179&#44; 4769 Evangeline Garden&#44; New Carlosstad&#44; Vermont</td>
        <td>179</td>
        <td>4769</td>
        <td>4769</td>
        <td>Evangeline Garden</td>
        <td>New Carlosstad</td>
    </tr>
    <tr>
        <td>5</td>
        <td>Emanuel Ward</td>
        <td>78700 Vernon Ford&#44; North Rudolph&#44; New Jersey</td>
        <td>NULL</td>
        <td>78700</td>
        <td>78700</td>
        <td>Vernon Ford</td>
        <td>North Rudolph</td>
    </tr>
    <tr>
        <td>6</td>
        <td>Dr. Aiden Stokes</td>
        <td>unit. 45 837 Franecki Meadows&#44; Schmelerfurt&#44; Oklahoma</td>
        <td>45</td>
        <td>837</td>
        <td>837</td>
        <td>Franecki Meadows</td>
        <td>Schmelerfurt</td>
    </tr>
    <tr>
        <td>7</td>
        <td>Cory Windler</td>
        <td>719 Boyle Mall&#44; Marcellusview&#44; Oklahoma</td>
        <td>NULL</td>
        <td>719</td>
        <td>719</td>
        <td>Boyle Mall</td>
        <td>Marcellusview</td>
    </tr>
    <tr>
        <td>8</td>
        <td>Arnaldo Pagac</td>
        <td>Unit 99&#44; 499 Beahan Harbors&#44; Annestad&#44; Rhode Island</td>
        <td>99</td>
        <td>499</td>
        <td>499</td>
        <td>Beahan Harbors</td>
        <td>Annestad</td>
    </tr>
    <tr>
        <td>9</td>
        <td>Hester Littel</td>
        <td>87673 Williamson Bridge&#44; Port Nedra&#44; Michigan</td>
        <td>NULL</td>
        <td>87673</td>
        <td>87673</td>
        <td>Williamson Bridge</td>
        <td>Port Nedra</td>
    </tr>
    <tr>
        <td>10</td>
        <td>Kip Rogahn</td>
        <td>No. 37 422 Wilson Streets&#44; Nienowmouth&#44; Arkansas</td>
        <td>37</td>
        <td>422</td>
        <td>422</td>
        <td>Wilson Streets</td>
        <td>Nienowmouth</td>
    </tr>
</table>
<br /><br />

# special notes about MySQL and REGEX

- These functions above are all MySQL 8 functions, MySQL 5.7 doesn't have nearly this kind of functionality.
- To see the MySQL 8 docs for Regular Expressions, check them out here: <a href="https://dev.mysql.com/doc/refman/8.0/en/regexp.html">https://dev.mysql.com/doc/refman/8.0/en/regexp.html</a>
- To see the MySQL 5.7 docs for Regular Expressions, check them out here: <a href="https://dev.mysql.com/doc/refman/5.7/en/regexp.html">https://dev.mysql.com/doc/refman/5.7/en/regexp.html</a>
- Even though MySQL 8 has way better functionality, it's still not compatible with all regular expression formulas, for instance in php I'm able to do use `\d` as any digit, and `\D` as anything but a digit, where MySQL does not seem to be compatible with these methods, instead you have to do things like `[0-9]` and `^0-9`

<br />



# useful REGEX tools

<a href="https://regex-vis.com/?r=%28%28unit%7Capt%7Cno%29%7B1%2C2%7D%5B0-9%5D%2B%28%5C%2C%29*%28%5C+%29*%29%2B&e=0" target="_blank">Regex-Vis</a> is a really nice visualizer tool for REGEX statements
<br /><br />
<a href="https://regexr.com/" target="_blank">RegExr</a> is a great way of testing regular expressions against bodies of text
<br /><br />
<a href="https://desktopappswithelectron.com/" target="_blank">Desktop Apps With Electron</a> is a video course that Beyond Code put out a few years back that shows people how create desktop apps with Electron.  One of the things that they show you how to do is basically programming your own Regex-Vis.  Playing with it like this can supercharge your understanding of regular expressions


# feedback / requests ?

Shoot me a tweet or direct message if you want me to do any other examples.