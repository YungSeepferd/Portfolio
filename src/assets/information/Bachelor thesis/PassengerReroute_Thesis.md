L UDWIG -M AXIMILIANS -U NIVERSITÄT M ÜNCHEN

Department “Institut für Informatik”
Lehr- und Forschungseinheit Medieninformatik
Prof. Dr. Andreas Butz


**Bachelor Thesis**

# Passenger Reroute: Phone-Based Intervention In Self-Driving Cars


Vincent Clemens Coelestin Göke


[Vincent.Goeke@campus.lmu.de](mailto:Vincent.Goeke@campus.lmu.de)


Bearbeitungszeitraum: 18. 05. 2021 bis 05. 10. 2021
Betreuer: Jingyi Li
Verantw. Hochschullehrer: Prof. Dr. Andreas Butz


## **Abstract**

Nowadays, car passengers can intervene in planned driving routes by cooperating with human
drivers through verbal communication or utilizing mobile navigation applications. When anticipating future self-driving cars, it is conceivable that passenger communication with an autonomous
driving system could be difficult under a variety of possible real life scenarios (e.g., reroute before crossroad). Having to give time critical commands to a driverless car with overly complex or
overly simplified interfaces could cause stress, distrust or even misuse of a novel system. As more
and more omnipresent smart phone applications become interoperable with newer in-car infotainment systems(i.e. music selection, calls), we decided to implement a spontaneous phone-based
intervention prototype. To support this specific in-time intervention for rear seat passengers and to
investigate their trust relationship in an autonomous system, we implemented three phone-based
user interfaces (UI) with small, medium, and large amounts of information. In a pilot study (n=11)
and a main user study (n=30) with two types of time restraints (Fast Thinking = FT vs. Slow
Thinking = ST), we analyzed the impact of three information levels on passengers’ cooperative
performance and trust in the system. For both AV scenarios (driving and parking), the influence of
time pressure on the cooperation between the passenger and the system and the passenger’s trust
in the system were investigated. The main user study showed that the presented interfaces invoked
higher trust levels (T1) in staged rerouting by a rear seat passenger compared to the baseline trust
(T0) measured in advance of the interaction. By presenting various navigational level intervention tasks, we tested time pressure situations using a simplified shop selection and compared three
levels of UI information densities for trustworthiness and usability. A picture-in-picture AR traffic cam was viewed as mostly positive, with a few negative experiences amongst the participants
(situational awareness, trust towards rerouting in autonomous system, feeling of control).
The results of the study offer data about the trust, usability and participants’ willingness to
interact in staged everyday situations with time pressure as an additional factor. This rear seat
passenger prototype is the first step towards more realistic, comprehensive UX design concepts,
incorporating trustworthy navigational intervention in future AVs.


## **Task**

Passenger-Vehicle Cooperation: Exploring Rear-Seat Intervention Approach in Automated Driving:
By implementing three spontaneous reroute intervention scenarios for a hand-held AV UI and
the associated data collection (i.e. online questionnaire, screen captures, semi-structured interview), we investigated what types of information and the amount of information a phone-based
reroute UI should offer rear seat passengers. With the intention to free up the rear seat passenger to be able to make decisions, we tested for trustworthiness of the possible AV intervention
(e.g. decision making) during non-driving-related activities (NDRA, e.g. brought-in device usage,
entertainment, trip related planning).


**:** To ideate on rear seat co-operative driving scenarios


**:** To create and implement resultant application


**:** To evaluate and analyse the implemented application


I hereby declare that I have written this thesis independently, that I have marked all quotations as
such and that I have indicated all sources and aids used.


München, October 5, 2021


. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .


## **Contents**

**1** **Introduction** **1**


**2** **Related work** **2**

2.1 Cooperative Driving . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 2
2.1.1 Driver-Based Intervention . . . . . . . . . . . . . . . . . . . . . . . . . 2

2.1.2 Passenger-Based Intervention . . . . . . . . . . . . . . . . . . . . . . . 3
2.1.3 Division Of Workload . . . . . . . . . . . . . . . . . . . . . . . . . . . 4

2.2 Automotive UIs For Cooperation (Mounted Device And Brought-In Device) . . . 4
2.2.1 Built-In Car Interfaces . . . . . . . . . . . . . . . . . . . . . . . . . . . 4

2.2.2 Phone-Based Car Interfaces . . . . . . . . . . . . . . . . . . . . . . . . 4

2.3 Passenger’s Attitude (Willingness To Cooperate And Trust) . . . . . . . . . . . . 5
2.3.1 Customized UX . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5

2.3.2 Trust And Usability . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6


**3** **Concept And Implementation** **8**

3.1 Reroute Scenario . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8

3.2 UI design . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 9
3.3 Implementation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 15
3.4 Pilot Study . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 15


**4** **User Study** **17**

4.1 Measurements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 18

4.2 Participants . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 18
4.3 Apparatus . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 18
4.4 Study Interaction Procedure . . . . . . . . . . . . . . . . . . . . . . . . . . . . 19


**5** **Results** **20**

5.1 Performance . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 20

5.2 Trust . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 20

5.3 Usability . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 22
5.4 Experience . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 22
5.5 Semi-Structured Interview . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 24


**6** **Discussion** **25**

6.1 Varying UX Preferences For Car Infotainment Systems . . . . . . . . . . . . . . 25
6.2 Car Interface Information Density . . . . . . . . . . . . . . . . . . . . . . . . . 25


**7** **Limitations And Future Work** **27**

7.1 Limitations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 27

7.2 Shop Suggestion Process Under Time Pressure . . . . . . . . . . . . . . . . . . 27
7.3 Customization . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 27

7.4 Voice Assistant For Rerouting . . . . . . . . . . . . . . . . . . . . . . . . . . . 27
7.5 Audio Feedback And Notification . . . . . . . . . . . . . . . . . . . . . . . . . 28


**8** **Conclusion** **29**


I


1 INTRODUCTION

## **1 Introduction**


Cooperation between the driver and passengers has been an important part of mutually beneficial
travel experiences since the invention of the automobile [10]. Before ubiquitous computersupported navigation, the co-driver used analog maps of city streets to give directions to the
driver. If a car passenger had a wish, e.g., a break or an intermediate stop to drink or eat, he only
had to make it known in conversation with the trusted driver. As the technological development of
autonomous driving progresses, i.e. automation levels 4 and 5, an active driver should no longer
be needed [14]. However, as the way in which the passenger intervenes in the system’s driving
process is important to maintain the passenger’s trust in the system, simple, intuitive controls
are required [11]. This highly complex technology, which must also take into account often
unpredictable parameters of urban traffic, can in some situations make suggestions for action, (e.g.
restaurant suggestions near the route, or a reroute proposal when a traffic disruption is detected)
but not always make the best decision for the passenger’s personal comfort or preference. Once
the role of the driver is taken over by an automated system, the communication between a
passenger who wants to communicate their rerouting wishes and concerns to the car’s navigation
system could be perceived as cumbersome or even dangerous. This barrier between man and
machine could evoke an uncomfortable driving experience, resulting in distrust or misuse of
the system. We created three different rerouting scenarios, in which the goal was to set a short,
spontaneous stopover. Along an existing route we filtered shops for three use cases and presented
them as shop recommendations, filtered by the system in advance. The levels differed not only in
their shop selection, but also in their UI information density. Level 1 had a low level of vehicle,
store, and route information, level 3 had high level of information, and level 2 had an average
level of information available, based on the amount of information from levels 1 and 3.


The use cases for each level were as follows:


1. `Level:` Simple Information - Use case: Ice cream


2. `Level:` Medium Information - Use case: Quick snack


3. `Level:` Complex Information - Use case: Coffee


To investigate the effect of time pressure on the cooperative performance of the rear seat passenger in navigation scenarios, the 30 online-study participants were divided into two equal groups.
The first group had 3 minutes to plan a stopover from a moving car (Fast Thinking - FT) and the
second group had 15 minutes to do the same from the rear seat of a parked car (Slow Thinking

- ST). Furthermore, it was investigated to what extent the information density of the respective
level influenced the perceived trustworthiness of the technology. It is yet to be determined what
the minimum level of information density is so that the occupant can still make a well-considered
navigation decision, and at what point the vehicle occupant is overwhelmed by the flood of information presented. The FT group predominantly chose the shop furthest away within their 3
minute time frame. The ST group with 15 minutes time for a decision mostly picked the closest.
The time for task completion and interaction steps increased with the level of information density.
Although the user interface’s visual design is important, the impact of other interaction modalities
(i.e. auditive, haptic cues) on the trust the passenger had in the autonomous driving system could
not be examined in more detail. Future self-driving car UIs (mobile, built-in or a combination
of the two) will have to contain a balance of information density and thoughtful placement or
customizable UI elements in order to preserve the passenger’s positive user experience (UX) and
freedom to make in-time navigational interventions. For this online study, a map was modified
to offer a pre-selection of stores in order to assist the participant in making a deliberate decision
under time pressure.


1


2 RELATED WORK

## **2 Related work**


My work targets the highly automated level 4 and the fully automated level 5 of driving as defined
by the Society of Automotive Engineers (SAE) [1] . An autonomous car passenger should be able to
engage in non-driving-related-activities (NDRA)[11, 8]. In a conventional car driving activity, a
distinction is made between primary (i.e. driving), secondary (i.e. assisting driving) and tertiary incar occupations (i.e. not relevant to driving) [8, 7]. The focus of our concept lies specifically on the
area of spontaneous rerouting, i.e. a secondary task, in which the system becomes the active driver.
The correlation between user experience (UX) design (e.g. a mobile navigational intervention
application for AV (rear seat) passengers) and the user’s level of trust in and acceptance of the
operating driving system is important for future in-car UI development. [5, 7]


**2.1** **Cooperative Driving**


In higher levels of autonomous driving (i.e. 4 and 5), the opinion of the vehicle passenger,in some
moral or social situations will still be required [13]. This interaction is of great relevance to the
overall UX. If the passenger perceives the system’s behavior as subjectively inappropriate and
non-transparent, the passenger’s UX can be unpleasant in more complicated intervention situations (e.g. in urban traffic scenarios) as a result [15, 11, 14]. Local residents who frequently travel
by car are familiar with bypasses and other areas where delaying traffic events often occur in the
course of their daily routines. In this case, the human can decide better than the machine, as the
human knows from previous experience in which areas of the city traffic jams or gridlocks are to
be expected at any given time. Given the scenario that the navigation system of the AV cannot
process traffic data from a city area, it would thus lay out and offer default routes according to
arrival time. In order for passengers to be able to interact with the autonomous system according
to their preference or, as laid out in this study, to be able to specifically influence the planning
and execution of the route, more research is needed [11]. There is some research investigating
cooperative interfaces for higher automation levels utilizing visual and audio cues for system suggestions. In scenarios of system requests (takeover) or recommendation (reroute), the user is able
to accept or reject suggestions[1, 9, 10, 11]. Although many industry projections for the future
of driving speak of full automation without human involvement, previously mentioned research
has showed that positive travel experiences in AV involves the user in the planning level regarding
decision-making and route determination.


**2.1.1** **Driver-Based Intervention**


In automation levels lower than four, only some functionalities of driving are taken over by the
system [14, 1]. This automation is possible in a controlled context or in highly predictable situations, such as highway driving on clearly structured roads (e.g., in American cities, especially
Silicon Valley). In contrast to autonomous vehicles, the focus of the interaction between driver
and system is on the primary task of driving. The interaction space, be it a cell phone or a built-in
vehicle interface, aims to guarantee safe driving with rudimentary, situational automation. Keeping the driver’s attention on the traffic and in case of emergency, being able to communicate a
takeover request to the driver as quickly as possible, plays a major role[1]. This concerns both
non-critical spontaneous situations (NCSS) and time-critical traffic events that require the driver
to take over the steering of the vehicle[9]. Because it is still very important that the driver pays
attention to traffic flow at low automation levels, it is extremely difficult to integrate visually demanding secondary tasks (i.e., route planning, setting preferred AV behavior). The way a vehicle
occupant reacts to system information depends on many factors. One goal of lower automation


1 https://www.sae.org/news/2019/01/sae-updates-j3016-automated-driving-graphic


2


2 RELATED WORK 2.1 Cooperative Driving


level functionalities is to promote situational awareness of the driver and thus improve the effective
takeover of steering in emergency scenarios (e.g. a stone on a mountain road, high-risk traffic)[1].


**2.1.2** **Passenger-Based Intervention**


As a passenger (whether in the rear seat or the front passenger seat) in an autonomous driving
system, one should be informed and able to spontaneously intervene in the behavior of the system.
Even if the current autonomous driving situation is judged to be non-critical by the driving system,
it is still recommended to integrate human’s situational decision-making to improve passenger’s
UX in more complex traffic environments [13] (e.g., picking up a friend at a certain location,
adding a spontaneous stopover (NCSS = non-critical spontaneous situation [11]) to the existing
route, avoiding certain urban areas when routing to a destination, etc.)[14, 13]. The two results of
Wang’s pilot study showed that prediction level intervention in AVs and intervention in the driving
behavior via gaze-based and voice assistance modalities can have a positive impact on the participant’s user experience[14]. The reason why the spotlight is on intervening in the comprehension
level of the autonomous driving system has again to do with traditional driving experience. If
a driver or passenger of an AV is required to simply undertake short-term maneuver decisions,
without understanding the reason for his or her intervention, the result could again be a perceived
loss of the psychological requirements of control and safety. This is not to say, however, that intervening in driving behavior necessarily leads to a better driving experience. In Wang’s main study,
some participants reported improved driving behavior after intervention, but also a certain loss of
trust in the autonomous system’s decision-making ability[14]. In consequence, Wang developed
a framework that describes the most relevant influencing factors of such non-critical spontaneous
passenger interventions[13] and further reduced it into a cooperative driving interaction overview

[14]. In our study design for the navigational UI levels, we categorized displayed features of per

Figure 2.1: Cooperative Driving Framework [13, 14]


ceptional, comprehensional (i.e. behaviour prediction) and trajectory information (i.e. maneuver
indication), making use of the 2.1 framework’s guidelines.


3


2.2 Automotive UIs For Cooperation (Mounted Device And Brought-In Device)2 RELATED WORK


**2.1.3** **Division Of Workload**


Rümelin [10] examined cooperative performance of a human driver concentrating on the "primary
task" of driving and a front-seat passenger using an in-vehicle information system (i.e., "secondary
task") to reduce the cognitive workload of the driver. For both parties (i.e., driver and passenger),
this resulted in an increased sense of situational control. Handing over responsibility for secondary
task decision-making to passengers (e.g., rerouting to avoid a traffic disruption, picking a restaurant or store to plan an intermediate stop, looking up sights nearby) could form a basis for system
acceptance and establish trust in future cooperative infotainment systems in human-driven cars
and AVs.


**2.2** **Automotive UIs For Cooperation (Mounted Device And Brought-In Device)**


Case [4, p. 25] presented an attention model, which divides human attention into three categories.
Primary attention is visual and direct (i.e., traffic while driving, screen interaction). Secondary
attention works with haptics (i.e., vibrations, tangible movement), and auditory signals (e.g., notification sound, voice assistant). Peripheral cues are categorized as tertiary attention, including
distant sound or noise, light and environmental vibrations. In order to make a considerate decision in immediate traffic related situations (e.g., pedestrian crossing, school), visual environmental
awareness is required. This competes with the user’s primary attention in the activity they would
rather engage in on their journey. To not interfere with the freedom to engage in NDRA in AVs,
situative intervention suggestions should be implemented, if this is preferred by the user. In order to have a cooperative ride supported by system suggestions, mounted and brought-in devices
should be compatible.


**Trusted UX** In addition to choosing the correct interaction modality and providing perception,
comprehension and trajectory vehicle, traffic and route information, the perceived safety of the
driver or passenger is most important[9]. In the presence of a trusted driver or system, a sense of
security is usually present. Just as we trust the cab driver to understand city traffic and be able
to respond to requests, the AV passenger’s perceived safety depends on the trustworthiness of the
system. The system should be able to integrate the passenger’s awareness and consider travel
preferences without leading to disuse or misuse as illustrated by Miglani[7].


**2.2.1** **Built-In Car Interfaces**


Many functionalities that have become standard in today’s cars have been influenced by the increasing use of portable navigation devices. To cope with the growing number of functions where
a direct and simple one-to-one mapping of a single control instance to a specific system function
became impossible, more and more vehicles were equipped with built-in interfaces to offer more
appropriate UX. Therefore, car manufacturers have been incorporating model-specific screen interfaces to provide more functionalities in their vehicle models for several years. Combined with
the spread of internet access in the age of ubiquitous computing, mobile devices and in-car Internet
hot-spots have also increased the general (perceived) need for information by vehicle users [9, 4].
Berger [3] investigated a rear seat passenger car door interface, to dynamically display trip-related
information and give descriptions of points of interest along the route.


**2.2.2** **Phone-Based Car Interfaces**


As almost everyone has access to a smartphone in their daily lives, standardized mobile interfaces
generally provide an attractive opportunity to interact with today’s cooperative technology. Walch

[12] tested a mobile intervention approach to investigate an AV passenger intervention for common pedestrian crosswalk situations. In this driving simulation study, an everyday traffic situation


4


2 RELATED WORK 2.3 Passenger’s Attitude (Willingness To Cooperate And Trust)


in an urban environment was chosen. Offering the possibility of cooperation between the passenger and the autonomous driving system at crosswalks to correctly and quickly interpret pedestrian
intentions, may improve the flow of traffic and support the situational awareness necessary for
interventional decision-making. The picture-in-picture live traffic view implemented in the prototype was intended to increase the situational awareness of the study participant. By following
traffic while using a mobile phone, the participant should be able to recognize critical situations
more quickly and intervene accordingly. The system also sends a notification with the option to
approve or deny the intervention request. Rümelin [9] explained that because of easy Internet
access and available links to some car applications, most passengers would rather have a mobile
controller than a built-in one. Although the use of a mobile device involves a higher cognitive
effort, it seems that the flexible functionalities are nevertheless more advantageous. In situations
where a mobile phone cannot be easily connected to the car system, the occupants felt isolated.
This also contradicts the idea that vehicles should simply be regarded as another everyday place
in which to provide support in terms of everyday activities. It is not primarily about the control of
the automated vehicle, but the travel experience. Often, a mobile device determines the route on
the way to the car. This trend suggests that researchers should also deal with the activities prior to
the trip, in terms of the navigation system and route planning [9].


**2.3** **Passenger’s Attitude (Willingness To Cooperate And Trust)**


There are some key components that should be considered when developing interactive infotainment systems, in order to understand and therefore improve trust in and acceptance of the autonomous system. One of the biggest problems, as previously stated, is intervention approaches
for AVs in urban environments [1, 14, 7, 15]. As soon as the passenger of an AV of a higher level
is no longer obliged to pay attention to the primary task, the question arises as to what extent the
passenger should be able to influence NCSS of the journey at his or her own personal will. Wang

[13] identified five main criteria for NCSS (i.e. noncritical spontaneous AV-cooperation) for his
design framework:


1. `Intention`, (i.e. Human and system)


2. `Interaction`, (i.e. Cooperation on levels of the AV described in 2.1)


3. `Environment`, (i.e. Road conditions, street type and appropriate driving style)


4. `Traffic`, (i.e. Current location, Marking the surrounding road users)


5. `Vehicle information`, (i.e. Travel speed & acceleration, fuel/ battery status)


Trip-related information is usually communicated to the driver in a cooperative way. Therefore,
it is recommended to let the AV communicate using anthropomorphic characteristics (e.g. human
facial expressions, that clearly convey the importance of a message). Explicit, transparent communication in a human-like way could help uncertain and inexperienced users to trust a novel system

[7].


**2.3.1** **Customized UX**


Customization of user experience has become a fundamental need for users in everyday interaction with technology. In the context of automated driving, this means influencing driving behavior,
spontaneously intervening in navigation, and the visual structure of presented information on the
respective UI. Terken concluded that an AV that is not able to take into account the user’s preferences will not be used. This also includes the frequency in which the vehicle wants to interact
with the passenger. It should be possible not to be disturbed by the autonomous vehicle (i.e.
intervention requests) during NDRT [11].


5


2.3 Passenger’s Attitude (Willingness To Cooperate And Trust) 2 RELATED WORK


**2.3.2** **Trust And Usability**


Figure 2.2: Miglani’s hypothesis: Trust, situational awareness and cognitive workload [7]


Trust and perceived safety, i.e. comfortably loose situational awareness for non-driving related
tasks (NDRT) seem to have a close relationship with each other2.3.2. This is no longer about the
pure driving functionality of the autonomous system, but about spontaneous, intuitive and, above
all, about temporally realisable intervention possibilities in current route processing. If the UI is
not adapted to the passenger in this aspect, some people may experience miscommunication, a
perceived loss of control and in some cases forms of misuse or disuse of this new technology.
Nevertheless, such technology tempts the end user after a certain period of familiarization to trust
the previously functioning system too much (i.e. misuse). This is already a known problem in the
lower automation functions (e.g. appropriate driving control, lane centering). The goal here is to
support the passenger in his pursuits in a trustworthy way. For this, the system must be perceived
as reliable, capable and predictable [5, 7].


**Internal Factors** Trust in automated systems can thus be classified as the satisfaction of expectation the individual user’s experience under unpredictable and possibly dangerous conditions [5]
It has already been mentioned that trust and user experience are dependent on each other in certain
aspects. As everyone has individual preferences when it comes to technology use, there are many
internal factors that can influence subjective user trust. Thus, the trust of each individual depends
on personality traits (i.e., age, Big-5 personality, experience and skills, AV knowledge, context of
use, cultural background), current well-being (i.e. physical and mental health) and the perceived
workload for cooperation (e.g., complex handling of the interface, how information is designed,
displayed and communicated) [5, 1, 9]. Another factor, which is composed of the preceding
factors, is the expectation of the system’s functionality and limitations [9]. Within this context,
a further distinction is made between "fundamental trust" before, "situational trust" during, and
"learned trust" after system interaction[5].


**External Factors** While internal human factors are person-dependent and can vary greatly, there
are some external factors that have been shown to either strengthen trust or at least prevent mistrust. Having a professional-looking UX design does not seem to increase trust measurably, but it
lowers potential distrust tendencies [5, 7]. To make self-driving cars suitable for society at large,
the system must convey professionalism, reliability and trustworthiness. By considering certain
UX guidelines, internal trust factors can be influenced with the help of external design aspects. Social awareness and brand recognition, system performance and intention transparency, interaction


6


2 RELATED WORK 2.3 Passenger’s Attitude (Willingness To Cooperate And Trust)


paradigm (audible, haptic, visual), and usability of the interface play a role in fostering internal,
individual trust toward the automated driving system[5, 1, 7].


7


3 CONCEPT AND IMPLEMENTATION

## **3 Concept And Implementation**


Most research studies examine basic functions of higher automation levels in controlled scenarios (e.g., highway situations, parking space search or lane change).In urban situations, too little
emphasis is placed on the user’s relationship of trust in the system UI. Efficient, trustworthy cooperation between humans and the autonomous driving system should be based on the advantages
of each party. When we look for recommendations for a restaurant or a snack bar on environmentbased navigation apps, the choice is sometimes overwhelming in urban environments, depending
on the neighbourhood. Also when looking at a rear seat passenger, a lower situational awareness
is to be assumed due to the sight restriction of the seat and prior experience in rear seat travel.
Intervention possibilities in the maneuvers (medium-term planning) or the trajectory (short-term
planing) of the AV, could be difficult to evaluate in an staged online study. Those levels could
create intense experiences under time pressure combined with real life testing scenarios. In the
interest of constructive usability of collected survey data in this user study, we decided to develop
a prototype with a focus on the navigation level (long-term planning) [13] with the aspect of time
pressure. In the future, for example, one will sit in the back seat of a moving, self-driving car. The
question now arises as to how fast and spontaneous freedom to make decisions in inner-city route
planning can be implemented with such novel technology (e.g., built-in car infotainment systems,
mobile phone navigation). In a conventional driver-passenger relationship, for example, it is possible to influence the journey in a matter of seconds. This spontaneous form of route interruption
is uncomplicated (i.e. verbal communication) and is based on the experience that the driver of
the vehicle understands the request and will be able to give a trustworthy, transparent indication
of what he or she has decided to do as a consequence to that. If a computer system replaces the
driver, which should aim to offer similar interaction possibilities, there is no defined universal
balance. How extensive the information presentation and transparency of maneuver planning such
an interface should have to fulfill, the psychological needs of safety, autonomy and freedom are
yet to be determined [13]. Involving the passenger in the driving process in terms of their wishes,
plans, preferences and concerns is probably the most sensible way to promote pleasant travel experiences with self-driving cars. In order to make AVs suitable for society at large, the way in
which the system is handled and the way in which the human and the system cooperate is of great
importance. It has to be quick, trustworthy, customizable and transparent. For these reasons, we
chose the mobile device as the interaction apparatus.


**3.1** **Reroute Scenario**


We set up a preexisting route [2] for the three different scenarios. The task is to plan an additional,
intermediate stop to get the options "ice cream", "a quick snack", "coffee" in randomized order.
This stabilizes the quality of the measures taken, due to the equal split of "first time use" and
"learning effect" after repetition. The pre-selected route is preset for all levels (i.e. Level 1 - Ice
cream shops, Level 2 - Quick Snack shops, Level 3 - Coffee shops).
The starting point of the route (see 3.1) was directly in front of the LMU building at "GeschwisterScholl-Platz" and the destination was "Königsplatz 1, 80333 Munich". The closest address that
could be set as the starting point with Google Maps was "Ludwigsstraße 29, 80539 Munich".
Due to the high volume of surrounding businesses, that would be interpreted as possible NCSSs, we chose this route as the starting point for the three detour scenarios. As the figure shows,
there are numerous restaurants and stores, which could be chosen for a stopover. The participants were asked to imagine themselves on the rear seat of an autonomous vehicle in the year of
2030. The group FT had a traffic cam continuously moving towards the crossing, i.e. moving car
scenario. The group ST had a traffic cam staying in place, i.e. parked car scenario.


2 https://www.google.de/maps/


8


3 CONCEPT AND IMPLEMENTATION 3.2 UI design


Figure 3.1: Preset route for all levels


**3.2** **UI design**


**Figma** To find out more about the appropriate balance between information density under time
constraint, we implemented three complexity levels with the UX-Design tool "Figma" [3] . This design program enables the creation of demonstrative UX prototypes. All implemented design elements can be assigned interaction functionalities. However, there are some limits to the program’s
functionality. The magnification or dynamic store display used in today’s mobile navigation applications cannot be implemented with this. Nevertheless, we thought it was a good idea to use Figma
to create a reroute-intervention design, since prototype flows can be created and tested directly on
the mobile device using an aid application called "Figma Mirror". This way the screen captured
interaction could be evaluated for data after the study participation. We created six big layout
boxes in the Figma file to structure the workplace for the six variants (FT1, FT2, FT3;ST1, ST2,
ST3). The levels are named after the abbreviation of the group (i.e. FT or ST) and the number of
the tested information density level (i.e. simple, medium, complex). Since the reroute information
in the full map screen is the same for FT and ST, we picked these screenshots for illustration.


**Information density** Based on Wang’s framework (2.1), we designed three levels of UI information density. These levels present different densities of information for the perception, comprehension and trajectory levels of the automated driving system to test the adequate "sweet spot" for
trust (see 2.3.2). All created frames of the prototype were created considering the error tolerance.
At all points of the user journey is a back or deselect button to undo the last interaction or to move
up one menu level (anchor = home screen).


**Level 1 - simple** makes use of perception level information, i.e. marking of pedestrians(yellow)
and cars(pink) in traffic cam (AR style), current speed, parking symbol (grey in drive, red in
parked), time of new route (route selection in map).


**Level 2 - medium** displays perception level information and comprehensional information, i.e.
marking of the selected route in the traffic cam (AR style), additional symbol for speed indication,
time and distance of new route (route selection in map), distance traveled and left to destination,


3 https://www.figma.com/


9


3.2 UI design 3 CONCEPT AND IMPLEMENTATION


battery status and range till empty, weather, time till arrival/ time till start, time and distance in km
of reroute options (route selection in map).


**Level 3 - complex** contains perception, comprehension and maneuver level information, i.e.
arrow indication of maneuvers in the traffic cam (AR style), weather and temperature, current
movement indication (submenu, left side and navigation screen), time and distance and added
time of reroute (route selection in map).


**Home screen** Based on the home screens of our prototype for the FT group, the home screen
functionalities for both groups can be explained. Every screen with a sub-menu (i.e. Home, traffic
cam, navigation screen) offered the interaction with the smiley (i.e. simple notification about
rerouting options, see level 3, left picture of 3.2). A picture-in-picture view, reachable from the
home screen (and level 3 map view) marked the nearest pedestrian (color = yellow) and nearest
vehicle (color = pink) with colored boxes. The picture-in-picture view could be magnified by
clicking on the small video feed. The small picture-in-picture map opened the navigation screen
when clicked (bigger picture-in-picture map and sub-menu).


**Sub-menus ST** The sub-menus of FT (3.2) and ST (3.3) differ in the displayed time, current
speed, distance traveled and parking icon (i.e. moving car or parking car). For the picture-inpicture traffic view of each level the same degrees of information difference can be seen in the
environment markings. The progress bar visually indicates route progress and is also described in
level 2 and 3 with "6 mins left" or "starts in 15 mins". The smiley in the middle of the screen has
the functionality to inform about possible reroutes. This was implemented in a anthropomorphic
and transparent way, making use of the possible system trust establishment factors as described by
by Miglani [7].


**Picture-in-picture elements** Levels 1 and 2 offer the same scope of picture-in-picture functionality (3.2). The first one is the previously mentioned traffic cam (with magnification screen), the
second one the movable map with the preset route. In the navigation screen of level 3 there is
also a small traffic cam integrated to test users preferences of picture-in-picture functionalities. In
level 1 pedestrians and vehicles are marked (perception), in level 2 the defined route on the road is
additionally displayed (comprehension) and in level three a maneuver indication (e.g. blue arrow)
has been added (trajectory).


**Recommended shops** For this part we looked for possible shops near the route that provided a
good reroute option. To make the study a bit more dynamic and not offer the same stores in each
level, I looked for comparable categories. Since the scenarios are supposed to be a spontaneous
everyday stopover, I decided on the business categories "ice cream parlor","quick snack" and
"coffee" (see 3.1).


10


3 CONCEPT AND IMPLEMENTATION 3.2 UI design


Figure 3.2: FT Home Screen Level Overview


11


3.2 UI design 3 CONCEPT AND IMPLEMENTATION


Figure 3.3: ST Submenu Level Overview


(a) Level 1 - simple information density (b) Level 2 - medium information density


(c) Level 3 - complex information density (picture-in-picture traffic view)


Figure 3.4: Navigation screen with preset route of all three levels (FT and ST)


12


3 CONCEPT AND IMPLEMENTATION 3.2 UI design


**Shop Choice - Level 1 - Simple Information Density** In the first level, the occupant of the
autonomous vehicle has instructions to pick up ice cream on his way to Königsplatz. We chose
the ice cream parlors "Der Verrückte Hutmacher" and "Eiscafé Italia" as possible shop choices.
"Der Verrückter Hutmacher" lies closer to the starting point of the preset route, "Eiscafé Italia" is
located further away.


**Shop Choice - Level 2 - Medium Information Density** In the second level, the occupant of
the autonomous vehicle has to pick up a quick snack on his way to Königsplatz. We chose the
restaurants "Wais Küche" and "Sam’s Falafel" as possible shop choices.
"Wais Küche" lies closer to the starting point of the preset route, "Sam’s Falafel" is located further

away.


**Shop Choice - Level 3 - Complex Information Density** In the third level, the occupant of the
autonomous vehicle has to pick a coffee shop on his way to Königsplatz. We chose the restaurants
"Gartensalon" and "Café im Vorhoelzer Forum" as possible shop choices.
"Gartensalon" lies closer to the starting point of the preset route, "Café im Vorhoelzer Forum" is
located further away.


**System Shop Recommendations** In order not to reduce the cognitive load of the theoretical
backseat passenger in combination with the aspect of time pressure, we decided to offer only two
stores per task. This reduction of choice was staged in the study as an AV system recommendation
of the current environment and aims toward more efficient decision making in situations with time
constraints. Each shop had two different reroute options varying in their street and maneuver
selection to avoid the traffic disruption (marked in orange, 3.4).


**Shop Menu:** For each of the six stores, I created a fictitious menu of the most purchased products. The dish information is listed next to the information about the reroute alternatives, also
under the category Shop Information. This menu can be reviewed as a popup window using the
menu icon, when a shop is selected. This interaction is marked with the black arrows in 3.6.


**Navigation Screens** The difference of the displayed map in the navigation screens of level 1
and 2 is the labeling of starting point and destination. In level 1 there is no indication, in level
2 the starting point and destination are displayed at the top of the map and in level 3 there is a
"maneuver planer", depicting all maneuvers until arrival at the destination address. For the first
and second levels this navigation area is not absolutely necessary, but it was added for the sake of
comparability with the third level.


**Recommended Routes** Adding the addresses of the 6 shops in between start and destination
address of the "Google Maps" preset, resulted in 6 initial reroute suggestions. In separate tabs I
compared and created alternative routes by setting maneuver points that force the navigation tool
to recalibrate the optimal suggested route. These slightly more drastic shop reroute options were
also offered as an alternative within the prototype interaction as shown in 3.6. The information
content provided about the routes differs depending on the information density level (e.g. time of
new route, additional time it would take and new distance to final destination).


13


3.2 UI design 3 CONCEPT AND IMPLEMENTATION


Figure 3.5: Navigation Screens Level Overview


Figure 3.6: Reroute Options Level Overview With Shop Menus
14


3 CONCEPT AND IMPLEMENTATION 3.3 Implementation


**3.3** **Implementation**


**Successful Reroute Interaction Flow** The user starts in the home screen and sees the picturein-picture traffic cam, map and sub-menu (3.2). Clicking on the map in the home screen sends
the user to a navigation screen (3.5) with a bigger map view and the sub-menu of the tested level.
Clicking on the map again opens a full-screen map where the selection of recommended shops is
possible. Once a suggested shop is selected in the full screen map, the interface offers two different
routes each to reroute to the selected store. The selection can be confirmed by clicking the green
check-button at the bottom of the screen. After confirmation the other routes disappear and the
picked route is set and by finally clicking the yellow button "GO" the study task of rerouting the
AV is completed. With a notification screen, the participant was informed about the success and
instructed to stop the screen recording.


Figure 3.7: Task Completion Message After Reroute Confirmation


**Traffic Camera** Since hand-held devices lower situational awareness and are likely chosen as
the main interface for future AV (sharing), we implemented a traffic camera view (e.g. 4(c)) into
the hand-held reroute prototype. The videos displayed were those of an already slowly moving
car for FT (3 Minutes, moving car) and a parked camera view for ST (15 minutes, parked car).
The video footage used for this traffic cam was recorded in front of the LMU building and edited
in "Adobe After Effects" [4] to display an AR-style traffic cam view. Figma’s tools are not able
to implement video footage formats, but are able to integrate moving picture formats like ".gif".
Further I used the rendered video with simulated AR overlay and uploaded them to to a web tool
named "Giphy" [5], in order to create 20-30 second moving picture loops. Those were compatible for
insertion in "Figma" and were implemented in the correct interface level to test the effect on better
situational presentation and to test the picture-in-picture impact for navigation level, secondary
tasks.


**3.4** **Pilot Study**


To test the viability of the individual prototype screens, my design ideas were commented. The
goal was to get subjective evaluation of my design for existing functionality and aesthetics, which
were developed with the previously mentioned trust factors in mind. In a ten-minute personal
interview, n=11 participants were presented with the concept of a home screen, navigation screen
and a notification screen. The rough ideas for the sub-menu and picture-in-picture functionalities
(i.e., picture of a static traffic cam and map) were then evaluated for positive and negative aspects.


4 https://www.adobe.com/de/products/aftereffects.html
5 https://giphy.com


15


3.4 Pilot Study 3 CONCEPT AND IMPLEMENTATION


To document participants’ opinions, I included screenshots of the designs in an online survey
form. A few demographic questions were asked first, and then text boxes were provided under
each screen design for comment, regarding the UI elements and overall impression of an AV
design. Thus I was able to improve the pilot study design through iteration.


**Summary** In the Pilot Study the final comments and advice for the prototype design were collected. As a result, I entirely deleted the notification screen and integrated the restaurant information (i.e. address, menu with top dishes) that was previously on the notification screen into the
full view of the map. I chose the street view as the map design (100% of the 11 participants said
they preferred the street view over a "dark mode" or "satellite view"). In addition, there was a high
demand to display the traffic situation with the help of the picture-in-picture live camera view.
To comply with this request, I recorded videos and implemented them according to the paragraph
"Picture-in-Picture" 3.2.


16


4 USER STUDY

## **4 User Study**


Participants used a "Figma Mirror" [6] prototype on their mobile device and a computer with Zoom in
this online study to test an inner-city rerouting planning design with staged scenarios and accompanying task instructions. I created a simple test prototype flow, including all relevant information
regarding the mobile screen capture functionality for apple and android users.
Due to the current pandemic, it was not possible to conduct the study on site. To adhere to the
scope of a bachelor thesis study, we conducted a digital one-to-one online between group study
on Zoom [7] . To organize participants, we offered several one-hour appointments slots on Doodle.
Study execution took place over a two-week period beginning 23.08.2021 and continuing through
04.09.2021 with 3-4 daily meetings. This study was completed on 04.09.2021 with the required
number of n=30 participants.


**Interview Set-Up:** All participants signed the participation list and consented both verbally and
by continuing beyond the second page of the participant questionnaire (i.e. study introduction and
consent form). At the arranged time, the participants were contacted via E-mail. The _Zoom_ link,
login-credentials for the required _Google_ account and the list of participants (consent signature)
were sent in advance. Participants were asked to download the mobile applications _Figma Mirror_
and _Google Drive_ on their devices and join the Zoom meeting with a computer or laptop. Once the
participant was introduced to the Zoom meeting and the details of the study, the set-up check took
place, i.e. Login, screen capture introduction and the study questionnaire. The participants were
walked through logging into Google Drive and Figma Mirror with the participant’s Google account
information. After that the Zoom recording began and we proceeded with the study (survey,
interaction + survey, semi-structured interview).


**Research Questions:** In order to test the possible influence of time pressure on the participant’s cooperative behaviour in rerouting scenarios, the 30 participants were divided into two
equal groups (i.e. between-group-design). The first group had 3 minutes (FT = Fast Thinking,
Participant ID 1-15) to plan a stopover, with the simulated camera feed of a AV that was already
moving. The second group (ST = Slow Thinking, Participant ID 16-30) had 15 minutes to add
an additional stop with the camera feed of a non-moving parked car. Both groups were given
three identical sets of information density implemented in the design of both groups (moving vs.
parking). These different density levels of information provision were tested in random order (i.e.
FT1, FT2, FT3 | ST1, ST2, ST3), aiming to answer the following research questions:


RQ1: How does the amount of information impact a passenger’s cooperative performance and
trust in the system? And is the time restraint relevant in this case?


RQ2: How much information should be presented on a UI to ensure that the passenger is able to
make an intuitive, spontaneous decision?


RQ3: How would the degree of information capacity affect cooperative performance, willingness,
and trust in the system? And is the degree of time constraints relevant in this context?


6 https://www.figma.com/mirror
7 https://explore.zoom.us/de/products/meetings/


17


4.1 Measurements 4 USER STUDY


**4.1** **Measurements**


All main study measurements were collected using the participant’s Limesurvey [8] questionnaire
(time according to reported feedback), two separate final interview questionnaires separately created and completed by me during the semi-structured interview regarding the subjective experience
(ST vs. FT) and the uploaded screen captures (i.e. interaction steps, chosen location).


**The participant’s questionnaire consisted of 3 parts.** _The first part_ consisted of demographic
questions (see results = 4.2). _The second part_ introduced a static AV scenario in the middle of
the Ludwigstrasse near the subway station "Universität" (TO - baseline trust). Participants were
asked to imagine themselves in the rear-sear of the automated vehicle. To get a reliable indicator
of trust in the automated system in rerouting situations, a basis to compare to was determined
with an adjustment of the "Situational Trust Scale"[6]. All STS-questions contained a Likert-7
scale from (1 - strongly disagree to 7- strongly agree). With the explained scenarios in mind and
their pre-knowledge about higher automation, passengers develop a "Baseline Trust" toward AV
rerouting situations (i.e. 3(a)) before beginning the prototype testing. All three prototype levels
were measured and evaluated for Trust (T1 - 3(b)), Usability (System Usabiliy Scale (SUS = 10
Likert-5 scale questions from (1 - strongly disagree to 5- strongly agree)) [9] ) and three self-defined
questions about experience. The final section consisted of self-created questions about the feeling
of control over the situation, the sufficiency of store information, and whether there was enough
time to make a confident reroute decision. Required performance measures, i.e. interaction steps,
time to finish task and chosen intermediate shop were evaluated using the uploaded mobile screen
captures. _The third part_, I documented comments in the context of a semi-structured interview
about the participant’s trust, what contributed to it and what decreased it. Insights about the overall
experience and opinions regarding design and interaction were also collected. Furthermore, each
participant was asked about his or her preferred end-user device in automated vehicles (mobile or
built-in). The results can be viewed in more detail in the Results section.


**4.2** **Participants**


A total of n=30 participants took part in the main study of this thesis. Participants were grouped
according to age with by far the largest group of participants belonging to the 20-29 age group
(n=25, 83.33%), followed by the 30-39 age group (n=3, 10%) and the 60-69 age group (n=2,
6.67%). This resulted in an average age of 27.43 and a standard deviation of 10.68. 20 participants
were male(66.67%), 9 female(30%) and 1 participant(3.33%) declined to provide any information.
The following travel data refers to the time before the COVID-19 pandemic. 13 participants ( 43.33
%) reported travelling weekly as a passenger in a car, 11 ( 36.67 %) reported monthly, 4 (13.33
%) daily and 2 (6.67 %) rarely. Here, 11 (36,67%) participants reported an average trip duration
of 1-2 hours, 8 (26,67 %) a duration of 30 minutes-1 hour, 7 (23,33 %) a duration of less than 30
minutes and 4 (13,33 %) a duration of 3-5 hours per trip.


**4.3** **Apparatus**


All incorporated tools can be found in the footnotes. The online scheduling application Doodle [10]

was used to set up 1 hour meeting time slots. We set the estimated time to conduct the main part
of the interview to 45 minutes per participant. The remaining 15 minutes functioned as a buffer
for organizational purposes(i.e. participation signature, "Figma Mirror" and Google Drive set-up).


8 Limesurvey: https://manual.limesurvey.org/?/
9 https://www.usability.gov/how-to-and-tools/methods/system-usability-scale.html
10 https://doodle.com/


18


4 USER STUDY 4.4 Study Interaction Procedure


**Remote Study Design** In the context of this online study, I set up a new Google account for the
study participants. This allowed both me to upload screen recordings to Google Drive [11] and remotely control the presented interfaces on the participants mobile devices. The entire meeting was
recorded via Zoom for post analysis of the participants’ statements (with participant’s consent).
We decided to include "Figma" [12] in the study design in combination with the interoperable mobile
prototype test application "Figma Mirror". This setup allowed us to field test a navigation level
mobile UX design for AV intervention in the form of a remote online study. We prepared a online questionnaire to be completed (see measures (4.1)) by the participants after each of the three
versions. After the study was concluded, the ratings of trust, usability and interaction experience
were inserted in a Google Form and evaluated according to the scale’s norms.


**Final Interview Questionnaire** The final interview questionnaire consisted of four questions
regarding participant trust in the system. For each question it was possible to specify if the interviewee wanted to elaborate on their thought process. First, participants were asked to rank the
designs they experienced. As we were interested in the effect of individual elements of the user
interface, we asked which areas of the design had a positive or negative impact on their trust in
the system. In the third question, we had participants vote on a scale of (not at all=1, 2, 3, 4, 5,
6, 7=totally) whether they would use a hand-held passenger device for navigation purposes in the
rear seat in fully automated vehicles. After this question, participants indicated if they preferred a
mobile or built-in interface. Finally, the participant could express recommendations, preferences
and ideas to make overall interaction with autonomous systems more trustworthy.


**4.4** **Study Interaction Procedure**


In three UIs with stated characteristics, participants had to make a rerouting decision for an AV
with the instructed scenario (Level 1,2,3) and given time window (FT or ST). After each level,
the participant stopped the screen recording and answered the questionnaire page for the version
according to 4.1. Participants were instructed to imagine themselves seated in the rear seat of
the AV, to test the suggested reroute prototype in the given scenario. After the participant logged
their mobile device into "Figma Mirror" and "Google Drive", I asked them to try out their screen
recording before beginning with the main interaction. After receiving positive feedback from the
participant, the participants were asked to open the questionnaire link in the Zoom meeting chat.
The participants had time to complete the demographic questions and the AV reroute scenario
for baseline trust (TO). Next, three identical questionnaire pages with three question groups (i.e.
Trust, Usability, Experience) were presented for all three levels (first the recorded interaction, then
the questionnaire). Both groups were informed as to the time remaining through a timer display
shared by me via Zoom screen share. After the interactions, the questionnaire ended and the data
was submitted. The three recorded videos were uploaded to the assigned Google Drive folder.
A concluding semi-structured interview was then conducted to inquire the overall experience and
gain insight on the individual’s user experience with the prototype. I completed the questionnaire
via Zoom screen share in order to free up the participant for more constructive feedback. This
interview was also recorded for time-independent evaluation and to facilitate the flow of the study
(e.g. no long breaks due to comment typing). The comments were clustered at the end according to
the bottom-up principle and are presented in 5.5. Each Zoom session was recorded in two separate
video files. The first video documented everything up to the interaction with the last interface
variant and the second video captured the interview to make data evaluation (post interview) easier
to structure. Every level, set up remotely via "Figma Mirror", was recorded with the mobile screen
capture functionality of the used device and later uploaded to the Google Drive folder matched to
the participant ID.


11 https://www.google.com/intl/de/drive/
12 https://www.figma.com/organization/


19


5 RESULTS

## **5 Results**


**5.1** **Performance**


**Interaction steps** Compared to FT, the ST had more time (15 minutes) to engage further in the
UI resulting in more interaction steps (see 1(a)) and time till task completion (see 1(b)). The FT
group finished the task of rerouting faster (FT123 Mean = 30.78, StdDev = 20.133; ST123 Mean
= 50.56, StdDev: 81.457; [n=30] Mean = 40.67, StdDev = 59.830).


**Average Time To Complete Task** The resulting time to finish the rerouting task reflects prior
interaction step data. The group FT tended to finish the tasks more quickly than ST (FT123 Mean
= 00:51 ; ST123 Mean = 01:08; [n=30] Mean = 01:00.


**Chosen Location** Overall, most participants (n=21, 70%) opted for the detour to the level 3
shop "Café im Vorhoelzer Forum". The location of this store is closest to the destination address
and at the same time the route is mostly identical to the preset route to Königsplatz. In the first
group (FT), the majority of the n=15 participants chose the _store furthest away_ (see 2(a))in the
respective level. In the second group (ST), the majority of the n=15 participants chose the _closest_
_store_ (see 2(b)). Examination of the shop choice pie charts indicate that the Slow Thinking(ST)
group more carefully considered different factors in choosing a shop while the Fast Thinking (FT)
group more often chose a shop due to location. There may be other reasons why the second group
predominantly chose the closer store, such as the factor time pressure, which has an effect on the
perceived time one has left to make a rerouting decision. From the position of a moving car for the
store farther away, theoretically, one has more time before the planned route must be recalibrated
(final decision). For the closer store, the decision to reroute would have to be made earlier.


(a) Average Interaction Steps (b) Average Time


Figure 5.1: Average Interaction steps and time to reroute


**5.2** **Trust**


The level of trust in AVs in navigation situations rose among all participants (compare T0 3(a)
and T1 3(b)). The FT group (7 Likert-scale) had a lower initial trust level (FT-TO Mean = 4.37,
StdDev: 0.965) for rerouting with the autonomous vehicle than the ST group (ST-T0 Mean = 4.88,
StdDev: 0.724) (T0-[n=30] Mean = 4.63, StdDev:0.877). At the same time, after evaluating the
interaction data, FT participants showed an even bigger increase in trust score in the rerouting
interaction than ST. The level of trust in autonomous systems after the interaction is about even
with the median of FT-T1 (Mean = 5.83, StdDev = 0.748) and the ST-T1 (Mean= 5.8, StdDev =
0.752) (T1 - [n=30] Mean = 5.82, StdDev = 0.746). In the information density comparison, level


20


5 RESULTS 5.2 Trust


(a) Fast Thinking (b) Slow Thinking


Figure 5.2: FT and ST - Shop choices *red = closer, *blue = further away


1 achieved the highest trust score (1-T1 Mean = 5.99, StdDev = 0.619), followed by level 3 (3-T1
Mean = 5.76, StdDev = 0.909) and 2 (2-T1 Mean = 5.7, StdDev = 0.672).


(a) T0 - Baseline Trust for Rerouting in AVs (b) T1 - Trust for Rerouting in AVs(average all 3 levels)


(c) Level Overview (info density: 1=simple, 2=medium, 3=complex)


Figure 5.3: Measures of Trust before and after the interaction with the mobile reroute prototype


21


5.3 Usability 5 RESULTS


**5.3** **Usability**


The usability measures (result = 75.38 on a scale of 100, r=0.7538, StdDev = 15.619) indicated a
_good to excellent usability_ (normalised rating > 68; adjectives " _good_ " and " _excellent_ " according
to the proposal of interpretation by Bangor [2]) for this mobile AV rerouting prototype approach.


(a) SUS - FT vs ST (b) SUS - Level Overview


Figure 5.4: SUS - System Usabiliy Scale


**5.4** **Experience**


In this section, we analyzed the variants of a hand-held prototype to evaluate the adequacy of the
provided information. The 3 self-defined questions were measured with the Likert 7 scalar and
must be considered separately. The key aspects were the cooperative experience, i.e. the situational
feeling of control, users’ perception of shop information presented on the device, and the influence
of time pressure on intuitive, first-time user experience. Overall (n=30) mean for the Likert 7 scalar
questions control is mean = 5.93(agree), StdDev-C = 1.261, shop information is median = 4.42(
4-5 = neutral - slightly agree), StdDev-SI= 1.761, and enough time to reroute is median = 5.79(6
= agree), StdDev-T =1.222. The following figures illustrate the scores the interface was able to
achieve. The box-plot in 5(a) implicates agreement(6) and strong agreement(7) to the question of
perceived control. In 5(b) the span is between slight disagreement (3) and agreement(6) regarding
the question if enough information is available about the shop. Finally, the perceived time to make
an informed decision results in 5(c).


22


5 RESULTS 5.4 Experience


(a) Control


(b) Shop Info


(c) Time


Figure 5.5: Boxplots for perceived control, shop info and time


23


5.5 Semi-Structured Interview 5 RESULTS


**5.5** **Semi-Structured Interview**


After the study was completed, the comments were evaluated and the following topics emerged
from the semi-structured interview. These were sorted and explored according to the bottom-up
principle.


**Version Ranking:** In the user ranking of interfaces, all of the participants had the opportunity to
rank the versions to their UX. Level 3 was ranked highest (n=21 [70%]; FT=11, ST=10). Level 1
received the next highest ranking (n=15 [50%]; FT=9, ST=6). Level 2 received the lowest ranking
with 14 participants ranking it in last place (n=14 [46.67%]; FT=9, ST=5)


**Suggestive Application For AV Rear Seat Passengers’ Ad-Hoc Route Control:** On a Likert-7
scale it was evaluated whether passengers were likely to use a redirection function in the rear seat
of a fully autonomous vehicle. The participants rated (likelyUse: Mean = 6.4, StdDev = 0.724).
Participants commented that the tool was useful under time pressure, but there is still room for
improvement.


**Shop Symbols:** In all levels, the coffee mug symbol was displayed on the pin, which marked the
shop’s location. The symbol should have corresponded to the product sold in the store marked on
the map. This was the case for level 3, but in levels 1 (Verrückter Hutmacher) and 2 the symbols
should have been representative of the shop (i.e. ice cream cone, knife and fork symbol).


**AV Control Interface:** Hand-Held Device vs. Built-In

From all n=30 participants, n= 16 (53.33%) would like to interact with a built-in car interface and
n= 14 (46.67%) would prefer to have a mobile interface as the main control instance of an AV.


**Traffic Camera:** The traffic camera view lead to n=4(13.33%) participants reporting a decrease
in trust towards the autonomous driving system. These participants reported problems with the
moving image, causing them to feel compelled to act and thus making it more difficult for them to
reroute (cognitive distraction, stress). Similarly, n=18 (60%) participants reported that the traffic
camera reinforced their confidence in the system by providing situational awareness, awareness of
the environment, traffic awareness, and transparency of system intent through the AR styled video
overlay.


**Trusted Sound:** To decrease the overall cognitive workload of interacting AV passengers, participants expressed the desire to have an audio setup, implying the importance of notifications
during AV rides. This would make better use of the user’s secondary attention and therefore relieve the perceived pressure to always be on the alert. n=9 (30%) thought sound cues could help
give subtle and non-intrusive notifications.


**Voice Assistance To Verbally Reroute:** Likewise n=7 (23.33%) participants suggested a voice
assistant function for better communication on the navigational level. Short commands like "where
can I get a coffee now? " or "show me restaurants near route at time X" were mentioned.


24


6 DISCUSSION

## **6 Discussion**


**6.1** **Varying UX Preferences For Car Infotainment Systems**


In an effort to integrate the user into a highly automated system, systems must be highly adaptable
to users’ preferences. There are several factors to consider when looking back to 2.3.2. Whether
the new technology is well received by the AV end user should consider individual preferences
and habits.


**Human Factor** Age plays a decisive role here. Younger generations who learned to use mobile devices and computers at an early age can estimate the functional limits of a system more
quickly. Therefore they know to what extent they should trust the understood system components,
a harder task for older demographic groups. This general prior knowledge regarding technology and implicit boundaries of integrated functionalities could have led to a fundamentally better
user experience in the evaluation of our navigation prototype. The group of "digital natives" can
quickly adapt to interactions they are unfamiliar with, whereas older generations may lose interest
or patience and thus lower perceived control over the system in more complex, deeply-structured
applications.


**Anthropomorphic Communication:** In situations with time pressure, it might be more convenient to only see the application’s basic functions. To successfully plan a reroute with this
prototype, the map section with shop suggestions would suffice. Some participants were therefore
confused by the centered smiley icon, which hinted at the possibility of rerouting, but did not in
fact offer a actual reroute suggestion. Participants reported that a shortcut button to take the user to
the route planning screen would have been a nice addition to speed up effective task completion.


**Picture-In-Picture View Enhances And Decreases Trust:** The magnified traffic camera screen
(accessed from the home screen) received widely differing assessments by the participants. It
was criticized that this should either be seen in full-screen landscape format or that the screen
could be removed from the interaction, due to its irrelevance to the actual task of rerouting. As
already presented in 5.5, an integrated camera view was mostly rated as a positive feature, but
there were also some disagreements that this traffic view caused an unstable and stressful UX.
Detecting and marking pedestrians, cyclists and other road users was rated as a fundamentally
important function for establishing trust and raising awareness of such camera views in AVs in the
participant interview. Marking the route on the road (e.g. lvl 2) in the style of augmented reality
was also mentioned positively, the additional arrow to indicate the maneuvers of the vehicle on the
road (e.g. lvl 3) was rated neutral or unnecessary.


**6.2** **Car Interface Information Density**


User experience and the trust relationship regarding rerouting in AV could be examined in more
detail. Now we know how n=30 users with certain pre-existing knowledge (mostly the age group of
university students) rate this reroute interaction. Nevertheless, the similarity of the interfaces only
allowed the levels of the design and overall interaction experience to be examined. The weather
functionality is not considered necessary for reroute interaction. Despite this, future interfaces
should offer this function as an option, in order to perceive the system as an informed expert.


**Uneven Information Spilt:** The information differences of the sub-menu for levels 2 and 3 are
too subtle. In relation to the downgrade from level 2 to level 1, level 2 clearly receives more visible
information. In addition to expected arrival time, distance and battery range, the weather could


25


6.2 Car Interface Information Density 6 DISCUSSION


have been taken out. This might have helped to distribute the users’ cognitive load more evenly
between the levels for a clearer gradation of information density.


**Learning Effect** Due to the previously mentioned similarity of the levels, the human learning
factor should not be disregarded. This effect sets in after the first intuitive interface use. By
randomizing the versions presented in this study, we attempted to keep the impact of users’ learning effects on the resulting data as minimal as possible. In the concluding interviews, however,
participants pointed to the learning effect they had observed for themselves.


26


7 LIMITATIONS AND FUTURE WORK

## **7 Limitations And Future Work**


Considering the fact that the implemented interface is merely an interactive prototype without
sound, makes the results of this study interesting for UX study, but hardly realistic. The figure
5(b) regarding appropriate amount of information displayed about a shop revealed strong disparity. The shop information (mostly non-driving related) did not vary enough to give the user
sufficient information and thus deliver insight on the perceived trustworthiness of the limited shop
suggestions. Some participants seemed to like the simple solution of listing the top dishes, others
would have preferred a lot more information about the shops (i.e. free tables, opening hours, ratings, full menu, preorder). We mainly focused on the design’s impact on user’s trust and system
usability (based on 2.3.2.


**7.1** **Limitations**


Due to the COVID-19 pandemic and the expected effort in planning and implementing a faceto-face study in a simulator or car, we conducted this UX study using my online format study
design. Participants were asked to imagine themselves in the situation of a rear seat passenger of
an autonomous driving system, and were also allowed to use their personal mobile device for the
interaction. As such, the collected results should be considered with caution. The situation was
realistically represented by the camera perspective, but to enhance realness, future research should
be carried out with the help of a driving simulator or, at best, a study design with a real car.


**7.2** **Shop Suggestion Process Under Time Pressure**


Indeed, perceived time pressure results in stress, which can cause indecisive behavior as well as
discomfort. In a navigation map that offers more than two stores at the same time, the icons
should match the products offered by the store. Thus, several stores selling different products can
be represented in map view without the user losing orientation under time pressure. This is also
crucial for personalizing the pre-filtered store recommendations. Using this symbol language, not
only the predominantly sold product could be recognized on the spot, but also dietary habits (i.e.
vegetarian, vegan, allergy-related information, etc.) could be specified before the start of the ride
in order to present an interesting and appropriate pre-selection of stores to the vehicle occupant.
In addition, suggestions were made to introduce ratings for the stores in order to better assess the
stores in terms of quality and to indicate whether short-term table reservations are possible. Other
suggestions included an online ordering feature with a pick-up option as this would be useful
especially with regards to time management in AVs driving in inner-city traffic.


**7.3** **Customization**


Due to internal human factors that influence user’s trust relationship with a system, it is almost
impossible to include all preferences for all people into a universal interface design. Therefore,
developing concepts that can dynamically adapt the UX is recommended. It should, however, be
considered that there are basic AV functions that should always be displayed, but some non-critical
additional information (i.e. camera views, maneuver execution) must also be able to be switched
on and off in the pursuit of a customizable, more personalized UX. This would enable functions
such as the picture-in-picture traffic view on the user interface to be switched on and off as desired.


**7.4** **Voice Assistant For Rerouting**


In order not to put any constraints on the vehicle occupant’s primary attention, communication
via a voice assistant could be useful. A voice assistant could provide information on whether a


27


7.5 Audio Feedback And Notification 7 LIMITATIONS AND FUTURE WORK


detour initiated by the user has been successfully planned or communicate information regarding
the probability of travel disruptions and traffic flow on the current route.


**7.5** **Audio Feedback And Notification**


An additional goal could be to lessen the overall cognitive workload (i.e. free up the primary
focused attention) of the AV interaction by making better use of the users’ secondary attention.
Information conveying auditive cues could help lower the cognitive workload and would make
the importance of a notification distinguishable within seconds. Ultimately it would increase the
feeling of situational safety and trustworthiness of the system.


28


8 CONCLUSION

## **8 Conclusion**


In this bachelor thesis, we investigated the correlation of UX-information provision and trust
in a rerouting prototype of an AV, and the role time pressure plays with regards to cooperative
performance and usability. By having the system offer a filtered shop selection of nearby shops,
the groups were able to make fast and intuitive decisions to reroute mid-ride. This fostered higher
trust among the FT participants than among the ST group, compared with the baseline trust of
AV rerouting. Getting an idea as to how day-to-day phone-based interaction with an AV could
take place has made some participants feel more confident to try out AVs, as soon as they become
available to the wider public. 16 (55,3%) participants indicated that a built-in car interface was
the preferred interface for automated driving and 14 (45,7%) stated a mobile device preference
for interaction. There were still some concerns about IT security and everyday complications
with mobile phones (i.e. low battery, no internet, slow-response times, device receives a call),
but the built-in car interfaces are viewed similarly (i.e. slow interface, outdated map database,
heavy car components (e.g. multiple large built-in interfaces) that may lead to more battery/fuel
consumption).


**A Bigger Picture** Future research and pilot driving tests will show whether brought-in devices
reliably function as the main interactive component. Offering a UI that is capable of hand-held
device integration seems like a day-to-day concept users would accept. Keeping a core ("backup",
main controls to use the AV) built-in car interface, in case there are any technical complications
with the mobile device (connection issues, low battery, lost phone) is most likely the better solution. Evaluation of trust in the system revealed that the interface should be more flexible in its
appearance and functionality according to the current situation. Layout customization, according
to ad-hoc personal requirements will become an important topic for future AV UX developers.
In order to feel safe and in control, the user’s individual need for information has to be satisfied.
Adjustable presentation of car features (i.e. trust through display of expected information and intervention possibilities) could be the basis for the best possible personalized UX in AV. In some
spontaneous, non-critical situations, a passenger might have sufficient time to plan a diversion
from the original route with lots of information about the environment and the car status. A fraction of both groups would like to have more shop information to be able to make a considerate
reroute decision. The introduction of time pressure has shown that a reduced provision of information and a reduced number of available stores leads to a pleasant UX. This phone-based navigation
intervention approach provides some preliminary insights for everyday use, but there is still a lot of
research to be done (improvement of cooperative performance and trust through implementation
of auditive and haptic cues) before the interaction becomes acceptable in a real-world setting.


29


## **Content of attached .zip**


  - Separate notes and reports documenting the progress of the thesis concept creation (find
topic, pilot study, main study, prototype creation, study setup)


  - Pilot Study Results


  - The text in the entries may be of any length.


  - Edited video files of the AR-styled traffic camera


  - Prototype File (Figma local file export)


  - Main Study Design & Study Questionnaires


  - Results (Google Sheets) with diagrams and mobile screen captures


  - Limesurvey raw backup of collected data


  - Figures used for this paper (UI elements, Designs, scientific frameworks and concepts)


  - Documentations of the individual performance (times to complete task) and final interview

notes


**Acknowlegment** I would like to thank Jingyi Li and Prof. Dr. Andreas Butz for the opportunity to write this bachelor thesis at LMU Munich Medieninformatik department considering the
COVID-19 restrictions. Special thanks to Jingyi Li for her professional advice and guidance during the creation of this thesis. Finally, I thank all the people who supported me during my thesis
studies.


30


## **References**


[1] Jackie Ayoub, Feng Zhou, Shan Bao, and X. Jessie Yang. From manual driving to automated
driving: A review of 10 years of autoui. In _Proceedings of the 11th International Conference_
_on Automotive User Interfaces and Interactive Vehicular Applications_, AutomotiveUI ’19,
pages 70–90, New York, NY, USA, 2019. Association for Computing Machinery.


[2] Aaron Bangor, Philip Kortum, and James Miller. Determining what individual sus scores
mean: Adding an adjective rating scale. _J. Usability Studies_, 4(3):114–123, 2009.


[3] Melanie Berger, Aditya Dandekar, Regina Bernhaupt, and Bastian Pfleging. An ar-enabled
interactive car door to extend in-car infotainment systems for rear seat passengers. In _Ex-_
_tended Abstracts of the 2021 CHI Conference on Human Factors in Computing Systems_, CHI
EA ’21, New York, NY, USA, 2021. Association for Computing Machinery.


[4] Amber Case. _Calm technology: Principles and patterns for non-intrusive design_ . O’Reilly
Media, Sebastopol, CA, first edition edition, 2015.


[5] Anna-Katharina Frison, Philipp Wintersberger, Andreas Riener, Clemens Schartmüller,
Linda Ng Boyle, Erika Miller, and Klemens Weigl. In ux we trust: Investigation of aesthetics and usability of driver-vehicle interfaces and their impact on the perception of automated driving. In _Proceedings of the 2019 CHI Conference on Human Factors in Computing_
_Systems_, CHI ’19, pages 1–13, New York, NY, USA, 2019. Association for Computing Machinery.


[6] Brittany E. Holthausen, Philipp Wintersberger, Bruce N. Walker, and Andreas Riener. Situational trust scale for automated driving (sts-ad): Development and initial validation. In
_12th International Conference on Automotive User Interfaces and Interactive Vehicular Ap-_
_plications_, AutomotiveUI ’20, pages 40–47, New York, NY, USA, 2020. Association for
Computing Machinery.


[7] Abhijai Miglani, Cyriel Diels, and Jacques Terken. Compatibility between trust and nondriving related tasks in ui design for highly and fully automated driving. In _Adjunct Proceed-_
_ings of the 8th International Conference on Automotive User Interfaces and Interactive Ve-_
_hicular Applications_, AutomotiveUI ’16 Adjunct, pages 75–80, New York, NY, USA, 2016.
Association for Computing Machinery.


[8] Bastian Pfleging, Maurice Rang, and Nora Broy. Investigating user needs for non-drivingrelated activities during automated driving. In _Proceedings of the 15th International Confer-_
_ence on Mobile and Ubiquitous Multimedia_, MUM ’16, pages 91–99, New York, NY, USA,
2016. Association for Computing Machinery.


[9] Sonja Rümelin. The cockpit for the 21st century.


[10] Sonja Rümelin, P. Siegl, and A. Butz. Could you please ... ? investigating cooperation in
the car. In _Adjunct Proceedings of the 5th International Conference on Automotive User_
_Interfaces and Interactive Vehicular Applications (AutomotiveUI ’13)_, pages 61–64. AutomotiveUI ’13, 2013.


[11] Jacques Terken and Bastian Pfleging. Toward shared control between automated vehicles
and users. _Automotive Innovation_, 3(1):53–61, 2020.


[12] Marcel Walch, Stacey Li, Ilan Mandel, David Goedicke, Natalie Friedman, and Wendy Ju.
Crosswalk cooperation: A phone-integrated driver-vehicle cooperation approach to predict
the crossing intentions of pedestrians in automated driving. In _12th International Conference_


31


_on Automotive User Interfaces and Interactive Vehicular Applications_, AutomotiveUI ’20,
pages 74–77, New York, NY, USA, 2020. Association for Computing Machinery.


[13] Chao Wang. A framework of the non-critical spontaneous intervention in highly automated
driving scenarios. In _Proceedings of the 11th International Conference on Automotive User_
_Interfaces and Interactive Vehicular Applications: Adjunct Proceedings_, AutomotiveUI ’19,
pages 421–426, New York, NY, USA, 2019. Association for Computing Machinery.


[14] Chao Wang, Matti Krüger, and Christiane B. Wiebel-Herboth. “watch out!”: Predictionlevel intervention for automated driving. In _12th International Conference on Automotive_
_User Interfaces and Interactive Vehicular Applications_, AutomotiveUI ’20, pages 169–180,
New York, NY, USA, 2020. Association for Computing Machinery.


[15] Philipp Wintersberger, Hannah Nicklas, Thomas Martlbauer, Stephan Hammer, and Andreas
Riener. Explainable automation: Personalized and adaptive uis to foster trust and understanding of driving automation systems. In _12th International Conference on Automotive_
_User Interfaces and Interactive Vehicular Applications_, AutomotiveUI ’20, pages 252–261,
New York, NY, USA, 2020. Association for Computing Machinery.


32


