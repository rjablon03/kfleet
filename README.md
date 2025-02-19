K-fleet is an application built as a hypothetical replacement to my company’s current vehicle check-out process. Currently, the company uses Microsoft Outlook to check out cars. Cars are treated like meeting rooms, and to check one out, you invite it to a "meeting." This is problematic because it can be a complicated and unintuitive process. Other issues include users not being required to describe why they are checking out that car and where it’s going, cars not being checked back in, and no standardized way of seeing which cars are available, which cars are being used, and which ones are in the shop (each employee has their own method).

This application makes the process much simpler. There is a clear view of which cars are available and which ones are not. Users are required to enter descriptions and other data such as what project the car is being used for, ending mileage, and images/descriptions of issues they encountered while operating the vehicle. It also estimates CO2 outputs to help the company develop a green mindset. Admins are able to create, update, and delete vehicles and there is an analytics page that tracks car stats and car-related project stats.

This application was my CIS-371 final project at GVSU. The scope was kept small so that I could complete the application over the course of the semester. I would like to add features such as navigation tools and an email service that sends users notifications when they have an overdue check-out.

The tools I used to build this project are Vite, React, Typescript, and Tailwind. The application was deployed on Vercel and uses one of their database providers for all of its data needs. Carbon estimates were made using the Carbon Interface API linked below.

https://docs.carboninterface.com/#/?id=introduction
