# DS Assessment

An assessment for a company. The company name masked for security.

## Installation

```
npm install
npm start
```


## Design

### v0.0.1 - fulfill requirements

> As far as we know, the API is fairly robust, it does not tend to go down even when it's under a peak load. [...] We hope that we will have minimum delay [...] we hope we can see the event asap in the page

As mentioned like above. I think I'll expected to use a **busy polling** method to fetch updates from server. Despite busy polling is arguably considered an anti-pattern method nowadays. Because **busy polling** not only caused server side busy but also networking and client side's computation overhead. So it's more popular to use modern **server push**.

Also the API endpoint is not so RESTful. First the leading levels of a URL should better just nouns. And adjustive should putting in the tail of the URL as a modification or just add into querystring. Indeed the endpoint path should well considered or it will eventually messed up. Recommanded API endpoint will like blow.

> * `/new-alarm-events/` -> **GET** `/events/unread`
> * `/event-viewed/event-id/` -> **PUT** `/events/:id`

**But let's fulfill requirements in the first place.**

And its also not defined how an event can considered as readed. I'll try to detect `mouseover` and `touchstart` to mark .

## Author

[Leonard Lin](https://github.com/gwokae)
