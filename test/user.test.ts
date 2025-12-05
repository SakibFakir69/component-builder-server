import supertest from "supertest";
import { server } from "../src/index";
import { User } from "../src/modules/users/user.model";
import { userServices } from "../src/modules/users/user.services";
import { hash } from "bcrypt";


/// jest.mock path -> 
// describe 

// Mock the database and services
jest.mock("../src/modules/users/user.model", () => ({
  User: {
    findOne: jest.fn().mockResolvedValue(null) // pretend no user exists
  }
}));



jest.mock("../src/modules/users/user.services", () => ({
  userServices: {
    createUser: jest.fn().mockResolvedValue({
      id: "1",
      name: "Sakib Fakir",
      email: "sakib@example.com"
    })
  }
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn().mockResolvedValue("hashedpassword") // mock hash
}));


describe("create user", () => {
  it("should create user successfully", async () => {
    const response = await supertest(server)
      .post("/api/v1/user/create-user")
      .send({
        name: "Sakib Fakir",
        password: "slnglmsdg",
        email: "sakib@example.com"
      });

    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body.data.name).toBe("Sakib Fakir");
  });
});
