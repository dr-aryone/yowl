# Yowl

> NOTE: Yowl is a work in progress, we're not even to an Alpha release yet.

Yowl is a alert and monitoring system that helps you stay on top of production issues. 

Most businesses rely heavily on email notifications in order to monitor their production systems. These notifications often go unnoticed for periods of time, especially after business hours, causing potential impacts to customer experience and revenue. The goal of Yowl is to increase exposure to these alerts and speed up response times.

## How does it work?

Yowl is made up of a few different components: an API, a web dashboard, and an everchanging list of integrations into third party systems.

### API

The API layer of the monitoring system will provides an easy way for your systems to trigger alerts. This layer can be consumed by current monitoring jobs, as well as used for webhook notifications from Splunk or Application Insights. 

Each notification will require a few different properties: an application name, type or category of the alert, and a message. The application name and alert types will provide you a way of figuring out who should be notified. For example, the Team A would be able to subscribe to Project A alerts, while the Team B could subscribe to alerts specific to the Project B.

Once an alert is triggered, the API will broadcast the notification to a variety of channels for each user based on the context of the alert. First, an alert could trigger a notification to each user's desktop and email. However, if the alert is triggered after-hours, the notification could also be sent through SMS.

Alerts can also be aged. Depending on the severity of the alert, the system will continue broadcasting notifications to each user, the longer the alert remains open.

### Web Dashboard

The dashboard will be the view into what alerts are currently needing to be actioned. This will provide an at-a-glance view into the different severity levels of the alerts, as well as provide some context around aging and the number of times they've been triggered since.

From the dashboard, actions can be taken on each alert:

* Dismiss - removes the alert from the queue
* Escalate - increases the severity level of the alert, could also re-notify the subscription group

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# serve api at localhost:3000
cd ./publish
npm start

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
