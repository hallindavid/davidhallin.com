---
title: "setting a punch clock system"
date: 2021-03-09 
description: "creating a punch clock in a TALL stack (with jetstream) application"
tags: ["laravel","php"]
type: "worklog"
planningTime: "2hr30min"
devTime: "4hr40min"
totalTime: "7hr10min"
---

# intro

I'm working on a project right now for a company. They would like to add a punch clock to an internal use application I
wrote, which will be used by their employees to submit their time sheets.

---
<br />
# reqs
* Employees must be able to punch in and out easily
* Employees should be able to add/edit/delete their own (and only their own) punches within the last 14 days
* Admin users should be able to add/edit/delete any employees punches, indefinitely
* Admin users should be able to report on employee punches, with date parameters
* Admin users should be able to export the report into a CSV file

---
<br />
# steps
This is a fairly small addon to the application - so I think we can get away with having just a few small components.

### BACKEND//PLAN

We already have a user, which comes built in with Laravel. In the past, we added an `is_admin` boolean field.

The `punch` model doesn't need to be too complicated for our needs. The way I see it, we'll have

- `user_id` - the foreign key to the users table
- `in_at` - UTC timestamp for time the punch occurred
- `out_at` - the UTC timestamp for the time the punch out occurred
- `duration` - integer representing the number of minutes for the shift

<br />
I think it makes sense to break duration out like this for a few reasons.<br />
a) it's going to be easier on the database to run the sum of this column, as opposed to the sum of the date diff between the two fields<br />
b) if we want to do any manipulations to the time (eg, rounding to the closest 15 minutes) that'll be easier to do in this setup.

After we define this, it's probably safe to make all the fields fillable for this application.

We're also going to want to define a few relationships for this new model. 1 `user` can have many `punch`'s, so we'll
need to define

* a `hasMany` relationship for `user` -> `punch`
* a `belongsTo` relationship for `punch` -> `user`

We also will probably need some scopes for the punch

* `inProgress` - a model scope for punches that have an `in_at` value, but no `out_at` value yet - this will make it
  easier to determine a users current status
* `completed` - a model scope for punches that have both an `in_at` value, and an `out_at` value.

We also need to define some local attributes (this is a personal preference) which converts the stored UTC time into the
local timezone

* `getLocalInAtAttribute`
* `getLocalOutAtAttribute`

and the mutators for setting the time, which takes the local time, converts it to UTC, and then saves it

* `setLocalInAtAttribute`
* `setLocalOutAtAttribute`

Now, once all this is done, we also need to make sure we protect the administration pages, so we also need to define &
register a `PunchPolicy`.

### BACK-END//TODO

<br />
So - what we need for this portion of the work is the following. 
* 1 new model & migration for `punch`
* define `belongsTo` relationship for `punch` -> `user`
* define `hasMany` relationship for `user` -> `punch`
* define scope for `inProgress` & `completed`
* define the local accessor and mutator for `in_at`
* define the local accessor and mutator for `out_at`
* define & register `PunchPolicy` to protect unauthorized users from editing/accessing other records


<br />

### FRONT-END//PLAN

The way that the employees will use the punch clock is probably the most important factor on the front end.

So I'm thinking we need to do a navigation bar widget where the users can punch in & out, without having to go to a
different screen.

This application is written with Jetstream, we already have some great tailwind menu components that we'll
repurpose/copy, and because it's responsive, we'll actually need 2 components, one for the mobile view, and one for the
desktop view.

After that, we'll need to make a page where users can manage their punches, we could combine this with the admin/report,
but I think it probably makes more sense to seperate them out, because there is enough different functionality between
them (eg. filters, export functionality). So we'll break the list of punches into 2 components, one for admins, and one
for a user perspective.

Lastly, we need an edit punch, which will also provide the delete functionality. I'm probably going to make use of
the `<x-jet-form-section>` component from Jetstream for this page.

### FRONT-END//TODO

<br />
So for this we'll need to make these livewire components
* `Punch/QuickPunchDesktop`
* `Punch/QuickPunchMobile`
* `Punch/EditPunch`
* `Punch/Index`
* `Punch/Report`

<br />
### PROJECT//TODO
* 1 model (3 fields, 1 relationship, 1 policy, 2 scopes, 2 mutators/accessors)
* 2 in-page component (same component, 1 for mobile, 1 for desktop, both with 1 function)
* a full-page component for listing the model, no filters, but has a quick-add form
* a full-page component for listing the model, with filters, quick-add form, and export functionality
* a full-page component for editing the model

<br />
# worklog
The purpose of me documenting this work is to improve my estimation ability on time taken on implementing a project

<table class="table-auto">
    <thead>
        <tr>
            <th class="w-3/4 text-left text-lg">Task</th>
            <th class="w-1/4 text-lg">Time</th>
        </tr>    
    </thead>
    <tbody>
        <tr>
            <td>Planning</td>
            <td class="text-center">2hr 30 min</td>
        </tr>
        <tr>
            <td>Model creation (w/ relationships, accessors, mutators, policy)</td>
            <td class="text-center">30 min</td>
        </tr>
        <tr>
            <td>Desktop & mobile quick-punch nav components</td>
            <td class="text-center">22 min</td>
        </tr>
        <tr>
            <td>Full page, employee list component</td>
            <td class="text-center">58 min</td>
        </tr>
        <tr>
            <td>Full page, edit punch component</td>
            <td class="text-center">44 min</td>
        </tr>
        <tr>
            <td>Full page, admin list component</td>
            <td class="text-center">2hr 6 min</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
          <td class="text-right">Total Dev Time</td>
          <td class="text-center">4 hrs, 40 min</td>
        </tr>
        <tr>
          <td class="text-right text-lg">Total Time</td>
          <td class="text-center text-lg">7 hrs 10 min</td>
        </tr>
    </tfoot>
</table>


<br />
# outcome

I'm pretty happy with the outcome of the screens. You can check out the visuals in the screens below

<div class="flex flex-wrap">
  <a href="/images/worklog/punch-clock-screens/desktop-nav-widget.png" target="_blank()"><img class="h-40 m-2" src="/images/worklog/punch-clock-screens/desktop-nav-widget.png" /></a>
  <a href="/images/worklog/punch-clock-screens/mobile-nav-widget.png" target="_blank()"><img class="h-40 m-2" src="/images/worklog/punch-clock-screens/mobile-nav-widget.png" /></a>
  <a href="/images/worklog/punch-clock-screens/edit-punch.png" target="_blank()"><img class="h-40 m-2" src="/images/worklog/punch-clock-screens/edit-punch.png" /></a>
  <a href="/images/worklog/punch-clock-screens/my-timesheet.png" target="_blank()"><img class="h-40 m-2" src="/images/worklog/punch-clock-screens/my-timesheet.png" /></a>
  <a href="/images/worklog/punch-clock-screens/admin-manage-sheets.png" target="_blank()"><img class="h-40 m-2" src="/images/worklog/punch-clock-screens/admin-manage-sheets.png" /></a>
</div>