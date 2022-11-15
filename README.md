## This is Shiftly, a team calendar for shift-based workplaces
Create a calendar for your team - each user has a separate timeline with shifts, notes, and holidays. 

## Authentication
The demo supports guest demo mode and Google login features.
If logged in with Google, your data is saved on Firebase and is accessible at any time.
In guest mode, a new user is created each time you login, meaning that data will not persist after re-logging in.
(basically, for now, it's creating a pile of new guest accounts which I need to manually clean up/delete every time)

## Tools used
I used Typescript to keep my sanity, Zustand for state management, and a few Material Design icons on the side.
As mentioned previously, Firebase handles the authentication; it also handles the cloud storage for users and calendars with their associated events. 

## What's next?
I have a vision of some future features...
#### User permissions for each calendar
This will allow you to, for example, send a link to your team member so that they can view the calendar but only edit their timeline (or as per whatever permissions you specify).
#### Template scheduling
Create and reuse templates for reocurring shifts.
#### Availability check
See who is available to work and schedule each day in a single-timeline calendar format.

## Login page
![shiftly_snap](https://user-images.githubusercontent.com/97320785/202024560-921913cc-dd60-4a2c-9a3c-1f52339c5d09.png)
## Calendar
![shiftly_2](https://user-images.githubusercontent.com/97320785/202025554-0bc000d8-e19e-4399-b644-6fc1637ded33.png)
