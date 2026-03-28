# Just Eat Take Home Assignment
## James Cumming-Bart

# Project Overview & Assumptions

## Specification

- The purpose of the assignment was to implement an interface that can make requests to Just Eats Restaurants API using a postcode and then display the results of the restaurants

- The specification also provided the following criteria:
    - Only the first 10 restaurants returned need to be displayed
    - Each restaurants data contains many pieces of information and that the only information that we are required to display are:
        - Name
        - Cuisines
        - Rating (as a number)
        - Address 
    - We should include instructions on how to build, compile and run our solution
    - Include any assumptions, or anything that is not clear in the Readme file
    - Include any improvements you may make to your solution in the Readme file
    - The Just Eat API endpoint is `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/{postcode}`


## Assumptions
- When reviewing the results of the Cuisines for each restaurant there was a cuisine called 'collects stamps'. I left this result in as the specification did not request its removal but it could be easily filtered out in the 'dataManager' component
- The postcode information held by the API are valid, but I should manage any errors appropriately regardless
- The API will be available but I should manage any errors appropriately regardless
- It is possible that less than 10 restaurants could be returned by the API, or no restaurants could be returned at all

## Research & Starting approach

- Before beginning carried out research on the API:
    - I made requests to the api from my browser to one of the postcodes that was provided in the specification as an example postcode
    - I noted the structure of each restaurants results and relevant information:
        - The address is an object that contains the fields 'firstLine', 'city' & 'postalCode' fields
        - The rating is an object and the value that I need from the object is 'starRating'
        - Cuisines is an array of objects, and each object contains the fields 'name' & 'uniqueName'. I decided that I would only need 'name'

# Tech Stack

- Framework: React
- Language: TypeScript
- Build tool: Vite
- HTTP request client: Axios
- Testing: vitetest


# Running the application


- Install Dependencies
`npm install` 

- Run the development server
`npm run dev`

- This application used a Vite development server
    - A proxy is configured in the `vite.config.ts` file to forward any requests to the Just Eat API. This is needed to prevent Cross Origin Resource Sharing (CORS) issues during development

# Project Structure
- api/RestaurantApi.tsx
    - Handles communication with external API
    - Isolates HTTP logic 
- components/
    - RestaurantSearch.tsx
        - Provides functionality to allow users to enter a postcode to search for restaurants
        - Focused on UI. Business logic is managed in other components
    - RestaurantList
        - Provides functionality to display restaurant results in a structured, and clear format 
- hooks/
    - DataManager.tsx
    - Handles management of the lifecycle of restaurant data. Validates postcode before it makes request to the API wrapper and handles responses
        - Handles any errors and passes them back to the main 'RestaurantSearch' page to provide a streamlined process
types/
    - typeManager.tsx
        - Manages types & interfaces used in the components of this application
            - As uses TypeScript I wanted to ensure that components know what data is being expected for them to handle
            - Each interface defines properties such as the names of the fields of data and their types


# Architecture & Design

## Separation of Concerns
 
- I designed the structure of this application with clear and understandable separation of the key components to ensure that the application is easily maintainable and can be scaled easily
- I used TypeScript to make sure that there is strong typing across the application. This also ensures type safety which reduces the risk of errors. The component props and data models are also typed to provide clear data structures between the different parts of the system.

### Layered Architecture

 - Api Layer `(/api)`
    - Manages all requests to an from the Just Eat Restaurants API. This layer provides separation of HTTP requests which are  made using the Axios library

- Hook layer `{/hooks)`
    - Provides encapsulation of the logic to fetch data and manage the lifecycle of the data. It acts as an intermediary between the API and UI and it handles:
        - Asynchronous requests
        - Error management
        - Storage of data

- Components layer `(/components)`
    - Handles the UI of the search and restaurants list page
    - Data is passed to and from the components of this layer using props
    - Error handling is 'passed up' using the principles of 'throwing' errors up so they can all be managed within the same component
    - There is no business logic in the components of this layer, so it ensures uncoupling of the overall design and ensures that the code is easy to read and scalable

- Types layer `(/types)`
    - Provides a central resource location for all types & interfaces used in the application. It provides a clear structure for data that is used between the different layers of the application


## Data Flow

- A user submits a postcode via the search component
- The hook makes a request to the API layer
- The API layer retrieves raw data from Just Eat's API
- The response is filtered and mapped to a simplified response
- The useState hook updates state
- The Components in the Components layer re-render the page with the new data

This flow ensures that external data is transformed before reaching the UI, and this ensures that the components are simple and that any future changes can be handled easily

## Data Modelling

- The API response contains a large amount of data for each restaurant. In order to provide a simplified data model containing the fields below, I carried out a mapping function in the 'dataManager' component
    - Name
    - Cuisines
    - Rating (as a number)
    - Address

- The result of the mapping data matches the 'Restaurant' type of my types component and ensure that data is clean and structured in the same way for every request


# Error Handling

- Error handling can be complicated, so to ensure ease of use, I provided clear process for managing errors
- The 'dataManager' component manages any errors that are received from other components. These are formatted as a string and passed up to the 'RestaurantSearch" page using a prop 'SetError' 
- The 'RestaurantSearch' page contains a sub-component that displays the error message only if the useState value 'displayError' is not empty
    - This message is displayed for 2 seconds to the user using a timeout function 
- A user submits a postcode via the search component -The hook makes a request to the API layer -The API layer retrieves raw data from Just Eat's API
# Testing 

- Testing was carried out using Vitest, which is a testing framework that is recommended for use in TypeScript applicationss
- The tests focused on validation the main logic of the application

## Postcode Validation

- Validating the postcode is very important in this application, as any validation issues should be caught and managed rather than an invalid request being sent to the Just Eat API endpoint
- It also ensures that users receive feedback quickly on any invalid inputs

- Tests were carried to test for behaviour and also edge cases. These include: 
    - Empty postcode input
    - Postcodes that are only whitespace
    - Invalid postcode formats
    - Valid UK postcode formats
    - Variations in upper and lowercase

- These tests ensure that the validation of the postcode is clear and concise and provides consistent outcomes

## API Wrapper

- To test the API module I used a library called `axios mock adapter`. This provided a more refined and easier process to creating mock Axios API calls than using the built in services from Vitest.
- The API wrapper retrieves restaurant data and it was tested in two ways:

1. Error Handling

- A test was implemented that used an invalid endpoint to confirm that the wrapper raised an error when the request fails

2. Mocked API response 

- Axios was mocked in order to simulate responses from Just Eat's API endpoint. The allowed me to test the behaviour of the API wrapper without needing an internet connection and access to the Just Eat API endpoint

- I carried out two tests:
    - A mock request with provided and expected data, which used the API wrapper, to test that response of data was correct 
    - A mock request with no provided data, and  no expected data, which used the API wrapper, to test that response of data was correct and situations where data was returned did not cause any silent errors

## Approach to testing

- My approach to testing was to check and validate the main core logic of my application, primarily the data being passed between the modules using React props
- This included input validation as well as testing the communication being sent and received by the API wrapper
- As the scope of this project was clear, I focused on the testing of core logic. However in a production environment, I would add further tests that included integration testing and also testing of each component of the application

# Limitations
## Data Inconsistencies
- When reviewing the address fields from restaurants there is some inconsistencies in the data, such as that the 'firstLine' field sometimes includes the city information
- An example of this using my own postcode is this restaurant
    - 137 High Street, Watford, Hertfordshire
    - Watford
    - WD17 2ER
- This means that the city is displayed twice (along with the county)

- This could be address in two ways
    - Create an address validation process in the 'dataManager' component to clean the address
    - Clean the data issues at the source of the data and add validation in the pipeline where a restaurant is added to Just Eats Database

## CORS backend proxy

- I did not implement a backend proxy to handle CORS when the application is run in production, in order to keep the scope of my application aligned with the assessment. Instead I used a Vite proxy when the application is run in developement

# improvements

- Implement a backend proxy to proxy API requests
- Cache data from last recently held results using sessionStorage in browser
- Improve postcode handling to allow user to enter a postcode without spaces 
- Implement an address cleaning & parsing function to manage duplication of some parts of address in some restaurants records


# AI Usage

- AI was used only for the purposes of providing guidance and support, and the high level structure of the application
- The code was written by myself and if any debugging of issues using AI was required, each request specifically asked that no code be provided


# Dependencies / Acknowledgements

This project uses [**read-icons**](https://www.npmjs.com/package/react-icons) A library of icons for use in React projects
> react-icons is licensed under the MIT License.

This project uses [**axios-mock-adapter**](https://www.npmjs.com/package/axios-mock-adapter) from [@ctimmerm](https://github.com/ctimmerm)  Axios adapter that allows to easily mock requests 
> axios-mock-adapter is licensed under the MIT License.
