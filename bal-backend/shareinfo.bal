import ballerina/http;

// The service-level CORS config applies globally to each `resource`.
@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:3000"],
        allowCredentials: true
    }
}
service http:Service / on new http:Listener(9090) {

    // API resource that returns some static share capital info data in json after taking in the reporting date
    resource function get sharecapitalinfo(string reportingDate) returns json {
        return {
            "captialCategory": "Authorized share capital",
            "transactionDate": "2019-01-01",
            "shareHolderName": "John Doe",
            "numberOfShares": 1000
        };
    }

    // API resource that returns static share price data in xml after taking in the reporting date
    resource function get shareprice(string reportingDate) returns xml {
        return xml `<sharePrice>
                        <sharePriceBookValue>50.88</sharePriceBookValue>
                        <date>${reportingDate}</date>
                    </sharePrice>`;
    }
}
