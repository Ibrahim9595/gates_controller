# Project Summary

## Project stack:
1. Typescript
2. Expressjs
3. Zod for schema parsing
4. Prisma as an ORM
5. Postgresql

## Coding style & abstractions:
- I have made the choice to build the project using FP approach instead of functional programming.

- The project structure is services -> service -> resource -> (validation, handler and logic).

- Each service directory exports the routes inside this service.

- Validation: describe the schema for the expected user input which is applied against the request.

- handler -> this file does simple 3 steps:
    
    1. read all data necessary for the logic.
    2. Call logic function/s to perform business logic.
    3. Do any necessary writes to the database.

- logic -> this contains all business logic it is pure and contains no side effects.

- The create-controller method: To abstract all express specific job and perform:

    1. Validation for the incoming request.
    2. Calling the handler.
    3. Catches any error and pass it to the common error handler.

- error-handler-middleware: A centralized place to handle any error.


# Run Locally
```zsh
docker-compose up -d
npm i
npm run build
npm start
```

# TODOs
1. Write unit tests for all business logic.
2. Add the feature to support dynamic ordering between sections.
3. Write a wrapper around prisma and Zod to make any loosen the coupling to them.
4. Add endpoints to be used for autocomplete (ex: skills, languages, ...etc)

# Test Curl scripts

## Login
```zsh
curl --location --request POST 'https://resume-backend-bc5j.onrender.com/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "Gunner56@gmail.com",
    "password": "123456789"
}'
```

## Register
```zsh
curl --location --request POST 'https://resume-backend-bc5j.onrender.com/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "Aaliyah_Brakus78@gmail.com",
    "password":"123456789",
    "name":"Cary Gusikowski"
}'
```

## Create Resume
```zsh
curl --location --request POST 'https://resume-backend-bc5j.onrender.com/resume' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6Ikd1bm5lcjU2QGdtYWlsLmNvbSIsIm5hbWUiOiJMb3JyYWluZSBNYXJrcyJ9LCJpYXQiOjE2NzA0MjA2NzZ9.YXC3F9GOy45mP7HzsgULOVBuJHw2xhFAKTFAVl2SsWs' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "Larue.Walter@gmail.com",
    "firstname": "Vilma",
    "lastname": "Morar",
    "jobTitle": "Internal Paradigm Consultant",
    "phone": "01151017012",
    "templateId": 1,
    "address": "0404 Jeramie Causeway",
    "dateOfBirth": "Sun Jan 30 2022 23:33:33 GMT+0200 (Eastern European Standard Time)",
    "description": "esse"
}'
```

## Update Resume
```zsh
curl --location --request PUT 'https://resume-backend-bc5j.onrender.com/resume/1' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6Ikd1bm5lcjU2QGdtYWlsLmNvbSIsIm5hbWUiOiJMb3JyYWluZSBNYXJrcyJ9LCJpYXQiOjE2NzA0MjA2NzZ9.YXC3F9GOy45mP7HzsgULOVBuJHw2xhFAKTFAVl2SsWs' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "Misael85@yahoo.com",
    "firstname": "Willy",
    "lastname": "Franecki",
    "jobTitle": "Internal Response Administrator",
    "phone": "01151017013",
    "templateId": 1,
    "address": "29032 Kunze Plains",
    "dateOfBirth": "Sat Sep 17 2022 10:45:48 GMT+0200 (Eastern European Standard Time)",
    "description": "Est nobis et earum. Reprehenderit quam vitae recusandae deserunt in dolorem. Rerum quaerat enim asperiores cupiditate voluptatum ea. Porro necessitatibus consequatur id mollitia non nemo."
}'
```

## Read all Resumes
```zsh
curl --location --request GET 'https://resume-backend-bc5j.onrender.com/resume' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6Ikd1bm5lcjU2QGdtYWlsLmNvbSIsIm5hbWUiOiJMb3JyYWluZSBNYXJrcyJ9LCJpYXQiOjE2NzA0MjA2NzZ9.YXC3F9GOy45mP7HzsgULOVBuJHw2xhFAKTFAVl2SsWs'
```

## Read a single Resume
```zsh
```

## Delete Resume
```zsh
curl --location --request DELETE 'https://resume-backend-bc5j.onrender.com/resume/:id' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6Ikd1bm5lcjU2QGdtYWlsLmNvbSIsIm5hbWUiOiJMb3JyYWluZSBNYXJrcyJ9LCJpYXQiOjE2NzA0MjA2NzZ9.YXC3F9GOy45mP7HzsgULOVBuJHw2xhFAKTFAVl2SsWs'
```

## Update Education Step
```zsh
curl --location --request PUT 'https://resume-backend-bc5j.onrender.com/resume/1/step' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6Ikd1bm5lcjU2QGdtYWlsLmNvbSIsIm5hbWUiOiJMb3JyYWluZSBNYXJrcyJ9LCJpYXQiOjE2NzA0MjA2NzZ9.YXC3F9GOy45mP7HzsgULOVBuJHw2xhFAKTFAVl2SsWs' \
--header 'Content-Type: application/json' \
--data-raw '{
    "step": "education",
    "data": [
        {
            "school": "Carroll, Funk and Schinner",
            "degree": "Regional Implementation Consultant",
            "startDate": "Sat Sep 24 2022 07:15:46 GMT+0200 (Eastern European Standard Time)",
            "endDate": "Wed Dec 07 2022 10:41:20 GMT+0200 (Eastern European Standard Time)",
            "description": "International"
        }
    ]
}'
```

## Update WorkExperience Step
```zsh
curl --location --request PUT 'https://resume-backend-bc5j.onrender.com/resume/1/step' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6Ikd1bm5lcjU2QGdtYWlsLmNvbSIsIm5hbWUiOiJMb3JyYWluZSBNYXJrcyJ9LCJpYXQiOjE2NzA0MjA2NzZ9.YXC3F9GOy45mP7HzsgULOVBuJHw2xhFAKTFAVl2SsWs' \
--header 'Content-Type: application/json' \
--data-raw '{
    "step": "workExperience",
    "data": [
        {
            "employer": "Erdman, Witting and MacGyver",
            "startDate": "Sat May 21 2022 01:51:01 GMT+0200 (Eastern European Standard Time)",
            "endDate": "Tue Dec 06 2022 21:20:29 GMT+0200 (Eastern European Standard Time)",
            "title": "Corporate Metrics Specialist",
            "description": "Central"
        },
        {
            "employer": "Dooley Group",
            "startDate": "Wed Dec 07 2022 14:49:28 GMT+0200 (Eastern European Standard Time)",
            "current": true,
            "title": "Central Communications Administrator",
            "description": "Principal"
        }
    ]
}'
```

## Update Skills Step
```zsh
curl --location --request PUT 'https://resume-backend-bc5j.onrender.com/resume/1/step' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6Ikd1bm5lcjU2QGdtYWlsLmNvbSIsIm5hbWUiOiJMb3JyYWluZSBNYXJrcyJ9LCJpYXQiOjE2NzA0MjA2NzZ9.YXC3F9GOy45mP7HzsgULOVBuJHw2xhFAKTFAVl2SsWs' \
--header 'Content-Type: application/json' \
--data-raw '{
    "step": "skill",
    "data": [
        {
            "experience": "expert",
            "name": "HTML",
            "position": 0
        },
        {
            "experience": "skillful",
            "name": "javascript",
            "position": 1
        }
    ]
}'
```

## Update Languages step
```zsh
curl --location --request PUT 'https://resume-backend-bc5j.onrender.com/resume/1/step' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6Ikd1bm5lcjU2QGdtYWlsLmNvbSIsIm5hbWUiOiJMb3JyYWluZSBNYXJrcyJ9LCJpYXQiOjE2NzA0MjA2NzZ9.YXC3F9GOy45mP7HzsgULOVBuJHw2xhFAKTFAVl2SsWs' \
--header 'Content-Type: application/json' \
--data-raw '{
    "step": "language",
    "data": [
        {
            "experience": "c2",
            "name": "Arabic",
            "position": 0
        },
        {
            "experience": "b2",
            "name": "English",
            "position": 1
        }
    ]
}'
```

## Update SocialLinks step
```zsh
curl --location --request PUT 'https://resume-backend-bc5j.onrender.com/resume/1/step' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6Ikd1bm5lcjU2QGdtYWlsLmNvbSIsIm5hbWUiOiJMb3JyYWluZSBNYXJrcyJ9LCJpYXQiOjE2NzA0MjA2NzZ9.YXC3F9GOy45mP7HzsgULOVBuJHw2xhFAKTFAVl2SsWs' \
--header 'Content-Type: application/json' \
--data-raw '{
    "step": "socialLink",
    "data": [
  {
    "label": "Linkedin",
    "url":"https://www.linkedin.com/"
  }
]
}'
```

## Update References Step
```zsh
curl --location --request PUT 'https://resume-backend-bc5j.onrender.com/resume/1/step' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6Ikd1bm5lcjU2QGdtYWlsLmNvbSIsIm5hbWUiOiJMb3JyYWluZSBNYXJrcyJ9LCJpYXQiOjE2NzA0MjA2NzZ9.YXC3F9GOy45mP7HzsgULOVBuJHw2xhFAKTFAVl2SsWs' \
--header 'Content-Type: application/json' \
--data-raw '{
    "step": "reference",
    "data": [
  {
    "company":"Ruecker, Bartoletti and West",
    "email": "Garrick78@yahoo.com",
    "fullname": "Courtney Moen",
    "phone":"0246461446"
  }
]
}'
```

## Create Custom Section
```zsh
curl --location --request POST 'https://resume-backend-bc5j.onrender.com/resume/1/custom-section' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6Ikd1bm5lcjU2QGdtYWlsLmNvbSIsIm5hbWUiOiJMb3JyYWluZSBNYXJrcyJ9LCJpYXQiOjE2NzA0MjA2NzZ9.YXC3F9GOy45mP7HzsgULOVBuJHw2xhFAKTFAVl2SsWs' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Test section"
}'
```

## Update Custom Section
```zsh
curl --location --request PUT 'https://resume-backend-bc5j.onrender.com/resume/1/custom-section/07297936-6514-4a28-a11f-dbab210ff8f3' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6Ikd1bm5lcjU2QGdtYWlsLmNvbSIsIm5hbWUiOiJMb3JyYWluZSBNYXJrcyJ9LCJpYXQiOjE2NzA0MjA2NzZ9.YXC3F9GOy45mP7HzsgULOVBuJHw2xhFAKTFAVl2SsWs' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Test section-edit"
}'
```

## Update Custom Section Items
```zsh
curl --location --request PUT 'https://resume-backend-bc5j.onrender.com/resume/1/custom-section/07297936-6514-4a28-a11f-dbab210ff8f3/items' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6Ikd1bm5lcjU2QGdtYWlsLmNvbSIsIm5hbWUiOiJMb3JyYWluZSBNYXJrcyJ9LCJpYXQiOjE2NzA0MjA2NzZ9.YXC3F9GOy45mP7HzsgULOVBuJHw2xhFAKTFAVl2SsWs' \
--header 'Content-Type: application/json' \
--data-raw '[
    {
        "title": "hic",
        "description": "Fugiat voluptatem est autem itaque et rerum autem et quidem. Ut voluptas architecto quas blanditiis. Nam qui et eligendi.",
        "endDate": "Wed Dec 07 2022 00:26:05 GMT+0200 (Eastern European Standard Time)",
        "startDate": "Tue Aug 16 2022 17:25:53 GMT+0200 (Eastern European Standard Time)"
    },
    {
        "title": "est",
        "description": "Quam quas perspiciatis nulla sunt ut. Ea voluptatem id fugit. Qui animi repellendus fugit adipisci voluptatum repudiandae quos."
    }
]'
```

[Public Postman workspace](https://www.postman.com/ibrahim9595/workspace/resumebuilder/request/647798-d28aeb6f-c5ca-43b6-97a1-c5faac3ccd1f?ctx=code)