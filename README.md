# Nimble Gravity Challenge

Mini React application that consumes Nimble Gravity's candidate API and allows applying to open positions.

## Tech stack

* React + Vite
* TypeScript
* Fetch API

## Features

* Candidate lookup by email
* Fetch and display open job positions
* Apply to a selected job with repository URL
* Loading and error handling states

## How to run locally

```bash
npm install
npm run dev
```

## Notes

While implementing the challenge I inspected the API responses using browser DevTools.
The apply endpoint required an additional field (`applicationId`) that was returned in the candidate lookup but not documented in the instructions, so the request body was adjusted accordingly.
