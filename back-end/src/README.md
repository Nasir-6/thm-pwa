# Back-end Architecture and Decisions

DISCLAIMER: these are based off my limited knowledge of Java, Node.js and back-end technologies in general - so if there are any better alternatives I would really appreciate any feedback. But sometimes you just have to go with what you know until you can get any sort of feedback.

## Why Node.js?

- It is lightweight compared to Java - I don't expect anyone to fund the project so decided it's best to minimise costs by reducing the memory usage of the server on a service like Digital Ocean.
- The asynchronous nature allows Node.js to handle multiple concurrent requests - I eventually am looking to develop not just for Tower Hamlets - but in the future for all of the UK.
- It's a simple API with much of it being fetching data from a database - so not much is needed in terms of the rich security/data intensive processes provided by Java
- The biggest reason is TypeScript:
  - Eliminates the main argument of Java having static typing to minimise bugs
  - I always wanted to learn it but kept putting it off.
  - Maximise productivity by using one language for both client and server
  - It would allow me to deepen my understanding of JS as well as TS by being forced to apply the more advanced/uncomfortable concepts

Note: Initially I was going to be lazy and go with Java due to the fact I was more comfortable with building an API with it and the fact I had no exprience with Node.js/Express and TS. However due to the above reasons I decided to make the leap and learn Node.js and TS.

## Why a REST API?

- I do have plans to expand into the mobile application sphere so making it a REST API would allow me to use the server/data for all future platforms

## The Architecture

It is built on a Route - > Controller -> Service -> DAO/DB architecture with dependency injection to allow for testing of all components.

### Why Dependency injection?

- I want all components/functions to be tested
- It's a service that will be used by 1000s and I would like to ensure minimal downtime by building a CI/CD pipeline which tests any changes to the code before being pushed to production

### But there are no tests written yet!

- Once the server routes/services have stablised in development I will add tests to ensure I'm not writing tests which will eventually have to be rewritten multiple times
- I'm still working my way through the intricate details of how it all works so as my understanding changes so will most of the tests
- Any future features will be developed using TDD

## Business Analogy for the Architecture

I've come up with an analogy for my future self in case I forget where I should place things for future development. Here it is.
This architecture has 4 main players just like in a business which will be explained below:

1. Routes -> Customers/Clients
2. Controllers -> Managers
3. Services -> Employees
4. DB/DAO -> Data Employee who have access to confidential info about the company

### Routes -> Customers/Clients

- Each Customer/Client has a specific need and requirements with a load of background information.
- The Routes are similar in the sense this is where a request comes in but with a load of background information (Request Headers/Body).
- They only want the response and don't care about anything else.

### Controllers -> Managers

- The managers get requests from clients about the issues.
- They still have all the background information and thus you will find them taking in the full req and res objects.
- They may check if the requests are valid before passing them to the employee to work on and thus checks on the req params and body may be performed here.
- They then delegate the tasks to the employee defining what information they will be given and what info they expect back - Notice how the employee/service does not get all the information - only the relevant information.
- Once there is a response it will be passed back to the client through res.json.

### Services -> Employees

- They are the ones handling all the intricate details of the requests
- They only get info which they need to carry out the tasks (NOT the full req object)
- They will return the information which the Manager want's not a full blown response object
- They communicate with other internal services/employees (private services) to get the job done
- They often need information about the company and so will liase with the DB/DAO/Data Employee to get the information they need to do their job

### DB/DAO -> Data Employee

- They are the ones getting the data about the company/product - which are not accessable by everyone
- You need to provide them the details they need in order to get what you want from them
- They are kind enough to transform the data from the DB form into a form which can be transferred to the Client (DTO - Data Transfer Object)

### Additional player - Security -> ErrorHandler (Middleware)

- All the Controllers/Services/DB/DAO instances can throw errors whenever they want straight to the client when the request is unreasonable which is handled by the ErrorHandler middleware
- Kind of like a mediator/security guard incase things go crazy.

### Why the analogy?

- There are additional folders/parts added in (middlewares, exceptsion) but the above analogy made it clear to me such that I could start placing certain code blocks in a suitable place/manner.
- This was key as I had to know the purpose of each part before coding it out and forcing myself to explain it in simple terms definitely helped clear everything up. This analogy is here for future Me/developers incase I forget why things are placed in certain areas.
