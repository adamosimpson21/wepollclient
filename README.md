#WePoll

WePoll by Democratic Innovation Studios 2018 (DIS)

##Introduction

WePoll is a Progressive Web App that polls users about a variety of questions. Users can log-in, create polls, answer polls, buy items in the shop using in-game currency, level up, and many more features to come.

Other core features are data visualization for poll results, social media presence and sharing, and gamification. 


 ## Installation
This project folder is for the Front-End of the application. The Back-End can be found at [https://github.com/adamosimpson21/wepollapi] . To clone this repository, run

`git clone https://github.com/adamosimpson21/wepollapi.git`

`npm install`

In the root directory, run `npm start`, and the site will open in your favorite browser. 

You will not be able to use most of the components without the API layer. To set-up the API, it's a little more complicated; MongoDB needs to be configured, which can be a pain the first time. After that, start your mongoDB database according to your configuration. Create a .env file with a SECRET_KEY variable. A PORT variable is also recommended.
Afterwards, start your mongoDB and the API with nodemon. You may have to adjust the path variable in '../src/services/api.js' to your own local host IP from the front-end.

All of the code is also free to view through the github repo [https://github.com/adamosimpson21/wepollclient] . Current issues and a small road-map can be viewed through the issues at that URL. 

##Features
User log-in and Authentication,
Poll Creation,
Poll Answering,
D3 Data Visualization for poll results,
Shop page and items,
Profile Information,
Search bar for polls, 
Poll sorting,
Demographic data and filtering of results,
Use of Higher Order Components in React,
Responsive Web Design,
Progressive Web App, 
Animations,
Jest Testing,
Re-usable Components in React,
Redux State management, 
API integration,
Database Management,
Poll Sorting options,
Poll Searching options,
and many more to come

## Support

All Support and technical questions should be directed to BandsWithLegends (@BandsWithLegend on twitter). Other ways to contact BandsWithLegends can be found at [https://www.BandsWithLegends.com] or through the email adamosimpson21@gmail.com
All business related inquiries should be directed to [https://www.dinnostudio.com/investment] 

## RoadMap

The best place to check for an updated RoadMap, current issues, and contacting admins for future releases is [https://github.com/adamosimpson21/wepollclient/issues]

## Contributing

There is a lot of work to be done on WePoll, and the best way to get involved with contributing is by contacting BandsWithLegends through his twitter @BandsWithLegend or email adamosimpson21@gmail.com . Other forms of contact can be found at [BandsWithLegends.com]
The project is moving very quickly, and help is needed at all levels of development. From design, styling, front-end features, api routes, error-handling, and testing, there are many simple and complex tasks to be done.

## Authors
BandsWithLegends! @BandsWithLegend [BandsWithLegends.com] adamosimpson21@gmail.com
Russell Simpson

##License 
MIT License :

Copyright 2018 Democratic Innovation Studio

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


###Project Status 
Active as of December 2018

####Learn more about React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

