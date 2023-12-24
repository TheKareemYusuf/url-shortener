const request = require("supertest");
const mongoose = require("mongoose");
// const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require("./../app"); // Replace with the actual path to your Express app
const CONFIG = require("./../config/config");

// let mongoServer;

// beforeAll(async () => {
//   mongoServer = await MongoMemoryServer.create(); // Use create() instead of new MongoMemoryServer()
//   const mongoUri = mongoServer.getUri(); // No need for await here

//   await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
// });

beforeEach(async () => {
  await mongoose.connect(CONFIG.DATABASE_URL);
});

// afterAll(async () => {
//   await mongoose.disconnect();
//   await mongoServer.stop();
// });

afterEach(async () => {
  await mongoose.connection.close();
});

// Write the test that checks if the app is running

describe("Check homepage", () => {
  it("Should check if the homepage is live"),
    async () => {
      const response = await request(app)
        .get("/")
        .expect(200);
      
        expect(response.body).toContain("Hello World, let's shorten yout url!");
        
    };
});

describe("Shorten URL Endpoint", () => {
  it("should shorten a URL and return the shortened URL", async () => {
    const response = await request(app)
      .post("/api/v1/shorten-url")
      .send({
        originalUrl:
          "https://www.w3schools.com/python/trypython.asp?filename=demo_class_str1",
      })
      .expect(201);

    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty(
      "originalUrl",
      "https://www.w3schools.com/python/trypython.asp?filename=demo_class_str1"
    );
    expect(response.body.data).toHaveProperty("newUrlId");
    expect(response.body.data).toHaveProperty("shortenedUrl");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toContain("url shortened successfully");
  });

  // Add more test cases as needed
});
