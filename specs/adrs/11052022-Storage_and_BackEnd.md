## Context and Problem Statement

- How to handle storage locally? 
- How to modify backend operation? 

## Decision 

- BackEnd: Use JavaScript to interact with localStorage API.
- Storage Implementation: Utilize localStorage API.  

## Pros Considered

- BackEnd: Pre built methods and no need to interact from JS to Java
- Storage Implementation: Handles most of our needs as the user can load their data from session to session. Furthermore everyone working in both front and back end know how to use this API, so simplifies development time.
