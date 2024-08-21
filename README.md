# accuBook Covid-19 vaccination dashboard

I created this project using Next.js and bootstrapped it with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## To run it

Install dependencies and run the dev server

```bash
npm i
npm run dev
```

Then visit [http://localhost:3000](http://localhost:3000).

## Approach

I used Next.js as it's a framework that I'm familiar with and it includes some useful command line tools for setting up a new project. Other reasons why it's a good choice:

- use of React makes for quick and easy building of UIs
- typescript offers type checking and catching potential issues during development
- support for scss modules which I find a powerful way to scope styles within components
- server side rendering for performance and ease of making requests to external APIs

I also hadn't used Next 14 before so it was good to try it out here.

I decided to fetch data from the API in the server side code. This should be more performant for large amounts of data and meant I didn't need to handle loading states in the UI. It also meant I did't need to consider CORS.

User inputs when searching by name or sorting results are handled as search params in the url for the page. This kind of offers a way to persist these values in state. The search params are used during server side rendering when interacting with the API and sorting the response data.

## Testing

For testing I used jest along with testing-library. These are pretty standard tools for unit testing frontend applications. Using such tests gave good feedback on how components were working during development.

I also relied on ad-hoc manual validation to ensure the solution fulfilled the requirements. Given more time I would use an e2e testing tool like playwright (or cypress) to verify some assertions at the level of the page. These could include user flows and edge cases and taking screenshots to help maintain consistency in the UI.

## If I had more time

Aside from some more sophisticated testing I would:

- Introduce more error handling e.g. when catching errors in API responses. Only 404 response codes are accounted for currently.
- Improve the UX. My colour schemes are possibly not that engaging and I'd need to do some research to get inspiration for something a bit better. I used headlessui here but a more styled component library may have been a better choice.
- Assess accessibility. I have tried to use semantic HTML and chose a component library (headlessui) that should offer good accessibility but I have not verified this. Playwright with Axe could be used for this as well as manual testing.

## Time spent

Overall I spent about 8 hours doing this. There was some ramp up time as I hadn't used Next 14 before.
