# Advanced-Decision-Making-And-Management (ADAM)

![ADAM](https://www.epa.gov/sites/production/files/2013-06/epa_seal_verysmall_trim.gif) Sample application is currently hosted @ <http://54.208.179.171:8000/>. Version 1.0 to be hosted on USEPA website.

## What is ADAM

ADAM is a website-based tool that targets to analyze systems-level organic waste management valorization problems. It automates the process of data extraction, mathematical modeling, problem-solving, decision-making, and result visualization. Also, ADAM integrates a database system, a modeling tutorial and guidance, a GIS-based visualization widget, and some more customized functions for applications beyond OWM. The main principle behind this tool is to use logistics management optimization models to decide optimal product transformation and transportation routes in the organic waste diversion processes and give systems-level economic and environmental evaluations. With ADAM, we can (a) quickly make case studies that are similar to previous publications; (b) enhance and accelerate the collaborations between computational and experimental research projects, especially in data exchange and case study assessment, (c) and act as a component in educating waste management from a systematic approach.

## Who should try ADAM

Target users of ADAM include (1) college students and researchers in engineering or any other related fields, (2) experimentalists and developers who want to do preliminary tests of their technologies, (3) policy-makers and stakeholders who want to learn macroscopic information about OWM, (4) and others who are interested in systems-level OWM problems.

## What is the structure of ADAM

The generic structure of ADAM is shown below. It contains modules that are accessible to different users. Any user from the internet has access to the ADAM Homepage, the ADAM Tutorial, the About session, and the Contact session. Registered users have the access to their Dashboard, where they will further have the access to our published case studies, to managing their models, and to the visualization widget. Finally, for ADAM admin users, they have the access to the developer panel and admin page, where some advanced operations can be conducted, such as database management, user management, and case study management.

## What functionalities does ADAM have

For common users, ADAM can (a) provide the visualization of geographical data that are OWM related, and (b) provide tutorials for setting up systems-level OWM problems.

For registered users, ADAM can (a) provide established case studies and corresponding data packages, (b) allow users to define their OWM problems under step-by-step guidance, (c) automate the mathematical modeling, and maintain, manage, and solve users’ problems, and (d) visualize results.

For admin users, ADAM can (a) allow users to maintain their personal database for private data, and (b) allow users to define more custom problems with their private data.

## How to use ADAM

We recommend users go to the tutorial module and carefully read the two examples we provided. After that, users need to submit a registration form, and then they will be granted access to their dashboard.

To define an OWM problem, users can either make a copy of any of our published case study and start from there or to establish a new, empty model and provide input data. Once a model is established, there are six steps to complete before it is sent to the automatic problem solver on the backend; they are model type, supply data, technology data, demand data, transportation data, and run model. When providing data, users have options of manual entry, uploading CSV files, or loading from other models or case studies. After the problem is well defined and being sent to the solver, ADAM will send emails to users notifying when the solver starts and when the results are available. Users can then go to the visualization widget to observe what are the optimal transportation routes and what technologies are selected for processing organic waste under the problem setup.

For data input, ADAM maintains a database behind the scene that contains information about common organic waste streams and waste processing technologies, and users can directly extract items from ADAM. Currently, users still need to manually define the geographical scope of the problems by specifying locations of waste sources, technology sites, and consumers.

## What do the ADAM results mean

ADAM provides a result summary for each solved problem, a downloadable result package, and the results visualization widget. The results contain four main parts: supply results, technology results, demand results, and transportation results. The supply results indicate the amount of organic waste that is supplied by each waste source. The technology results show if a technology is used in the system, and what is its corresponding waste processing amount. For a design a problem, technology results also indicate if new technologies need to be installed for optimal waste management. The demand results indicate the amount of derived product that is consumed by each consumer in the system. And the transportation results show the optimal route to transport organic waste and products in the system. With all the results aforementioned, ADAM gives an overall evaluation of the system, including total supply cost, revenue, transportation cost, processing cost, and total system profit. Apart from those, for a management model, the product price result is also available, which reveals the true value of that product with specified input.

All of the results are written in CSV files and are packed in a zip file which is ready for download when the problem is solved. And the visualization widget on the user dashboard can help users visualize the results – an example is shown below. For each supplier, consumer, and processing site, users can double click to check details. The transportation routes for various products are plotted on the map and the price maps are also generated programmatically upon users’ requests. Users can manually calculate other metrics of interest, such as payback period, percentage of processed waste, etc.

## What future applications can ADAM handle

We anticipate that ADAM can help develop case studies about waste management in different geographical areas. For example, currently, we have the data of dairy CAFOs and beef CAFOs for many states and we can conduct case studies at the state level or watershed level for those states, to compare factors like policies and farm densities. We also expect ADAM can be used for evaluating novel technologies and for novel waste management problems. With the collaboration with experimental groups, ADAM can quickly evaluate if the technology data, such as yield factor and operational cost, are within a reasonable order of magnitude to make the technology competitive. Additionally, problems with other waste streams, such as plastic materials, can also be developed.

## What is ADAM made of

The ADAM framework is developed in Django and now host on Amazon Web Service. The optimization model is written in Julia and solved using Clp and Cbc, both of which are efficient, open-source optimization solvers. The database on the back-end is driven by MySQL. And the engine for mapping and obtaining transportation routes is OSRM, which is host on AWS as well.

The user-interactive GUI of ADAM is developed with the support from multiple open-source packages, including JQuery, Bootstrap, Leaflet, AlertifyJS, Draw2D, noUiSlider. All icons used in ADAM are provided by Ionicons and flaticon.

***

## Home

See [Wiki/Home](https://github.com/dyoung11/WebToolADAM/wiki).
***

## Local Installation for Programmers

See [Wiki/Local Installation for Programmers](https://github.com/dyoung11/WebToolADAM/wiki/Local-Installation-for-Programmers).
***

## Testing

See [Wiki/Testing](https://github.com/dyoung11/WebToolADAM/wiki/Testing).
***

## Contributing

See [Wiki/Contributing & Collaboration](https://github.com/dyoung11/WebToolADAM/wiki/Contributing).
***

## License

See [Wiki/License](https://github.com/dyoung11/WebToolADAM/wiki/Licensing).
***
