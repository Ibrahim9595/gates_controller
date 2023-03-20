## Technologies

In this project I have used the MERN stack the mongodb is created using docker container

# Run the project

1. Run docker    ```docker-compose up -d```
3. Run backend   ```cd backend && npm run build && npm start```
4. Run frontend  ```cd frontend && npm start```

# Endpoints
1. gateways
    1. GET /gateways
    2. POST /gateways 

    ```json
    {
        "name": "string",
        "ipv4": "string"
    }
    ```
    3. PUT /gateways/:id
    ```json
    {
        "name": "<string>",
        "ipv4": "<string>"
    }
    ```
    4. DELETE /gateways/:id
    5. GET /gateways/:id => to get all details about a a gateway

2. peripherals
    1. POST /gateways/:gatewayId/peripherals
    ```json
    {
        "vendor": "string",
        "status": "online|offline"
    }
    ```
    2. PUT  /gateways/:gatewayId/peripherals/:id
    
    ```json
    {
        "vendor": "<string>",
        "status": "<online|offline>"
    }
    ```
    3. DELETE /gateways/:gatewayId/peripherals/:id