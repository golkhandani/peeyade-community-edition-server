# Peeyade Community Edition project

### DTO

DTO is used by service mostly:
All the inputs of services are dto
All the outputs of services are dto

### MODEL

Only used by repositories;

## Project folders

```
    .
    ├── src
    │   ├── common                # Include all the logic which are shared between different components
    │   │   ├── constants
    │   │   ├── decorator
    │   │   ├── enum
    │   │   ├── guard
    │   │   ├── interceptor
    │   │   ├── pipe
    │   │   ├── token
    │   │   ├── transformer
    |   |   ├── middleware
    │   │   ├── common.config.ts
    │   │   └── common.module.ts
    │   ├── management
    │   ├── operation             # Include business components' logic, dto and entity
    │   │   ├── pivot
    │   │   └── ...
    └── ...
```

## Common:

Shared Module and logic which used globally.

### Common -> decorator:

Implementation of decorators which are used in operation's components.
For example:

`auth-staff.decorator.ts` is a parameter decorator and used in order get authorized user from req.user property.

`is-objectId.decorator.ts` is a property decorator and used in order to validate objectId input.

`route-date.decorator.ts` include parameter decorators to get combination of body and pram or query in order to validate them together.

`tenant.decorator.ts` is a function decorator and used in order to change database for each function of repository based on user's `tenantId`.

...

### Common -> enum:

All the enums that are used globally within application.

### Common -> guard:

All the guards that are used for authorization and authentication.

For example:

`authentication.guard.ts` is a controller guard and need user service in order to validate user.

`authorization.guard.ts` is a controller guard to check user permission for accessing a route.

> Checking placees that user allowed to manipulate is a logic, so it will check in service files.

### Common -> interceptor:

All the response formatters like `NotFound`, ... .

### Common -> pipe:

All the parameter decorator's pipe .

For example:

`parse-objectId.pipe.ts` is used for checking and converting route param to objectId.

### Common -> transformer:

Class-Transformer custom decorators which can use in both validation and transformation of data (input and output).

For example:

`to-objectId.transformer.ts` is used for checking and converting properties to objectId.

`to-int.transformer.ts` is used for checking and converting properties to int.

## Operation:

Each component in operation is a fully implemented NestJS component.
Each component should have structure as below:

```
    [component]
    ├── entity                      # Include all entities which are related to component
    ├── enum                        # Include all enums which are related to component
    ├── request                     # Include all controller's inputs of component
    ├── response                    # Include all controller's output of component
    ├── [component].controller.ts   # Main controller of component
    ├── [component].service.ts      # Business logics of component
    ├── [component].repository.ts   # Database queries of component
    └── [component].module.ts       # NestJS Module of component
```
