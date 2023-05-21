import ballerina/io;
import ballerina/http;
import ballerina/random;
import ballerina/uuid;

json[] shareCapitalTable = [];

// The service-level CORS config applies globally to each `resource`.
@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:3000"],
        allowCredentials: true
    }
}
service http:Service / on new http:Listener(9090) {

    // API resource that returns some static share capital info data in json after taking in the reporting date
    resource function get sharecapitalinfo(string reportingDate) returns json|error {
        var [transactionDate, shareHolderName, numberOfShares] = check createRandomData();

        return {
            "captialCategory": "Authorized share capital",
            "transactionDate": transactionDate,
            "shareHolderName": shareHolderName,
            "numberOfShares": numberOfShares
        };
    }

    // API resource that returns static share price data in xml after taking in the reporting date
    resource function get shareprice(string reportingDate) returns xml {
        return xml `<sharePrice>
                        <sharePriceBookValue>50.88</sharePriceBookValue>
                        <date>${reportingDate}</date>
                    </sharePrice>`;
    }

    resource function post sharecapital(@http:Payload json shareCapital) returns http:Created|error {
        string uuid = uuid:createType1AsString();
        io:println("Share capital information received: ", shareCapital);
        json payload = check shareCapital.mergeJson({"informationCode": uuid});
        shareCapitalTable.push(payload);
        io:println("Share capital table: ", shareCapitalTable);

        return <http:Created> {
            "body" : {
                "rtsisInformation": {
                    "informationCode": uuid,
                    "fspInformationCode": uuid,
                    "informationDescription": "Share capital information successfully submitted"
                }
            }
        };
    }

    resource function get sharecapital() returns json[] {
        return shareCapitalTable;
    }
}

function createRandomData() returns [string, string, int]|error {
    int month = check random:createIntInRange(1, 12);
    int day = check random:createIntInRange(1, 28);
    string transactionDate = "2022-" + month.toString().padStart(2, "0") + "-" + day.toString().padStart(2, "0");
    
    string[] names = ["Will", "George", "Jack", "Russell", "John", "James", "Henry", "William", "Thomas", "Edward", "Harry", "Arthur", "Fred"];
    string shareHolderName = names[month] + " " + names[month/2];

    int numberOfShares = check random:createIntInRange(100, 10000);

    return [transactionDate, shareHolderName, numberOfShares];
}
