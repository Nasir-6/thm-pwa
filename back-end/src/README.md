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
