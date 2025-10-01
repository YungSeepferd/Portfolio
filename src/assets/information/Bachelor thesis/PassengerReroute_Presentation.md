# Intervention In Self-Driving Cars

Bachelor Thesis

##### Vincent Göke

21. Dezember 2021


Wissenschaftliche Betreuerin:

**Jingyi Li**
Verantwortlicher Professor:

**Prof. Dr. Andreas Butz**


# Presentation Outline

###### 1. Introduction 2. Related Work 3. Research Questions 4. Concept 5. Implementation 6. Main Study 7. Results 8. Conclusion

Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars 2


# 1. Introduction

In **autonomous vehicles** ( **AV** ) passengers could…

…engage in **non-driving related activities** ( **NDRA** )

- …react to **non-critital spontaneous situations** ( **NCSS** )


[Source: https://s3-prod-europe.autonews.com/s3fs-public/Volvo%20AV.jpg](https://s3-prod-europe.autonews.com/s3fs-public/Volvo%20AV.jpg)

Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars



[Papersource: https://link.springer.com/article/10.1007/s42154-019-00087-9](https://link.springer.com/article/10.1007/s42154-019-00087-9)
Terken, 2020; Toward Shared Control Between Automated Vehicles and Users


[Papersource: https://doi-org.emedien.ub.uni-](https://doi-org.emedien.ub.uni-muenchen.de/10.1145/3409120.3410652)
[muenchen.de/10.1145/3409120.3410652](https://doi-org.emedien.ub.uni-muenchen.de/10.1145/3409120.3410652)
Wang, 2020; “Watch out!”: Prediction-Level Intervention for Automated Driving


# 1. Introduction

### • Travel with AVs

###### – No driver / steeringwheel – New IT-> Trust issues – Individual expectations for information displayment – Need for safety, autonomy

[Pony.ai Car: https://static.cdn.xiaomazhixing.com/images/home/car_1615998576.png](https://static.cdn.xiaomazhixing.com/images/home/car_1615998576.png) [Waymo Sensors and Camera: https://static.cdn.xiaomazhixing.com/images/home/car_1615998576.png](https://static.cdn.xiaomazhixing.com/images/home/car_1615998576.png)


Mercedes LVL 3 source: [https://auto.hindustantimes.com/auto/news/mercedesbenz-becomes-world-s-first-to-get-level-3-autonomous-driving-approval-41639196499051.html](https://auto.hindustantimes.com/auto/news/mercedesbenz-becomes-world-s-first-to-get-level-3-autonomous-driving-approval-41639196499051.html)



Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars




# 2. Related Work – NDRA vs. Trust


**Tradeoff** in AVs:


comfortability of **NDRA**
and the perceived
**trustworthiness** of the

car


Imbalanced UIs might


cause **Mis-** or even

**Disuse**


[Paper source: https://dl.acm.org/doi/10.1145/3004323.3004331](https://dl.acm.org/doi/10.1145/3004323.3004331)


Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars 5


# 2. Related Work– Use cases

[Papersource: https://link.springer.com/article/10.1007/s42154-019-00087-9](https://link.springer.com/article/10.1007/s42154-019-00087-9)
Terken, 2020; Toward Shared Control Between Automated Vehicles and Users

Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars 6


# 2. Related Work– AV Framework

[Papersource: https://doi-org.emedien.ub.uni-muenchen.de/10.1145/3409120.3410652](https://doi-org.emedien.ub.uni-muenchen.de/10.1145/3409120.3410652)
Wang, 2020; “Watch out!”: Prediction-Level Intervention for Automated Driving

Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars




# 2. Related Work – Measurement

**What factors establish trust?**


**Important factors of UIs fostering user**

**trust**

1. Anthropomorphism
2. Transparency
3. System perceived as an expert (by

neatness/ aesthetics)
4. Customization of noncritical


information

5. Brand reputation
6. System knowledge and experience





[Paper source: https://dl.acm.org/doi/abs/10.1145/3004323.3004331,](https://dl.acm.org/doi/abs/10.1145/3004323.3004331)
Diels, Migliani 2016 - Compatibility between Trust and Non - Driving Related Tasks in UI Design for Highly and Fully Automated Driving





Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars




# 3. Research Questions

#### • RQ1: How do varying amounts of information in an
###### AV navigation UI affect passenger‘s UX, cooperative performance and trust in the system? Is the time restraint relevant?

#### • RQ2: How much information is adequate for
###### navigation level AV UIs?

Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars 9


# 4. Concept - Inspiration

Source: top left : htt ps://www.pinter est.com /pin/27 795722 678420 817 /
Source: top right: [htt ps://dr ibbble.com /shots/ 148031 42-Self-dr iving-Taxi-App](https://dribbble.com/shots/14803142-Self-driving-Taxi-App)
Source: bottom: [htt ps://dr ibbble.com /shots/ 401248 4-Autom ated-Driving-UI](https://dribbble.com/shots/4012484-Automated-Driving-UI)


Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars 10


# 4. Concept – Preset Route

[Source: https://www.google.de/maps/dir/48.1504449,11.5812516/48.1457715,11.5642941/@48.1475748,11.5681677,16z/data=!3m1!4b1!4m2!4m1!3e0](https://www.google.de/maps/dir/48.1504449,11.5812516/48.1457715,11.5642941/@48.1475748,11.5681677,16z/data=!3m1!4b1!4m2!4m1!3e0)


Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars




# 4. Concept – Pilot Study

#### **Purpose:**


 **Test** **design frames for viability**

 **Functionalities** and **aesthetics,** **useful** and **necessary** ?


   Is any **information missing** ?

   Can something be left out?

###### **Details:**


 N=11 participants

 Limesurvey

 Personal interview


Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars 12


# 4. Concept – Pilot Study

#### **Result:**

###### • Deletion of notification screen • Integrated restaurant information (address, menu with top dishes) • Integrated route information (varying across levels) • Demand to display the traffic situation (picture-in- picture live camera view, situational awareness)

Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars 13


# 4. Concept – Pilot Study

**Next Step:**

 **2 videos** of starting point


 **Parked car** = Slow Thinking

 Implementation of **6** Levels


    FT1, FT2, FT3

    ST1, ST2, ST3


Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars 14


# 5. Implementation - Interaction

**FT1** **FT2** **ST3**


Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars 15


# 5. Implementation – Aid tools

#### **UX design:**


Design tool: “Figma”

Android/IOS application:

“Figma Mirror” ( **remote**
**testing** )

Plan-level application


   add stopover to route
#### **Online Study:**

Zoom conference & screen share

Limesurvey questionnaire

**Mobile screen capture**


Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars




# 5. Implementation – Homescreen

###### FT3 ST3

Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars




# 5. Implementation – Navigation

###### Slow Thinking Overview

Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars




# 5. Implementation – Level 1


**Level 1** : Ice cream

2 shops

2 routes for each shop (new **time of arrival** ( **TOA** ))

Menu for selected shop


Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars




# 5. Implementation – Level 2


**Level 2** : Quick Snack

Route Information for Selection: ToA, **Mins added**


Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars




# 5. Implementation– Level 3


**Level 3** : Coffee

Route Information for Selection: ToA, Mins added, **Distance in km**



Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars




# 5. Implementation – Confirmation


**Confirm** shop and route selection by

pressing „ **GO** “

- **X- Button** to **undo** previous step

Participant notifies about finished task


:
**Recordings contains**
**Time** measured

Chosen **location**

Interaction **steps**


_After all Levels,_ _**upload**_ _of recordings to_
_matching_ _**ID Folder**_ _on Google Drive_


Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars




# 6. Main Study – Introduction

###### **Details :**


 Guided **online-study** on **Zoom**


   Limesurvey **questionnaire** (Demographics, T0)


    - For each of the **3 levels** :


      Figma Mirror **screen capture**


      Limesurvey **questionnaire** (T1, SUS, UX)


    Final **interview**


    Google drive **upload**


 N=30 participants [9 = F, 20 = M, 1 undisclosed]


    Fast Thinking ( **FT** )


    Slow Thinking ( **ST** )

 Time: 1 hour


Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars 23


# 6. Concept – Measurement

Situational Trust Scale **(STS) – rephrased for AV rerouting situations**

Comparison between base trust **T0** vs. trust after prototype **T1**


 ###### System Usability Scale ( SUS )


    10 questions to get system usablity reference


    Answer after every level


[Paper source: https://doi-org.emedien.ub.uni-muenchen.de/10.1145/3409120.3410637,](https://doi-org.emedien.ub.uni-muenchen.de/10.1145/3409120.3410637)
Holthausen, Wintersberger 2020 – Situational Trust Scale for Automated Driving (STS-AD)



Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars




# 6. Concept – Measurement


3 self defined questions

Considered separately

Get rough picture if prototype fullfilled pilot study information


demands


Control ( **C** ), Shop information ( **SI** ), Time ( **T** )


 Final semi-structured interview (10 Mins)

Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars 25


# 7. Results – Interaction Steps


**FT** group finished Task with **less interaction steps** than **ST**


  **FT123** Mean = **30.78**, StdDev = 20.133;

  **ST123** Mean = **50.56**, StdDev: 81.457;

  [N=30] Mean = **40.67**, StdDev = 59.830


Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars 26


# 7. Results – Average Time


**FT** group tend to finish the tasks **more** **quickly** than **ST**


  **FT123** Mean = **00:51**, StdDev: 20.134;

  **ST123** Mean = **01:08**, StdDev: 81.457;

  [N=30] Mean = **01:00**, StdDev: 59.830.


Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars 27


# 7. Results – Selected Shop


**(N=21, 70%)** opted for detour to **level 3** shop **"Café im Vorhoelzer Forum„**

(closest to the destination address, route is mostly identical)

**FT** predominantly chose the **further** shop

**ST** predominantly chose the **closer** shop


= closer = further


Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars 28


# 7. Results - Trust

**FT-T0:** Mean = **4.37**, StdDev = 0.965
**FT-T1:** Mean = **5.83**, StdDev = 0.748


**ST-T0:** Mean = **4.88**,StdDev = 0.724
**ST-T1** : Mean= **5.8**, StdDev = 0.752



**T0-[n=30]:** Mean = **4.63**, StdDev = 0.877
**T1-[n=30]:** Mean = **5.82**, StdDev = 0.746



Baseline Trust T0 Trust T1


Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars 29


# 7. Results - Trust





Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars 30


# 7. Results - Usability

Overall score = **75.38** on a scale of 100, r=0.7538, StdDev = 15.619)
Normalised **rating** **>** **68** ; adjectives " **good** " and " **excellent** "


Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars Determining What Individual SUS Scores Mean: Adding an 31


# 7. Results - Experience

**Likert 7 scalar questions:**

- **Control (C)** = mean = **5.93**, StdDev-C = 1.261

= mean = **4.42** StdDev-SI= 1.761
**Shop Information (SI)**,

- = mean = **5.79** StdDev-T =1.222
**Enough time to reroute (T)**,



Strongly
Disagree



Disgree Slightly Neutral Slightly Agree
Disagree Agree





Shop information: not sufficient

Percieved control: OK

Time for NCSS: OK


Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars 32


## 7. Results – Semi-Structured Interview

###### AV Control Interface: Hand-Held Device vs. Built-In

–
N= **16** (53.33%) would like to interact with a **built-in interface**

–
N= **14** (46.67%) would prefer to have a **mobile interface**

###### **Shop filter for simpler reroute under time restraint:**


Likelihood of use **:** Mean = **6.4**, StdDev = 0.724

**Comment:**

Useful tool under time pressure, but room for improvement


Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars 33


## 7. Results – Semi-Structured Interview


**Traffic camera on trust** (Mostly positive, some negative)

Learning effect ( **Levels similar** in their structure)

Too similar information split (Level 2 & 3 too similar)

Still some concerns about IT security and

Complications with mobile phones (i.e. low battery, no internet,
slow-response times, device receives a call)


Improvement:

**Trusted Sound Landscape**


   Sound cues for warnings [N=9 (30%)]

   Voice control [N=7 (23.33%)]

 Placement of smiley away from center (no actual help)

 **Shop Symbols** do not always correspond to shop


Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars 34


# 8. Conclusion

#### - UI: Raise in trust level towards the AV in participants, especially FT - Level 3 complex first in user rank - Level 1 simple had best survey score - Time frame influences the decision making process (Interaction steps, time, location) - Time limit for reroute can result in stress → Indecisive behavior, discomfort - Shop filter supports time sensitive reroutes

Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars 35


# Bachelor Thesis Bibliography



**References**

[ **1** ] Jackie Ayoub, Feng Zhou, Shan Bao, and X. Jessie Yang. From manual
driving to automated driving: A review of 10 years of autoui. In Proceedings of
the 11th International Conference on Automotive User Interfaces and Interactive
Vehicular Applications, AutomotiveUI ’19, pages 70–90, New York, NY, USA,
2019. Association for Computing Machinery.

[ **2** ] Aaron Bangor, Philip Kortum, and James Miller. Determining what individual
sus scores mean: Adding an adjective rating scale. J. Usability Studies,
4(3):114–123, 2009.

[ **3** ] Melanie Berger, Aditya Dandekar, Regina Bernhaupt, and Bastian Pfleging.
An ar-enabled interactive car door to extend in-car infotainment systems for rear
seat passengers. In Extended Abstracts of the 2021 CHI Conference on Human
Factors in Computing Systems, CHI EA ’21, New York, NY, USA, 2021.
Association for Computing Machinery.

[ **4** ] Amber Case. Calm technology: Principles and patterns for non-intrusive
design. O’Reilly Media, Sebastopol, CA, first edition edition, 2015.

[ **5** ] Anna-Katharina Frison, Philipp Wintersberger, Andreas Riener, Clemens
Schartmüller, Linda Ng Boyle, Erika Miller, and Klemens Weigl. In ux we trust:
Investigation of aesthetics and usability of driver-vehicle interfaces and their
impact on the perception of automated driving. In Proceedings of the 2019 CHI
Conference on Human Factors in Computing Systems, CHI ’19, pages 1–13,
New York, NY, USA, 2019. Association for Computing Machinery.

[ **6** ] Brittany E. Holthausen, Philipp Wintersberger, Bruce N. Walker, and Andreas
Riener. Situational trust scale for automated driving (sts-ad): Development and
initial validation. In 12th International Conference on Automotive User Interfaces
and Interactive Vehicular Applications, AutomotiveUI ’20, pages 40–47, New
York, NY, USA, 2020. Association for Computing Machinery.

[ **7** ] Abhijai Miglani, Cyriel Diels, and Jacques Terken. Compatibility between trust
and non-driving related tasks in ui design for highly and fully automated driving.
In Adjunct Proceedings of the 8th International Conference on Automotive User
Interfaces and Interactive Vehicular Applications, AutomotiveUI ’16 Adjunct,
pages 75–80, New York, NY, USA, 2016. Association for Computing Machinery.

[ **8** ] Bastian Pfleging, Maurice Rang, and Nora Broy. Investigating user needs for nondriving-related activities during automated driving. In Proceedings of the 15th
International Conference on Mobile and Ubiquitous Multimedia, MUM ’16, pages 91–
99, New York, NY, USA, 2016. Association for Computing Machinery.




[ **9** ] Sonja Rümelin. The cockpit for the 21st century.

[ **10** ] Sonja Rümelin, P. Siegl, and A. Butz. Could you please ... ? investigating
cooperation in the car. In Adjunct Proceedings of the 5th International
Conference on Automotive User Interfaces and Interactive Vehicular Applications
(AutomotiveUI ’13), pages 61–64. AutomotiveUI ’13, 2013.

[ **11** ] Jacques Terken and Bastian Pfleging. Toward shared control between
automated vehicles and users. Automotive Innovation, 3(1):53–61, 2020.

[ **12** ] Marcel Walch, Stacey Li, Ilan Mandel, David Goedicke, Natalie Friedman, and
Wendy Ju. Crosswalk cooperation: A phone-integrated driver-vehicle
cooperation approach to predict the crossing intentions of pedestrians in

NY, USA, 2019. Association for Computing Machinery.

Association for Computing Machinery.

2020. Association for Computing Machinery.



Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars 36


###### Future work:

Soundscape for subtle but meaningful notification

Voice control/ assistance

Shop filter questions

In-car or simulator testing

Better shop information

###### Limitations:


- Hardly realistic (online study)

- Figma functionalities (no zoom in, no sound, no haptic

feedback)

- Mostly young participants with technological preknowledge

and trust


Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars 37


# Participants car usage

13 participants ( 43.33%) reported travelling weekly as a passenger in a

car

1 ( 36.67 %) reported monthly

4 (13.33%) daily

2 (6.67 %) rarely


11 (36,67%) participants average trip duration of 1-2 hours

8 (26,67 %) a duration of 30 minutes-1 hour

7 (23,33 %) a duration of less than 30minutes

4 (13,33 %) a duration of 3-5 hours per trip


Not all participants wanted to disclose their travel behaviour


Vincent Göke - Passenger Reroute: Phone-Based Intervention In Self-Driving Cars 38


