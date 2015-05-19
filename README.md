#Student.INFO - v0.3
**Dragon Hack Submission by Frikoti**

A webpage designed by and for students of FRI faculty of Ljubljana.
Our intent was to gather all relevant educational info on a single page from:
 * E-classrom
 * STUDIS exam data system
 * timetables
 * Relevant Facebook feed

To achieve this, we used **Python 3** for data scraping, using following libraries:
 * **request** for html download
 * **json** for dumping data to json files
 * **BeautifulSoup4** for parsing html
 
For serving webpages and frontend, we used **JavaScript** with **Twitter Bootstrap** framework, and hosted the on a DigitalOcean server.

**Potential development:**
 * Page personalization (multiple users, login system)
 * Migration of data scraping to a faster library
 * Scripts for periodical data acquisition
 * Migration of webserver to Python
 * Facebook feed display optimization (pause-on-hover...)
 
Developed by:
 * *ActoreX* (frontend support & Facebook API), 
 * *MikroMan* (backend & data scraping), 
 * *rekonder* (backend, server, frontend support),
 * *ziga.cernigoj* (frontend JavaScript & webpage design)
 



