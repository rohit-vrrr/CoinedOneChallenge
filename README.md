# CoinedOneChallenge
### Back-end Challenge | CoinedOne

**Requirements**
Harry is addicted to some apps on his phone. He wants to control his addiction which sometimes gets in the way of his work while he is working from home. To do this, he needs to be able to block certain addictive apps during his work time.<br/>
During his non-work (leisure) time, he wants to be able to use some apps with maximum time-limitations to reduce the total time he spends on them that day. On weekends, he wants to be able to use them a little longer than usual.<br/>

**Design, document and implement a database and  the REST APIs** that allow Harry to set his work timings(multiple time slots in a day) for each day of the week along with the list of apps that must be blocked during those times. Also, for non-work(leisure) times, get a list of apps along with the maximum usage limits for weekdays and weekends.<br/>

**Resources**
**https://drive.google.com/file/d/1oqh9_nDOUNraoGkJM3IiPWmrsEbTzFpq/view**

**Sample**<br/>
Scenario<br/>
On **Mondays,Tuesdays and Wednesdays,** Harry’s work timing is from 9am to 6pm with a 2 hour break between 12pm-2pm.<br/>
He wants to ensure that the following apps are not usable during his work hours : Facebook, Instagram, Twitter, Dailyhunt<br/>
During his non-working time, he wants to limit the usage of the following apps to the corresponding duration :<br/>
Facebook - 30m, Instagram - 1h, Youtube - 1h 30m

<br/><br/>

On **Thursdays and Fridays,** Harry has the night shift from 10pm to 6am<br/>
He wants to ensure that the following apps are not usable during his work hours : Facebook, Instagram, Twitter, Dailyhunt<br/>
During his non-working time, he wants to limit the usage of the following apps to the corresponding duration :<br/>
Facebook - 30m, Instagram - 1h, Youtube - 1h 30m

<br/><br/>

On **Weekends** (Saturday and Sunday), Harry has no work-time but he wants a little extra time than usual on the apps that he wishes to limit during his non-work time.<br/>
Facebook - 1hr, Instagram - 1h 30m, Youtube - 2 h

<br/><br/>

**Sample Input**<br/><br/>
**Monday, Tuesday, Wednesday**<br/>
**Work timings :** 9am-12pm, 2pm-6pm<br/>
**Apps to be blocked during work time :** com.facebook.katana, com.instagram.android, com.twitter.android, com.eterno<br/>
**Apps(with limits) to be limited during non-work time :**  com.facebook.katana - 30m, com.instagram.android-1h,  com.google.android.youtube - 1h 30m<br/>

**Thursday, Friday**<br/>
**Work timings :** 10pm - 6am<br/>
**Apps to be blocked during work time :** com.facebook.katana, com.instagram.android, com.twitter.android, com.eterno<br/>
**Apps(with limits) to be limited during non-work time :**  com.facebook.katana - 30m, com.instagram.android-1h,  com.google.android.youtube - 1h 30m<br/>

**Saturday, Sunday**<br/>
**Apps(with limits) to be limited during non-work time :**  com.facebook.katana - 1h, com.instagram.android-1h 30m,  com.google.android.youtube - 2h<br/>

<br/>

**Rules**
- Consider a Non-relational database while designing the database.
- Refer the page design.
- Show us how you create clean, maintainable code.
- The maximum time you may take to complete this challenge is 3 days.

**Deliverables**
- Stage 1 Share the database design as well as the REST API documentation (not the one exported from postman) via Google.
- Stage 2 Share the Github link of the public repo & postman export file to the same email.
- Extra Credits End result should be deployed on a public Cloud (Heroku, AWS etc. all have free-tiers you can use).

**Advice**
- We don’t want to know if you can do exactly as asked (or everybody would have the same result). We want to know what you bring to the table when working on a project, what is your secret sauce. More features? Best solution? Thinking outside the box?<br/>
- Documentation and maintainability are a plus.<br/>
